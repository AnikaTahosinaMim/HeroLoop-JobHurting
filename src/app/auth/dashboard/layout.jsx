import { DashBoardSidebar } from '@/components/dashboard/DashboardLayout';
import React from 'react';

const Dashboard = ({children}) => {
    return (
        <div className='flex flex-1 min-h-screen'>
            <DashBoardSidebar></DashBoardSidebar>
            <div>{children}</div>
            
        </div>
    );
};

export default Dashboard;