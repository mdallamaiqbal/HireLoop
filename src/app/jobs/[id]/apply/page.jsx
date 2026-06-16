import { getJobById } from '@/app/lib/api/jobs';
import { getUserSession } from '@/app/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import JobApply from './JobApply';
import { getApplicationByApplicant } from '@/app/lib/api/application';
import Link from 'next/link';
import { getPlanById } from '@/app/lib/api/plans';

const ApplyPage = async ({ params }) => {
    const { id } = await params;
    const user = await getUserSession();
    
    // ১. ইউজার সাইন-ইন করা না থাকলে রিডাইরেক্ট
    if (!user) {
        redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
    }
    
    // ২. রোল যদি 'seeker' না হয়, তবে রেস্ট্রিক্টেড ভিউ
    if (user.role !== 'seeker') {
        return (
            <div className="w-full min-h-screen bg-zinc-900 flex flex-col justify-center items-center text-zinc-100 p-6">
                <div className="max-w-md w-full bg-zinc-800/50 border border-zinc-700/50 rounded-2xl p-8 text-center backdrop-blur-sm shadow-xl">
                    <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Access Restricted</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                        Only job seekers can apply for positions. Please sign in with a seeker account to proceed.
                    </p>
                    <Link 
                        href="/auth/signin" 
                        className="inline-flex w-full justify-center bg-zinc-100 text-zinc-900 font-medium py-2.5 px-4 rounded-xl hover:bg-zinc-200 transition-colors text-sm"
                    >
                        Switch Account
                    </Link>
                </div>
            </div>
        );
    }

    const applications = await getApplicationByApplicant(user.id);
   
   const plan = await getPlanById(user?.plan || 'seeker_free') 
  
    const job = await getJobById(id);
    const hasRemainingApplications = applications.length < plan.maxApplicationsPerMonth;
      
    return (
        <div className="w-full min-h-screen bg-zinc-900 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto space-y-6">
                
                {/* অ্যাপ্লিকেশন লিমিট ড্যাশবোর্ড কার্ড */}
                <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 shadow-md">
                    <div>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-700 text-zinc-300 mb-2">
                            {plan.name} Plan
                        </span>
                        <h2 className="text-lg font-semibold tracking-tight">
                            Monthly Application Limit
                        </h2>
                        <p className="text-zinc-400 text-sm mt-1">
                            You have used <span className="font-semibold text-zinc-200">{applications.length}</span> out of <span className="font-semibold text-zinc-200">{plan.maxApplicationsPerMonth}</span> available applications this month.
                        </p>
                    </div>

                    {/* লিমিট শেষ বনাম বাকি থাকার ডাইনামিক অ্যালার্ট */}
                    {!hasRemainingApplications ? (
                        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-200 text-sm">
                            <p>You've reached your monthly limit. Upgrade your tier to keep applying.</p>
                            <Link href="/plans" className="text-sm font-semibold text-amber-400 hover:text-amber-300 underline underline-offset-4 shrink-0 transition-colors">
                                View Plans &rarr;
                            </Link>
                        </div>
                    ) : (
                        <div className="mt-6 pt-4 border-t border-zinc-700/50 text-xs text-zinc-500 flex justify-between items-center">
                            <span>Need more monthly submissions?</span>
                            <Link href="/plans" className="text-zinc-400 hover:text-zinc-200 underline underline-offset-4 transition-colors">
                                Upgrade Plan
                            </Link>
                        </div>
                    )}
                </div>

                {/* ফর্ম অথবা লকড স্টেট রেন্ডারিং */}
                {hasRemainingApplications ? (
                    <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 shadow-md">
                        <JobApply applicant={user} job={job} />
                    </div>
                ) : (
                    <div className="bg-zinc-800/40 border border-dashed border-zinc-700 rounded-2xl p-12 text-center text-zinc-500">
                        <svg className="w-8 h-8 mx-auto mb-3 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <p className="text-sm">Please upgrade your plan to apply for <span className="text-zinc-400 font-medium">"{job?.title || 'this position'}"</span>.</p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ApplyPage;