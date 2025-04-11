import PropTypes from "prop-types";
import { Label, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import { validateForm } from "@/utils/validateForm";

function FarmYieldInfo({ formData, updateFormData, validateRef }) {
  const [errors, setErrors] = useState({});
  

  useEffect(() => {
    const requiredFields = ["harvest_dates", "yield_per_acre", "market_prices", "revenue"];
    if (validateRef) {
      validateRef.current = () => validateForm(requiredFields, formData, setErrors);
    }
  }, [formData, validateRef]);

  // if (!formData) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });

    // Remove error message when the user enters a valid value
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  return (
    <main className="space-y-4">
      {[
        { id: "harvest_dates", label: "Harvest Date", type: "date" },
        { id: "yield_per_acre", label: "Yield per Acre", type: "number", min: 0 },
        { id: "market_prices", label: "Market Prices", type: "number", min: 0 },
        { id: "revenue", label: "Revenue", type: "number", min: 0 },
      ].map(({ id, label, type, min }) => (
        <div key={id}>
          <span className="flex gap-1">
            <Label htmlFor={id} value={label} />
            <span className="text-red-500 ml-1">*</span>
          </span>
          <TextInput
            id={id}
            name={id}
            type={type}
            min={min}
            value={formData[id] ?? ""}
            onChange={handleChange}
            color={errors[id] ? "failure" : "success"}
          />
          {errors[id] && <p className="text-red-500 text-sm">{label} is required</p>}
        </div>
      ))}
    </main>
  );
}

FarmYieldInfo.propTypes = {
  updateFormData: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  validateRef: PropTypes.object,
};

export default FarmYieldInfo;
