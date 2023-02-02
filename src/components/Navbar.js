import { Outlet, NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCategories } from "../api";
import Dropdown from "./Dropdown";
import UserContext from "../contexts/User";
import { useContext } from "react";
import {
  BsListUl,
  BsFillHouseFill,
  BsBoxArrowInRight,
  BsPeopleFill,
} from "react-icons/bs";

const NavBar = () => {
  const [categories, setCategories] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    getCategories().then(fetchedCategories => {
      setCategories(fetchedCategories);
    });
  }, []);

  return (
    <div className="navbar-style">
      <header>
        <nav>
          <NavLink to="/">
            <BsFillHouseFill size={30} />
          </NavLink>

          <Dropdown
            className="nav-item"
            label={<BsListUl className="categoryicon" size={30} />}
            items={categories}
            itemLabel="slug"
            display="nav-drop"
          />
          {user.username !== "guest" && (
            <NavLink to="login-page">
              <BsPeopleFill size={30} />
            </NavLink>
          )}
          {user.username === "guest" && (
            <NavLink to="login-page">
              <BsBoxArrowInRight size={30} />
            </NavLink>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default NavBar;
