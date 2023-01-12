import { useContext } from "react";
import userContext from "../../contexts/User";

function Home() {
  const { user } = useContext(userContext);

  return (
    <div>
      <p>Welcome @{`${user.username}`}</p>
    </div>
  );
}

export default Home;
