import "./Navigation.css";
import { Link } from "react-router-dom";
import LoginPage from "../../Pages/Home/LoginPage";
import AllReviews from "../AllReviews/AllReviews";

const Navigation = () => {
  return (
    <nav>
      <Link to="/" className="site-title"></Link>
      {/* <ul>
        <li>
          <Link to="/AllReviews">
            <AllReviews />
          </Link>
        </li>
        <li>
          <Link to="/LoginPage">
            <LoginPage />
          </Link>
        </li>
      </ul> */}
    </nav>
  );
};

export default Navigation;
