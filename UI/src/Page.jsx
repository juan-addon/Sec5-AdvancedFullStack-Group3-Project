import React from "react";
import Routes from "./Routes.jsx";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import NavBar from "./NavBar.jsx";
import EmployeeSearch from "./EmployeeComponents/EmployeeSearch.jsx";

export default function Page() {
  return (
    <>
      <NavBar />
      <EmployeeSearch />
      <main id="main" className="main">
        <Routes />
      </main>
      <Footer />
    </>
  );
}
