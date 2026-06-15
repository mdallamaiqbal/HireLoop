import { getJobById } from '@/app/lib/api/jobs';
import { getUserSession } from '@/app/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import JobApply from './JobApply';

const ApplyPage =async ({params}) => {
    const {id} = await params;
    const user = await getUserSession();
    if(!user){
        redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
    }
     if (user.role !== 'seeker') {
        return (
            <div className='w-full min-h-screen bg-zinc-800 flex flex-col justify-center items-center text-white p-6'>
                <p className='text-zinc-100'>
                    Only job seekers can apply for position. Please sign in with a seeker account to proceed.
                </p>
            </div>
        );
    }
    const job= await getJobById(id)
    return (
        <div>
            <JobApply applicant={user} job={job} />
        </div>
    );
};

export default ApplyPage;