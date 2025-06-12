import React from "react";

/**
 * Progress Bar Component - shows how far through the steps we are
 * @param {number} currentStep - Current step index (0-based)
 * @param {number} totalSteps - Total number of steps
 */
const ProgressBar = ({ currentStep, totalSteps }) => {
  // Calculate percentage completed
  const progress = ((currentStep ) / totalSteps) * 100;

  // Step names for display
  const stepNames = [
    "1/4 Grunnleggende informasjon",
    "2/4 Eksisterende sertifiseringer",
    "3/4 Preferanser og krav",
    "4/4 Kontaktinformasjon",
  ];

  return (
    <div className="mb-8">
      {/* Centered step name */}
      <div className="text-center text-delft-blue font-medium mb-4">
        {stepNames[currentStep]}
      </div>

      {/* Progress bar with car icon */}
      <div className="relative">
        {/* Progress bar track (cambridge blue background) */}
        <div className="w-full bg-cambridge-blue rounded-full h-4"></div>

        {/* Progress bar fill (delft blue) */}
        <div
          className="absolute top-0 left-0 bg-delft-blue rounded-full h-4 transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>

        {/* Car icon positioned based on progress */}
        <div
          className="absolute top-0 transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${progress}%`, top: "8px" }}
        >
          <img
            src="assets/car.png"
            alt="Progress car"
            className="w-[32px] mb-2 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
