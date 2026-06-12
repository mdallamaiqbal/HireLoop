import React from 'react';
import CompanyProfile from './CompanyProfile';
import { getUserSession } from '@/app/lib/core/session';
import { getRecruiterCompany } from '@/app/lib/api/companies';

const CompanyPage =async () => {
    const user =await getUserSession();
    const company = await getRecruiterCompany(user?.id)
    return (
        <div>
            <CompanyProfile recruiter={user} recruiterCompany={company} />
        </div>
    );
};

export default CompanyPage;