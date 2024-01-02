React Ecommerce App
npx create-react-app clinet_react

npm i bootstrapp ---save
index.js file => import bootstrap
// bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";
// bootstrap bundel js
import "bootstrap/dist/js/bootstrap.bundle.min.js";

create folders like
src=>
components =>Layout
->Header.js
->Footer.js
-Layout.js

pages
HomePage.js file => import
import Layout from '../components/Layout/Layout';

    <Layout>
        <h3>HomePage Layout</h3>
    </Layout>

    same as other pages

    go to app.js file =>
    #Routing

app.js file => import react-router-dom
import { Routes, Route } from "react-router-dom";
import {DependentPages} from 'DependentPages'
<Routes>
<Route path="/" element={<HomePage />} />
<Route path="/about" element={<About />} />
<Route path="/contact" element={<Contact />} />
<Route path="/policy" element={<Policy />} />

        <Route path="/*" element={<Pagenotfound />} />
    </Routes>

#React Navigation
Dependencies  
 npm i react-router-dom

index.js file => import react-router-dom
import {BrowserRouter } from 'react-router-dom';

  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>

react project SEO FriendlyProject
install helmet
npm i react-helmet --save
open Layout.js file
import {Helmet} from 'react-helmet;
