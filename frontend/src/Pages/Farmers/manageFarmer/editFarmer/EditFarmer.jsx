import PropTypes from "prop-types";
import { Label, TextInput, Select } from "flowbite-react";
import { useState,useEffect } from "react";
import { GrDocumentUpdate } from "react-icons/gr";
import { PrimaryButtons } from "@/components/ui/Buttons";

export const EditFarmer = ({selectedFarmer}) => {
  const [formData, setFormData] = useState({
    id: "",
    first_name: "",
    surname: "",
    last_name: "",
    gender: "",
    age: "",
    contact_details: "",
    residential_address: "",
    farming_experience: "",
    education_level: "",
    farm_gps_coordinates: "",
    farm_association_memb: "",
    land_size: "",
    farm_location: "",
    crop_type: "",
    soil_type: "",
    farming_practice: "",
    mechanization: "",
    harvest_dates: "",
    yield_per_acre: "",
    market_prices: "",
    revenue: "",
  });

  // Populate form fields when selectedFarmer changes
  useEffect(() => {
    if (selectedFarmer) {
      setFormData({
        id: selectedFarmer[0],
        first_name: selectedFarmer[1] || "",
        surname: selectedFarmer[4] || "",
        last_name: selectedFarmer[2] || "",
        gender: selectedFarmer[5],
        age: selectedFarmer[3] || "",
        contact_details: selectedFarmer[6] || "",
        residential_address: selectedFarmer[8] || "",
        farming_experience: selectedFarmer[12] || "",
        education_level: selectedFarmer[7] || "",
        farm_gps_coordinates: selectedFarmer[13] || "",
        farm_association_memb: selectedFarmer[11] || "",
        land_size: selectedFarmer[17] || "",
        farm_location: selectedFarmer[10] || "",
        crop_type: selectedFarmer[15] || "",
        soil_type: selectedFarmer[21] || "",
        farming_practice: selectedFarmer[14] || "",
        mechanization: selectedFarmer[19] || "",
        harvest_dates: selectedFarmer[16].split("T")[0],
        yield_per_acre: selectedFarmer[22] || "",
        market_prices: selectedFarmer[18] || "",
        revenue: selectedFarmer[20] || "",
      });
    }
  }, [selectedFarmer]);

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({...formData,[name]:value})
  }

  const handleSubmit = () => {
    // Call API to update farmer data
    console.log(formData)
  }

  return (
    <main className="h-[100vh] bg-white rounded-2xl">
      <div className="text-center md:text-xl text-green-800 font-bold py-3">Personal Information</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16">
                <div>
                  <span className="flex gap-1">
                  <Label htmlFor="first_name" value="First Name" /><span className="text-red-500 ml-1">*</span>
                    </span>
                  <TextInput color= "success" id="first_name" name="first_name" onChange={handleChange} value={formData.first_name} />
                  
                </div>
                <div>
                  <span className="flex gap-1">
                  <Label htmlFor="surname" value="Surname" /><span className="text-red-500 ml-1">*</span>
                  </span>
                  <TextInput color= "success" id="surname"  name="surname" onChange={handleChange} value={formData.surname} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16">
                <div>
                  <Label htmlFor="last_name" value="Last Name" />
                  <TextInput color= "success" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange}/>
                </div>
                <div>
                  <span className="flex gap-1">
                  <Label htmlFor="gender" value="Gender" /><span className="text-red-500 ml-1">*</span>
                  </span>
                  <Select color= "success" id="gender" name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16">
                <div>
                  <span className="flex gap-1">
                  <Label htmlFor="age" value="Age" /><span className="text-red-500 ml-1">*</span>
                  </span>
                  <TextInput color="success" id="age" name="age" min={0}  type="number" value={formData.age} onChange={handleChange}/>
                </div>
                <div>
                  <span className="flex gap-1">
                  <Label htmlFor="contact_details" value="Contact Details" /><span className="text-red-500 ml-1">*</span>
                  </span>
                  <TextInput color="success" id="contact_details" name="contact_details" value={formData.contact_details} onChange={handleChange}/>
                </div>
              </div>
              <div>
                <span className="flex gap-1">
                <Label htmlFor="residential_address" value="Residential Address" /><span className="text-red-500 ml-1">*</span>
                </span>
                <TextInput color="success" id="residential_address" name="residential_address" value={formData.residential_address} onChange={handleChange}/>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16">
                <div>
                  <span className="flex gap-1">
                  <Label htmlFor="farming_experience" value="Farming Experience (years)" /><span className="text-red-500 ml-1">*</span>
                  </span>
                  <TextInput color="success" min={0} id="farming_experience" name="farming_experience" type="number" value={formData.farming_experience} onChange={handleChange}/>
                </div>
                <div>
                  <span className="flex gap-1">
                  <Label htmlFor="education_level" value="Education Level" /><span className="text-red-500 ml-1">*</span>
                  </span>
                  <Select color="success" id="education_level" name="education_level" value={formData.education_level} onChange={handleChange}>
                    <option value="">Select education level</option>
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                    <option value="tertiary">Tertiary</option>
                    <option value="other">Other</option>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16 pb-3">
                <div>
                  <span className="flex gap-1">
                  <Label htmlFor="farm_gps_coordinates" value="Farm GPS Coordinates" /><span className="text-red-500 ml-1">*</span>
                  </span>
                  <TextInput color="success" id="farm_gps_coordinates" name="farm_gps_coordinates" value={formData.farm_gps_coordinates} onChange={handleChange}/>
                </div>
                <div>
                  <span className="flex gap-1">
                  <Label htmlFor="farm_association_memb" value="Farm Association Membership" /><span className="text-red-500 ml-1">*</span>
                  </span>
                  <TextInput color="success" id="farm_association_memb" name="farm_association_memb" value={formData.farm_association_memb} onChange={handleChange}/>
                </div>
              </div>
              {/* LAND INFORMATION*/}
              <div className="text-center md:text-xl text-green-800 font-bold py-3">Land Information</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16">
                <div>
                  <span className="flex gap-1">
                    <Label htmlFor="land_size" value="Land Size (acres)" /><span className="text-red-500 ml-1">*</span>
                  </span>
                    <TextInput color="success" id="land_size" min={0} name="land_size" type="number" value={formData.land_size} onChange={handleChange}/>
                </div>
                <div>
                  <span className="flex gap-1">
                    <Label htmlFor="farm_location" value="Farm Location" /><span className="text-red-500 ml-1">*</span>
                  </span>
                  <TextInput color="success" id="farm_location" name="farm_location" type="text" value={formData.farm_location} onChange={handleChange}/>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16">
                <div>
                  <span className="flex gap-1">
                    <Label htmlFor="crop_type" value="Crop Type" /><span className="text-red-500 ml-1">*</span>
                  </span>
                  <TextInput color="success" id="crop_type" name="crop_type" type="text" value={formData.crop_type} onChange={handleChange}/>
                </div>
                <div>
                  <span className="flex gap-1">
                    <Label htmlFor="soil_type" value="Soil Type" /><span className="text-red-500 ml-1">*</span>
                  </span>
                  <Select color="success" id="soil_type" name="soil_type" value={formData.soil_type} onChange={handleChange}>
                    <option value="">Select soil type</option>
                    <option value="clay">Clay</option>
                    <option value="sandy">Sandy</option>
                    <option value="silt">Silt</option>
                    <option value="loam">Loam</option>
                    <option value="other">Other</option>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16">  
                <div>
                  <span className="flex gap-1">
                    <Label htmlFor="farming_practice" value="Farming Practice" /><span className="text-red-500 ml-1">*</span>
                  </span>
                  <Select color="success" id="farming_practice" name="farming_practice" value={formData.farming_practice} onChange={handleChange}>
                    <option value="">Select farming practice</option>
                    <option value="organic">Organic</option>
                    <option value="conventional">Conventional</option>
                    <option value="mixed">Mixed</option>
                    <option value="other">Other</option>
                  </Select>
                  </div>
                  <div className="pb-4">
                    <span className="flex gap-1">
                      <Label htmlFor="mechanization" value="Mechanization" /><span className="text-red-500 ml-1">*</span>
                    </span>
                    <Select color = "success" id="mechanization" name="mechanization" value={formData.mechanization} onChange={handleChange}>
                      <option value="">Select mechanization level</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </Select>
                  </div>
              </div>
              {/* YIELD INFORMATION*/}
                <div className="text-center md:text-xl text-green-800 font-bold py-3">Yield Information</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16">  
                  <div>
                    <Label htmlFor="harvest_dates" value="Harvest Date" />
                    <TextInput color="success" id="harvest_dates" name="harvest_dates" type="date" value={formData.harvest_dates} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="yield_per_acre" value="Yield per Acre" />
                    <TextInput color="success" id="yield_per_acre" name="yield_per_acre" type="number" min={0} value={formData.yield_per_acre} onChange={handleChange} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16">  
                  <div>
                    <Label htmlFor="market_prices" value="Market Prices" />
                    <TextInput color="success" id="market_prices" name="market_prices" type="number" min={0} value={formData.market_prices} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="revenue" value="Revenue" />
                    <TextInput color="success" id="revenue" name="revenue" type="number" min={0} value={formData.revenue} onChange={handleChange} />
                  </div>
                </div>
            <div className="py-4 flex justify-end">
              <PrimaryButtons 
                btnIcon ={<GrDocumentUpdate className="mr-2 h-5 w-5" />} 
                text = "Update"
                onClick={handleSubmit}
                />
            </div>
    </main>
  )
}

//SETTING THE PROPERTIES DATA TYPES
EditFarmer.propTypes = {
  selectedFarmer: PropTypes.array,
};