import React from "react";
// import { getCompanyJobs } from '@/lib/api/jobs';
import { Chip, Table, Button, Tooltip } from "@heroui/react";
import { getCompanyJobs } from "@/lib/api/jobs";
import { getLoginRecruiterCompany } from "@/lib/api/company";

// Inline functional icons matching Gravity Icons standard outline SVG styles
const VideoIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const EditIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const DeleteIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const RecruiterJobs = async () => {
  const company = await getLoginRecruiterCompany();
  // const companyId = 'company_123';
  const jobs = (await getCompanyJobs(company?._id)) || [];

  // Direct action handlers to keep logic on the same page
  // Note: For full interactivity in Next.js App Router, you can safely wrap these icon click setups
  // into separate click events or handle routing natively.

  return (
    <div className="w-full p-6 max-w-[1200px] mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-800">
          Recruiter Manage All Jobs
        </h2>
        <p className="text-sm text-neutral-500">
          View, edit, and keep track of your posted company listings.
        </p>
      </div>

      <Table aria-label="Company jobs management table">
        <Table.ResizableContainer>
          <Table.Content
            aria-label="Table with resizable columns"
            className="min-w-[800px]"
          >
            <Table.Header>
              <Table.Column
                isRowHeader
                defaultWidth="2fr"
                id="jobTitle"
                minWidth={200}
              >
                Job Title
                <Table.ColumnResizer />
              </Table.Column>

              <Table.Column defaultWidth="1fr" id="location" minWidth={140}>
                Location
                <Table.ColumnResizer />
              </Table.Column>

              <Table.Column defaultWidth="1.2fr" id="salary" minWidth={150}>
                Salary Range
                <Table.ColumnResizer />
              </Table.Column>

              <Table.Column defaultWidth="1fr" id="deadline" minWidth={130}>
                Deadline
                <Table.ColumnResizer />
              </Table.Column>

              <Table.Column defaultWidth="0.8fr" id="status" minWidth={100}>
                Status
                <Table.ColumnResizer />
              </Table.Column>

              <Table.Column defaultWidth="1fr" id="actions" minWidth={140}>
                Actions
              </Table.Column>
            </Table.Header>

            <Table.Body emptyContent={"No jobs posted yet."}>
              {jobs.map((job) => {
                const jobId = job._id?.$oid || job._id;

                return (
                  <Table.Row key={jobId}>
                    {/* Job Title & Category */}
                    <Table.Cell>
                      <div className="flex flex-col">
                        <span className="font-semibold text-neutral-700">
                          {job.jobTitle}
                        </span>
                        <span className="text-xs text-neutral-400 capitalize">
                          {job.jobCategory}
                        </span>
                      </div>
                    </Table.Cell>

                    {/* Location & Remote details */}
                    <Table.Cell>
                      <div className="flex flex-col">
                        <span className="text-sm text-neutral-600">
                          {job.location}
                        </span>
                        <span className="text-xs text-neutral-400 capitalize">
                          {job.isRemote ? "Remote" : job.jobType}
                        </span>
                      </div>
                    </Table.Cell>

                    {/* Currency & Salary */}
                    <Table.Cell>
                      <span className="text-sm text-neutral-600 font-medium">
                        {parseInt(job.minSalary).toLocaleString()} -{" "}
                        {parseInt(job.maxSalary).toLocaleString()}{" "}
                        {job.currency}
                      </span>
                    </Table.Cell>

                    {/* Application Deadline */}
                    <Table.Cell>
                      <span className="text-sm text-neutral-600">
                        {new Date(job.deadline).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </Table.Cell>

                    {/* Soft Status Badge */}
                    <Table.Cell>
                      <Chip
                        color={job.status === "active" ? "success" : "danger"}
                        size="sm"
                        variant="soft"
                        className="capitalize"
                      >
                        {job.status}
                      </Chip>
                    </Table.Cell>

                    {/* Action Icon Buttons */}
                    <Table.Cell>
                      <div className="relative flex items-center gap-2">
                        <Tooltip content="Video Details">
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            className="text-neutral-500 hover:text-primary min-w-8 w-8 h-8"
                          >
                            <VideoIcon className="text-lg" />
                          </Button>
                        </Tooltip>

                        <Tooltip content="Edit Job">
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            className="text-neutral-500 hover:text-warning min-w-8 w-8 h-8"
                          >
                            <EditIcon className="text-lg" />
                          </Button>
                        </Tooltip>

                        <Tooltip color="danger" content="Delete Job">
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            className="text-danger hover:bg-danger-50 min-w-8 w-8 h-8"
                          >
                            <DeleteIcon className="text-lg" />
                          </Button>
                        </Tooltip>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ResizableContainer>
      </Table>
    </div>
  );
};

export default RecruiterJobs;
