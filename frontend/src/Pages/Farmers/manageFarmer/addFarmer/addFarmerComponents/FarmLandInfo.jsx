import PropType from "prop-types";
import { Label, TextInput, Select } from "flowbite-react";
import { useState, useEffect } from "react";
import { validateForm , allowTextOnly} from "@/utils/validateForm";

function FarmLandInfo({ formData, updateFormData, validateRef }) {
  // Initialize an empty object to store errors
  const [errors, setErrors] = useState({});
  
  useEffect(()=> {
    const requiredFields = [
      "land_size", "farm_location", "crop_type","soil_type", "farming_practice", "mechanization"
      ]
    if (validateRef) {
      validateRef.current = () =>  validateForm(requiredFields,formData, setErrors)
    }
  },[formData, validateRef])

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
        <TextInput color={errors.land_size ? "failure" : "success"} id="land_size" min={0} name="land_size" value={formData.land_size || ""} type="number" onChange={handleChange} />
        {errors.land_size && <p className="text-red-500 text-sm">Farmland size is required</p>}
      </div>
      <div>
        <span className="flex gap-1">
        <Label htmlFor="farm_location" value="Farm Location" /><span className="text-red-500 ml-1">*</span>
        </span>
        <TextInput color={errors.farm_location ? "failure" : "success"} id="farm_location" name="farm_location" value={formData.farm_location || ""} type="text" onChange={handleChange} />
        {errors.farm_location && <p className="text-red-500 text-sm">Farm location is required</p>}
      </div>
      <div>
        <span className="flex gap-1">
        <Label htmlFor="crop_type" value="Crop Type" /><span className="text-red-500 ml-1">*</span>
        </span>
        <TextInput color={errors.crop_type ? "failure" : "success"} onKeyDown={allowTextOnly} id="crop_type" name="crop_type" value={formData.crop_type || ""} type="text" onChange={handleChange} />
        {errors.crop_type && <p className="text-red-500 text-sm">Crop type is required</p>}
      </div>
      <div>
        <span className="flex gap-1">
        <Label htmlFor="soil_type" value="Soil Type" /><span className="text-red-500 ml-1">*</span>
        </span>
        <Select color={errors.soil_type ? "failure" : "success"} id="soil_type" name="soil_type" value={formData.soil_type || ""} onChange={handleChange}>
          <option value="">Select soil type</option>
          <option value="clay">Clay</option>
          <option value="sandy">Sandy</option>
          <option value="silt">Silt</option>
          <option value="loam">Loam</option>
          <option value="other">Other</option>
        </Select>
        {errors.soil_type && <p className="text-red-500 text-sm">Soil type is required</p>}
      </div>
      <div>
        <span className="flex gap-1">
        <Label htmlFor="farming_practice" value="Farming Practice" /><span className="text-red-500 ml-1">*</span>
        </span>
        <Select color={errors.farming_practice ? "failure" : "success"} id="farming_practice" name="farming_practice" value={formData.farming_practice || ""} onChange={handleChange}>
          <option value="">Select farming practice</option>
          <option value="organic">Organic</option>
          <option value="conventional">Conventional</option>
          <option value="mixed">Mixed</option>
          <option value="other">Other</option>
        </Select>
        {errors.farming_practice && <p className="text-red-500 text-sm">Farming practice is required</p>}
      </div>
      <div>
        <span className="flex gap-1">
        <Label htmlFor="mechanization" value="Mechanization" /><span className="text-red-500 ml-1">*</span>
        </span>
        <Select color = {errors.mechanization ? "failure" : "success"} id="mechanization" name="mechanization" value={formData.mechanization || ""} onChange={handleChange}>
          <option value="">Select mechanization level</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Select>
        {errors.mechanization && <p className="text-red-500 text-sm">Mechanization is required</p>}
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
