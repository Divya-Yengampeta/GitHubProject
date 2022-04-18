import React from "react";
import Navbar from "./components/Navbar";
import { NotFound } from "./components/NotFound";
import User from "./components/User";
import UserDetails from "./components/UserDetails";
import { Route, Routes } from "react-router-dom";

export const App = () =>
{
  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/users/:username" element={<UserDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Fragment>
  );
}