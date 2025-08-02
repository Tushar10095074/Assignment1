import React, { useState } from 'react';
import Personaldetails from "./stepperform/personaldetails";
import CountryDetails from "./stepperform/countrydetails";
import Skillsdetails from "./stepperform/skillsdetails";
import Credentaildetails from "./stepperform/credentaildetails";
import { Stepper, Step, StepLabel, Button, Typography } from '@mui/material';
import Layout from "../component/Layout";
import { Link } from 'react-router-dom';
import { fetchWithAuth } from '../utils/fetchWithAuth';

const steps = ['Personal Information', 'Details', 'Skills Details', "Credentail Details"];

export default function Stepperform() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    personal: {
      name: "",
      gender: "",
      phoneNumber: "",
      photo: null,
    },
    country: null,
    state: null,
    skills: [],
    credentials: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const payload = new FormData();

      payload.append("name", formData.personal.name);
      payload.append("email", formData.credentials.email);
      payload.append("password", formData.credentials.password);
      payload.append("password_confirmation", formData.credentials.confirmPassword);
      payload.append("skills", formData.skills.join(",")); 
      payload.append("gender", formData.personal.gender);
      payload.append("phoneNumber", formData.personal.phoneNumber);
      payload.append("countryId", formData.country?.value || "");
      payload.append("stateId", formData.state?.value || "");
      if (formData.personal.photo) {
        payload.append("photo", formData.personal.photo);
      }
      const res = await fetchWithAuth(
  "https://reactinterviewtask.codetentaclestechnologies.in/api/api/register",
  {
    method: "POST",
    body: payload,
  }
);

      const data = await res.json();
      console.log("Response:", data);

      if (data?.success) {
        setActiveStep((prev) => prev + 1);
      } else {
        alert(data?.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Personaldetails formData={formData} setFormData={setFormData} />;
      case 1:
        return <CountryDetails formData={formData} setFormData={setFormData} />;
      case 2:
        return <Skillsdetails formData={formData} setFormData={setFormData} />;
      case 3:
        return <Credentaildetails formData={formData} setFormData={setFormData} />;
      default:
        return "Unknown Step";
    }
  };

  return (
    <Layout>
      <div className="bg-white p-4 mb-2 rounded-lg mt-14">
        <div>
          <h3 className="text-[1.125rem] font-semibold">Stepper Form</h3>
        </div>
      </div>
      <div className="bg-white">
                <div className="p-4 rounded-lg dark:border-gray-700 mb-2">
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
      </div>

      <div className="bg-white">
                <div className="p-4 rounded-lg dark:border-gray-700">
                    <>
          {activeStep === steps.length ? (
                            <div className="flex justify-center  w-full mt-5">
                                <div className=" p-8 m-4">
                                    <Typography variant="h5" className='mt-10 mb-10 pb-10'>Thank you for submitting the form!</Typography>
                                    <Link to="/List" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">View List
                </Link>
              </div>
            </div>
          ) : (
            <>
              <Typography variant="h5">{getStepContent(activeStep)}</Typography>
                                <div className='flex justify-center'>
                                    <div className='flex justify-between w-full mt-4'>
                                        <Button className="bg-back " disabled={activeStep === 0} onClick={handleBack}>
                    Back
                  </Button>
                  <Button variant="contained" color="primary" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? "Submit" : "Next"}
                  </Button>
                </div>
              </div>
            </>
          )}
                    </>
        </div>
      </div>
    </Layout>
  );
}
