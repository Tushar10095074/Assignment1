import { fetchWithAuth } from "../utils/fetchWithAuth";

export const login = async (e, formData, setError, setRole, navigate) => {
    e.preventDefault();
    setError("");

    try {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }
        debugger
        localStorage.setItem("role", data.role);
        setRole(data.role);
        localStorage.setItem("token", data.token);

        if (data.role === "Admin") {
            navigate("/List");
        } else {
            navigate("/Product")
        }
    } catch (err) {
        setError(err.message);
    }
};

export const handleAddProduct = async (e, formData, alert, navigate) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.price || !formData.image) {
        alert("Please fill all fields and select an image");
        return;
    }

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("description", formData.description);
    payload.append("price", formData.price);
    payload.append("image", formData.image);

    try {
        const res = await fetchWithAuth(
            `${process.env.REACT_APP_API_URL}/add-product`,
            {
                method: "POST",
                body: payload,
            }
        );


        const result = await res.json();

        if (res.ok) {
            alert("Product added successfully!");
            navigate("/Product");
        } else {
            alert(result.message || "Failed to add product");
        }
    } catch (err) {
        alert("Error: " + err.message);
    }
};


export const getAllCountries = async (setCountries) => {
    try {
        const res = await fetchWithAuth(
            `${process.env.REACT_APP_API_URL}/country-list`,
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

export const getAllStates = async (countryId, setStates) => {
    try {
        const res = await fetchWithAuth(
            `${process.env.REACT_APP_API_URL}/state-list?country_id=${countryId}`,
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


export const handleAddUser = async (formData, setActiveStep) => {
    try {
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
            `${process.env.REACT_APP_API_URL}/register`,
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

export const getUserList = async (pageNo, perPage, setData, setPage, setTotalPages) => {
    try {
        const result = await fetchWithAuth(
            `${process.env.REACT_APP_API_URL}/user-list?page=${pageNo}&perPage=${perPage}`,
            {
                method: "GET",
            }
        );


        if (!result.ok) throw new Error(`Error: ${result.status}`);

        const resData = await result.json();
        setData(resData.data);
        setPage(resData.currentPage);
        setTotalPages(resData.lastPage);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
};


export const deleteUser = async (id, page, rowsPerPage) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
        const result = await fetchWithAuth(
            `${process.env.REACT_APP_API_URL}/user-delete/${id}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );


        if (!result.ok) throw new Error(`Error: ${result.status}`);
        alert("User deleted successfully");
        getUserList(page, rowsPerPage);
    } catch (error) {
        alert("Failed to delete user: " + error.message);
    }
};

export const getProductList = async (pageNo, perPage, setData, setPage, setRowsPerPage, setTotalPages) => {

    try {
        const result = await fetchWithAuth(
            `${process.env.REACT_APP_API_URL}/product-list?page=${pageNo}&perPage=${perPage}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );


        if (!result.ok) throw new Error(`Error: ${result.status}`);

        const resData = await result.json();

        setData(resData.data);
        setPage(resData.currentPage || pageNo);
        setRowsPerPage(resData.perPage || perPage);
        setTotalPages(resData.lastPage || 1);
    } catch (err) {
        console.error("Error fetching products:", err);
    }
};