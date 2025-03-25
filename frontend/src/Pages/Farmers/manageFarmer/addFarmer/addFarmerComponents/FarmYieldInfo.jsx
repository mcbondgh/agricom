import PropType from "prop-types";
import { Label, TextInput } from "flowbite-react";
import { useState,useEffect } from "react";
import { validateForm } from "@/utils/validateForm";


function FarmYieldInfo({formData, updateFormData, validateRef }) {
  const [errors, setErrors] = useState({});
  const requiredFields = [
    "harvest_dates", "yield_per_acre","market_prices","revenue"
  ]
  
  useEffect(()=>{
    if(validateRef) {
      validateRef.current = () => validateForm(requiredFields, formData, setErrors);
    }
});

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    //Remove Errors when fields are filled
    if (validateRef.current[name]) {
      validateRef.current[name].setError("");
      }
  };

  return (
    <main className="space-y-4">
      <div className="flex flex-col gap-1">
        <span className="flex gap-1">
        <Label htmlFor="harvest_dates" value="Harvest Date" /><span className="text-red-500 ml-1">*</span>
        </span>
        <TextInput id="harvest_dates" name="harvest_dates" value={formData.harvest_dates || ""} type="date" onChange={handleChange} className={errors.harvest_dates ? "border-red-500" : ""}/>
        {errors.harvest_dates && <p className="text-red-500 text-sm">{errors.harvest_dates}</p>}
      </div>
      <div>
        <span className="flex gap-1">
        <Label htmlFor="yield_per_acre" value="Yield per Acre" /><span className="text-red-500 ml-1">*</span>
        </span>
        <TextInput id="yield_per_acre" min={0} name="yield_per_acre" value={formData.yield_per_acre || ""} type="number" onChange={handleChange} className={errors.yield_per_acre ? "border-red-500" : ""}/>
        {errors.yield_per_acre && <p className="text-red-500 text-sm">{errors.yield_per_acre}</p>}
      </div>
      <div>
        <span className="flex gap-1">
        <Label htmlFor="market_prices" value="Market Prices" /><span className="text-red-500 ml-1">*</span>
        </span>
        <TextInput id="market_prices" min={0} name="market_prices" value={formData.market_prices || ""} type="number" onChange={handleChange} className={errors.market_prices ? "border-red-500" : ""}/>
        {errors.market_prices && <p className="text-red-500 text-sm">{errors.market_prices}</p>}
      </div>
      <div>
        <span className="flex gap-1">
        <Label htmlFor="revenue" value="Revenue" /><span className="text-red-500 ml-1">*</span>
        </span>
        <TextInput id="revenue" min={0} name="revenue" value={formData.revenue || ""} type="number" onChange={handleChange} className={errors.revenue ? "border-red-500" : ""}/>
        {errors.revenue && <p className="text-red-500 text-sm">{errors.revenue}</p>}
      </div>
    </main>
  );
}

export default FarmYieldInfo;
FarmYieldInfo.propTypes = {
  updateFormData: PropType.func,
  formData: PropType.object,
  validateRef: PropType.object,
}