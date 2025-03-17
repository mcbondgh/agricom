import PropType from "prop-types";
import { Label, TextInput, Select } from "flowbite-react";

function FarmLandInfo({ formData, updateFormData }) {
  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  return (
    <main className="space-y-4">
      <div>
        <Label htmlFor="land_size" value="Land Size (acres)" />
        <TextInput id="land_size" min={0} name="land_size" value={formData.land_size || ""} type="number" onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="farm_location" value="Farm Location" />
        <TextInput id="farm_location" name="farm_location" value={formData.farm_location || ""} type="text" onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="crop_type" value="Crop Type" />
        <TextInput id="crop_type" name="crop_type" value={formData.crop_type || ""} type="text" onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="soil_type" value="Soil Type" />
        <Select id="soil_type" name="soil_type" value={formData.soil_type || ""} onChange={handleChange}>
          <option value="">Select soil type</option>
          <option value="clay">Clay</option>
          <option value="sandy">Sandy</option>
          <option value="silt">Silt</option>
          <option value="loam">Loam</option>
          <option value="other">Other</option>
        </Select>
      </div>
      <div>
        <Label htmlFor="farming_practice" value="Farming Practice" />
        <Select id="farming_practice" name="farming_practice" value={formData.farming_practice || ""} onChange={handleChange}>
          <option value="">Select farming practice</option>
          <option value="organic">Organic</option>
          <option value="conventional">Conventional</option>
          <option value="mixed">Mixed</option>
          <option value="other">Other</option>
        </Select>
      </div>
      <div>
        <Label htmlFor="mechanization" value="Mechanization" />
        <Select id="mechanization" name="mechanization" value={formData.mechanization || ""} onChange={handleChange}>
          <option value="">Select mechanization level</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Select>
      </div>
    </main>
  );
}

export default FarmLandInfo;

FarmLandInfo.propTypes = {
  updateFormData: PropType.func,
  formData: PropType.object,
}
