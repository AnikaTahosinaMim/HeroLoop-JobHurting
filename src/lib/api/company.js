// import { getSession } from "better-auth/api"
import { serverFetch } from "../core/server";
import { getSessionServer } from "../core/session";

export const getmyCompany = async (recruiterId) => {
  return serverFetch(`/my/companies?recruiterId=${recruiterId}`);
};
export const getLoginRecruiterCompany = async () => {
  const users = await getSessionServer();

  if (!users) {
    console.log("No user found");
    return null;
  }

  console.log(users,"nmlsdmfnb");

  return getmyCompany(users.id);
};
