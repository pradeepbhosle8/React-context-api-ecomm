import React from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";

const About = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout
      title={"Ecommerce App-About us"}
      description={
        "Ecommerce or electronic commerce is the trading of goods and services on the internet. It is your bustling city center or brick-and-mortar shop translated into zeroes and ones on the internet superhighway."
      }
      keywords={
        "online store.,online business.,ecom,ecommerce website,shopping cart."
      }
      author={"Pradeep Bhosle"}
    >
      <h3>AboutUs Page</h3>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  );
};

export default About;
