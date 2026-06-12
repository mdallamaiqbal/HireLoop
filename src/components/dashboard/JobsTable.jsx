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
            <Table.Column isRowHeader defaultWidth="1.8fr" id="jobTitle" minWidth={200} aria-label="Job Title Column">
              Job Title / Location
              <Table.ColumnResizer />
            </Table.Column>
            <Table.Column defaultWidth="1fr" id="category" minWidth={130} aria-label="Category Column">
              Category
              <Table.ColumnResizer />
            </Table.Column>
            <Table.Column defaultWidth="1fr" id="jobType" minWidth={120} aria-label="Job Type Column">
              Type
              <Table.ColumnResizer />
            </Table.Column>
            <Table.Column defaultWidth="1.2fr" id="salary" minWidth={140} aria-label="Salary Column">
              Salary Range
              <Table.ColumnResizer />
            </Table.Column>
            <Table.Column defaultWidth="1fr" id="status" minWidth={100} aria-label="Status Column">
              Status
              <Table.ColumnResizer />
            </Table.Column>
            <Table.Column defaultWidth="1.2fr" id="actions" minWidth={160} aria-label="Actions Column">
              Actions
            </Table.Column>
          </Table.Header>

          <Table.Body emptyContent={"No jobs found for this company."}>
            {jobs.map((job) => {
              const jobId = job._id?.$oid || job._id;

              return (
                <Table.Row key={jobId}>
                  <Table.Cell>
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-default-800">{job.jobTitle}</span>
                      
                      {/* Dynamically handle Remote vs Location data */}
                      {job.isRemote ? (
                        <span className="text-xs text-primary font-medium bg-primary-50 px-1.5 py-0.5 rounded w-fit">
                          Remote
                        </span>
                      ) : (
                        <span className="text-xs text-default-500 font-normal">
                          {job.location || "On-site"}
                        </span>
                      )}
                    </div>
                  </Table.Cell>
                  
                  <Table.Cell className="capitalize text-default-600">
                    {job.category}
                  </Table.Cell>
                  
                  <Table.Cell className="capitalize text-default-600">
                    {job.jobType}
                  </Table.Cell>
                  
                  <Table.Cell className="text-default-600">
                    {job.minSalary && job.maxSalary 
                      ? `${job.minSalary} - ${job.maxSalary} ${job.currency}`
                      : "Not Specified"
                    }
                  </Table.Cell>
                  
                  <Table.Cell>
                    <Chip color={getStatusColor(job.status)} size="sm" variant="soft" className="capitalize">
                      {job.status || "Unknown"}
                    </Chip>
                  </Table.Cell>
                  
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