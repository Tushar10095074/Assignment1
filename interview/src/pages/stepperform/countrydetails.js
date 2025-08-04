import React, { useEffect, useState } from "react";
import Select from "react-select";
import {getAllCountries, getAllStates} from '../../services/apiService'

export default function CountryDetails({ formData, setFormData }) {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

 
  useEffect(() => {
    getAllCountries(setCountries);
  }, []);

  return (
    <>
      <div className="flex w-full p-2">
        <div className="w-full">
          <h1 className="block text-left w-full text-gray-800 text-2xl font-bold mb-6">
            Details
          </h1>
          <form action="/" method="post">
            <div className="grid gap-2 md:grid-cols-2">
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-700 text-left"
                  htmlFor="country"
                >
                  Select Country
                </label>
                <Select
  className="basic-single text-left text-sm text-gray-700 rounded border border-gray-200"
  classNamePrefix="select"
  options={countries}
  value={formData.country}
  onChange={(value) => {
    debugger
    setFormData((prev) => ({
      ...prev,
      country: value,
      state: null,
    }));
    console.log(formData)
    getAllStates(value.value, setStates);
  }}
/>

              </div>

              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-700 text-left"
                  htmlFor="state"
                >
                  Select State
                </label>
                <Select
                  className="basic-single text-left text-sm rounded text-gray-700 border border-gray-200"
                  classNamePrefix="select"
                  options={states}
                  value={formData?.state || ""}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, state: value }))
                  }
                  isDisabled={!formData?.country} 
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
