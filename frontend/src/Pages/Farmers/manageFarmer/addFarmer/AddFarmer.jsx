import { useState } from 'react';
import {Stepper, Step, StepLabel} from '@mui/material'
import FarmerInfo from './addFarmerComponents/FarmerInfo';
import FarmLandInfo from './addFarmerComponents/FarmLandInfo';
import FarmYieldInfo from './addFarmerComponents/FarmYieldInfo';
import { Button } from 'flowbite-react';

function AddFarmer() {
    const [formData, setFormData] = useState({})
    const [activeStep, setActiveStep] = useState(0);

    const handleSubmit = () => {
        console.log("--Form submitted--")
        console.log(formData)
        
    }
    //function to update form date when stepper changes
    const updateFormData = (newData)=> {
            setFormData((previousData)=> ({...previousData, ...newData}))
    }
    const handleNext = () => {
        if (activeStep < 2)
        setActiveStep((currentStep) => currentStep + 1);
    }
    const handlePrevious = () => {
        if (activeStep !== 0)
        setActiveStep((currentStep) => currentStep - 1);
    }
    
  return (
    <main className="h-[100vh] bg-white rounded-2xl">
        <Stepper activeStep={activeStep} className="bg-white py-4 sticky top-0 z-50"> 
            <Step>
                <StepLabel>Personal</StepLabel>
            </Step>
            <Step>
                <StepLabel>Farmland</StepLabel>
            </Step>
            <Step>
                <StepLabel>Yield</StepLabel>
            </Step>
        </Stepper>
        <div className='bg-gray-200 w-full h-fit p-8 rounded-lg mt-5'>
            {activeStep === 0 && <FarmerInfo formData={formData} updateFormData={updateFormData}/>}
            {activeStep === 1 && <FarmLandInfo formData={formData} updateFormData={updateFormData}/>}
            {activeStep === 2 && <FarmYieldInfo formData={formData} updateFormData={updateFormData}/>}
        </div>
        <div className='flex justify-between p-5'>
            <Button gradientMonochrome="success" disabled = {activeStep === 0} onClick={handlePrevious}>Previous</Button>
            <div>
                {activeStep < 2 && <Button gradientMonochrome="success"  onClick={handleNext}>Next</Button>}
                {activeStep === 2 && <Button gradientMonochrome="success"  onClick={handleSubmit}>Submit</Button>}
            </div>
        </div>
    </main>
  )
}

export default AddFarmer