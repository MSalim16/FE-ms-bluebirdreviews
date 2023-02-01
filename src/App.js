import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { useState } from "react";

// pages
import Home from "./pages/Home/Home";
import Review from "./pages/Reviews/Review";

import UserContext from "./contexts/User";

// layouts
import NavBar from "./components/Navbar";
import LoginPage from "./components/LoginPage";
import Header from "./components/Header";
import SingleReview from "./components/SingleReview";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<NavBar />}>
      <Route index element={<Review />} />
      <Route path="categories/:category" element={<Review />} />
      <Route path="reviews/:review_id" element={<SingleReview />} />
      <Route path="login-page" element={<LoginPage />} />
    </Route>
  )
);

function App() {
  const [user, setUser] = useState({
    username: "guest",
    name: "guest",
    avatar_url: "https://www.computerhope.com/jargon/g/guest-user.jpg",
  });
  return (
    <div className="app">
      <UserContext.Provider value={{ user, setUser }}>
        <div>
          <Header />
          <RouterProvider router={router} />
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;
