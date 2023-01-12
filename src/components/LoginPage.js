import { useState, useEffect } from "react";
import { getUsers } from "../api";
import { useContext } from "react";
import userContext from "../contexts/User";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [users, setUsers] = useState([]);

  const { setUser } = useContext(userContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isClicked, setIsClicked] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getUsers().then((usersFromApi) => {
      console.log(setUser);
      setIsLoading(false);
      setUsers(usersFromApi);
    });
  }, []);

  useEffect(() => {
    let myFunc;
    const navigateFunc = () => {
      navigate(-1);
    };

    const timedNavigate = () => {
      myFunc = setTimeout(navigateFunc, 1000);
    };

    if (isClicked) {
      timedNavigate();
    }
  });

  if (isLoading) {
    return <h1>...Users are loading</h1>;
  }

  return (
    <div className="users">
      {users.map((user) => {
        return (
          <button
            id={user.username}
            onClick={() => {
              setUser(user);
              setIsClicked(true);
            }}
            key={user.username}
          >
            {"@" + user.username}
            <img src={user.avatar_url} id={user.username} alt={user.username} />
          </button>
        );
      })}
    </div>
  );
};

export default LoginPage;
