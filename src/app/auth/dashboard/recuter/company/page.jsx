import React from "react";
import CompanyProfile from "./compnayProfile";
import { getSessionServer } from "@/lib/core/session";
import { getmyCompany } from "@/lib/api/company";

const Profile = async () => {
  const users = await getSessionServer();
  const company =await getmyCompany(users?.id)
  console.log(users, "user session in company pages");
  return (
    <div>
      <CompanyProfile recruiter={users} recruiterCompany={company}></CompanyProfile>
    </div>
  );
};

export default Profile;
