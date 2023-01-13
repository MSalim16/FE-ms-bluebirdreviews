import { Outlet, NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCategories } from "../api";
import Dropdown from "./Dropdown";

const NavBar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(fetchedCategories => {
      setCategories(fetchedCategories);
    });
  }, []);

  return (
    <div className="navbar-style">
      <header>
        <nav>
          <NavLink to="reviews">Reviews</NavLink>
          <NavLink to="/">Home</NavLink>
          <NavLink to="login-page">Login</NavLink>
          <Dropdown
            className="nav-item"
            label="Categories"
            items={categories}
            itemLabel="slug"
            display="nav-drop"
          />
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default NavBar;
