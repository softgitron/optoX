import { authenticationService } from "./Authenthication";
import FinlandFlag from "../assets/finland_flag.svg";
import SwedenFlag from "../assets/Flag_of_Sweden.svg";
import NorwayFlag from "../assets/Flag_of_Norway.svg";

export enum Countries {
  Finland = "Finland",
  Sweden = "Sweden",
  Norway = "Norway",
}
export const getCountry = (): Countries => {
  return authenticationService.currentUserValue.Country;
};

export const getFlag = (country: Countries) => {
  console.log(Countries.Finland);
  switch (country) {
    case Countries.Finland:
      return FinlandFlag;
    case Countries.Sweden:
      return SwedenFlag;
    case Countries.Norway:
      return NorwayFlag;
    default:
      return FinlandFlag;
  }
};
