"use client";
import React, { useState } from "react";
import {
  Form,
  TextField,
  Label,
  Input,
  Select,
  ListBox,
  TextArea,
  Button,
  Fieldset,
  FieldError,
  toast,
} from "@heroui/react";
// Gravity UI Icons (আপনাদের প্রোজেক্ট অনুযায়ী ইম্পোর্ট নিশ্চিত করুন)
import { Globe, ArrowDownToSquare, Pencil, Plus } from "@gravity-ui/icons";
import { creatNewComapny } from "@/lib/action/companies";

export default function CompanyProfile({recruiter,recruiterCompany}) {
  const textInputClass =
    "bg-zinc-900/50 border border-zinc-800 text-white rounded-lg p-3 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors w-full";
  const textAreaClass =
    "bg-zinc-900/50 border border-zinc-800 text-white rounded-lg p-3 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors w-full resize-none";
  const selectBoxClass = "w-full flex flex-col gap-1";
  const triggerClasses =
    "bg-zinc-900/50 border border-zinc-800 text-white rounded-lg p-3 flex justify-between items-center w-full min-h-[48px]";
  const popoverClasses =
    "bg-zinc-900 border border-zinc-800 rounded-lg p-2 shadow-xl min-w-[200px]";
  const listItemClasses =
    "text-zinc-300 hover:text-white hover:bg-zinc-800 p-2 rounded cursor-pointer transition-colors list-none outline-none";
  const [company, setCompany] = useState(recruiterCompany);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const [logoUrl, setLogoUrl] = useState("");

  // Imgbb Image Upload Handler
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      // IMGBB_API_KEY আপনার .env ফাইলে যুক্ত করুন
      const apiKey =
        process.env.NEXT_PUBLIC_IMAGE_API || "896f38b2ce0b8ffce44397726d3d59c0";
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await response.json();
      if (data.success) {
        setLogoUrl(data.data.url);
      } else {
        alert("Logo upload failed!");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  // Form Submit Handler (Create & Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const companyName = formData.get("companyName");
    const industry = formData.get("industry");
    const websiteUrl = formData.get("websiteUrl");
    const location = formData.get("location");
    const employeeCount = formData.get("employeeCount");
    const description = formData.get("description");

    // Validation
    let validationErrors = {};
    if (!companyName) validationErrors.companyName = "Company name is required";
    if (!employeeCount)
      validationErrors.employeeCount = "Employee count range is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // সেভ করার অবজেক্ট (এখানে Status ডিফল্ট 'Pending' রাখা হয়েছে)
    const updatedCompany = {
      name: companyName,
      industry: industry || "Technology",
      websiteUrl: websiteUrl,
      location: location,
      employeeCount: employeeCount,
      description: description,
      logo: logoUrl || (company ? company.logo : ""),
      status: company ? company.status : "Pending",
      recruiterId:recruiter.id
    };

    setCompany(updatedCompany);
    const polyload = await creatNewComapny(updatedCompany);
    if (polyload.insertedId) {
      toast.success("Company profile created successfuly");
    }
    setIsEditing(false);
    setErrors({});
  };

  // Status Badge Color Helper
  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
      case "Rejected":
        return "bg-rose-500/10 text-rose-400 border border-rose-500/20";
      default:
        return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
    }
  };

  //---------------------------------------------------------
  // CONDITIONAL RENDER 1: No Company & Not Registering/Editing
  //---------------------------------------------------------
  if (!company?._id && !isEditing) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-zinc-950 rounded-xl border border-zinc-900 max-w-2xl mx-auto my-10 text-center space-y-6">
        <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center text-zinc-500 border border-zinc-800">
          <Globe size={28} />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">
            No Company Registered
          </h3>
          <p className="text-sm text-zinc-400 mt-1 max-w-sm">
            To start creating jobs and management, please set up your company
            details first.
          </p>
        </div>
        <Button
          onPress={() => {
            setIsEditing(true);
            setLogoUrl("");
          }}
          className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-6 transition-colors h-11 flex items-center gap-2"
        >
          <Plus size={16} /> Register Company
        </Button>
      </div>
    );
  }

  //---------------------------------------------------------
  // CONDITIONAL RENDER 2: View Details Mode
  //---------------------------------------------------------
  if (company && !isEditing) {
    return (
      <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-8 max-w-3xl mx-auto my-10 space-y-8">
        {/* Header section with Badge and Edit button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-zinc-900">
          <div className="flex items-center gap-4">
            {company.logo ? (
              <img
                src={company.logo}
                alt="Logo"
                className="w-16 h-16 object-contain bg-zinc-900 border border-zinc-800 rounded-lg p-2"
              />
            ) : (
              <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center text-zinc-600 font-bold text-xl">
                {company.name.charAt(0)}
              </div>
            )}
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-white">
                  {company.name}
                </h2>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-medium ${getStatusStyle(company.status)}`}
                >
                  {company.status}
                </span>
              </div>
              <p className="text-sm text-zinc-400 mt-0.5">{company.industry}</p>
            </div>
          </div>

          <Button
            onPress={() => {
              setLogoUrl(company.logo);
              setIsEditing(true);
            }}
            className="border border-zinc-800 text-zinc-300 hover:bg-zinc-900 rounded-lg px-4 font-medium h-10 flex items-center gap-2"
          >
            <Pencil size={14} /> Edit Details
          </Button>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-1">
            <span className="text-zinc-500 font-medium">Website URL</span>
            <a
              href={company.websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="block text-blue-400 hover:underline truncate"
            >
              {company.websiteUrl || "Not Specified"}
            </a>
          </div>
          <div className="space-y-1">
            <span className="text-zinc-500 font-medium">Location</span>
            <p className="text-zinc-200">
              {company.location || "Not Specified"}
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-zinc-500 font-medium">
              Employee Count Range
            </span>
            <p className="text-zinc-200">{company.employeeCount}</p>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2 pt-4 border-t border-zinc-900">
          <span className="text-zinc-500 text-sm font-medium">
            Brief Description
          </span>
          <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line">
            {company.description || "No description provided."}
          </p>
        </div>
      </div> 
    );
  }

  //---------------------------------------------------------
  // CONDITIONAL RENDER 3: Form Mode (Register / Edit)
  //---------------------------------------------------------
  return (
    <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-8 max-w-3xl mx-auto my-10 shadow-2xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          {company ? "Update Company Details" : "Register New Company"}
        </h2>
        <p className="text-xs text-zinc-500 mt-1">
          Enter your business details to start hiring on HireLoop.
        </p>
      </div>

      <Form
        onSubmit={handleSubmit}
        className="space-y-8"
        validationErrors={errors}
        validationBehavior="aria"
      >
        <Fieldset className="space-y-6 w-full">
          {/* Row 1: Company Name & Industry */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextField
              name="companyName"
              defaultValue={company?.name}
              isInvalid={!!errors.companyName}
              className="flex flex-col gap-1 w-full"
            >
              <Label className="text-zinc-400 font-medium text-sm">
                Company Name
              </Label>
              <Input placeholder="e.g. Acme Corp" className={textInputClass} />
              {errors.companyName && (
                <FieldError className="text-xs text-danger mt-1">
                  {errors.companyName}
                </FieldError>
              )}
            </TextField>

            <Select
              id="industry"
              className={selectBoxClass}
              name="industry"
              defaultSelectedKeys={[company?.industry || "technology"]}
            >
              <Label
                htmlFor="industry"
                className="text-zinc-400 font-medium text-sm mb-1 block"
              >
                Industry / Category
              </Label>
              <Select.Trigger className={triggerClasses}>
                <Select.Value className="text-white" />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover className={popoverClasses}>
                <ListBox className="outline-none">
                  <ListBox.Item
                    id="technology"
                    className={listItemClasses}
                    textValue="Technology"
                  >
                    Technology
                  </ListBox.Item>
                  <ListBox.Item
                    id="design"
                    className={listItemClasses}
                    textValue="Design"
                  >
                    Design
                  </ListBox.Item>
                  <ListBox.Item
                    id="marketing"
                    className={listItemClasses}
                    textValue="Marketing"
                  >
                    Marketing
                  </ListBox.Item>
                  <ListBox.Item
                    id="finance"
                    className={listItemClasses}
                    textValue="Finance"
                  >
                    Finance
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* Row 2: Website URL & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextField
              name="websiteUrl"
              defaultValue={company?.websiteUrl}
              className="flex flex-col gap-1 w-full"
            >
              <Label className="text-zinc-400 font-medium text-sm">
                Website URL
              </Label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-zinc-600 text-sm pointer-events-none z-10">
                  https://
                </span>
                <Input
                  placeholder="www.company.com"
                  className={`${textInputClass} pl-[65px]`}
                />
              </div>
            </TextField>

            <TextField
              name="location"
              defaultValue={company?.location}
              className="flex flex-col gap-1 w-full"
            >
              <Label className="text-zinc-400 font-medium text-sm">
                Location
              </Label>
              <div className="relative flex items-center">
                <Globe
                  size={16}
                  className="absolute left-3 text-zinc-600 pointer-events-none z-10"
                />
                <Input
                  placeholder="City, Country"
                  className={`${textInputClass} pl-10`}
                />
              </div>
            </TextField>
          </div>

          {/* Row 3: Employee Count Range & Logo Upload */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <Select
              id="employeeCount"
              className={selectBoxClass}
              name="employeeCount"
              isInvalid={!!errors.employeeCount}
              defaultSelectedKeys={[company?.employeeCount || "1-10 employees"]}
            >
              <Label
                htmlFor="employeeCount"
                className="text-zinc-400 font-medium text-sm mb-1 block"
              >
                Employee Count Range <span className="text-rose-500">*</span>
              </Label>
              <Select.Trigger className={triggerClasses}>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              {errors.employeeCount && (
                <span className="text-xs text-danger mt-1">
                  {errors.employeeCount}
                </span>
              )}
              <Select.Popover className={popoverClasses}>
                <ListBox className="outline-none">
                  <ListBox.Item
                    id="1-10 employees"
                    className={listItemClasses}
                    textValue="1-10 employees"
                  >
                    1-10 employees
                  </ListBox.Item>
                  <ListBox.Item
                    id="11-50 employees"
                    className={listItemClasses}
                    textValue="11-50 employees"
                  >
                    11-50 employees
                  </ListBox.Item>
                  <ListBox.Item
                    id="51-200 employees"
                    className={listItemClasses}
                    textValue="51-200 employees"
                  >
                    51-200 employees
                  </ListBox.Item>
                  <ListBox.Item
                    id="201+ employees"
                    className={listItemClasses}
                    textValue="201+ employees"
                  >
                    201+ employees
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>

            {/* Custom Image Upload Input Box matching Design */}
            <div className="flex flex-col gap-1 w-full">
              <span className="text-zinc-400 font-medium text-sm mb-1">
                Company Logo
              </span>
              <div className="flex items-center gap-4">
                <label className="w-12 h-12 bg-zinc-900 border border-dashed border-zinc-800 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-800/50 transition-colors">
                  <ArrowDownToSquare size={16} className="text-zinc-400" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </label>
                <div className="text-xs text-zinc-500">
                  {isUploading ? (
                    <p className="text-amber-400">Uploading...</p>
                  ) : logoUrl ? (
                    <p className="text-emerald-400 truncate max-w-[180px]">
                      Logo uploaded successfully
                    </p>
                  ) : (
                    <>
                      <p className="text-zinc-300 font-medium">Upload image</p>
                      <p>PNG, JPG up to 5MB</p>
                    </>
                  )}
                </div>
                {logoUrl && (
                  <img
                    src={logoUrl}
                    alt="Preview"
                    className="w-10 h-10 object-contain ml-auto border border-zinc-800 rounded p-1 bg-zinc-900"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Row 4: Brief Description */}
          <TextField
            name="description"
            defaultValue={company?.description}
            className="flex flex-col gap-1 w-full"
          >
            <Label className="text-zinc-400 font-medium text-sm">
              Brief Description
            </Label>
            <TextArea
              placeholder="Tell us about your company's mission and culture..."
              rows={4}
              className={textAreaClass}
            />
          </TextField>
        </Fieldset>

        {/* Form Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-zinc-900 w-full">
          <Button
            type="button"
            variant="bordered"
            onPress={() => setIsEditing(false)}
            className="border border-zinc-800 text-zinc-300 hover:bg-zinc-900 rounded-lg px-6 font-medium h-11"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-6 transition-colors h-11"
          >
            {company ? "Save Changes" : "Register Company"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
