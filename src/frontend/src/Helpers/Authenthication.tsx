import axios from "axios";
import { BehaviorSubject } from "rxjs";
import jwt_decode from "jwt-decode";
const API = "http://" + window.location.hostname + "/api";
console.log(API);
const token = "OptoXAuthToken";

try {
  //in case that the token item is invalid, we delete it
  JSON.parse(localStorage.getItem(token)!);
} catch {
  localStorage.removeItem(token);
}

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem(token)!)
);

export const authenticationService = {
  login,
  logout,
  newToken,
  tokenLogin,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
};
function newToken(token: string) {
  currentUserSubject.next(token);
  localStorage.setItem(token, JSON.stringify(token));
}
async function login(email: string, password: string) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post(API + "/users/login", body);
    console.log(res);

    const userObject: { [k: string]: any } = jwt_decode(
      res.data.Authentication
    );
    userObject["token"] = res.data.Authentication;

    currentUserSubject.next(userObject);
    localStorage.setItem(token, JSON.stringify(userObject));
    return userObject.Type;
  } catch (e) {
    return null;
  }
}
async function tokenLogin(customerToken: String) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ token: customerToken });
  try {
    const res = await axios.post(API + "/users/login", body);
    console.log(res);

    const userObject: { [k: string]: any } = jwt_decode(
      res.data.Authentication
    );
    userObject["token"] = res.data.Authentication;

    currentUserSubject.next(userObject);
    localStorage.setItem(token, JSON.stringify(userObject));
    return userObject.Type;
  } catch (e) {
    return null;
  }
}
function logout() {
  localStorage.removeItem(token);
  currentUserSubject.next(null);
}
export const tokenConfig = () => {
  const currentUser = authenticationService.currentUserValue;
  const config = {
    headers: {
      "Content-Type": "application/json",
      authentication: currentUser.token,
    },
  };
  return config;
};
