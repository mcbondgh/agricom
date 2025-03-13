import { Button, Label, TextInput, Select } from 'flowbite-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

function SystemParameters() {
  const [params, setParams] = useState({
    cropCategory: '',
    measurementUnit: '',
    farmingSeason: '',
  });

  useEffect(() => {
    axios.get('/api/system-parameters').then((res) => {
      const data = res.data.reduce((acc, param) => {
        acc[param.key] = param.value;
        return acc;
      }, {});
      setParams(data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/system-parameters', params);
    alert('Parameters updated successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-2xl shadow-md">
      <div>
        <Label htmlFor="cropCategory" value="Crop Category" />
        <TextInput
          id="cropCategory"
          placeholder="e.g., Cereals, Fruits"
          value={params.cropCategory}
          onChange={(e) => setParams({ ...params, cropCategory: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="measurementUnit" value="Measurement Unit" />
        <Select
          id="measurementUnit"
          value={params.measurementUnit}
          onChange={(e) => setParams({ ...params, measurementUnit: e.target.value })}
          required
        >
          <option value="">Select unit</option>
          <option value="kg">Kilograms</option>
          <option value="tons">Tons</option>
          <option value="acres">Acres</option>
          <option value="hectares">Hectares</option>
        </Select>
      </div>

      <div>
        <Label htmlFor="farmingSeason" value="Farming Season" />
        <TextInput
          id="farmingSeason"
          placeholder="e.g., Spring, Summer"
          value={params.farmingSeason}
          onChange={(e) => setParams({ ...params, farmingSeason: e.target.value })}
          required
        />
      </div>

      <Button type="submit">Save Parameters</Button>
    </form>
  );
}

export default SystemParameters;
