"use client";

import React, { useState } from "react";
import { 
  Form, 
  Input, 
  TextArea, 
  Select, 
  ListBox, 
  Label,
  Switch, 
  Alert,
  Button,
  toast
} from "@heroui/react";

// Gravity UI Icons imports
import { ArrowLeft, Globe, Briefcase, Calendar, CircleDollar } from "@gravity-ui/icons";
import { createJob } from "@/app/lib/actions/job";
import { redirect } from "next/navigation";

export default function PostJobForm({company}) {
  // const [companyContext, setCompanyContext] = useState({
  //   id: "mock-company-123",
  //   name: "Acme Corp",
  //   isApproved: true,
  //   plan: "Growth", 
  //   jobsUsed: 4,
  //   jobsLimit: 10,  
  // });

  const [isRemote, setIsRemote] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // const canPostJob = companyContext.isApproved && companyContext.jobsUsed < companyContext.jobsLimit;
 const isApproved = company?.status === "Approved" || company?.isApproved || true;
const canPostJob = isApproved && (company?.jobsUsed || 0) < (company?.jobsLimit || 10);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    setSuccessMessage("");
    const form = e.currentTarget;

    if (!canPostJob) {
      setFormErrors({ global: "Your company has reached its plan's active job limit or is not approved yet." });
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    const payload={
      ...data,
      isRemote,
      companyId:company._id,
      companyName: company.name,
      companyLogo: company.logo,
      status: "active",
      isPubliclyVisible: true,
    }

    const res = await createJob(payload);
    if(res.insertedId){
      toast.success("Job Posted Successfully");
      form.reset();
      setIsRemote(false);
      redirect("/dashboard/recruiter/jobs");
    }

    if (!data.jobTitle) {
      setFormErrors({ global: "Please fill out all required fields." });
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccessMessage("Job posted successfully! It is now live and publicly visible.");
      setCompanyContext(prev => ({ ...prev, jobsUsed: prev.jobsUsed + 1 }));
      e.target.reset();
    } catch (err) {
      setFormErrors({ global: "Something went wrong saving the job. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0e] text-zinc-100 p-6 md:p-12 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-[#161618] border border-zinc-800 rounded-xl p-6 md:p-8 shadow-2xl">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800 pb-6 mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-zinc-400 text-sm mb-2 cursor-pointer hover:text-zinc-200 transition-colors">
              <ArrowLeft width={16} height={16} /> Back to Dashboard
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Post a New Job Opening</h1>
            <p className="text-sm text-zinc-400 mt-1">
              Fill out the details below to publish your opening to the job board.
            </p>
          </div>

          <div className="bg-[#1e1e20] border border-zinc-800 p-3 rounded-lg text-right text-xs">
            <div className="text-zinc-400 font-medium">
              Company: <span className="text-zinc-200 font-semibold">{company.name}</span>
            </div>
            <div className="mt-1">
              Job Status: <span className="font-bold text-yellow-400">{company.status}</span> 
            </div>
          </div>
        </div>

        {/* Global Notifications */}
        {!canPostJob && (
          <Alert color="danger" className="mb-6 bg-red-950/40 text-red-200 border border-red-900">
            Posting restricted. Your organization has utilized all available job slots for the {companyContext.plan} subscription layer. Upgrade your tier to publish more roles.
          </Alert>
        )}

        {successMessage && (
          <Alert color="success" className="mb-6 bg-emerald-950/40 text-emerald-200 border border-emerald-900">
            {successMessage}
          </Alert>
        )}

        {formErrors.global && (
          <Alert color="danger" className="mb-6 bg-red-950/40 text-red-200 border border-red-900">
            {formErrors.global}
          </Alert>
        )}
        {company.status !=='Approved' && <div> Please wait to get approval </div>}
        {/* Core Form Component */}
       {company.status === 'Approved' && <Form onSubmit={handleSubmit} validationBehavior="native" className="space-y-8">
          
          {/* SECTION 1: JOB INFO */}
          <fieldset className="border border-zinc-800 rounded-xl p-6 bg-[#1a1a1c]/50 space-y-6 w-full">
            <legend className="text-sm font-semibold tracking-wide uppercase text-zinc-400 px-2 flex items-center gap-2">
              <Briefcase width={16} height={16} /> Job Basics
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job Title Input */}
              <div className="flex flex-col gap-1 w-full">
                <Label id="job-title-lbl" className="text-zinc-400 text-xs font-medium mb-1">
                  Job Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="jobTitle"
                  placeholder="e.g. Senior Frontend Engineer"
                  required={canPostJob}
                  disabled={!canPostJob}
                  aria-labelledby="job-title-lbl"
                  className="w-full bg-[#222224] text-zinc-200 border border-zinc-800 rounded-xl h-10 px-3 hover:border-zinc-700 focus-within:!border-zinc-500"
                />
              </div>

              {/* Job Category Dropdown */}
              <div className="flex flex-col gap-1 w-full">
                <Label id="job-category-lbl" className="text-zinc-400 text-xs font-medium mb-1">
                  Job Category <span className="text-red-500">*</span>
                </Label>
                <Select 
                  name="category" 
                  className="w-full" 
                  placeholder="Select an industry vertical" 
                  disabled={!canPostJob}
                  required={canPostJob}
                  aria-labelledby="job-category-lbl"
                >
                  <Select.Trigger className="bg-[#222224] text-zinc-200 border border-zinc-800 rounded-xl h-10 px-3 flex items-center justify-between hover:border-zinc-700 disabled:opacity-50">
                    <Select.Value />
                  </Select.Trigger>
                  <Select.Popover className="bg-[#1e1e20] border border-zinc-800 rounded-xl shadow-xl text-zinc-200">
                    <ListBox>
                      <ListBox.Item id="technology" textValue="Technology & Software" className="hover:bg-zinc-800 p-2 rounded-lg cursor-pointer">Technology & Software</ListBox.Item>
                      <ListBox.Item id="design" textValue="Design & Creative" className="hover:bg-zinc-800 p-2 rounded-lg cursor-pointer">Design & Creative</ListBox.Item>
                      <ListBox.Item id="marketing" textValue="Marketing & Sales" className="hover:bg-zinc-800 p-2 rounded-lg cursor-pointer">Marketing & Sales</ListBox.Item>
                      <ListBox.Item id="product" textValue="Product Management" className="hover:bg-zinc-800 p-2 rounded-lg cursor-pointer">Product Management</ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job Type Dropdown */}
              <div className="flex flex-col gap-1 w-full">
                <Label id="job-type-lbl" className="text-zinc-400 text-xs font-medium mb-1">
                  Job Type <span className="text-red-500">*</span>
                </Label>
                <Select 
                  name="jobType" 
                  className="w-full" 
                  placeholder="Select commitment setup" 
                  disabled={!canPostJob}
                  required={canPostJob}
                  aria-labelledby="job-type-lbl"
                >
                  <Select.Trigger className="bg-[#222224] text-zinc-200 border border-zinc-800 rounded-xl h-10 px-3 flex items-center justify-between hover:border-zinc-700 disabled:opacity-50">
                    <Select.Value />
                  </Select.Trigger>
                  <Select.Popover className="bg-[#1e1e20] border border-zinc-800 rounded-xl shadow-xl text-zinc-200">
                    <ListBox>
                      <ListBox.Item id="full-time" textValue="Full-time" className="hover:bg-zinc-800 p-2 rounded-lg cursor-pointer">Full-time</ListBox.Item>
                      <ListBox.Item id="part-time" textValue="Part-time" className="hover:bg-zinc-800 p-2 rounded-lg cursor-pointer">Part-time</ListBox.Item>
                      <ListBox.Item id="contract" textValue="Contract" className="hover:bg-zinc-800 p-2 rounded-lg cursor-pointer">Contract</ListBox.Item>
                      <ListBox.Item id="internship" textValue="Internship" className="hover:bg-zinc-800 p-2 rounded-lg cursor-pointer">Internship</ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              {/* Application Deadline */}
              <div className="flex flex-col gap-1 w-full">
                <Label id="job-deadline-lbl" className="text-zinc-400 text-xs font-medium mb-1">
                  Application Deadline <span className="text-red-500">*</span>
                </Label>
                <div className="relative w-full">
                  <Input
                    name="deadline"
                    type="date"
                    required={canPostJob}
                    disabled={!canPostJob}
                    aria-labelledby="job-deadline-lbl"
                    className="w-full bg-[#222224] text-zinc-300 border border-zinc-800 rounded-xl h-10 px-3 hover:border-zinc-700 focus-within:!border-zinc-500 pr-10"
                  />
                  <div className="absolute right-3 top-[12px] pointer-events-none text-zinc-500">
                    <Calendar />
                  </div>
                </div>
              </div>
            </div>

            {/* Compensation Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-zinc-800/60 pt-4">
              {/* Min Salary */}
              <div className="flex flex-col gap-1 w-full">
                <Label id="job-minsalary-lbl" className="text-zinc-400 text-xs font-medium mb-1">Min Salary</Label>
                <div className="relative w-full">
                  <Input
                    name="minSalary"
                    placeholder="0"
                    type="number"
                    disabled={!canPostJob}
                    aria-labelledby="job-minsalary-lbl"
                    className="w-full bg-[#222224] text-zinc-200 border border-zinc-800 rounded-xl h-10 pl-8 pr-3 hover:border-zinc-700 focus-within:!border-zinc-500"
                  />
                  <div className="absolute left-3 top-[12px] pointer-events-none text-zinc-500">
                    <CircleDollar width={14} height={14} />
                  </div>
                </div>
              </div>

              {/* Max Salary */}
              <div className="flex flex-col gap-1 w-full">
                <Label id="job-maxsalary-lbl" className="text-zinc-400 text-xs font-medium mb-1">Max Salary</Label>
                <div className="relative w-full">
                  <Input
                    name="maxSalary"
                    placeholder="0"
                    type="number"
                    disabled={!canPostJob}
                    aria-labelledby="job-maxsalary-lbl"
                    className="w-full bg-[#222224] text-zinc-200 border border-zinc-800 rounded-xl h-10 pl-8 pr-3 hover:border-zinc-700 focus-within:!border-zinc-500"
                  />
                  <div className="absolute left-3 top-[12px] pointer-events-none text-zinc-500">
                    <CircleDollar width={14} height={14} />
                  </div>
                </div>
              </div>

              {/* Currency Dropdown */}
              <div className="flex flex-col gap-1 w-full">
                <Label id="job-currency-lbl" className="text-zinc-400 text-xs font-medium mb-1">Currency</Label>
                <Select 
                  name="currency" 
                  className="w-full" 
                  placeholder="Select currency" 
                  disabled={!canPostJob}
                  aria-labelledby="job-currency-lbl"
                >
                  <Select.Trigger className="bg-[#222224] text-zinc-200 border border-zinc-800 rounded-xl h-10 px-3 flex items-center justify-between hover:border-zinc-700 disabled:opacity-50">
                    <Select.Value />
                  </Select.Trigger>
                  <Select.Popover className="bg-[#1e1e20] border border-zinc-800 rounded-xl shadow-xl text-zinc-200">
                    <ListBox>
                      <ListBox.Item id="USD" textValue="USD ($)" className="hover:bg-zinc-800 p-2 rounded-lg cursor-pointer">USD ($)</ListBox.Item>
                      <ListBox.Item id="EUR" textValue="EUR (€)" className="hover:bg-zinc-800 p-2 rounded-lg cursor-pointer">EUR (€)</ListBox.Item>
                      <ListBox.Item id="GBP" textValue="GBP (£)" className="hover:bg-zinc-800 p-2 rounded-lg cursor-pointer">GBP (£)</ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
            </div>

            {/* Location Block */}
            <div className="border-t border-zinc-800/60 pt-4 flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* Location Input */}
              <div className="flex-1 flex flex-col gap-1">
                <Label id="job-location-lbl" className="text-zinc-400 text-xs font-medium mb-1">
                  Location {!isRemote && <span className="text-red-500">*</span>}
                </Label>
                <Input
                  name="location"
                  placeholder={isRemote ? "Remote / International" : "e.g. San Francisco, CA"}
                  disabled={isRemote || !canPostJob}
                  required={!isRemote && canPostJob}
                  aria-labelledby="job-location-lbl"
                  className="w-full bg-[#222224] text-zinc-200 border border-zinc-800 rounded-xl h-10 px-3 hover:border-zinc-700 focus-within:!border-zinc-500"
                />
              </div>

              {/* Updated v3 Compliant Remote Toggle Layout */}
              <div className="flex items-center bg-[#222224] p-3 rounded-xl border border-zinc-800 min-w-[200px] justify-between self-end h-10">
                <Switch
                  isSelected={isRemote}
                  onChange={setIsRemote}
                  disabled={!canPostJob}
                  size="sm"
                  aria-label="Toggle Remote Position"
                  className="w-full justify-between flex-row-reverse gap-3"
                >
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                  <Switch.Content className="flex items-center gap-2">
                    <Label className="text-xs font-semibold text-zinc-200 flex items-center gap-1 cursor-pointer">
                      <Globe width={14} height={14} /> Remote
                    </Label>
                  </Switch.Content>
                </Switch>
              </div>
            </div>
          </fieldset>

          {/* SECTION 2: JOB DESCRIPTION */}
          <fieldset className="border border-zinc-800 rounded-xl p-6 bg-[#1a1a1c]/50 space-y-6 w-full">
            <legend className="text-sm font-semibold tracking-wide uppercase text-zinc-400 px-2">
              Detailed Breakdown
            </legend>

            {/* Responsibilities TextArea */}
            <div className="flex flex-col gap-1 w-full">
              <Label id="job-responsibilities-lbl" className="text-zinc-400 text-xs font-medium mb-1">
                Responsibilities <span className="text-red-500">*</span>
              </Label>
              <TextArea
                name="responsibilities"
                placeholder="Detail the daily functions, core objectives, and team operations details..."
                rows={4}
                required={canPostJob}
                disabled={!canPostJob}
                aria-labelledby="job-responsibilities-lbl"
                className="w-full bg-[#222224] text-zinc-200 border border-zinc-800 rounded-xl p-3 hover:border-zinc-700 focus-within:!border-zinc-500"
              />
            </div>

            {/* Requirements TextArea */}
            <div className="flex flex-col gap-1 w-full">
              <Label id="job-requirements-lbl" className="text-zinc-400 text-xs font-medium mb-1">
                Requirements <span className="text-red-500">*</span>
              </Label>
              <TextArea
                name="requirements"
                placeholder="List crucial technical profiles, required software engineering proficiencies, or cultural milestones..."
                rows={4}
                required={canPostJob}
                disabled={!canPostJob}
                aria-labelledby="job-requirements-lbl"
                className="w-full bg-[#222224] text-zinc-200 border border-zinc-800 rounded-xl p-3 hover:border-zinc-700 focus-within:!border-zinc-500"
              />
            </div>

            {/* Benefits TextArea */}
            <div className="flex flex-col gap-1 w-full">
              <Label id="job-benefits-lbl" className="text-zinc-400 text-xs font-medium mb-1">Benefits (Optional)</Label>
              <TextArea
                name="benefits"
                placeholder="Medical, healthcare allocations, equity packages, training stipends, flexible work schedules..."
                rows={3}
                disabled={!canPostJob}
                aria-labelledby="job-benefits-lbl"
                className="w-full bg-[#222224] text-zinc-200 border border-zinc-800 rounded-xl p-3 hover:border-zinc-700 focus-within:!border-zinc-500"
              />
            </div>
          </fieldset>

          {/* Form Actions Footer */}
          <div className="flex items-center justify-end gap-4 border-t border-zinc-800 pt-6 w-full">
            <Button
              type="button"
              variant="light"
              className="text-zinc-400 hover:text-white font-medium px-6 border border-transparent hover:border-zinc-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="white"
              isLoading={isLoading}
              disabled={!canPostJob}
              className="bg-white text-black font-semibold px-8 border border-white hover:bg-zinc-200 transition-colors"
            >
              Publish Listing
            </Button>
          </div>

        </Form>}
      </div>
    </div>
  );
}