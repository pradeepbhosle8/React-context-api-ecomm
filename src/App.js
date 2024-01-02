import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Contact from "./pages/Contact";
import HomePage from "./pages/HomePage";
import Pagenotfound from "./pages/Pagenotfound";
import Policy from "./pages/Policy";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/user/Dashboard";
import Private from "./components/Routes/Private";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateCategory from "./pages/admin/Pages/CreateCategory";
import CreateProduct from "./pages/admin/Pages/CreateProduct";
import Users from "./pages/admin/Pages/Users";
import UserOrder from "./pages/user/Pages/UserOrder";
import UserProfile from "./pages/user/Pages/UserProfile";
import Products from "./pages/admin/Pages/Products/Products";
import ViewProduct from "./pages/admin/Pages/Products/ViewProduct";
import EditProduct from "./pages/admin/Pages/Products/EditProduct";
import Edituser from "./pages/admin/Pages/Users/Edituser";
import SingleProduct from "./pages/SingleProduct";
import SearchPage from "./pages/SearchPage";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/admin/Pages/AdminOrders";
function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slug" element={<SingleProduct />} />
        <Route path="/searchProduct" element={<SearchPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        {/* user  */}
        <Route path="/dashboard" element={<Private />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/Orders" element={<UserOrder />} />
          <Route path="user/Profile" element={<UserProfile />} />
        </Route>
        {/* admin  */}
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/createCategory" element={<CreateCategory />} />
          <Route path="admin/createProduct" element={<CreateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/orders" element={<AdminOrders />} />
          <Route
            path="admin/products/viewProduct/:slug"
            element={<ViewProduct />}
          />
          <Route path="admin/user/editUser/:id" element={<Edituser />} />
          <Route
            path="admin/products/editProduct/:slug"
            element={<EditProduct />}
          />
          <Route path="admin/user" element={<Users />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />

        <Route path="/*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
