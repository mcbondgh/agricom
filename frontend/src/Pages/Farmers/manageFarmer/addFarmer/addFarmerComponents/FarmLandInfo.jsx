import PropType from "prop-types";
import { Label, TextInput, Select } from "flowbite-react";
import { useState, useEffect } from "react";
import { validateForm , allowTextOnly} from "@/utils/validateForm";

function FarmLandInfo({ formData, updateFormData, validateRef }) {
  // Initialize an empty object to store errors
  const [errors, setErrors] = useState({});
  
  const requiredFields = [
  "land_size", "farm_location", "crop_type",
  "soil_type", "farming_practice", "mechanization"
  ]
  useEffect(()=> {
    if (validateRef) {
      validateRef.current = () =>  validateForm(requiredFields,formData, setErrors)
    }
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]:value });
    // Remove error when field is filled
    setErrors((prev) => ({ ...prev, [name]: value.trim() ? "" : prev[name] }));
  };

  return (
    <main className="space-y-4">
      <div>
        <span className="flex gap-1">
        <Label htmlFor="land_size" value="Land Size (acres)" /><span className="text-red-500 ml-1">*</span>
        </span>
        <TextInput id="land_size" min={0} name="land_size" value={formData.land_size || ""} type="number" onChange={handleChange} className={errors.land_size ? "border-red-500" : ""}/>
        {errors.land_size && <p className="text-red-500 text-sm">{errors.land_size}</p>}
      </div>
      <div>
        <span className="flex gap-1">
        <Label htmlFor="farm_location" value="Farm Location" /><span className="text-red-500 ml-1">*</span>
        </span>
        <TextInput id="farm_location" name="farm_location" value={formData.farm_location || ""} type="text" onChange={handleChange} className={errors.farm_location ? "border-red-500" : ""}/>
        {errors.farm_location && <p className="text-red-500 text-sm">{errors.farm_location}</p>}
      </div>
      <div>
        <span className="flex gap-1">
        <Label htmlFor="crop_type" value="Crop Type" /><span className="text-red-500 ml-1">*</span>
        </span>
        <TextInput onKeyDown={allowTextOnly} id="crop_type" name="crop_type" value={formData.crop_type || ""} type="text" onChange={handleChange} className={errors.crop_type ? "border-red-500" : ""}/>
        {errors.crop_type && <p className="text-red-500 text-sm">{errors.crop_type}</p>}
      </div>
      <div>
        <span className="flex gap-1">
        <Label htmlFor="soil_type" value="Soil Type" /><span className="text-red-500 ml-1">*</span>
        </span>
        <Select id="soil_type" name="soil_type" value={formData.soil_type || ""} onChange={handleChange} className={errors.soil_type ? "border-red-500" : ""}>
          <option value="">Select soil type</option>
          <option value="clay">Clay</option>
          <option value="sandy">Sandy</option>
          <option value="silt">Silt</option>
          <option value="loam">Loam</option>
          <option value="other">Other</option>
        </Select>
        {errors.soil_type && <p className="text-red-500 text-sm">{errors.soil_type}</p>}
      </div>
      <div>
        <span className="flex gap-1">
        <Label htmlFor="farming_practice" value="Farming Practice" /><span className="text-red-500 ml-1">*</span>
        </span>
        <Select id="farming_practice" name="farming_practice" value={formData.farming_practice || ""} onChange={handleChange} className={errors.farming_practice ? "border-red-500" : ""}>
          <option value="">Select farming practice</option>
          <option value="organic">Organic</option>
          <option value="conventional">Conventional</option>
          <option value="mixed">Mixed</option>
          <option value="other">Other</option>
        </Select>
        {errors.farming_practice && <p className="text-red-500 text-sm">{errors.farming_practice}</p>}
      </div>
      <div>
        <span className="flex gap-1">
        <Label htmlFor="mechanization" value="Mechanization" /><span className="text-red-500 ml-1">*</span>
        </span>
        <Select id="mechanization" name="mechanization" value={formData.mechanization || ""} onChange={handleChange} className={errors.mechanization ? "border-red-500" : ""}>
          <option value="">Select mechanization level</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Select>
        {errors.mechanization && <p className="text-red-500 text-sm">{errors.mechanization}</p>}
      </div>
    </main>
  );
}

export default FarmLandInfo;

FarmLandInfo.propTypes = {
  updateFormData: PropType.func,
  formData: PropType.object,
  validateRef: PropType.object,
}
