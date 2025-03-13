import PropType from "prop-types";
import { Label, TextInput, Select } from "flowbite-react";

function FarmerInfo({formData, updateFormData }) {
  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  return (
    <main className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <Label htmlFor="first_name" value="First Name" />
          <TextInput id="first_name"  value={formData.first_name || ""} name="first_name" onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="surname" value="Surname" />
          <TextInput id="surname" value={formData.surname || ""} name="surname" onChange={handleChange} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <Label htmlFor="last_name" value="Last Name" />
          <TextInput id="last_name" value={formData.last_name || ""} name="last_name" onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="gender" value="Gender" />
          <Select id="gender" name="gender" value={formData.gender || ""} onChange={handleChange}>
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <Label htmlFor="age" value="Age" />
          <TextInput id="age" name="age" min={0} value={formData.age || ""} type="number" onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="contact_details" value="Contact Details" />
          <TextInput id="contact_details"value={formData.contact_details || ""}  name="contact_details" onChange={handleChange} />
        </div>
      </div>
      <div>
        <Label htmlFor="residential_address" value="Residential Address" />
        <TextInput id="residential_address" name="residential_address" value={formData.residential_address || ""} onChange={handleChange} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <Label htmlFor="farming_experience" value="Farming Experience (years)" />
          <TextInput min={0} id="farming_experience" name="farming_experience" value={formData.farming_experience || ""} type="number" onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="education_level" value="Education Level" />
          <Select id="education_level" name="education_level" value={formData.education_level || ""} onChange={handleChange}>
            <option value="">Select education level</option>
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="tertiary">Tertiary</option>
            <option value="other">Other</option>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <Label htmlFor="farm_gps_coordinates" value="Farm GPS Coordinates" />
          <TextInput id="farm_gps_coordinates" name="farm_gps_coordinates" value={formData.farm_gps_coordinates || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="farm_association_memb" value="Farm Association Membership" />
          <TextInput id="farm_association_memb" name="farm_association_memb" value={formData.farm_association_memb || ""} onChange={handleChange} />
        </div>
      </div>
    </main>
  );
}


export default FarmerInfo;

FarmerInfo.propTypes = {
  updateFormData: PropType.func,
  formData: PropType.object,
}