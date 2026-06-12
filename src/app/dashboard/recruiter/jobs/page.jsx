import { getCompanyJobs } from '@/app/lib/api/jobs';
import JobsTable from '@/components/dashboard/JobsTable';
import React from 'react';

const RecruiterJobs =async () => {
    const companyId ="mock-company-123"
    const jobs = await getCompanyJobs(companyId)
    console.log(jobs)
    return (
       <div className="p-6 max-w-7xl mx-auto space-y-4">
            <div className="flex flex-col gap-1">
                <h2 className="text-xl font-bold text-default-900">Manage Company Jobs</h2>
                <p className="text-sm text-default-500">View, update, or remove job listings for your organization.</p>
            </div>
            
            <div className="bg-content1 rounded-xl shadow-small p-4">
                <JobsTable jobs={jobs} />
            </div>
        </div>
    );
};

export default RecruiterJobs;