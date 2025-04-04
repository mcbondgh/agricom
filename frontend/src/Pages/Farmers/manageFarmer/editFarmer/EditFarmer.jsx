import PropTypes from "prop-types";
import { Label, TextInput, Select, Button } from "flowbite-react";
import { useState,useEffect } from "react";

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
        surname: selectedFarmer[2] || "",
        last_name: selectedFarmer[2] || "",
        gender: selectedFarmer[3] || "",
        age: selectedFarmer[4] || "",
        contact_details: selectedFarmer[5] || "",
        residential_address: selectedFarmer[9] || "",
        farming_experience: selectedFarmer[8] || "",
        education_level: selectedFarmer[6] || "",
        farm_gps_coordinates: selectedFarmer[7] || "",
        farm_association_memb: selectedFarmer[11] || "",
        land_size: selectedFarmer[12] || "",
        farm_location: selectedFarmer[13] || "",
        crop_type: selectedFarmer[14] || "",
        soil_type: selectedFarmer[12] || "",
        farming_practice: selectedFarmer[16] || "",
        mechanization: selectedFarmer[12] || "",
        harvest_dates: selectedFarmer[11] || "",
        yield_per_acre: selectedFarmer[8] || "",
        market_prices: selectedFarmer[8] || "",
        revenue: selectedFarmer[4] || "",
      });
    }
  }, [selectedFarmer]);

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({...formData,[name]:value})
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
                  <TextInput color="success" id="age" name="age" min={0}  type="number"/>
                </div>
                <div>
                  <span className="flex gap-1">
                  <Label htmlFor="contact_details" value="Contact Details" /><span className="text-red-500 ml-1">*</span>
                  </span>
                  <TextInput color="success" id="contact_details" name="contact_details" />
                </div>
              </div>
              <div>
                <span className="flex gap-1">
                <Label htmlFor="residential_address" value="Residential Address" /><span className="text-red-500 ml-1">*</span>
                </span>
                <TextInput color="success" id="residential_address" name="residential_address" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16">
                <div>
                  <span className="flex gap-1">
                  <Label htmlFor="farming_experience" value="Farming Experience (years)" /><span className="text-red-500 ml-1">*</span>
                  </span>
                  <TextInput color="success" min={0} id="farming_experience" name="farming_experience" type="number"/>
                </div>
                <div>
                  <span className="flex gap-1">
                  <Label htmlFor="education_level" value="Education Level" /><span className="text-red-500 ml-1">*</span>
                  </span>
                  <Select color="success" id="education_level" name="education_level">
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
                  <TextInput color="success" id="farm_gps_coordinates" name="farm_gps_coordinates"/>
                </div>
                <div>
                  <span className="flex gap-1">
                  <Label htmlFor="farm_association_memb" value="Farm Association Membership" /><span className="text-red-500 ml-1">*</span>
                  </span>
                  <TextInput color="success" id="farm_association_memb" name="farm_association_memb"/>
                </div>
              </div>
              {/* LAND INFORMATION*/}
              <div className="text-center md:text-xl text-green-800 font-bold py-3">Land Information</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16">
                <div>
                  <span className="flex gap-1">
                    <Label htmlFor="land_size" value="Land Size (acres)" /><span className="text-red-500 ml-1">*</span>
                  </span>
                    <TextInput color="success" id="land_size" min={0} name="land_size"/>
                </div>
                <div>
                  <span className="flex gap-1">
                    <Label htmlFor="farm_location" value="Farm Location" /><span className="text-red-500 ml-1">*</span>
                  </span>
                  <TextInput color="success" id="farm_location" name="farm_location" type="text"/>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16">
                <div>
                  <span className="flex gap-1">
                    <Label htmlFor="crop_type" value="Crop Type" /><span className="text-red-500 ml-1">*</span>
                  </span>
                  <TextInput color="success" id="crop_type" name="crop_type" type="text"/>
                </div>
                <div>
                  <span className="flex gap-1">
                    <Label htmlFor="soil_type" value="Soil Type" /><span className="text-red-500 ml-1">*</span>
                  </span>
                  <Select color="success" id="soil_type" name="soil_type">
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
                  <Select color="success" id="farming_practice" name="farming_practice">
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
                    <Select color = "success" id="mechanization" name="mechanization">
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
              <Button gradientMonochrome="success">Update</Button>
            </div>
    </main>
  )
}

//SETTING THE PROPERTIES DATA TYPES
EditFarmer.propTypes = {
  selectedFarmer: PropTypes.array,
};