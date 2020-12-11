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
  tokenConfig,
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
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post(API + "/authentication/employee", body);
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
  const body = JSON.stringify({ token: customerToken });
  try {
    const res = await axios.post(API + "/authentication/customer", body);
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
function tokenConfig() {
  //TODO: check if the token has expired,  if it has then logout user and push to login
  const currentUser = authenticationService.currentUserValue;
  /*   console.log(currentUser.token);
  const decode: any = jwt_decode(currentUser.token);
  if (!decode) {
    logout();
  }
  console.log(decode);
  const diff = Math.floor(new Date().getTime() / 1000) - decode.exp;
  console.log(diff); */

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authentication: currentUser?.token,
    },
  };
  return config;
}
tokenConfig();
