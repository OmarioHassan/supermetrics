import axios from "axios";
import { User } from "../types/user";

export const Regiser = (userCred: User) => {
  return axios.post("assignment/register", {
    name: userCred.name,
    email: userCred.email,
    client_id: "ju16a6m81mhid5ue1z3v2g0uh",
  });
};
