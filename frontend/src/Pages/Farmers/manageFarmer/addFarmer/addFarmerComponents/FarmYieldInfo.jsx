import PropType from "prop-types";
import { Label, TextInput } from "flowbite-react";

function FarmYieldInfo({ formData, updateFormData, errors, setErrors }) {
//Handling the changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    // Remove error message when the user enters a valid value
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
          {errors[id] && <p className="text-red-500 text-sm">{errors[id][0]}</p>}
        </div>
      ))}
    </main>
  );
}

FarmYieldInfo.propTypes = {
  updateFormData: PropType.func.isRequired,
  formData: PropType.object.isRequired,
  errors: PropType.object,
  setErrors: PropType.func,
};

export default FarmYieldInfo;
