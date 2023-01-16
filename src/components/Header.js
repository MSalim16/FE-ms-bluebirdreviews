import { useContext } from "react";
import userContext from "../contexts/User";
import TwitterLogo from "../images/twitter.png";
import { getUsers } from "../api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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

        <h4 className="loggedin">
          Logged in as: <br></br>@{`${user.username}`}
        </h4>
        <img className="avatar" src={`${user.avatar_url}`}></img>
      </header>
    </>
  );
};

export default Header;
