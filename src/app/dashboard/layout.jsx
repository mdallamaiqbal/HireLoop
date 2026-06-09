import { DashBoardSidebar } from '@/components/dashboard/DashBoardSidebar';
import React from 'react';

const DashBoardLayout = ({children}) => {
    return (
        <div className='flex  min-h-screen'>
            <DashBoardSidebar />
            <div className='flex-1'>{children}</div>
        </div>
    );
};

export default DashBoardLayout;