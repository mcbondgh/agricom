import PropTypes from "prop-types";
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {Stepper, Step, StepLabel} from '@mui/material'
import FarmerInfo from './addFarmerComponents/FarmerInfo';
import FarmLandInfo from './addFarmerComponents/FarmLandInfo';
import FarmYieldInfo from './addFarmerComponents/FarmYieldInfo';
import { Button } from 'flowbite-react';
import FarmerService from '@/services/farmerService';
import { ErrorAlert,SuccessAlert } from '@/utils/Alerts';


function AddFarmer({setIsAddFarmerModalOpen, fetchData}) {
    const [formData, setFormData] = useState({})
    const [activeStep, setActiveStep] = useState(0);
     // Create validation reference for inputs
    const validateRef = useRef(null);
     //navigate  
    const navigate = useNavigate();
     //Function to handle farmer registration
    const handleFarmerRegistration = async() => {
        //Calling validate function to check if all fields are filled
        if (validateRef.current && !validateRef.current()) {
            //Sweet Alert function  for errors 
            ErrorAlert("Error!", "Fill all required fields!")
            return;
        }
        const response = await FarmerService.registerFarmer(formData);
        if (response.success) {
            //SweetAlert function for successful save
            setFormData({})
            setIsAddFarmerModalOpen(false)
            SuccessAlert(response.message)
            fetchData()
            navigate("/manage-farmer")
        }else {
            //SweetAlert function for errors
            ErrorAlert("Error!", response.message)
            console.log("Error")
        }
    }
    //function to update form date when stepper changes
    const updateFormData = (newData)=> {
            setFormData((previousData)=> ({...previousData, ...newData}))
    }
    const handleNext = () => {
        //Calling validate function to check if all fields are filled
        if (validateRef.current && !validateRef.current()) {
            //Sweet Alert function  for errors 
            ErrorAlert("Error!", "Fill all required fields!")
            return;
        }
        //Active step increment
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
            {activeStep === 0 && <FarmerInfo formData={formData} updateFormData={updateFormData} validateRef={validateRef}/>}
            {activeStep === 1 && <FarmLandInfo formData={formData} updateFormData={updateFormData} validateRef={validateRef}/>}
            {activeStep === 2 && <FarmYieldInfo formData={formData} updateFormData={updateFormData } validateRef={validateRef}/>}
        </div>
        <div className='flex justify-between p-5'>
            <Button gradientMonochrome="success" disabled = {activeStep === 0} onClick={handlePrevious}>Previous</Button>
            <div>
                {activeStep < 2 && <Button gradientMonochrome="success"  onClick={handleNext}>Next</Button>}
                {activeStep === 2 && <Button gradientMonochrome="success"  onClick={handleFarmerRegistration}>Submit</Button>}
            </div>
        </div>
    </main>
  )
}

export default AddFarmer
//SETTING THE PROPERTIES DATA TYPES
AddFarmer.propTypes = {
    setIsAddFarmerModalOpen: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
};