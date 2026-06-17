import { getCompanies } from '@/app/lib/api/companies';
import CompanyTable from '@/components/dashboard/CompanyTable';
import React from 'react';


const AdminCompaniesPage = async () => {
    const companies = await getCompanies();
    
    return (
        <div className="min-h-screen bg-[#09090b] p-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white tracking-wide">
                        Companies Review ({companies.length})
                    </h2>
                </div>
                
                <CompanyTable companies={companies} />
            </div>
        </div>
    );
};

export default AdminCompaniesPage;