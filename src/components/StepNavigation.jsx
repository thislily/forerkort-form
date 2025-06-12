import React from 'react';

/**
 * Step Navigation Component - handles Previous/Next/Submit buttons
 * @param {number} currentStep - Current step index (0-based)
 * @param {number} totalSteps - Total number of steps
 * @param {Function} onPrevious - Function to go to previous step
 * @param {Function} onNext - Function to go to next step
 * @param {Function} onSubmit - Function to submit form
 */
const StepNavigation = ({ 
  currentStep, 
  totalSteps, 
  onPrevious, 
  onNext, 
  onSubmit 
}) => {
  // Check if we're on the first step (can't go back)
  const isFirstStep = currentStep === 0;
  
  // Check if we're on the last step (show submit instead of next)
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="flex justify-between pt-6">
      {/* Previous button (hidden/disabled on first step) */}
      <button
        onClick={onPrevious}
        disabled={isFirstStep}
        className={`px-6 py-2 rounded-lg font-medium transition-colors ${
          isFirstStep
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Forrige
      </button>

      {/* Next/Submit button */}
      {isLastStep ? (
        <button
          onClick={onSubmit}
          className="px-6 py-2 border-cambridge-blue border-4  rounded-lg font-medium hover:bg-cambridge-blue/70 transition-colors"
        >
          Få uforpliktende tilbud
        </button>
      ) : (
        <button
          onClick={onNext}
          className="px-6 py-2 border-cambridge-blue border-4  rounded-lg font-medium hover:bg-cambridge-blue/70 transition-colors"
        >
          Neste
        </button>
      )}
    </div>
  );
};

export default StepNavigation;