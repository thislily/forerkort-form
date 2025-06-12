// UTILITY FUNCTIONS for form logic
// To keep the form logic clean and pretty, we’ll create some utility functions

/**
 * Check if a field should be visible based on conditions
 * @param {Object} field - Field configuration object
 * @param {Object} formData - Current form data
 * @returns {boolean} - Whether the field should be shown
 */
export const shouldShowField = (field, formData) => {
  // If field has no conditions, always show it
  if (!field.conditions?.show_if) return true;
  
  const { show_if, logic = 'OR' } = field.conditions;
  
  // Check each condition
  const results = show_if.map(condition => {
    const fieldValue = formData[condition.field];
    
    // Handle different operators
    switch (condition.operator) {
      case 'equals':
        return fieldValue === condition.value;
      case 'in':
        // Check if the current value is in the array of allowed values
        return condition.value.includes(fieldValue);
      default:
        console.warn(`Unknown operator: ${condition.operator}`);
        return false;
    }
  });
  
  // Apply AND/OR logic
  return logic === 'AND' ? results.every(Boolean) : results.some(Boolean);
};

/**
 * Get visible fields for a specific step
 * @param {number} stepIndex - Step index
 * @param {Object} formConfig - Form configuration
 * @param {Object} formData - Current form data
 * @returns {Array} - Array of visible fields for the step
 */
export const getStepFields = (stepIndex, formConfig, formData) => {
  // Get field names for this step from the steps array
  const stepFieldNames = formConfig.steps[stepIndex];
  
  // Find the actual field configurations and filter by visibility
  return stepFieldNames
    .map(fieldName => formConfig.fields.find(f => f.name === fieldName))
    .filter(field => field && shouldShowField(field, formData));
};

/**
 * Validate fields in current step
 * @param {number} stepIndex - Current step index
 * @param {Object} formConfig - Form configuration
 * @param {Object} formData - Current form data
 * @returns {Object} - Object with any validation errors
 */
export const validateCurrentStep = (stepIndex, formConfig, formData) => {
  const errors = {};
  
  // Get visible fields for current step
  const stepFields = getStepFields(stepIndex, formConfig, formData);
  
  // Check each field for validation errors
  stepFields.forEach(field => {
    // Only validate if field is required
    if (field.required) {
      // Check if field is empty
      if (!formData[field.name] || formData[field.name].trim() === '') {
        errors[field.name] = `${field.label} er påkrevd`;
      }
    }
  });

  // Additional validation for email
  if (formData.email && formData.email.trim() !== '') {
    if (!isValidEmail(formData.email)) {
      errors.email = 'Ugyldig e-postadresse';
    }
  }

  // Additional validation for phone
  if (formData.phone && formData.phone.trim() !== '') {
    if (!isValidNorwegianPhone(formData.phone)) {
      errors.phone = 'Ugyldig norsk telefonnummer';
    }
  }

  // Additional validation for name
  if (formData.name && formData.name.trim() !== '') {
    if (!isValidName(formData.name)) {
      errors.name = 'Navn kan kun inneholde bokstaver, mellomrom og bindestreker';
    }
  }

  return errors;
};

/**
 * Simple email validation
 * @param {string} email - Email to validate
 * @returns {boolean} - Whether email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
};

/**
 * Simple Norwegian phone validation
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - Whether phone is valid
 */
export const isValidNorwegianPhone = (phone) => {
  // Remove spaces and check Norwegian format
  const cleanPhone = phone.replace(/\s/g, '');
  // Norwegian mobile: +47 followed by 8 digits starting with 4,9 or landline starting with 2,3,5,6,7
  const norwegianPhoneRegex = /^(\+47|0047|47)?[2-9]\d{7}$/;
  return norwegianPhoneRegex.test(cleanPhone);
};

/**
 * Simple name validation
 * @param {string} name - Name to validate
 * @returns {boolean} - Whether name is valid
 */
export const isValidName = (name) => {
  // Allow letters (including Norwegian), spaces, hyphens, apostrophes, minimum 2 characters
  const nameRegex = /^[a-zA-ZæøåÆØÅ\s\-']{2,}$/;
  return nameRegex.test(name.trim());
};