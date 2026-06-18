import React from 'react';
import { getUsersList } from '@/app/lib/api/users';
import UserTable from '@/components/dashboard/UserTable';
 // Adjust path based on your folder structure

const AdminUsersPage = async () => {
    const data = await getUsersList();
    const users = data?.users || [];

    return (
        <div className="p-8 bg-[#121212] min-h-screen text-white">
            <div className="mb-6">
                <h2 className="text-xl font-semibold">Users: {users.length}</h2>
            </div>
            <UserTable users={users} />
        </div>
    );
};

export default AdminUsersPage;