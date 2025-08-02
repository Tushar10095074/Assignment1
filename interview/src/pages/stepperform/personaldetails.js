import React from "react";

export default function Personaldetails({ formData, setFormData }) {
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        personal: { ...prev.personal, photo: file },
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [name]: value },
    }));
  };

  return (
    <>
      <div className="flex   w-full p-2 ">
        <div className=" w-full">
          <h1 className="block text-left w-full text-gray-500 text-2xl font-bold mb-6">
            Personal Details
          </h1>
          <form action="/" method="post">
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-700 text-left"
                htmlFor="profile"
              >
                Profile Image
              </label>
              <div className="mt-1 flex flex-col items-start">
                <span className="inline-block w-20 h-20 rounded-full overflow-hidden bg-gray-100">
                  <img
                    src={
                      formData.personal.photo
                        ? URL.createObjectURL(formData.personal.photo)
                        : "https://images.unsplash.com/photo-1531316282956-d38457be0993?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
                    }
                    alt="profilepic"
                    className="w-100 h-100 m-auto rounded-full shadow"
                  />
                </span>
                <div className="flex  items-center justify-center bg-grey-lighter">
                  <label className="w-50 flex flex-col items-center px-4 py-2 mt-5 bg-blue-300 text-gray-700 rounded-lg shadow-lg tracking-wide  border border-blue cursor-pointer hover:bg-blue hover:text-white">
                    <span className=" text-base leading-normal">Upload Image</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className=" grid gap-x-7 md:grid-cols-2">
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-700 text-left"
                  htmlFor="firstName"
                >
                  Name
                </label>
                <input
                  className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:shadow-outline"
                  id="firstName"
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.personal.name || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-700 text-left"
                  htmlFor="email"
                >
                  Gender
                </label>
                <div className="flex space-x-7">
                  <div className="flex items-center">
                    <input
                      id="male"
                      type="radio"
                      value="Male"
                      name="gender"
                      checked={formData.personal.gender === "Male"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-200 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="male"
                      className="ms-2 text-sm font-medium text-gray-900"
                    >
                      Male
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="female"
                      type="radio"
                      value="Female"
                      name="gender"
                      checked={formData.personal.gender === "Female"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-200 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="female"
                      className="ms-2 text-sm font-medium text-gray-900"
                    >
                      Female
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="others"
                      type="radio"
                      value="Others"
                      name="gender"
                      checked={formData.personal.gender === "Others"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-200 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="others"
                      className="ms-2 text-sm font-medium text-gray-900"
                    >
                      Others
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className=" grid gap-x-7 md:grid-cols-2">
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-700 text-left"
                  htmlFor="number"
                >
                  Phone Numbers
                </label>
                <input
                  className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:shadow-outline"
                  id="number"
                  type="number"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.personal.phoneNumber || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
