import React from 'react';

/**
 * Info Field Component - displays informational messages
 * @param {Object} field - Field configuration object
 */
export const InfoField = ({ field }) => {
  return (
    <div className="mb-6 bg-blue-50 border-l-4 border-blue-300 p-4 rounded-r-lg">
      <h4 className="text-delft-blue font-medium mb-1">{field.label}</h4>
      <p className="text-delft-blue text-sm">{field.content}</p>
    </div>
  );
};

/**
 * Select Field Component - dropdown/select inputs
 * @param {Object} field - Field configuration object
 * @param {string} value - Current field value
 * @param {Function} onChange - Change handler function
 * @param {string} error - Error message (if any)
 */
export const SelectField = ({ field, value, onChange, error }) => {
  return (
    <div className="mb-6">
      {/* Field label with required indicator */}
      <label className="block text-sm font-medium text-delft-blue mb-2">
        {field.label}
        {field.required && <span className="text-red ml-1">*</span>}
      </label>

      {/* Select dropdown */}
      <select
        value={value || ''}
        onChange={(e) => onChange(field.name, e.target.value)}
        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-cambridge-blue focus:border-cambridge-blue ${
          error ? 'border-red-700' : 'border-gray-300'
        }`}
      >
        <option value="">Velg...</option>
        {field.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Show error message */}
      {error && (
        <p className="text-red-700 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

/**
 * Text Field Component - text/email/tel inputs
 * @param {Object} field - Field configuration object
 * @param {string} value - Current field value
 * @param {Function} onChange - Change handler function
 * @param {string} error - Error message (if any)
 */
export const TextField = ({ field, value, onChange, error }) => {
  return (
    <div className="mb-6">
      {/* Field label with required indicator */}
      <label className="block text-sm font-medium text-delft-blue mb-2">
        {field.label}
        {field.required && <span className="ml-1">*</span>}
      </label>

      {/* Text input */}
      <input
        type={field.type}
        value={value || ''}
        onChange={(e) => onChange(field.name, e.target.value)}
        placeholder={field.placeholder}
        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-cambridge-blue focus:border-cambridge-blue ${
          error ? 'border-red-700' : 'border-gray-300'
        }`}
      />

      {/* Show error message */}
      {error && (
        <p className="text-red-700 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};