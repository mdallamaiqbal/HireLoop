'use client';

import React, { useState } from 'react';
import { Table } from '@heroui/react';
import { updateCompany } from '@/app/lib/actions/companies';

const CompanyTable = ({ companies }) => {
  const [companyList, setCompanyList] = useState(companies || []);

  const handleStatusChange = async (companyId, newStatus) => {
    try {
      // ১. এপিআই কলটি try ব্লকের ভেতরে নিয়ে আসা হয়েছে এবং 'id' এর বদলে 'companyId' ও ডাইনামিক 'newStatus' পাস করা হয়েছে
      const result = await updateCompany(companyId, { status: newStatus });
      
      console.log(`Company ID: ${companyId} updated to ${newStatus}`);

      // ২. এপিআই সফল হলেই কেবল স্টেট আপডেট হবে
      setCompanyList((prev) =>
        prev.map((company) => {
          const id = company._id?.$oid || company._id;
          if (id === companyId) {
            return { ...company, status: newStatus };
          }
          return company;
        })
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div className="w-full bg-[#121212] p-6 rounded-xl border border-neutral-800 text-neutral-200">
      <Table aria-label="Company Reviews List" className="w-full text-left border-collapse">
        <Table.ScrollContainer>
          <Table.Content aria-label="Company Review Data Matrix">
            <Table.Header className="border-b border-neutral-800 text-neutral-400 text-sm">
              <Table.Column isRowHeader className="pb-3 font-medium">Company Name</Table.Column>
              <Table.Column className="pb-3 font-medium">Website</Table.Column>
              <Table.Column className="pb-3 font-medium">Industry</Table.Column>
              <Table.Column className="pb-3 font-medium">Status</Table.Column>
              <Table.Column className="pb-3 font-medium">Date Submitted</Table.Column>
              <Table.Column className="pb-3 font-medium text-right">Actions</Table.Column>
            </Table.Header>
            
            <Table.Body>
              {companyList.map((company) => {
                const rawDate = company.createdAt?.$date || company.createdAt;
                const formattedDate = rawDate
                  ? new Date(rawDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: '2-digit',
                      year: 'numeric'
                    })
                  : 'N/A';

                const initials = company.name ? company.name.substring(0, 2).toUpperCase() : 'CO';
                const status = company.status || 'Pending'; 
                const companyId = company._id?.$oid || company._id || Math.random().toString();

                return (
                  <Table.Row key={companyId} className="border-b border-neutral-800/50 hover:bg-neutral-900/40 transition-colors">
                    <Table.Cell className="py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-neutral-800 flex items-center justify-center text-xs font-bold text-neutral-300 overflow-hidden border border-neutral-700">
                        {company.logo ? (
                          <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
                        ) : (
                          <span>{initials}</span>
                        )}
                      </div>
                      <span className="font-medium text-white">{company.name}</span>
                    </Table.Cell>

                    <Table.Cell className="py-4 text-neutral-400 text-sm">
                      <a href={company.websiteUrl} target="_blank" rel="noreferrer" className="hover:underline text-neutral-300">
                        {company.websiteUrl?.replace('https://', '')}
                      </a>
                    </Table.Cell>

                    <Table.Cell className="py-4">
                      <span className="px-2.5 py-0.5 rounded-full text-xs bg-neutral-800 text-neutral-400 border border-neutral-700/60">
                        {company.industry}
                      </span>
                    </Table.Cell>

                    <Table.Cell className="py-4">
                      <div className="flex items-center gap-2 text-sm">
                        {status === 'Pending' && (
                          <>
                            <span className="w-2 h-2 rounded-full bg-amber-500" />
                            <span className="text-amber-500 font-medium">Pending</span>
                          </>
                        )}
                        {status === 'Approved' && (
                          <>
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span className="text-emerald-500 font-medium">Approved</span>
                          </>
                        )}
                        {status === 'Rejected' && (
                          <>
                            <span className="w-2 h-2 rounded-full bg-rose-500" />
                            <span className="text-rose-500 font-medium">Rejected</span>
                          </>
                        )}
                      </div>
                    </Table.Cell>

                    <Table.Cell className="py-4 text-neutral-400 text-sm">
                      {formattedDate}
                    </Table.Cell>

                    <Table.Cell className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {status !== 'Approved' && (
                          <button 
                            onClick={() => handleStatusChange(companyId, 'Approved')}
                            className="px-3 py-1.5 rounded text-xs font-medium bg-emerald-950/40 text-emerald-400 border border-emerald-800/50 hover:bg-emerald-900/60 transition-all"
                          >
                            Approve
                          </button>
                        )}
                        {status !== 'Rejected' && (
                          <button 
                            onClick={() => handleStatusChange(companyId, 'Rejected')}
                            className="px-3 py-1.5 rounded text-xs font-medium bg-rose-950/30 text-rose-400 border border-rose-900/40 hover:bg-rose-900/50 transition-all"
                          >
                            Reject
                          </button>
                        )}
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>

        <Table.Footer className="mt-4 flex items-center justify-between text-xs text-neutral-500 pt-4 border-t border-neutral-800">
          <div>
            Showing <span className="font-semibold text-neutral-300">1-{companyList.length}</span> of <span className="font-semibold text-neutral-300">{companyList.length}</span> companies
          </div>
          <div className="flex items-center gap-1.5">
            <button className="p-1.5 rounded border border-neutral-800 bg-neutral-900 text-neutral-600 cursor-not-allowed">&lt;</button>
            <button className="w-7 h-7 flex items-center justify-center rounded bg-white text-black font-medium">1</button>
            <button className="w-7 h-7 flex items-center justify-center rounded border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 transition-colors">2</button>
            <button className="w-7 h-7 flex items-center justify-center rounded border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 transition-colors">3</button>
            <button className="p-1.5 rounded border border-neutral-800 bg-neutral-900 text-neutral-400 hover:bg-neutral-800 transition-colors">&gt;</button>
          </div>
        </Table.Footer>
      </Table>
    </div>
  );
};

export default CompanyTable;