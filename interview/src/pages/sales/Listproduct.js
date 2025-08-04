import React, { useContext, useEffect, useState } from "react";
import Table from "../../component/VTable";
import Layout from "../../component/Layout";
import { Link } from "react-router-dom";
import { RoleContext } from "../../context/RoleContext";
import { fetchWithAuth } from "../../utils/fetchWithAuth";
import { getProductList } from "../../services/apiService";

export default function Product() {
  const {role} = useContext(RoleContext)
  console.log(role)
  const columns = [
    { title: "#", dataIndex: "id", key: "id" },
    { title: "Product Name", dataIndex: "name", key: "name" },
    {
      title: "Product Image",
      dataIndex: "productimg",
      key: "productimg",
      render: (e) => (
        <div className="m-auto flex justify-center">
          <img
            src={e.image ||"/assets/image/shirt.webp" }
            alt="productimg"
            width="50px"
            height="50px"
            className="rounded"
          />
        </div>
      ),
    },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Price", dataIndex: "price", key: "price" },
  ];

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);



  const handlePageChange = (event, value) => {
    setPage(value);
    getProductList(value, rowsPerPage, setData, setPage, setRowsPerPage, setTotalPages);
  };

  const handleRowsPerPageChange = (value) => {
    setRowsPerPage(Number(value));
    setPage(1);
    getProductList(1, value, setData, setPage, setRowsPerPage, setTotalPages);
  };

  useEffect(() => {
    getProductList(page, rowsPerPage, setData, setPage, setRowsPerPage, setTotalPages);
  }, [page, rowsPerPage]);

  return (
    <Layout>
      <div className="bg-white p-4 mb-2 rounded-lg dark:border-gray-700 mt-14">
        <div>
          <h3 className="!text-defaulttextcolor dark:!text-defaulttextcolor/70 dark:text-white text-left dark:hover:text-white text-[1.125rem] font-semibold">
            Product
          </h3>
        </div>
      </div>
      <div className="bg-white">
        <div className="p-4 rounded-lg dark:border-gray-700 ">
          <div className="flex justify-end mb-3 p-2">
            <Link
              to="/Add-product"
              className="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300"
            >
              Add Product
            </Link>
          </div>
          <Table
            cols={columns}
            data={data}
            page={page}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            handleRowsPerPageChange={handleRowsPerPageChange}
          />
        </div>
      </div>
    </Layout>
  );
}
