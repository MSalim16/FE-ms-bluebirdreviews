import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import Navigation from "./Components/Navigation/Navigation";
import Home from "./Pages/Home/Home";
import AllReviews from "./Components/AllReviews/AllReviews";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <>
      <div>
        <Header />
        {/* <Navigation /> */}
        <nav>
          <ul>
            <li>
              <Link to="/" className="site-title">
                Home
              </Link>
            </li>
            <li>
              <Link to="/AllReviews" className="site-title">
                Reviews
              </Link>
            </li>
          </ul>
        </nav>

        {/* <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-reviews" element={<AllReviews />} />
        </Routes> */}
      </div>
    </>
  );
};

export default App;
