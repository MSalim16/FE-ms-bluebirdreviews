import { useContext } from "react";
import userContext from "../contexts/User";
import TwitterLogo from "../images/twitter.png";
import { getUsers } from "../api";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Tooltip, IconButton, DeleteIcon } from "react-tooltip";

import "react-tooltip/dist/react-tooltip.css";

const Header = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(userContext);

  useEffect(() => {
    getUsers().then(usersFromApi => {
      setIsLoading(false);
      setUsers(usersFromApi);
    });
  }, []);

  if (isLoading) {
    return <h1>...Page is loading</h1>;
  }

  return (
    <>
      <header className="Header">
        <a href="https://msbluebirdreviews.netlify.app/">
          <img className="twitterlogo" src={TwitterLogo}></img>
        </a>

        <h1>Blue Bird Reviews</h1>

        <div className="loggedin">
          <img className="avatar" src={`${user.avatar_url}`}></img>

          <h5 className="logas">@{`${user.username}`}</h5>
        </div>
      </header>
    </>
  );
};

export default Header;
