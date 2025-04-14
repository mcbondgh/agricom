export const validateForm = ( requiredFields,formData , setErrors) => {
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === "") {
        newErrors[field] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

export const allowNumbersOnly = (e) => {
  if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "ArrowLeft" && e.key !== "ArrowRight") {
    e.preventDefault();
  }
}

export const allowTextOnly = (e) => {
  if (!/^[a-zA-Z\s]*$/.test(e.key) && e.key !== "Backspace") {
    e.preventDefault();
  }
}