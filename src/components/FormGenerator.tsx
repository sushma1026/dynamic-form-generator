import React, { useState } from "react";

interface FormData {
  formTitle: string;
  formDescription: string;
  fields: any[]; // Assuming fields is an array of objects
}
const FormGenerator = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [formData, setFormData] = useState<FormData | null>(null);
  const [formValues, setFormValues] = useState<Partial<Record<string, any>>>(
    {}
  );
  const [successMessage, setSuccessMessage] = useState("");

  // Handle JSON input change
  const handleJsonInputChange = (e: any) => {
    setJsonInput(e.target.value);
  };

  // Handle form submission to generate the form
  const handleFormSubmit = () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      setFormData(parsedData);
    } catch (error) {
      alert("Invalid JSON format");
    }
  };

  // Handle form data change
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Handle final form submission (log data to console and show success message)
  const handleFinalSubmit = (e: any) => {
    e.preventDefault();
    console.log("Submitted Data:", formValues);
    setSuccessMessage("Form submitted successfully!");
  };

  // Render the form based on parsed JSON
  const renderForm = (data: any) => {
    return data.fields.map((field: any) => {
      switch (field.type) {
        case "text":
        case "email":
          return (
            <div key={field.id} className="mb-4">
              <label htmlFor={field.id} className="block text-sm font-medium">
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.id}
                name={field.id}
                placeholder={field.placeholder}
                required={field.required}
                value={formValues[field.id] || ""}
                onChange={handleInputChange}
                className="mt-2 p-2 w-full border border-gray-300 rounded"
              />
            </div>
          );
        case "select":
          return (
            <div key={field.id} className="mb-4">
              <label htmlFor={field.id} className="block text-sm font-medium">
                {field.label}
              </label>
              <select
                id={field.id}
                name={field.id}
                required={field.required}
                value={formValues[field.id] || ""}
                onChange={handleInputChange}
                className="mt-2 p-2 w-full border border-gray-300 rounded"
              >
                {field.options.map((option: any) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          );
        case "radio":
          return (
            <div key={field.id} className="mb-4">
              <label className="block text-sm font-medium">{field.label}</label>
              <div className="mt-2">
                {field.options.map((option: any) => (
                  <label key={option.value} className="mr-4">
                    <input
                      type="radio"
                      name={field.id}
                      value={option.value}
                      required={field.required}
                      checked={formValues[field.id] === option.value}
                      onChange={handleInputChange}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
          );
        case "textarea":
          return (
            <div key={field.id} className="mb-4">
              <label htmlFor={field.id} className="block text-sm font-medium">
                {field.label}
              </label>
              <textarea
                id={field.id}
                name={field.id}
                placeholder={field.placeholder}
                required={field.required}
                value={formValues[field.id] || ""}
                onChange={handleInputChange}
                className="mt-2 p-2 w-full border border-gray-300 rounded"
              />
            </div>
          );
        default:
          return null;
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Dynamic Registration Form</h1>

      {/* JSON Input Field */}
      <textarea
        value={jsonInput}
        onChange={handleJsonInputChange}
        placeholder="Paste JSON here..."
        className="mb-4 p-2 w-full border border-gray-300 rounded"
        rows={10}
      />

      {/* Submit Button to generate the form */}
      <button
        onClick={handleFormSubmit}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Generate Form
      </button>

      {/* Display Generated Form */}
      {formData && (
        <form className="mt-6" onSubmit={handleFinalSubmit}>
          <h2 className="text-lg font-semibold mb-4">{formData.formTitle}</h2>
          <p className="mb-4">{formData.formDescription}</p>

          {renderForm(formData)}

          <button type="submit" className="bg-green-500 text-white p-2 rounded">
            Submit
          </button>
        </form>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="mt-4 text-green-600 font-semibold">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default FormGenerator;
