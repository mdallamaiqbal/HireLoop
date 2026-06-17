"use client"
import React, { useState } from 'react';
import { 
  Form, 
  Button, 
  TextField, 
  Label, 
  Input, 
  Description, 
  FieldError, 
  TextArea,
  toast, 
 } from '@heroui/react';
import { submitApplication } from '@/app/lib/actions/application';

const JobApply = ({ job, applicant }) => {
  const [formData, setFormData] = useState({
    resumeLink: '',
    portfolioLink: '',
    additionalNotes: ''
  });

  // Track whether a field has been interacted with / touched
  const [touched, setTouched] = useState({
    resumeLink: false,
    portfolioLink: false,
    additionalNotes: false
  });

  // Helper to validate URLs
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Determine errors dynamically based on values and interaction status
  const errors = {
    resumeLink: touched.resumeLink && (!formData.resumeLink || !isValidUrl(formData.resumeLink)),
    portfolioLink: touched.portfolioLink && (!formData.portfolioLink || !isValidUrl(formData.portfolioLink)),
    additionalNotes: touched.additionalNotes && formData.additionalNotes.trim().length < 5
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit =async (e) => {
    e.preventDefault();

    // Force touch all fields on submit attempt to trigger borders if empty
    setTouched({ resumeLink: true, portfolioLink: true, additionalNotes: true });

    // Final check before sending data
    if (!isValidUrl(formData.resumeLink) || !isValidUrl(formData.portfolioLink) || formData.additionalNotes.trim().length < 5) {
      return; // Stop submission if validation fails
    }
    
    // Exactly matching your backend schema properties
    const submissionData = {
      jobId: job?._id,
      jobTitle: job?.jobTitle,
      companyName: job?.companyName,
      applicantId : applicant?.id,
      applicantName: applicant?.name,
      applicantEmail: applicant?.email,
      status: 'applied',
      ...formData
    };

    console.log("Submitting Application:", submissionData);
    // Add your API integration route here
    const res = await submitApplication(submissionData);
    if(res.insertedId){
      toast.success('Application Submitted successfully');
      setFormData({ resumeLink: '',portfolioLink: '',additionalNotes: ''})
      setTouched({ resumeLink: false, portfolioLink: false, additionalNotes: false });
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-800">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
          Apply for {job?.jobTitle || 'this position'}
        </h3>
        {applicant && (
          <p className="text-sm text-zinc-500 mt-1">
            Applying as: <span className="font-semibold">{applicant.name}</span> ({applicant.email})
          </p>
        )}
      </div>

      <hr className="border-zinc-200 dark:border-zinc-800 mb-6" />

      <Form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
        
        {/* 1. Resume Link Field */}
        <TextField isRequired type="url" name="resumeLink" className="w-full">
          <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1 block">
            Resume Link
          </Label>
          <div className={`border rounded-lg p-1 transition-colors ${
            errors.resumeLink 
              ? 'border-danger-500 focus-within:border-danger-500 bg-danger-50 dark:bg-danger-950/20' 
              : 'border-zinc-300 dark:border-zinc-700 focus-within:border-blue-500'
          }`}>
            <Input 
              placeholder="https://example.com/my-resume.pdf"
              value={formData.resumeLink}
              onChange={(e) => handleChange('resumeLink', e.target.value)}
              onBlur={() => handleBlur('resumeLink')}
              className="w-full bg-transparent border-0 focus:ring-0"
            />
          </div>
          <Description className="text-xs text-zinc-400 mt-1">
            Provide a valid URL link to your resume document.
          </Description>
          {errors.resumeLink && (
            <p className="text-xs text-danger font-medium mt-1">Please enter a valid resume URL link.</p>
          )}
        </TextField>

        {/* 2. Portfolio / Website Field */}
        <TextField isRequired type="url" name="portfolioLink" className="w-full">
          <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1 block">
            Portfolio or Website
          </Label>
          <div className={`border rounded-lg p-1 transition-colors ${
            errors.portfolioLink 
              ? 'border-danger-500 focus-within:border-danger-500 bg-danger-50 dark:bg-danger-950/20' 
              : 'border-zinc-300 dark:border-zinc-700 focus-within:border-blue-500'
          }`}>
            <Input 
              placeholder="https://myportfolio.com"
              value={formData.portfolioLink}
              onChange={(e) => handleChange('portfolioLink', e.target.value)}
              onBlur={() => handleBlur('portfolioLink')}
              className="w-full bg-transparent border-0 focus:ring-0"
            />
          </div>
          <Description className="text-xs text-zinc-400 mt-1">
            Provide a link to your website, GitHub, or professional profile.
          </Description>
          {errors.portfolioLink && (
            <p className="text-xs text-danger font-medium mt-1">Please enter a valid portfolio URL link.</p>
          )}
        </TextField>

        {/* 3. Notes Field */}
        <div className="flex flex-col gap-1 w-full">
          <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Additional Notes
          </Label>
          <div className={`border rounded-lg p-2 transition-colors ${
            errors.additionalNotes 
              ? 'border-danger-500 focus-within:border-danger-500 bg-danger-50 dark:bg-danger-950/20' 
              : 'border-zinc-300 dark:border-zinc-700 focus-within:border-blue-500'
          }`}>
            <TextArea
              aria-label="Additional application notes"
              placeholder="Tell us a little bit about yourself (Minimum 5 characters)..."
              value={formData.additionalNotes}
              onChange={(e) => handleChange('additionalNotes', e.target.value)}
              onBlur={() => handleBlur('additionalNotes')}
              className="w-full min-h-[100px] bg-transparent border-0 focus:ring-0 outline-none"
            />
          </div>
          {errors.additionalNotes && (
            <p className="text-xs text-danger font-medium mt-1">Please add a note for the recruiter.</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 justify-end mt-4">
          <Button 
            type="reset" 
            variant="flat" 
            onClick={() => {
              setFormData({ resumeLink: '', portfolioLink: '', additionalNotes: '' });
              setTouched({ resumeLink: false, portfolioLink: false, additionalNotes: false });
            }}
          >
            Clear
          </Button>
          <Button 
            type="submit" 
             
            className="font-semibold bg-purple-700 rounded-lg"
          >
            Submit Application
          </Button>
        </div>

      </Form>
    </div>
  );
};

export default JobApply;