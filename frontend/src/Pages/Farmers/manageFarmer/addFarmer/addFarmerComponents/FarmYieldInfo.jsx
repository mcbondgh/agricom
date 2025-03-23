import PropType from "prop-types";
import { Label, TextInput } from "flowbite-react";

function FarmYieldInfo({formData, updateFormData }) {
  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  return (
    <main className="space-y-4">
      <div className="flex flex-col gap-1">
        <Label htmlFor="harvest_dates" value="Harvest Date" />
        <TextInput id="harvest_dates" name="harvest_dates" value={formData.harvest_dates || ""} type="date" onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="yield_per_acre" value="Yield per Acre" />
        <TextInput id="yield_per_acre" min={0} name="yield_per_acre" value={formData.yield_per_acre || ""} type="number" onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="market_prices" value="Market Prices" />
        <TextInput id="market_prices" min={0} name="market_prices" value={formData.market_prices || ""} type="number" onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="revenue" value="Revenue" />
        <TextInput id="revenue" min={0} name="revenue" value={formData.revenue || ""} type="number" onChange={handleChange} />
      </div>
    </main>
  );
}

export default FarmYieldInfo;
FarmYieldInfo.propTypes = {
  updateFormData: PropType.func,
  formData: PropType.object,
}