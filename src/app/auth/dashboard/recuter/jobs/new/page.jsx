import React from "react";
import PostJobPage from "./jobPage";
import { getLoginRecruiterCompany } from "@/lib/api/company";

const JobsingInpages = async () => {
  const company = await getLoginRecruiterCompany();
//   console.log(comapny, "comapny details");
  return (
    <div>
      <PostJobPage company={company}></PostJobPage>
    </div>
  );
};

export default JobsingInpages;
