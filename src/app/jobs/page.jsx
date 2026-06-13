import React from "react";
import JobContainer from "@/components/jobs/JobContainer";
import { getJobs } from "../lib/api/jobs"; // আপনার সঠিক পাথ অনুযায়ী রাখুন

export default async function JobBoardPage() {
  // ডাটাবেজ থেকে ৩০টি বা তার বেশি সব জব ডাটা নিয়ে আসা হচ্ছে
  const jobs = await getJobs() || [];

  return (
    <main className="min-h-screen bg-[#0a0a0a] py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      {/* হেডার সেকশন */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white tracking-tight sm:text-5xl">
          Explore Available Jobs
        </h1>
        <p className="mt-4 text-base text-neutral-400">
          Find your dream role from the world's top tech companies using advanced filters.
        </p>
      </div>

      {/* ফিল্টার এবং ম্যাপ কন্টেইনার কম্পোনেন্ট */}
      <JobContainer allJobs={jobs} />
    </main>
  );
}