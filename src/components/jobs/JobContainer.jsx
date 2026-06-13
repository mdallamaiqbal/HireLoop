"use client"
import React, { useState, useMemo } from "react";
import JobCard from "./JobCard";
import JobsFilter from "./JobsFilter";

export default function JobContainer({ allJobs }) {
  // ১. সার্চ এবং ফিল্টারের জন্য স্টেট ডিফাইন
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedJobType, setSelectedJobType] = useState("all");

  // ২. ডাইনামিকভাবে ইউনিক ক্যাটাগরি লিস্ট বের করা (ফিল্টার বারের ড্রপডাউনের জন্য)
  const categories = useMemo(() => {
    const uniqueCats = new Set(allJobs.map(job => job.category).filter(Boolean));
    return Array.from(uniqueCats);
  }, [allJobs]);

  // ৩. ফিল্টারিং লজিক (Search, Category, and Job Type)
  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) => {
      // সার্চ ম্যাচ চেক (Title অথবা Company Name)
      const matchesSearch = 
        job.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.companyName?.toLowerCase().includes(searchQuery.toLowerCase());

      // ক্যাটাগরি ম্যাচ চেক
      const matchesCategory = 
        selectedCategory === "all" || job.category === selectedCategory;

      // জব টাইপ ম্যাচ চেক
      const matchesJobType = 
        selectedJobType === "all" || job.jobType?.toLowerCase() === selectedJobType.toLowerCase();

      return matchesSearch && matchesCategory && matchesJobType;
    });
  }, [searchQuery, selectedCategory, selectedJobType, allJobs]);

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* ফিল্টার বার কম্পোনেন্ট */}
      <JobsFilter 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedJobType={selectedJobType}
        setSelectedJobType={setSelectedJobType}
        categories={categories}
      />

      {/* ৩-কলাম রেসপন্সিভ গ্রিড লেআউট */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full px-2">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <JobCard key={job.companyId + index} jobData={job} />
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-[#121212] border border-neutral-800 rounded-2xl w-full">
            <p className="text-neutral-500 text-lg">No jobs match your search criteria.</p>
          </div>
        )}
      </div>

    </div>
  );
}