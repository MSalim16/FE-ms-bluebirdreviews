import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// pages
import Home from "./pages/Home/Home";
import Review from "./pages/Reviews/Review";

// layouts
import NavBar from "./components/Navbar";
import LoginPage from "./components/LoginPage";
import Header from "./components/Header";
import SingleReview from "./components/SingleReview";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<NavBar />}>
      <Route index element={<Home />} />
      <Route path="reviews" element={<Review />} />
      <Route path="reviews/:review_id" element={<SingleReview />} />
      <Route path="login-page" element={<LoginPage />} />
    </Route>
  )
);

function App() {
  return (
    <div>
      <Header />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
