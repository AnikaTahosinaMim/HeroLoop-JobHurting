import JobsCard from "@/components/jobs/jobscard";



export default function Page() {
  const apiJobData = {
    _id: "6a2101787eeed9b37c0245b2",
    jobTitle: "fontednd",
    jobCategory: "technology",
    jobType: "full-time",
    minSalary: "334",
    maxSalary: "32546",
    currency: "USD",
    location: "BANGLADESH",
    deadline: "2026-06-24",
    isRemote: false,
    status: "active"
  };

  return (
    <div className="p-8 bg-[#09090b] min-h-screen flex items-center justify-center">
      {/* প্রপ হিসেবে ডেটা পাস করা হচ্ছে */}
      <JobsCard job={apiJobData} />
    </div>
  );
}