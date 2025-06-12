import React, { useState } from "react";

// Import components
import ProgressBar from "./ProgressBar";
import { InfoField, SelectField, TextField } from "./FormFields";
import StepNavigation from "./StepNavigation";
import Modal from "./Modal";

// Import utility functions
import { getStepFields, validateCurrentStep } from "../utils/formUtils";

// Import form configuration
import formConfig from "../config/formConfig.json";

const DynamicForm = () => {
  // Existing form state
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData]     = useState({});
  const [errors, setErrors]         = useState({});

  // Modal-open state
  const [modalOpen, setModalOpen]   = useState(false);

  // Handle field value changes…
  const handleFieldChange = (fieldName, value) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: null }));
    }
  };

  const handleNext = () => {
    const stepErrors = validateCurrentStep(currentStep, formConfig, formData);
    if (Object.keys(stepErrors).length === 0) {
      setCurrentStep(s => s + 1);
      setErrors({});
    } else {
      setErrors(stepErrors);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(s => s - 1);
    setErrors({});
  };

  const handleSubmit = () => {
    const stepErrors = validateCurrentStep(currentStep, formConfig, formData);
    if (Object.keys(stepErrors).length === 0) {
      console.log("Submitting form data:", formData);
      
      setModalOpen(true);
    } else {
      setErrors(stepErrors);
    }
  };

  // Called when user clicks “Lukk” in the modal
  const handleModalClose = () => {
    setModalOpen(false);
    // reset entire form if desired:
    setCurrentStep(0);
    setFormData({});
    setErrors({});
  };

  const currentStepFields = getStepFields(currentStep, formConfig, formData);

  return (
    <div className="relative"> 
      {/* Modal component */}
      {modalOpen && <Modal onClose={handleModalClose} />}

      <div id="form-card" className="bg-white sm:rounded-lg shadow-lg border-cambridge-blue
                      mx-auto sm:my-10 border-0 sm:border-4 p-6 w-full
                      sm:w-2xl sm:p-12 ">
        <div className="max-w-2xl mx-auto">
          {/* HEADER */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-delft-blue mb-2">
              {formConfig.title}
            </h1>
            <p className="text-delft-blue font-bold">
              {formConfig.subtitle}
            </p>
          </div>

          {/* PROGRESS BAR */}
          <ProgressBar
            currentStep={currentStep}
            totalSteps={formConfig.steps.length}
          />

          {/* FORM SECTION */}
          <div>
            {currentStepFields.map(field => {
              if (field.type === "info") {
                return <InfoField key={field.name} field={field} />;
              }
              if (field.type === "select") {
                return (
                  <SelectField
                    key={field.name}
                    field={field}
                    value={formData[field.name]}
                    onChange={handleFieldChange}
                    error={errors[field.name]}
                  />
                );
              }
              return (
                <TextField
                  key={field.name}
                  field={field}
                  value={formData[field.name]}
                  onChange={handleFieldChange}
                  error={errors[field.name]}
                />
              );
            })}

            {/* NAVIGATION BUTTONS */}
            <StepNavigation
              currentStep={currentStep}
              totalSteps={formConfig.steps.length}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicForm;
