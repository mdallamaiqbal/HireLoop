"use client"
import React from "react";
// FIXED: Import individual HeroUI subcomponents directly
import { Card, CardHeader, CardBody, CardFooter, Button, Avatar } from "@heroui/react";
// Importing needed icons from Gravity UI Icons
import { Briefcase, Calendar, CircleDollar, MapPin } from "@gravity-ui/icons";
import Link from "next/link";

export default function JobCard({ jobData }) {
  // Gracefully handling missing data
  if (!jobData) return null;

  const {
    _id,
    jobTitle,
    jobType,
    deadline,
    minSalary,
    maxSalary,
    currency,
    isRemote,
    companyName,
    companyLogo, 
  } = jobData;

  // Formatting currency display (e.g., $6k - $9k)
  const formatSalary = (val) => {
    const num = parseInt(val, 10);
    return num >= 1000 ? `${num / 1000}k` : val;
  };

  const currencySymbol = currency === "USD" ? "$" : `${currency} `;
  const salaryRange = `${currencySymbol}${formatSalary(minSalary)}–${formatSalary(maxSalary)}/month`;

  // Determining the workplace type tag
  const locationType = isRemote ? "Remote" : "On-site";

  return (
    <Card className="max-w-[420px] bg-[#121212] border border-neutral-800 text-white p-5 rounded-2xl shadow-xl">
      {/* Header Area */}
      <CardHeader className="flex flex-col items-start gap-3 p-0 pb-4">
        <div className="flex items-center gap-3 w-full">
          {/* FIXED: Replaced custom layout classes with explicit size properties */}
          <img
            src={companyLogo} 
            alt={companyName}
            size="md"
            radius="xl"
            className="w-12 h-12 object-contain bg-neutral-800 border border-neutral-700 rounded-xl shrink-0 p-1" 
          />
          <div className="flex flex-col">
            <span className="text-xs text-neutral-400 font-medium tracking-wide uppercase">
              {companyName}
            </span>
            {/* FIXED: Replaced Card.Title with a standard h3 heading */}
            <h3 className="text-2xl font-semibold tracking-tight text-white mt-0.5">
              {jobTitle}
            </h3>
          </div>
        </div>
        {/* FIXED: Replaced Card.Description with a standard paragraph tag */}
        <p className="text-sm text-neutral-400 leading-relaxed mt-1">
          Showcase your commitment to building high-quality web applications by joining our core technology engineering team.
        </p>
      </CardHeader>

      {/* Content Area: Badges/Tags */}
      <div className="flex flex-row flex-wrap gap-2 p-0 py-4 overflow-visible">
        {/* Location / Work Style Tag */}
        <div className="flex items-center gap-1.5 bg-[#1a1a1a] text-neutral-300 px-3 py-1.5 rounded-full text-xs font-medium border border-neutral-800">
          <MapPin className="w-3.5 h-3.5 text-purple-400" />
          <span>{locationType}</span>
        </div>

        {/* Job Type Tag */}
        <div className="flex items-center gap-1.5 bg-[#1a1a1a] text-neutral-300 px-3 py-1.5 rounded-full text-xs font-medium border border-neutral-800">
          <Briefcase className="w-3.5 h-3.5 text-purple-400" />
          <span className="capitalize">{jobType}</span>
        </div>

        {/* Salary Tag */}
        <div className="flex items-center gap-1.5 bg-[#1a1a1a] text-neutral-300 px-3 py-1.5 rounded-full text-xs font-medium border border-neutral-800">
          <CircleDollar className="w-3.5 h-3.5 text-purple-400" />
          <span>{salaryRange}</span>
        </div>

        {/* Deadline Tag */}
        <div className="flex items-center gap-1.5 bg-[#1a1a1a] text-neutral-300 px-3 py-1.5 rounded-full text-xs font-medium border border-neutral-800">
          <Calendar className="w-3.5 h-3.5 text-purple-400" />
          <span>Closes: {new Date(deadline).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}</span>
        </div>
      </div>

      {/* Footer Area: Actions */}
      <CardFooter className="p-0 pt-4 flex justify-start">
        <Link 
         href={`/jobs/${_id}`}
          variant="light" 
          className="text-white hover:text-purple-300 font-medium p-0 h-auto bg-transparent data-[hover=true]:bg-transparent flex items-center gap-2 group text-base transition-colors"
          onClick={() => console.log("Redirecting to apply handler...")}
        >
          Apply Now 
          <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-200">
            →
          </span>
        </Link>
      </CardFooter>
    </Card>
  );
}