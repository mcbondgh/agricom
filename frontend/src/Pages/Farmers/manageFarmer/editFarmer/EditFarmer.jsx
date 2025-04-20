import PropTypes from "prop-types";
import { Label, TextInput, Select } from "flowbite-react";
import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { GrDocumentUpdate } from "react-icons/gr";
import { PrimaryButtons } from "@/components/ui/Buttons";
import { farmerSchema } from "@/schemas/FarmerSchema";
import FarmerService from '@/services/farmerService';
import { ErrorAlert , SuccessAlert} from '@/utils/Alerts';
import { TransparentLoader } from "@/components/ui/TransparentLoader";
import { farmerKeys } from "@/utils/ArraysData";


export const EditFarmer = ({selectedFarmer, fetchData, setIsEditFarmerModalOpen}) => {
   //navigate  
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  useEffect(() => {
    if (selectedFarmer) {
      // Converting harvest_dates to 'YYYY-MM-DD' if present
      const mappedData = {
        ...selectedFarmer,
        harvest_dates: selectedFarmer.harvest_dates
          ? selectedFarmer.harvest_dates.split("T")[0]
          : "",
      };
      //Keeping keys that exist in formData to avoid adding extra fields
      const filteredData = Object.fromEntries(
        Object.entries(mappedData).filter(([key]) =>
          farmerKeys.includes(key)
        )
      );
      setFormData(filteredData);
    }
  }, [selectedFarmer]);
  
  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData((prev)=> ({...prev, [name]:value}))
    //clear error for error fields
    if(formErrors[name]) {
      setFormErrors((prev)=> {
        const newErrors = {...prev}
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = async() => {
    // Call API to update farmer data
    const result = farmerSchema.safeParse(formData);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      console.log("Validation Errors:", errors);
      ErrorAlert("Error!", "Fill all required fields!")
      setFormErrors(result.error.flatten().fieldErrors);
      return;
    }

    // Proceed if valid
    const editedFarmer = result.data;
    console.log("Validated Data", editedFarmer);
    const farmer_id = selectedFarmer.farmer_Id;
    console.log(farmer_id)
    console.log(selectedFarmer)
    setIsSubmitting(true)
      const response = await FarmerService.updateFarmer(farmer_id, editedFarmer);
      if (response.success) {
        SuccessAlert(response.message)
        setFormData({});
        setFormErrors({}); // clear errors if all is valid
        setIsEditFarmerModalOpen(false)
        fetchData();
        navigate("/manage-farmer")
        } else {
          ErrorAlert("Error!", "Failed to update farmer data!");
        }
     setIsSubmitting(false);   
  }

  return (
    <main className="h-[100vh] bg-white rounded-2xl">
      <div className="text-center md:text-xl text-green-800 font-bold py-3">Personal Information</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16">
                <div>
                  <span className="flex gap-1">
                  <Label htmlFor="first_name" value="First Name" /><span className="text-red-500 ml-1">*</span>
                    </span>
                  <TextInput color={formErrors.first_name ?"failure" :"success"} id="first_name" name="first_name" onChange={handleChange} value={formData.first_name} />
                  {formErrors.first_name && <p className="text-red-500 text-sm">{formErrors.first_name[0]}</p>}
                </div>
                <div>
                  <span className="flex gap-1">
                  <Label htmlFor="surname" value="Surname" /><span className="text-red-500 ml-1">*</span>
                  </span>
                  <TextInput color= {formErrors.surname ? "failure" : "success"} id="surname"  name="surname" onChange={handleChange} value={formData.surname} />
                  {formErrors.surname && <p className="text-red-500 text-sm">{formErrors.surname[0]}</p>}
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
                    <Select color= {formErrors.gender ? "failure":"success"} id="gender" name="gender" value={formData.gender} onChange={handleChange}>
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Select>
                    {formErrors.gender && <p className="text-red-500 text-sm">{formErrors.gender[0]}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16">
                <div>
                  <span className="flex gap-1">
                  <Label htmlFor="age" value="Age" /><span className="text-red-500 ml-1">*</span>
                  </span>
                  <TextInput color={formErrors.age ? "failure" : "success"} id="age" name="age" min={0}  type="number" value={formData.age} onChange={handleChange}/>
                  {formErrors.age && <p className="text-red-500 text-sm">{formErrors.age[0]}</p>}
                </div>
                <div>
                  <span className="flex gap-1">
                  <Label htmlFor="contact_details" value="Contact Details" /><span className="text-red-500 ml-1">*</span>
                  </span>
                  <TextInput color={formErrors.contact_details ? "failure" : "success"} id="contact_details" name="contact_details" value={formData.contact_details} onChange={handleChange}/>
                  {formErrors.contact_details && <p className="text-red-500 text-sm">{formErrors.contact_details[0]}</p>}
                </div>
              </div>
              <div>
                <span className="flex gap-1">
                <Label htmlFor="residential_address" value="Residential Address" /><span className="text-red-500 ml-1">*</span>
                </span>
                <TextInput color={formErrors.residential_address ? "failure" : "success"} id="residential_address" name="residential_address" value={formData.residential_address} onChange={handleChange}/>
                {formErrors.residential_address && <p className="text-red-500 text-sm">{formErrors.residential_address[0]}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16">
                <div>
                  <span className="flex gap-1">
                  <Label htmlFor="farming_experience" value="Farming Experience (years)" /><span className="text-red-500 ml-1">*</span>
                  </span>
                  <TextInput color={formErrors.farming_experience? "failure" : "success"} min={0} id="farming_experience" name="farming_experience" type="number" value={formData.farming_experience} onChange={handleChange}/>
                  {formErrors.farming_experience && <p className="text-red-500 text-sm">{formErrors.farming_experience[0]}</p>}
                </div>
                <div>
                  <span className="flex gap-1">
                  <Label htmlFor="education_level" value="Education Level" /><span className="text-red-500 ml-1">*</span>
                  </span>
                  <Select color={formErrors.education_level ? "failure" : "success"} id="education_level" name="education_level" value={formData.education_level} onChange={handleChange}>
                    <option value="">Select education level</option>
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                    <option value="tertiary">Tertiary</option>
                    <option value="other">Other</option>
                  </Select>
                  {formErrors.education_level && <p className="text-red-500 text-sm">{formErrors.education_level[0]}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16 pb-3">
                <div>
                  <span className="flex gap-1">
                  <Label htmlFor="farm_gps_coordinates" value="Farm GPS Coordinates" /><span className="text-red-500 ml-1">*</span>
                  </span>
                  <TextInput color={formErrors.farm_gps_coordinates ? "failure" : "success"} id="farm_gps_coordinates" name="farm_gps_coordinates" value={formData.farm_gps_coordinates} onChange={handleChange}/>
                  {formErrors.farm_gps_coordinates && <p className="text-red-500 text-sm">{formErrors.farm_gps_coordinates[0]}</p>}
                </div>
                <div>
                  <span className="flex gap-1">
                  <Label htmlFor="farm_association_memb" value="Farm Association Membership" /><span className="text-red-500 ml-1">*</span>
                  </span>
                  <TextInput color={formErrors.farm_association_memb ? "failure" : "success"} id="farm_association_memb" name="farm_association_memb" value={formData.farm_association_memb} onChange={handleChange}/>
                  {formErrors.farm_association_memb && <p className="text-red-500 text-sm">{formErrors.farm_association_memb[0]}</p>}
                </div>
              </div>
              {/* LAND INFORMATION*/}
              <div className="text-center md:text-xl text-green-800 font-bold py-3">Land Information</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16">
                <div>
                  <span className="flex gap-1">
                    <Label htmlFor="land_size" value="Land Size (acres)" /><span className="text-red-500 ml-1">*</span>
                  </span>
                    <TextInput color={formErrors.land_size ? "failure" : "success"} id="land_size" min={0} name="land_size" type="number" value={formData.land_size} onChange={handleChange}/>
                    {formErrors.land_size && <p className="text-red-500 text-sm">{formErrors.land_size[0]}</p>}
                </div>
                <div>
                  <span className="flex gap-1">
                    <Label htmlFor="farm_location" value="Farm Location" /><span className="text-red-500 ml-1">*</span>
                  </span>
                    <TextInput color={formErrors.farm_location ? "failure" : "success"} id="farm_location" name="farm_location" type="text" value={formData.farm_location} onChange={handleChange}/>
                    {formErrors.farm_location && <p className="text-red-500 text-sm">{formErrors.farm_location[0]}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16">
              <div>
                <span className="flex gap-1">
                <Label htmlFor="crop_type" value="Crop Type" /><span className="text-red-500 ml-1">*</span>
                </span>
                <Select color={formErrors.crop_type ? "failure" : "success"} id="crop_type" name="crop_type" value={formData.crop_type || ""} onChange={handleChange}>
                  <option value="">Select crop type</option>
                  <option value="legumes">Legumes</option>
                  <option value="cereals">Cereals</option>
                  <option value="vegetables">Vegetables</option>
                  <option value="fruits">Fruits</option>
                  <option value="root and tuber">Root and Tuber</option>
                  <option value="cash crops">Cash Crops</option>
                </Select>
                {formErrors.crop_type && <p className="text-red-500 text-sm">{formErrors.crop_type[0]}</p>}
              </div>
                <div>
                  <span className="flex gap-1">
                    <Label htmlFor="soil_type" value="Soil Type" /><span className="text-red-500 ml-1">*</span>
                  </span>
                  <Select color={formErrors.soil_type ? "failure" : "success"} id="soil_type" name="soil_type" value={formData.soil_type} onChange={handleChange}>
                    <option value="">Select soil type</option>
                    <option value="clay">Clay</option>
                    <option value="sandy">Sandy</option>
                    <option value="silt">Silt</option>
                    <option value="loam">Loam</option>
                    <option value="other">Other</option>
                  </Select>
                  {formErrors.soil_type && <p className="text-red-500 text-sm">{formErrors.soil_type[0]}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16">  
                <div>
                  <span className="flex gap-1">
                    <Label htmlFor="farming_practice" value="Farming Practice" /><span className="text-red-500 ml-1">*</span>
                  </span>
                  <Select color={formErrors.farming_practice ? "failure" : "success"} id="farming_practice" name="farming_practice" value={formData.farming_practice} onChange={handleChange}>
                    <option value="">Select farming practice</option>
                    <option value="organic">Organic</option>
                    <option value="conventional">Conventional</option>
                    <option value="mixed">Mixed</option>
                    <option value="other">Other</option>
                  </Select>
                  {formErrors.farming_practice && <p className="text-red-500 text-sm">{formErrors.farming_practice[0]}</p>}
                  </div>
                  <div className="pb-4">
                    <span className="flex gap-1">
                      <Label htmlFor="mechanization" value="Mechanization" /><span className="text-red-500 ml-1">*</span>
                    </span>
                    <Select color = {formErrors.mechanization ? "failure" : "success"} id="mechanization" name="mechanization" value={formData.mechanization} onChange={handleChange}>
                      <option value="">Select mechanization level</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </Select>
                    {formErrors.mechanization && <p className="text-red-500 text-sm">{formErrors.mechanization[0]}</p>}
                  </div>
              </div>
              {/* YIELD INFORMATION*/}
                <div className="text-center md:text-xl text-green-800 font-bold py-3">Yield Information</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16">  
                  <div>
                    <Label htmlFor="harvest_dates" value="Harvest Date" />
                    <TextInput color={formErrors.harvest_dates ? "failure" : "success"} id="harvest_dates" name="harvest_dates" type="date" value={formData.harvest_dates} onChange={handleChange} />
                    {formErrors.harvest_dates && <p className="text-red-500 text-sm">{formErrors.harvest_dates[0]}</p>}
                  </div>
                  <div>
                    <Label htmlFor="yield_per_acre" value="Yield per Acre" />
                    <TextInput color={formErrors.yield_per_acre ? "failure" : "success"} id="yield_per_acre" name="yield_per_acre" type="number" min={0} value={formData.yield_per_acre} onChange={handleChange} />
                    {formErrors.yield_per_acre && <p className="text-red-500 text-sm">{formErrors.yield_per_acre[0]}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16">  
                  <div>
                    <Label htmlFor="market_prices" value="Market Prices" />
                    <TextInput color={formErrors.market_prices ? "failure" : "success"} id="market_prices" name="market_prices" type="number" min={0} value={formData.market_prices} onChange={handleChange} />
                    {formErrors.market_prices && <p className="text-red-500 text-sm">{formErrors.market_prices[0]}</p>}
                  </div>
                  <div>
                    <Label htmlFor="revenue" value="Revenue" />
                    <TextInput color={formErrors.revenue ? "failure" : "success"} id="revenue" name="revenue" type="number" min={0} value={formData.revenue} onChange={handleChange} />
                    {formErrors.revenue && <p className="text-red-500 text-sm">{formErrors.revenue[0]}</p>}
                  </div>
                </div>
            <div className="py-4 flex justify-end">
              <PrimaryButtons 
                btnIcon ={<GrDocumentUpdate className="mr-2 h-5 w-5" />} 
                text = "Update"
                onClick={handleSubmit}
                disabled = {isSubmitting}
                />
            </div>
             {/* Loading component */}
      {isSubmitting &&  <TransparentLoader/>}
    </main>
  )
}

//SETTING THE PROPERTIES DATA TYPES
EditFarmer.propTypes = {
  selectedFarmer: PropTypes.array,
  fetchData: PropTypes.func.isRequired,
  setIsEditFarmerModalOpen: PropTypes.func
};