'use client'; // 1. Turn this into a client-side layout component for date accuracy

import React, { useState, useEffect } from 'react';
import { Table } from '@heroui/react';

import {
    Code,
    LayoutCells,
    Database,
    Cloud,
    Cpu,
    Gear
} from '@gravity-ui/icons';

const getJobIcon = (title = "") => {
    const t = title.toLowerCase();
    if (t.includes('frontend') || t.includes('web') || t.includes('developer')) return <Code className="text-gray-400" width={18} height={18} />;
    if (t.includes('designer') || t.includes('product designer')) return <LayoutCells className="text-gray-400" width={18} height={18} />;
    if (t.includes('data') || t.includes('scientist')) return <Database className="text-gray-400" width={18} height={18} />;
    if (t.includes('cloud') || t.includes('architect')) return <Cloud className="text-gray-400" width={18} height={18} />;
    if (t.includes('ai') || t.includes('research')) return <Cpu className="text-gray-400" width={18} height={18} />;
    return <Gear className="text-gray-400" width={18} height={18} />;
};

const formatRelativeTime = (dateString) => {
    if (!dateString) return 'Recent';
    const now = new Date();
    const appliedDate = new Date(dateString);
    const diffInMs = now - appliedDate;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return `${Math.floor(diffInDays / 7)} week${Math.floor(diffInDays / 7) > 1 ? 's' : ''} ago`;
};

const getStatusBadge = (status = "Applied") => {
    const normStatus = status.toLowerCase();
    let styles = "border-gray-500 text-gray-300 bg-transparent";
    if (normStatus === 'review') styles = "border-amber-500/50 text-amber-500 bg-amber-500/5";
    if (normStatus === 'shortlisted') styles = "border-emerald-500/50 text-emerald-500 bg-emerald-500/5";
    if (normStatus === 'rejected') styles = "border-rose-500/50 text-rose-500 bg-rose-500/5";
    if (normStatus === 'offered') styles = "border-slate-400 text-slate-200 bg-slate-800";

    return (
        <span className={`px-3 py-0.5 rounded-full text-xs font-medium border ${styles}`}>
            {status}
        </span>
    );
};

const ApplicationTable = ({ jobs }) => {
    // 2. Prevent hydration mismatches by ensuring client-rendering is ready
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const applications = Array.isArray(jobs) ? jobs : jobs ? [jobs] : [];

    // Return an empty table template layout on the server to perfectly match structure
    if (!mounted) {
        return <div className="w-full min-h-screen bg-[#121214] p-8" />;
    }

    return (
        <div className="w-full min-h-screen bg-[#121214] text-[#E4E4E7] p-8 antialiased">
            <div className="max-w-7xl mx-auto border border-neutral-800 rounded-xl bg-[#18181B] overflow-hidden shadow-2xl">
                <Table className="w-full text-left border-collapse">
                    <Table.ScrollContainer>
                        <Table.Content aria-label="Job Applications Status Table">

                            <Table.Header className="border-b border-neutral-800">
                                {/* Add isRowHeader directly to the main identifying column */}
                                <Table.Column isRowHeader className="px-6 py-4 text-sm font-medium text-neutral-400 bg-transparent">
                                    Job Title
                                </Table.Column>

                                <Table.Column className="px-6 py-4 text-sm font-medium text-neutral-400 bg-transparent">Company</Table.Column>
                                <Table.Column className="px-6 py-4 text-sm font-medium text-neutral-400 bg-transparent">Applied</Table.Column>
                                <Table.Column className="px-6 py-4 text-sm font-medium text-neutral-400 bg-transparent">Status</Table.Column>
                                <Table.Column className="px-6 py-4 text-sm font-medium text-neutral-400 bg-transparent text-right">Action</Table.Column>
                            </Table.Header>

                            <Table.Body>
                                {applications.map((app, index) => (
                                    <Table.Row
                                        // 3. Changed fallback key from Math.random() to string index mapping
                                        key={app._id?.$oid || `app-row-${index}`}
                                        className="border-b border-neutral-800/60 last:border-0 hover:bg-neutral-800/20 transition-colors"
                                    >
                                        <Table.Cell className="px-6 py-4 align-middle">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center border border-neutral-700/50">
                                                    {getJobIcon(app.jobTitle)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-sm text-neutral-100">{app.jobTitle || 'Technical Product Manager'}</span>
                                                    <span className="text-xs text-neutral-400 mt-0.5">
                                                        Full-time • {app.jobTitle?.toLowerCase().includes('manager') ? 'On-site' : 'Remote'}
                                                    </span>
                                                </div>
                                            </div>
                                        </Table.Cell>

                                        <Table.Cell className="px-6 py-4 align-middle text-sm text-neutral-300">
                                            {app.companyName || 'Adobe'}
                                        </Table.Cell>

                                        <Table.Cell className="px-6 py-4 align-middle text-sm text-neutral-400">
                                            {formatRelativeTime(app.createdAt?.$date)}
                                        </Table.Cell>

                                        <Table.Cell className="px-6 py-4 align-middle">
                                            {getStatusBadge(app.status || "Applied")}
                                        </Table.Cell>

                                        <Table.Cell className="px-6 py-4 align-middle text-right text-sm">
                                            <button className="text-neutral-300 hover:text-white font-medium hover:underline focus:outline-none">
                                                Details
                                            </button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>

                        </Table.Content>
                    </Table.ScrollContainer>
                    <Table.Footer />
                </Table>
            </div>
        </div>
    );
};

export default ApplicationTable;