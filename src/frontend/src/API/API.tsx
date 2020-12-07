import axios from "axios";
import { authenticationService } from "../Helpers/Authenthication";
const tokenConfig = authenticationService.tokenConfig;
const API = "http://" + window.location.hostname + "/api";

export const APItest1 = async () => {
  const res = await axios.post(API + "/healtz", tokenConfig());
  console.log(res.data);
};
