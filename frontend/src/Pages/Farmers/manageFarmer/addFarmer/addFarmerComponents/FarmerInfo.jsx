import PropType from "prop-types";
import { Label, TextInput, Select } from "flowbite-react";
// import { useState, useEffect } from "react";
import {allowNumbersOnly , allowTextOnly} from "@/utils/utilityFunction";


function FarmerInfo({formData, updateFormData, errors, setErrors }) {
  //Handling the changes in input fields
  const handleChange = (e) => {
    const {name, value} = e.target;
    updateFormData({[name]:value});
    // Remove error when field is filled
    if(errors[name]) {
      setErrors((prev)=> {
        const newErrors = {...prev}
        delete newErrors[name]
        return newErrors
      })
    }
  };


  return (
    <main className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16">
        <div>
          <span className="flex gap-1">
          <Label htmlFor="first_name" value="First Name" /><span className="text-red-500 ml-1">*</span>
          </span>
          <TextInput color={errors.first_name ? "failure" : "success"} onKeyDown={allowTextOnly} id="first_name"  value={formData.first_name || ""} name="first_name" onChange={handleChange}/>
          {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name[0]}</p>}
        </div>
        <div>
          <span className="flex gap-1">
          <Label htmlFor="surname" value="Surname" /><span className="text-red-500 ml-1">*</span>
          </span>
          <TextInput color={errors.surname ? "failure" : "success"} onKeyDown={allowTextOnly} id="surname" value={formData.surname || ""} name="surname" onChange={handleChange}/>
          {errors.surname && <p className="text-red-500 text-sm">{errors.surname[0]}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16">
        <div>
          <Label htmlFor="last_name" value="Last Name" />
          <TextInput color="success" onKeyDown={allowTextOnly} id="last_name" value={formData.last_name || ""} name="last_name" onChange={handleChange} />
        </div>
        <div>
          <span className="flex gap-1">
          <Label htmlFor="gender" value="Gender" /><span className="text-red-500 ml-1">*</span>
          </span>
          <Select color={errors.gender ? "failure" : "success"} id="gender" name="gender" value={formData.gender || ""} onChange={handleChange} >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Select>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender[0]}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16">
        <div>
          <span className="flex gap-1">
          <Label htmlFor="age" value="Age" /><span className="text-red-500 ml-1">*</span>
          </span>
          <TextInput color={errors.age ? "failure" : "success"} id="age" name="age" min={0} value={formData.age || ""} type="number" onChange={handleChange}/>
          {errors.age && <p className="text-red-500 text-sm">{errors.age[0]}</p>}
        </div>
        <div>
          <span className="flex gap-1">
          <Label htmlFor="contact_details" value="Contact Details" /><span className="text-red-500 ml-1">*</span>
          </span>
          <TextInput max={10} type="tel" color={errors.contact_details ? "failure" : "success"} onKeyDown={allowNumbersOnly} id="contact_details"value={formData.contact_details || ""}  name="contact_details" onChange={handleChange}/>
          {errors.contact_details && <p className="text-red-500 text-sm">{errors.contact_details[0]}</p>}
        </div>
      </div>
      <div>
        <span className="flex gap-1">
        <Label htmlFor="residential_address" value="Residential Address" /><span className="text-red-500 ml-1">*</span>
        </span>
        <TextInput color={errors.residential_address ? "failure" : "success"} id="residential_address" name="residential_address" value={formData.residential_address || ""} onChange={handleChange}/>
        {errors.residential_address && <p className="text-red-500 text-sm">{errors.residential_address[0]}</p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16">
        <div>
          <span className="flex gap-1">
          <Label htmlFor="farming_experience" value="Farming Experience (years)" /><span className="text-red-500 ml-1">*</span>
          </span>
          <TextInput color={errors.farming_experience ? "failure" : "success"} min={0} id="farming_experience" name="farming_experience" value={formData.farming_experience || ""} type="number" onChange={handleChange}/>
          {errors.farming_experience && <p className="text-red-500 text-sm">{errors.farming_experience[0]}</p>}
        </div>
        <div>
          <span className="flex gap-1">
          <Label htmlFor="education_level" value="Education Level" /><span className="text-red-500 ml-1">*</span>
          </span>
          <Select color={errors.education_level ? "failure" : "success"} id="education_level" name="education_level" value={formData.education_level || ""} onChange={handleChange}>
            <option value="">Select education level</option>
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="tertiary">Tertiary</option>
            <option value="other">Other</option>
          </Select>
          {errors.education_level && <p className="text-red-500 text-sm">{errors.education_level[0]}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16">
        <div>
          <span className="flex gap-1">
          <Label htmlFor="farm_gps_coordinates" value="Farm GPS Coordinates" /><span className="text-red-500 ml-1">*</span>
          </span>
          <TextInput color={errors.farm_gps_coordinates ? "failure" : "success"} id="farm_gps_coordinates" name="farm_gps_coordinates" value={formData.farm_gps_coordinates || ""} onChange={handleChange}/>
          {errors.farm_gps_coordinates && <p className="text-red-500 text-sm">{errors.farm_gps_coordinates[0]}</p>}
        </div>
        <div>
          <span className="flex gap-1">
          <Label htmlFor="farm_association_memb" value="Farm Association Membership" /><span className="text-red-500 ml-1">*</span>
          </span>
          <TextInput color= {errors.farm_association_memb ? "failure" : "success"} onKeyDown={allowTextOnly} id="farm_association_memb" name="farm_association_memb" value={formData.farm_association_memb || ""} onChange={handleChange} />
          {errors.farm_association_memb && <p className="text-red-500 text-sm">{errors.farm_association_memb[0]}</p>}
        </div>
      </div>
    </main>
  );
}


export default FarmerInfo;

FarmerInfo.propTypes = {
  updateFormData: PropType.func,
  formData: PropType.object,
  errors: PropType.object,
  setErrors: PropType.func,
}
