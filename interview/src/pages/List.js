import React, { useEffect, useState } from "react";
import Table from "../component/VTable";
import Layout from "../component/Layout";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { fetchWithAuth } from "../utils/fetchWithAuth";

export default function List() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const deleteUser = async (id) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const result = await fetchWithAuth(
  `https://reactinterviewtask.codetentaclestechnologies.in/api/api/user-delete/${id}`,
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

  const columns = [
    { title: "#", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone No", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    {
      title: "Action",
      render: (item) => (
        <div className="flex gap-1 text-center justify-center">
          <button onClick={() => deleteUser(item.id)}>
            <Trash2 color="#ff0000" size={16} />
          </button>
        </div>
      ),
      key: "action",
      width: 90,
    },
  ];

  const getUserList = async (pageNo = page, perPage = rowsPerPage) => {
    const token = localStorage.getItem("token");
    try {
      const result = await fetchWithAuth(
  `https://reactinterviewtask.codetentaclestechnologies.in/api/api/user-list?page=${pageNo}&perPage=${perPage}`,
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

  const handlePageChange = (event, value) => {
    setPage(value);
    getUserList(value, rowsPerPage);
  };

  const handleRowsPerPageChange = (value) => {
    setRowsPerPage(Number(value));
    setPage(1);
    getUserList(1, value);
  };

  useEffect(() => {
    getUserList(page, rowsPerPage);
  }, []);

  return (
    <Layout>
      <div className="bg-white p-4 mb-2 rounded-lg dark:border-gray-700 mt-14">
        <div>
          <h3 className="!text-defaulttextcolor dark:!text-defaulttextcolor/70 dark:text-white text-left dark:hover:text-white text-[1.125rem] font-semibold">
            List
          </h3>
        </div>
      </div>

      <div className="bg-white">
        <div className="p-4 rounded-lg dark:border-gray-700">
          <div className="flex justify-end mb-3 p-2">
            <Link
              to="/Stepperform"
              className="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300"
            >
              Add
            </Link>
          </div>

          <Table
            cols={columns}
            data={data}
            totalPages={totalPages}
            page={page}
            handlePageChange={handlePageChange}
            handleRowsPerPageChange={handleRowsPerPageChange}
          />
        </div>
      </div>
    </Layout>
  );
}
