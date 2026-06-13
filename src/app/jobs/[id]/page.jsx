import { getJobById } from '@/app/lib/api/jobs';
import React from 'react';
import Link from 'next/link';
// আইকন ইম্পোর্ট (Gravity UI)
import { Briefcase, Calendar, CircleDollar, MapPin, ArrowLeft, ShieldCheck, Gift } from "@gravity-ui/icons";
import { Button } from '@heroui/react';

export default async function JobDetailPage({ params }) {
  const { id } = await params;
  const job = await getJobById(id);

  // যদি কোনো কারণে জব ডাটা খুঁজে না পাওয়া যায়
  if (!job) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center gap-4">
        <p className="text-xl text-neutral-400">Job details not found.</p>
        <Link href="/jobs" className="text-purple-400 hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Job Board
        </Link>
      </div>
    );
  }

  const {
    jobTitle,
    jobType,
    deadline,
    minSalary,
    maxSalary,
    currency,
    isRemote,
    responsibilities,
    requirements,
    benefits,
    companyName,
    companyLogo,
  } = job;

  // স্যালারি ফরম্যাটিং
  const formatSalary = (val) => {
    const num = parseInt(val, 10);
    return num >= 1000 ? `${num / 1000}k` : val;
  };
  const currencySymbol = currency === "USD" ? "$" : `${currency} `;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* পিছনের পেজে যাওয়ার বাটন */}
        <Link 
          href="/jobs" 
          className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          Back to Job Board
        </Link>

        {/* মেইন কন্টেন্ট এরিয়া */}
        <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          
          {/* ১. হেডার সেকশন (কোম্পানি লোগো, নাম ও টাইটেল) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-neutral-800">
            <div className="flex items-center gap-4">
              <img 
                src={companyLogo} 
                alt={companyName} 
                className="w-16 h-16 object-contain bg-neutral-800 border border-neutral-700 rounded-2xl p-2 shrink-0"
              />
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  {companyName}
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mt-0.5">
                  {jobTitle}
                </h1>
              </div>
            </div>

            {/* বড় স্ক্রিনের জন্য Apply Now বাটন */}
            <div className="hidden sm:block">
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg active:scale-95">
                Apply for this job
              </button>
            </div>
          </div>

          {/* ২. মেটা ব্যাজেস/ট্যাগস গ্রিড */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#1a1a1a] border border-neutral-800 p-3.5 rounded-2xl flex items-center gap-3">
              <MapPin className="w-5 h-5 text-purple-400 shrink-0" />
              <div>
                <p className="text-[10px] uppercase font-bold text-neutral-500">Location</p>
                <p className="text-sm font-medium">{isRemote ? "Remote" : "On-site"}</p>
              </div>
            </div>

            <div className="bg-[#1a1a1a] border border-neutral-800 p-3.5 rounded-2xl flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-purple-400 shrink-0" />
              <div>
                <p className="text-[10px] uppercase font-bold text-neutral-500">Job Type</p>
                <p className="text-sm font-medium capitalize">{jobType}</p>
              </div>
            </div>

            <div className="bg-[#1a1a1a] border border-neutral-800 p-3.5 rounded-2xl flex items-center gap-3">
              <CircleDollar className="w-5 h-5 text-purple-400 shrink-0" />
              <div>
                <p className="text-[10px] uppercase font-bold text-neutral-500">Salary Range</p>
                <p className="text-sm font-medium">
                  {currencySymbol}{formatSalary(minSalary)}–{formatSalary(maxSalary)}
                </p>
              </div>
            </div>

            <div className="bg-[#1a1a1a] border border-neutral-800 p-3.5 rounded-2xl flex items-center gap-3">
              <Calendar className="w-5 h-5 text-purple-400 shrink-0" />
              <div>
                <p className="text-[10px] uppercase font-bold text-neutral-500">Deadline</p>
                <p className="text-sm font-medium">
                  {new Date(deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>

          {/* ৩. জবের বিস্তারিত তথ্য (Responsibilities, Requirements, Benefits) */}
          <div className="space-y-6 pt-4">
            
            {/* Responsibilities */}
            <div className="space-y-2">
              <h2 className="text-lg font-semibold flex items-center gap-2 text-neutral-200">
                <span className="w-1 h-5 bg-purple-500 rounded-full inline-block"></span>
                Core Responsibilities
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed bg-[#1a1a1a]/50 p-4 rounded-xl border border-neutral-850">
                {responsibilities}
              </p>
            </div>

            {/* Requirements */}
            <div className="space-y-2">
              <h2 className="text-lg font-semibold flex items-center gap-2 text-neutral-200">
                <span className="w-1 h-5 bg-purple-500 rounded-full inline-block"></span>
                Requirements & Skills
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed bg-[#1a1a1a]/50 p-4 rounded-xl border border-neutral-850">
                {requirements}
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-2">
              <h2 className="text-lg font-semibold flex items-center gap-2 text-neutral-200">
                <span className="w-1 h-5 bg-purple-500 rounded-full inline-block"></span>
                Benefits & Perks
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed bg-[#1a1a1a]/50 p-4 rounded-xl border border-neutral-850">
                {benefits}
              </p>
            </div>

          </div>

          {/* মোবাইল স্ক্রিনের জন্য নিচের দিকে রেসপন্সিভ Apply Now বাটন */}
          <div className="block sm:hidden pt-4">
            <Button color="secondary" 
             className="w-full text-white font-semibold py-3.5 rounded-lg shadow-lg active:scale-98 text-center">
              Apply for this job
            </Button>
          </div>

        </div>
      </div>
    </main>
  );
}