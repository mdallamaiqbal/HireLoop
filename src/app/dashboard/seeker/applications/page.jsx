import { getApplicationByApplicant } from '@/app/lib/api/application';
import { getUserSession } from '@/app/lib/core/session';
import React from 'react';
import ApplicationTable from './ApplicationTable';

const ApplicationPage = async () => {
    const user = await getUserSession();
    const jobs = await getApplicationByApplicant(user?.id)
    return (
        <div>
            <ApplicationTable jobs={jobs} />
        </div>
    );
};

export default ApplicationPage;