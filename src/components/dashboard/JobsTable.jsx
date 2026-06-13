"use client";

import React from 'react';
import { Table, Chip, Button } from "@heroui/react";
// Correct Gravity UI icons naming convention
import { Eye, Pencil, TrashBin, LayoutList } from "@gravity-ui/icons"; 

export default function JobsTable({ jobs = [] }) {
  
  // Helper to format the status badge colors
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'danger';
      default:
        return 'warning';
    }
  };

  return (
    <Table aria-label="Company jobs management table">
      <Table.ResizableContainer>
        <Table.Content aria-label="Jobs data list" className="min-w-[850px]">
          <Table.Header>
            {/* 1. Job Title Column */}
            <Table.Column isRowHeader defaultWidth="2fr" id="jobTitle" minWidth={200} aria-label="Job Title Column">
              Job Title
              <Table.ColumnResizer />
            </Table.Column>
            
            {/* 2. Type / Category Column */}
            <Table.Column defaultWidth="1.2fr" id="typeCategory" minWidth={150} aria-label="Type and Category Column">
              Type / Category
              <Table.ColumnResizer />
            </Table.Column>
            
            {/* 3. Location Column */}
            <Table.Column defaultWidth="1.2fr" id="location" minWidth={140} aria-label="Location Column">
              Location
              <Table.ColumnResizer />
            </Table.Column>
            
            {/* 4. Status Column */}
            <Table.Column defaultWidth="1fr" id="status" minWidth={100} aria-label="Status Column">
              Status
              <Table.ColumnResizer />
            </Table.Column>
            
            {/* 5. Actions Column */}
            <Table.Column defaultWidth="1.2fr" id="actions" minWidth={160} aria-label="Actions Column">
              Actions
            </Table.Column>
          </Table.Header>

          <Table.Body emptyContent={"No jobs found for this company."}>
            {jobs.map((job) => {
              const jobId = job._id?.$oid || job._id;

              return (
                <Table.Row key={jobId}>
                  {/* 1. Job Title Cell */}
                  <Table.Cell>
                    <span className="font-semibold text-default-800 text-sm">{job.jobTitle}</span>
                  </Table.Cell>
                  
                  {/* 2. Type / Category Cell */}
                  <Table.Cell>
                    <div className="flex flex-col gap-0.5 items-start">
                      {/* bg color বাদ দিয়ে শুধু টেক্সট রাখা হয়েছে */}
                      <span className="text-xs text-default-700 font-medium capitalize">
                        {job.jobType || "N/A"}
                      </span>
                      <span className="text-xs text-default-400 capitalize">
                        {job.category}
                      </span>
                    </div>
                  </Table.Cell>
                  
                  {/* 3. Location Cell */}
                  <Table.Cell>
                    {/* Remote এর জন্যেও bg color বাদ দিয়ে শুধু টেক্সট কালার দেওয়া হয়েছে */}
                    {job.isRemote ? (
                      <span className="text-xs text-primary font-medium">
                        Remote
                      </span>
                    ) : (
                      <span className="text-xs text-default-600 font-normal">
                        {job.location || "On-site"}
                      </span>
                    )}
                  </Table.Cell>
                  
                  {/* 4. Status Cell */}
                  <Table.Cell>
                    <Chip color={getStatusColor(job.status)} size="sm" variant="soft" className="capitalize">
                      {job.status || "Unknown"}
                    </Chip>
                  </Table.Cell>
                  
                  {/* 5. Actions Cell */}
                  <Table.Cell>
                    <div className="flex items-center gap-1">
                      {/* View Action */}
                      <Button 
                        isIconOnly 
                        size="sm" 
                        variant="light" 
                        aria-label={`View ${job.jobTitle}`}
                        onClick={() => console.log('View', jobId)}
                      >
                        <Eye className="w-4 h-4 text-default-500" />
                      </Button>

                      {/* Details Action */}
                      <Button 
                        isIconOnly 
                        size="sm" 
                        variant="light" 
                        aria-label={`Details for ${job.jobTitle}`}
                        onClick={() => console.log('Details', jobId)}
                      >
                        <LayoutList className="w-4 h-4 text-default-500" />
                      </Button>

                      {/* Edit Action */}
                      <Button 
                        isIconOnly 
                        size="sm" 
                        variant="light" 
                        aria-label={`Edit ${job.jobTitle}`}
                        onClick={() => console.log('Edit', jobId)}
                      >
                        <Pencil className="w-4 h-4 text-warning" />
                      </Button>

                      {/* Delete Action */}
                      <Button 
                        isIconOnly 
                        size="sm" 
                        variant="light" 
                        aria-label={`Delete ${job.jobTitle}`}
                        onClick={() => console.log('Delete', jobId)}
                      >
                        <TrashBin className="w-4 h-4 text-danger" />
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Content>
      </Table.ResizableContainer>
    </Table>
  );
}