import React, { useState, useEffect } from "react";
import Layout from "../AdminLayout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { Select, Space } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [products, setProducts] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    shippingAddress: "",
  });

  const { name, description, price, quantity, shippingAddress } = products;

  const navigate = useNavigate();

  // get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/getCategory`
      );
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting all categories");
    }
  };

  // Create a New Product
  const onInputChange = (e) => {
    setProducts({
      ...products,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const ProductData = new FormData();
      ProductData.append("name", products.name);
      ProductData.append("description", products.description);
      ProductData.append("price", products.price);
      ProductData.append("quantity", products.quantity);
      ProductData.append("shippingAddress", products.shippingAddress);
      ProductData.append("category", category);
      ProductData.append("photo", photo);

      // console.log(
      //   name,
      //   description,
      //   price,
      //   quantity,
      //   shippingAddress,
      //   category,
      //   photo
      // );
      // console.log(ProductData);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/products/create-product`,

        ProductData
      );
      console.log(data);
      if (data?.success) {
        toast.success("Product created successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong create product");
    }
  };

  // handel go back
  const handleGoBack = () => {
    navigate("/dashboard/admin/products");
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Layout title={"Create Product"}>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header bg-primary">
                  <h3 className="text-white float-start">Create Product</h3>
                  <button
                    className="btn btn-light float-end btn-sm"
                    onClick={handleGoBack}
                  >
                    Go Back
                  </button>
                </div>
                <div className="card-body">
                  <form action="">
                    <div className="mb-3 col-sm-4">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={(e) => {
                          setCategory(e.target.value);
                        }}
                        defaultValue={"DEFAULT"}
                      >
                        <option value="DEFAULT" disabled>
                          Please Select Category
                        </option>
                        {categories?.map((c) => {
                          return (
                            <option key={c._id} value={c._id}>
                              {c.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className="mb-3 ">
                      <label
                        htmlFor="uploadProduct"
                        className="btn btn-outline-primary "
                      >
                        {photo ? photo.name : "Upload photo"}
                        <input
                          type="file"
                          name="photo"
                          id="uploadProduct"
                          accept="image/*"
                          onChange={(e) => setPhoto(e.target.files[0])}
                          hidden
                        />
                      </label>
                    </div>
                    <div className="mb-3">
                      {photo && (
                        <div className="text-left">
                          <img
                            src={URL.createObjectURL(photo)}
                            alt="product_photo"
                            width={"100px"}
                            className="img img-responsive"
                          />
                        </div>
                      )}
                    </div>

                    <div className="mb-3 col-lg-4">
                      <label htmlFor="name">Enter Product Name</label>
                      <input
                        type="text"
                        id="name"
                        className="form-control"
                        name="name"
                        placeholder="Enter Product Name"
                        value={name}
                        onChange={(e) => onInputChange(e)}
                      />
                    </div>

                    <div className="mb-3 col-lg-4">
                      <label htmlFor="description">
                        Enter Product description
                      </label>
                      <textarea
                        name="description"
                        id="description"
                        cols="3"
                        rows="3"
                        className="form-control"
                        placeholder="Enter Product Description"
                        onChange={(e) => onInputChange(e)}
                      ></textarea>
                    </div>

                    <div className="mb-3 col-lg-4">
                      <label htmlFor="price">Enter Product price</label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        className="form-control"
                        placeholder="Enter Product Price"
                        onChange={(e) => onInputChange(e)}
                      />
                    </div>

                    <div className="mb-3 col-lg-4">
                      <label htmlFor="quantity">Enter Product quantity</label>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        className="form-control"
                        placeholder="Enter Product quantity"
                        onChange={(e) => onInputChange(e)}
                      />
                    </div>

                    <div className="mb-3 col-lg-4">
                      <label htmlFor="shippingAddress">
                        Enter Product shippingAddress
                      </label>
                      {/* <textarea
                        name="shippingAddress"
                        id="shippingAddress"
                        cols="3"
                        rows="3"
                        className="form-control"
                        placeholder="Enter Product shippingAddress"
                        onChange={(e) => onInputChange(e)}
                      ></textarea> */}
                      <select
                        className="form-select"
                        name="shippingAddress"
                        aria-label="Default select example"
                        onChange={(e) => {
                          onInputChange(e);
                        }}
                        defaultValue={"DEFAULT"}
                      >
                        <option value="DEFAULT" disabled>
                          Please Select shippingAddress
                        </option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <div className="form-action">
                        <button
                          className="btn btn-primary"
                          type="submit"
                          onClick={handleCreateProductSubmit}
                        >
                          Create Product
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="container-fluid">
          <div className="row"></div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
