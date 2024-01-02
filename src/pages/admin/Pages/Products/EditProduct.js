import React, { useState, useEffect } from "react";
import Layout from "../../AdminLayout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EditProduct = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");
  const [products, setProducts] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    shippingAddress: "",
  });

  const { name, description, price, quantity, shippingAddress } = products;

  const navigate = useNavigate();
  const params = useParams();

  // handle Update product submit function
  const handleUpdateProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const ProductData = new FormData();
      ProductData.append("name", products.name);
      ProductData.append("description", products.description);
      ProductData.append("price", products.price);
      ProductData.append("quantity", products.quantity);
      ProductData.append("shippingAddress", products.shippingAddress);
      ProductData.append("category", category);
      photo && ProductData.append("photo", photo);

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
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/products/update-product/${id}`,

        ProductData
      );
      console.log(data);
      if (data?.success) {
        toast.success("Product Update successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong Update product");
    }
  };

  // on Input change function
  const onInputChange = (e) => {
    setProducts({
      ...products,
      [e.target.name]: e.target.value,
    });
  };

  // go to back function
  const handleGoBack = () => {
    navigate("/dashboard/admin/products/");
  };

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
    }
  };

  // get Single Product using slug
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/getSingleProducts/${params.slug}`
      );
      // console.log(data);
      if (data.success) {
        setProducts(data.product);
        setId(data.product._id);
        setCategory(data.product.category._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffects
  useEffect(() => {
    getAllCategories();
    getSingleProduct();
  }, []);

  return (
    <>
      <Layout title={"Update Product"}>
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-header bg-primary">
                    <h3 className="text-white float-start">Update Product</h3>
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
                          value={category}
                        >
                          <option disabled>Please Select Category</option>
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
                        {photo ? (
                          <div className="text-left">
                            <img
                              src={URL.createObjectURL(photo)}
                              alt="product_photo"
                              width={"100px"}
                              className="img img-responsive"
                            />
                          </div>
                        ) : (
                          <div className="text-left">
                            <img
                              src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${id}`}
                              alt="product_photo"
                              width={"150px"}
                              style={{
                                border: "5px solid #e1e1e1",
                                padding: "10px",
                              }}
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
                          value={description}
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
                          value={price}
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
                          value={quantity}
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
                          value={shippingAddress ? "Yes" : "No"}
                        >
                          <option disabled>
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
                            onClick={handleUpdateProductSubmit}
                          >
                            Update Product
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
    </>
  );
};

export default EditProduct;
