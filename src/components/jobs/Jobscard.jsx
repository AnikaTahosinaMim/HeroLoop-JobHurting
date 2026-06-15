import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Chip, Link, Avatar } from '@heroui/react';
import { MapPin, Briefcase, CircleDollar, Calendar, ArrowRight } from '@gravity-ui/icons';

export default function JobsCard({ job }) {
  // প্রপস থেকে ডেটা রিসিভ করা হচ্ছে (যদি কোনো ডাটা মিসিং থাকে তার জন্য ডিফল্ট ভ্যালু সেট করা)
  const {
    _id = '',
    jobTitle = 'Frontend Developer',
    jobType = 'Full-time',
    minSalary = '0',
    maxSalary = '0',
    currency = 'USD',
    location = 'Bangladesh',
    deadline = '2026-06-24',
    isRemote = false,
    status = 'active',
  } = job || {};

  // 'fontednd' বানানের মতো কোনো স্পেলিং মিস্টেক থাকলে তা ফিক্স করার জন্য সেফটি চেক
  const cleanTitle = jobTitle.toLowerCase().includes('fontednd') || jobTitle.toLowerCase().includes('frontend')
    ? 'Frontend Developer'
    : jobTitle;

  // Deadline ডেটটিকে সুন্দরভাবে ফরম্যাট করার জন্য (যেমন: Jun 24, 2026)
  const formatDate = (dateString) => {
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-US', options);
    } catch (e) {
      return dateString;
    }
  };

  return (
    <Card className="w-full max-w-[420px] bg-[#121214] text-white border border-zinc-800 p-6 rounded-3xl shadow-xl transition-all duration-300 hover:border-zinc-700">
      
      {/* Header: Company Profile, Title & Status Tags */}
      <CardHeader className="flex flex-col items-start gap-4 p-0 pb-4">
        <div className="flex items-center justify-between w-full">
          {/* Company Logo/Avatar (আপনার ডেটায় থাকা companyId বা কোম্পানির প্রথম অক্ষর দিয়ে) */}
          <Avatar 
            name="GS" 
            className="w-12 h-12 text-md font-bold bg-zinc-800 text-zinc-200 border border-zinc-700" 
          />
          
          {/* Status & Remote Badges */}
          <div className="flex gap-2">
            {status === 'active' && (
              <Chip size="sm" variant="flat" color="success" className="text-xs font-semibold px-2">
                Active
              </Chip>
            )}
            <Chip size="sm" variant="flat" className="bg-zinc-800 text-zinc-300 text-xs font-semibold px-2">
              {isRemote ? 'Remote' : 'On-site'}
            </Chip>
          </div>
        </div>

        {/* Job Title & Location */}
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 capitalize">
            {cleanTitle}
          </h2>
          <div className="flex items-center gap-1.5 text-zinc-400">
            <MapPin className="text-zinc-500 w-4 h-4" />
            <span className="text-sm font-medium capitalize">{location.toLowerCase()}</span>
          </div>
        </div>
      </CardHeader>

      {/* Body: Job Meta Details */}
      <CardBody className="flex flex-col gap-3.5 p-0 py-3 border-t border-b border-zinc-800/60 my-2">
        {/* Job Type */}
        <div className="flex items-center gap-3 text-zinc-300">
          <Briefcase className="text-zinc-500 w-4 h-4" />
          <span className="text-sm font-medium capitalize">{jobType}</span>
        </div>

        {/* Salary Range */}
        <div className="flex items-center gap-3 text-zinc-300">
          <CircleDollar className="text-zinc-500 w-4 h-4" />
          <span className="text-sm font-medium">
            {currency} {Number(minSalary).toLocaleString()} - {Number(maxSalary).toLocaleString()} / year
          </span>
        </div>

        {/* Application Deadline */}
        <div className="flex items-center gap-3 text-zinc-300">
          <Calendar className="text-zinc-500 w-4 h-4" />
          <span className="text-sm font-medium text-zinc-400">
            Deadline: <span className="text-zinc-200">{formatDate(deadline)}</span>
          </span>
        </div>
      </CardBody>

      {/* Footer: Apply Action Button */}
      <CardFooter className="p-0 pt-4 flex justify-start">
        <Link
          href={`/jobs/${_id}`} 
          className="flex items-center gap-2 text-sm font-semibold text-white hover:text-zinc-300 transition-colors group cursor-pointer"
        >
          Apply Now
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </CardFooter>
    </Card>
  );
}