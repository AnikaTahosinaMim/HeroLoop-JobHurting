"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getCompanyJobs = async (companyId, status = "active") => {
  const params = new URLSearchParams();

  if (companyId) {
    params.append("companyId", companyId);
  }

  if (status) {
    params.append("status", status);
  }

  const res = await fetch(`${baseUrl}/jobs?${params.toString()}`);

  return res.json();
};