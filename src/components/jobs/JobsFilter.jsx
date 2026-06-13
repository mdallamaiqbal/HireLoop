"use client"
import React from "react";
// আপনার দেওয়া HeroUI-এর সঠিক স্ট্রাকচার অনুযায়ী ইম্পোর্ট
import { Select, Label, ListBox, InputGroup, TextField } from "@heroui/react";
// আইকন ইম্পোর্ট (Gravity UI)
import { Magnifier , ChevronDown } from "@gravity-ui/icons";

export default function JobsFilter({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory, 
  selectedJobType, 
  setSelectedJobType,
  categories = [],
  jobTypes = ["full-time", "part-time", "internship"]
}) {
  return (
    <div className="w-full max-w-7xl bg-[#121212] border border-neutral-800 p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-end mb-8 shadow-lg">
      
      {/* ১. সার্চ ইনপুট (TextField & InputGroup) */}
      <div className="w-full md:flex-1">
        <TextField value={searchQuery} onChange={(value) => setSearchQuery(value)}>
  <Label className="text-xs font-semibold text-neutral-400 mb-1.5 block uppercase tracking-wider">
    Search Jobs
  </Label>
  <InputGroup className="bg-[#1a1a1a] border border-neutral-800 rounded-xl focus-within:border-purple-500 transition-colors h-11 flex items-center px-3">
    <InputGroup.Prefix className="flex items-center justify-center mr-2 text-neutral-500">
      <Magnifier className="w-4 h-4" />
    </InputGroup.Prefix>
    <InputGroup.Input 
      placeholder="Search by title or company..." 
      className="bg-transparent text-white w-full outline-none placeholder:text-neutral-600 text-sm h-full"
    />
  </InputGroup>
</TextField>
      </div>

      {/* ২. ক্যাটাগরি ফিল্টার (Select) */}
      <div className="w-full md:w-56">
        <Select selectedKey={selectedCategory} onSelectionChange={setSelectedCategory}>
          <Label className="text-xs font-semibold text-neutral-400 mb-1.5 block uppercase tracking-wider">
            Category
          </Label>
          <Select.Trigger className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-xl px-3 h-11 flex items-center justify-between text-sm text-white focus:border-purple-500 transition-colors outline-none cursor-pointer">
            <Select.Value placeholder="All Categories" className="text-neutral-400" />
            <Select.Indicator>
              <ChevronDown className="w-4 h-4 text-neutral-500" />
            </Select.Indicator>
          </Select.Trigger>
          <Select.Popover className="bg-[#1a1a1a] border border-neutral-800 rounded-xl mt-1 overflow-hidden shadow-2xl z-50">
            <ListBox className="p-1">
              <ListBox.Item id="all" className="p-2 text-sm text-neutral-300 hover:bg-neutral-800 rounded-lg cursor-pointer flex flex-col">
                <Label className="cursor-pointer font-medium">All Categories</Label>
              </ListBox.Item>
              {categories.map((cat) => (
                <ListBox.Item key={cat} id={cat} className="p-2 text-sm text-neutral-300 hover:bg-neutral-800 rounded-lg cursor-pointer flex flex-col">
                  <Label className="cursor-pointer font-medium">{cat}</Label>
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      {/* ৩. জব টাইপ ফিল্টার (Select) */}
      <div className="w-full md:w-56">
        <Select selectedKey={selectedJobType} onSelectionChange={setSelectedJobType}>
          <Label className="text-xs font-semibold text-neutral-400 mb-1.5 block uppercase tracking-wider">
            Job Type
          </Label>
          <Select.Trigger className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-xl px-3 h-11 flex items-center justify-between text-sm text-white focus:border-purple-500 transition-colors outline-none cursor-pointer">
            <Select.Value placeholder="All Job Types" className="text-neutral-400" />
            <Select.Indicator>
              <ChevronDown className="w-4 h-4 text-neutral-500" />
            </Select.Indicator>
          </Select.Trigger>
          <Select.Popover className="bg-[#1a1a1a] border border-neutral-800 rounded-xl mt-1 overflow-hidden shadow-2xl z-50">
            <ListBox className="p-1">
              <ListBox.Item id="all" className="p-2 text-sm text-neutral-300 hover:bg-neutral-800 rounded-lg cursor-pointer flex flex-col">
                <Label className="cursor-pointer font-medium">All Types</Label>
              </ListBox.Item>
              {jobTypes.map((type) => (
                <ListBox.Item key={type} id={type} className="p-2 text-sm text-neutral-300 hover:bg-neutral-800 rounded-lg cursor-pointer flex flex-col">
                  <Label className="cursor-pointer capitalize font-medium">{type}</Label>
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

    </div>
  );
}