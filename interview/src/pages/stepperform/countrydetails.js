import React, { useEffect, useState } from "react";
import Select from "react-select";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

export default function CountryDetails({ formData, setFormData }) {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  const getAllCountries = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetchWithAuth(
  "https://reactinterviewtask.codetentaclestechnologies.in/api/api/country-list",
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }
);


      const data = await res.json();
      if (data?.data) {
        const formatted = data.data.map((c) => ({
          value: c.id,
          label: c.name,
        }));
        setCountries(formatted);
      }
    } catch (err) {
      console.error("Error fetching countries:", err);
    }
  };

  const getAllStates = async (countryId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetchWithAuth(
  `https://reactinterviewtask.codetentaclestechnologies.in/api/api/state-list?country_id=${countryId}`,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }
);


      const data = await res.json();
      if (data?.data) {
        const formatted = data.data.map((s) => ({
          value: s.id,
          label: s.name,
        }));
        setStates(formatted);
      }
    } catch (err) {
      console.error("Error fetching states:", err);
    }
  };

  useEffect(() => {
    getAllCountries();
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
    getAllStates(value.value);
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
