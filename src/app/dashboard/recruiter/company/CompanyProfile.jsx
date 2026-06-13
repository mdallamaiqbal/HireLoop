"use client";

import React, { useState, useEffect } from "react";
import { 
  Form, 
  Input, 
  TextArea, 
  Select, 
  ListBox, 
  Label, 
  Button, 
  Alert,
  toast
} from "@heroui/react";

// Gravity UI Icons matching your setup
import { Xmark, ChevronDown, ArrowUpFromLine, MapPin } from "@gravity-ui/icons";
import { createCompany } from "@/app/lib/actions/companies";

export default function CompanyProfile({ recruiter, recruiterCompany }) {
  const [mounted, setMounted] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // ডাটাবেজ থেকে যদি খালি অবজেক্ট ({}) আসে, সেটাকে null করে দেওয়া হচ্ছে যাতে ফর্ম আগে ওপেন হয়
  const [registeredCompany, setRegisteredCompany] = useState(
    recruiterCompany && (recruiterCompany._id || recruiterCompany.id) ? recruiterCompany : null
  );

  const [formDataValues, setFormDataValues] = useState({
    companyName: "",
    category: "",
    websiteUrl: "",
    location: "",
    employeeRange: "1-10",
    description: ""
  });

  useEffect(() => {
    setMounted(true);
    if (recruiterCompany && (recruiterCompany._id || recruiterCompany.id)) {
      setRegisteredCompany({...recruiterCompany,
        status: recruiterCompany.status || "Pending"
      });
    } else {
      setRegisteredCompany(null);
    }
  }, [recruiterCompany]);

  // Handle Logo Upload Preview
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds 5MB limit.");
        return;
      }
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDataValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    setSuccessMessage("");
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (!data.companyName || !data.category || !data.location) {
      setFormErrors({ global: "Please fill out all required fields." });
      setIsLoading(false);
      return;
    }

    try {
      let logoUrl = logoPreview.startsWith("http") ? logoPreview : "";

      if (logoFile && !logoPreview.startsWith("http")) {
        const imgbbFormData = new FormData();
        imgbbFormData.append("image", logoFile);

        const imgbbApiKey = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API; 
        
        const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
          method: "POST",
          body: imgbbFormData,
        });

        const imgbbResult = await imgbbResponse.json();

        if (imgbbResult.success) {
          logoUrl = imgbbResult.data.url; 
        } else {
          throw new Error("ImgBB image upload failed.");
        }
      }
      const currentStatus = registeredCompany?.status || recruiterCompany?.status || 'Pending';

      const newCompanyData = { 
        name: data.companyName, 
        websiteUrl: data.websiteUrl || "", 
        industry: data.category, 
        location: data.location, 
        employeeCount: data.employeeRange || "1-10", 
        description: data.description || "", 
        logo: logoUrl || (recruiterCompany ? recruiterCompany.logo : ' '), 
        status: currentStatus,
        recruiterId: recruiter.id
      };

      const payload = await createCompany(newCompanyData);

      if (payload?.insertedId || payload?._id || payload) {
        toast.success("Company profile saved successfully");
        setSuccessMessage("Your company has been registered successfully!");
        
       
        setRegisteredCompany({
          ...newCompanyData,
          status: currentStatus,
          _id: payload.insertedId || payload._id || "preview-id",
          id: payload.insertedId || payload._id || "preview-id"
        });
        
      } else {
        throw new Error("Failed to insert company profile into database.");
      }
      
    } catch (err) {
      setFormErrors({ global: err.message || "Something went wrong saving the company profile." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setFormDataValues({
      companyName: registeredCompany.name,
      category: registeredCompany.industry,
      websiteUrl: registeredCompany.websiteUrl,
      location: registeredCompany.location,
      employeeRange: registeredCompany.employeeCount,
      description: registeredCompany.description
    });
    setRegisteredCompany(null); 
    setSuccessMessage("");
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0d0d0e] flex justify-center items-center">
        <span className="text-zinc-400 text-sm">Loading Form...</span>
      </div>
    );
  }


  const hasCompany = registeredCompany && (registeredCompany._id || registeredCompany.id);

  return (
    <div className="min-h-screen bg-[#0d0d0e] text-zinc-100 p-4 md:p-12 flex flex-col justify-center items-center gap-8">
      
  
      {!hasCompany && (
        <div className="w-full max-w-2xl bg-[#161618] border border-zinc-800 rounded-xl shadow-2xl overflow-hidden">
          
          {/* Header bar */}
          <div className="flex justify-between items-start p-6 pb-4">
            <div>
              <h1 className="text-xl font-semibold text-white tracking-tight">Register New Company</h1>
              <p className="text-xs text-zinc-400 mt-1">
                Enter your business details to start hiring on HireLoop.
              </p>
            </div>
            <button 
              type="button" 
              className="text-zinc-400 hover:text-white p-1 rounded-lg transition-colors"
              onClick={() => console.log("Close")}
              aria-label="Close form"
            >
              <Xmark width={18} height={18} />
            </button>
          </div>

          <hr className="border-zinc-800" />

          {/* Notifications */}
          <div className="px-6 pt-4">
            {formErrors.global && (
              <Alert color="danger" className="bg-red-950/40 text-red-200 border border-red-900 text-xs">
                {formErrors.global}
              </Alert>
            )}
          </div>

          {/* Content Form Body */}
          <Form onSubmit={handleSubmit} validationBehavior="native" className="p-6 space-y-5">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Company Name */}
              <div className="flex flex-col gap-1 w-full">
                <Label id="company-name-lbl" className="text-zinc-200 text-xs font-medium mb-1">
                  Company Name
                </Label>
                <Input
                  name="companyName"
                  value={formDataValues.companyName}
                  onChange={handleInputChange}
                  placeholder="e.g. Acme Corp"
                  required
                  aria-labelledby="company-name-lbl"
                  className="w-full bg-[#222224] text-zinc-200 border border-zinc-800 rounded-lg h-10 px-3 hover:border-zinc-700 focus-within:!border-zinc-500 transition-colors"
                />
              </div>

              {/* Industry / Category Dropdown */}
              <div className="flex flex-col gap-1 w-full">
                <Label id="company-category-lbl" className="text-zinc-200 text-xs font-medium mb-1">
                  Industry / Category
                </Label>
                <Select 
                  id="company-industry-dropdown"
                  name="category" 
                  defaultSelectedKeys={formDataValues.category ? [formDataValues.category] : undefined}
                  className="w-full" 
                  placeholder="Select Industry" 
                  required
                  aria-labelledby="company-category-lbl"
                >
                  <Select.Trigger className="bg-[#222224] text-zinc-200 border border-zinc-800 rounded-lg h-10 px-3 flex items-center justify-between hover:border-zinc-700">
                    <Select.Value />
                    <ChevronDown width={16} height={16} className="text-zinc-400" />
                  </Select.Trigger>
                  <Select.Popover className="bg-[#1e1e20] border border-zinc-800 rounded-lg shadow-xl text-zinc-200">
                    <ListBox>
                      <ListBox.Item id="technology" textValue="Technology" className="hover:bg-zinc-800 p-2 rounded-md cursor-pointer text-sm">Technology</ListBox.Item>
                      <ListBox.Item id="design" textValue="Design & Creative" className="hover:bg-zinc-800 p-2 rounded-md cursor-pointer text-sm">Design & Creative</ListBox.Item>
                      <ListBox.Item id="finance" textValue="Finance & Banking" className="hover:bg-zinc-800 p-2 rounded-md cursor-pointer text-sm">Finance & Banking</ListBox.Item>
                      <ListBox.Item id="healthcare" textValue="Healthcare" className="hover:bg-zinc-800 p-2 rounded-md cursor-pointer text-sm">Healthcare</ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Website URL */}
              <div className="flex flex-col gap-1 w-full">
                <Label id="company-url-lbl" className="text-zinc-200 text-xs font-medium mb-1">
                  Website URL
                </Label>
                <div className="flex rounded-lg overflow-hidden border border-zinc-800 focus-within:border-zinc-500 h-10 bg-[#222224]">
                  <div className="bg-[#1e1e20] text-zinc-400 text-xs px-3 border-r border-zinc-800 flex items-center select-none font-medium">
                    https://
                  </div>
                  <Input
                    name="websiteUrl"
                    value={formDataValues.websiteUrl}
                    onChange={handleInputChange}
                    placeholder="www.company.com"
                    aria-labelledby="company-url-lbl"
                    className="w-full bg-transparent text-zinc-200 h-full px-3 outline-none"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="flex flex-col gap-1 w-full">
                <Label id="company-location-lbl" className="text-zinc-200 text-xs font-medium mb-1">
                  Location
                </Label>
                <div className="relative w-full">
                  <Input
                    name="location"
                    value={formDataValues.location}
                    onChange={handleInputChange}
                    placeholder="City, Country"
                    required
                    aria-labelledby="company-location-lbl"
                    className="w-full bg-[#222224] text-zinc-200 border border-zinc-800 rounded-lg h-10 pl-9 pr-3 hover:border-zinc-700 focus-within:!border-zinc-500 transition-colors"
                />
                  <div className="absolute left-3 top-[12px] pointer-events-none text-zinc-400">
                    <MapPin width={14} height={14} />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Employee Count Range Dropdown */}
              <div className="flex flex-col gap-1 w-full">
                <Label id="company-employees-lbl" className="text-zinc-200 text-xs font-medium mb-1">
                  Employee Count Range
                </Label>
                <Select 
                  id="company-employee-range-dropdown"
                  name="employeeRange" 
                  defaultSelectedKeys={[formDataValues.employeeRange]}
                  className="w-full" 
                  placeholder="1-10 employees"
                  aria-labelledby="company-employees-lbl"
                >
                  <Select.Trigger className="bg-[#222224] text-zinc-200 border border-zinc-800 rounded-lg h-10 px-3 flex items-center justify-between hover:border-zinc-700">
                    <Select.Value />
                    <ChevronDown width={16} height={16} className="text-zinc-400" />
                  </Select.Trigger>
                  <Select.Popover className="bg-[#1e1e20] border border-zinc-800 rounded-lg shadow-xl text-zinc-200">
                    <ListBox>
                      <ListBox.Item id="1-10" textValue="1-10 employees" className="hover:bg-zinc-800 p-2 rounded-md cursor-pointer text-sm">1-10 employees</ListBox.Item>
                      <ListBox.Item id="11-50" textValue="11-50 employees" className="hover:bg-zinc-800 p-2 rounded-md cursor-pointer text-sm">11-50 employees</ListBox.Item>
                      <ListBox.Item id="51-200" textValue="51-200 employees" className="hover:bg-zinc-800 p-2 rounded-md cursor-pointer text-sm">51-200 employees</ListBox.Item>
                      <ListBox.Item id="201+" textValue="201+ employees" className="hover:bg-zinc-800 p-2 rounded-md cursor-pointer text-sm">201+ employees</ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              {/* Custom Company Logo Upload */}
              <div className="flex flex-col gap-1 w-full">
                <Label className="text-zinc-200 text-xs font-medium mb-1">
                  Company Logo
                </Label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-11 h-11 bg-[#222224] border border-dashed border-zinc-700 group-hover:border-zinc-500 rounded-lg flex items-center justify-center text-zinc-400 transition-colors overflow-hidden">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
                    ) : (
                      <ArrowUpFromLine width={16} height={16} />
                    )}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-medium text-zinc-200 group-hover:text-white transition-colors">
                      {logoFile ? logoFile.name : "Upload image"}
                    </span>
                    <span className="text-[10px] text-zinc-500">PNG, JPG up to 5MB</span>
                  </div>
                  <input 
                    type="file" 
                    accept="image/png, image/jpeg" 
                    className="hidden" 
                    onChange={handleLogoChange} 
                  />
                </label>
              </div>
            </div>

            {/* Brief Description */}
            <div className="flex flex-col gap-1 w-full">
              <Label id="company-desc-lbl" className="text-zinc-200 text-xs font-medium mb-1">
                Brief Description
              </Label>
              <TextArea
                name="description"
                value={formDataValues.description}
                onChange={handleInputChange}
                placeholder="Tell us about your company's mission and culture..."
                rows={4}
                aria-labelledby="company-desc-lbl"
                className="w-full bg-[#222224] text-zinc-200 border border-zinc-800 rounded-lg p-3 hover:border-zinc-700 focus-within:!border-zinc-500 text-sm outline-none transition-colors"
              />
            </div>

            <hr className="border-zinc-800 my-2" />

            {/* Bottom Action Section Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2 w-full">
              <Button
                type="button"
                variant="light"
                className="text-zinc-200 hover:bg-zinc-800 font-medium px-4 h-9 text-xs rounded-lg border border-zinc-800 transition-colors"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={isLoading}
                className="bg-white text-black font-semibold px-4 h-9 text-xs rounded-lg hover:bg-zinc-200 transition-colors"
              >
                Register Company
              </Button>
            </div>
          </Form>
        </div>
      )}
      
      {/* ২. ফর্ম ফিলআপ সফল হওয়ার পর অথবা ডাটাবেজে আগে থেকে কোম্পানি থাকলে আউটপুট ডিজাইন দেখাবে */}
      {hasCompany && (
        <div className="w-full max-w-2xl bg-[#161618] border border-zinc-800 rounded-xl p-6 shadow-xl space-y-6">
          
          {successMessage && (
            <Alert color="success" className="bg-emerald-950/40 text-emerald-200 border border-emerald-900 text-xs">
              {successMessage}
            </Alert>
          )}

          {/* Top Row: Logo, Name, Website */}
          <div className="flex justify-between items-start w-full">
            <div className="flex items-center gap-4">
              {registeredCompany.logo && registeredCompany.logo.trim() !== "" ? (
                <img
                  src={registeredCompany.logo} 
                  alt="Registered Logo" 
                  className="w-16 h-16 bg-[#222224] rounded-lg object-cover border border-zinc-700"
                />
              ) : (
                <div className="w-16 h-16 bg-[#222224] rounded-lg border border-zinc-700 flex items-center justify-center text-zinc-500 text-xs">
                  No Logo
                </div>
              )}
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">{registeredCompany.name}</h2>
                {registeredCompany.websiteUrl ? (
                  <a 
                    href={`https://${registeredCompany.websiteUrl}`} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-xs text-blue-400 hover:underline mt-1 block"
                  >
                    https://{registeredCompany.websiteUrl}
                  </a>
                ) : (
                  <span className="text-xs text-zinc-500 block mt-1">No website provided</span>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col items-end gap-3">
              <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider">
                {registeredCompany.status}
              </span>
              <button
                type="button"
                onClick={handleEdit}
                className="text-xs text-zinc-400 hover:text-white bg-[#222224] border border-zinc-800 hover:border-zinc-700 px-3 py-1.5 rounded-md transition-colors"
              >
                Edit Profile
              </button>
            </div>
          </div>

          <hr className="border-zinc-800" />

          {/* Details Boxes */}
          <div className="space-y-4">
            {/* Industry / Category Box */}
            <div className="text-xs">
              <span className="text-zinc-500 block mb-1.5 font-medium">Industry / Category</span>
              <div className="text-zinc-300 bg-[#222224] p-3 rounded-lg border border-zinc-800 capitalize">
                {registeredCompany.industry}
              </div>
            </div>

            {/* Location Box */}
            <div className="text-xs">
              <span className="text-zinc-500 block mb-1.5 font-medium">Location</span>
              <div className="text-zinc-300 bg-[#222224] p-3 rounded-lg border border-zinc-800 flex items-center gap-2">
                <MapPin width={14} height={14} className="text-zinc-500" />
                {registeredCompany.location}
              </div>
            </div>

            {/* Employees Box */}
            <div className="text-xs">
              <span className="text-zinc-500 block mb-1.5 font-medium">Employees Range</span>
              <div className="text-zinc-300 bg-[#222224] p-3 rounded-lg border border-zinc-800">
                {registeredCompany.employeeCount} employees
              </div>
            </div>

            {/* Description Box */}
            {registeredCompany.description && (
              <div className="text-xs">
                <span className="text-zinc-500 block mb-1.5 font-medium">Brief Description</span>
                <p className="text-zinc-300 leading-relaxed bg-[#222224] p-3 rounded-lg border border-zinc-800">
                  {registeredCompany.description}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}