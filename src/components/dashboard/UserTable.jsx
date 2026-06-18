'use client';

import React, { useState } from 'react';
import { Table } from '@heroui/react';
import { Person, Briefcase, ChevronLeft, ChevronRight } from '@gravity-ui/icons';

// Assuming you have a user update action similar to companies
// import { updateUser } from '@/app/lib/actions/users';

const UserTable = ({ users }) => {
  const [userList, setUserList] = useState(users || []);

  const handleRoleOrStatusChange = async (userId, updates) => {
    try {
      // Mock API action setup:
      // await updateUser(userId, updates);
      
      console.log(`User ID: ${userId} updated with`, updates);

      setUserList((prev) =>
        prev.map((user) => {
          const id = user._id?.$oid || user._id;
          if (id === userId) {
            return { ...user, ...updates };
          }
          return user;
        })
      );
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  return (
    <div className="w-full bg-[#18181c] p-6 rounded-xl border border-neutral-800 text-neutral-200">
      <Table aria-label="User Management List" className="w-full text-left border-collapse">
        <Table.ScrollContainer>
          <Table.Content aria-label="User Data Table Matrix">
            <Table.Header className="border-b border-neutral-800 text-neutral-400 text-sm">
              <Table.Column isRowHeader className="pb-3 font-medium">User Name</Table.Column>
              <Table.Column className="pb-3 font-medium">Email Address</Table.Column>
              <Table.Column className="pb-3 font-medium">Role</Table.Column>
              <Table.Column className="pb-3 font-medium">Join Date</Table.Column>
              <Table.Column className="pb-3 font-medium">Status</Table.Column>
              <Table.Column className="pb-3 font-medium text-right">Actions</Table.Column>
            </Table.Header>
            
            <Table.Body>
              {userList.map((user) => {
                const userId = user._id?.$oid || user._id || Math.random().toString();
                const rawDate = user.createdAt?.$date || user.createdAt;
                
                const formattedDate = rawDate
                  ? new Date(rawDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: '2-digit',
                      year: 'numeric'
                    })
                  : 'N/A';

                const initials = user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : 'US';
                
                // Normalizing values from sample schema data
                const isRecruiter = user.role === 'admin' || user.role === 'recruiter';
                const isActive = user.status !== 'Suspended'; // Default behavior based on sample data

                return (
                  <Table.Row key={userId} className="border-b border-neutral-800/60 hover:bg-neutral-900/40 transition-colors">
                    {/* User Name with Avatar */}
                    <Table.Cell className="py-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-bold text-neutral-400 border border-neutral-700">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          <span>{initials}</span>
                        )}
                      </div>
                      <span className="font-medium text-white">{user.name || 'Anonymous'}</span>
                    </Table.Cell>

                    {/* Email Address */}
                    <Table.Cell className="py-4 text-neutral-400 text-sm">
                      {user.email}
                    </Table.Cell>

                    {/* Role Badge with Gravity UI Icon */}
                    <Table.Cell className="py-4">
                      {isRecruiter ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-neutral-800 text-neutral-200 border border-neutral-700">
                          <Briefcase className="w-3.5 h-3.5 text-neutral-400" />
                          Recruiter
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#242424] text-neutral-300 border border-transparent">
                          <Person className="w-3.5 h-3.5 text-neutral-400" />
                          Seeker
                        </span>
                      )}
                    </Table.Cell>

                    {/* Join Date */}
                    <Table.Cell className="py-4 text-neutral-400 text-sm">
                      {formattedDate}
                    </Table.Cell>

                    {/* Status Pill */}
                    <Table.Cell className="py-4">
                      {isActive ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-950/30 text-emerald-400 border border-emerald-900/50">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-950/30 text-rose-400 border border-rose-900/50">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                          Suspended
                        </span>
                      )}
                    </Table.Cell>

                    {/* Actions Panel matching reference layout */}
                    <Table.Cell className="py-4 text-right">
                      <div className="flex items-center justify-end gap-4 text-sm font-medium">
                        {isRecruiter ? (
                          <button 
                            onClick={() => handleRoleOrStatusChange(userId, { role: 'seeker' })}
                            className="text-neutral-400 hover:text-white transition-colors"
                          >
                            Make Seeker
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleRoleOrStatusChange(userId, { role: 'recruiter' })}
                            className="text-neutral-400 hover:text-white transition-colors"
                          >
                            Make Recruiter
                          </button>
                        )}

                        {isActive ? (
                          <button 
                            onClick={() => handleRoleOrStatusChange(userId, { status: 'Suspended' })}
                            className="text-rose-500 hover:text-rose-400 transition-colors"
                          >
                            Suspend
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleRoleOrStatusChange(userId, { status: 'Active' })}
                            className="text-emerald-500 hover:text-emerald-400 transition-colors"
                          >
                            Activate
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

        {/* Footer Pagination matching image */}
        <Table.Footer className="mt-4 flex items-center justify-between text-xs text-neutral-500 pt-4 border-t border-neutral-800">
          <div>
            Showing <span className="text-neutral-400">1 to {userList.length}</span> of <span className="text-neutral-400">{userList.length}</span> users
          </div>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded text-neutral-600 hover:text-neutral-400 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded bg-white text-black font-semibold">1</button>
            <button className="w-7 h-7 flex items-center justify-center rounded text-neutral-400 hover:bg-neutral-800/50 transition-colors">2</button>
            <button className="w-7 h-7 flex items-center justify-center rounded text-neutral-400 hover:bg-neutral-800/50 transition-colors">3</button>
            <span className="px-1 text-neutral-600">...</span>
            <button className="w-7 h-7 flex items-center justify-center rounded text-neutral-400 hover:bg-neutral-800/50 transition-colors">1285</button>
            <button className="p-1.5 rounded text-neutral-400 hover:text-white transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </Table.Footer>
      </Table>
    </div>
  );
};

export default UserTable;