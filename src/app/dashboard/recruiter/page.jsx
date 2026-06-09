"use client"
import { useSession } from '@/app/lib/auth-client';
import React from 'react';
import {Persons, CircleCheck, Briefcase, Thunderbolt } from "@gravity-ui/icons";
import DashboardStats from '@/components/dashboard/DashboardStats';
const RecruiterDashboardHomePage = () => {
    const {data: session, isPending} = useSession();

    if(isPending){
        return <div>Loading.....</div>
    }
    const recruiterStats= [
    { id: "total-posts", title: "Total Job Posts", value: "48", icon: Briefcase },
    { id: "applicants", title: "Total Applicants", value: "1,284", icon: Persons },
    { id: "active-jobs", title: "Active Jobs", value: "18", icon: Thunderbolt },
    { id: "closed-jobs", title: "Jobs Closed", value: "32", icon: CircleCheck },
  ];
    const user = session?.user
    return (
        <div>
            <h2 className='text-3xl'>Welcome back, {user?.name}</h2>
            <DashboardStats statsData={recruiterStats} />
        </div>
    );
};

export default RecruiterDashboardHomePage;