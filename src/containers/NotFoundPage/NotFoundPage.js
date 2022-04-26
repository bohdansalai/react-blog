import React from "react";
import { Result } from "antd";
import "./NotFoundPage.css";
import { NavLink, useLocation } from "react-router-dom";

export const NotFoundPage = () => {
  const location = useLocation();
  console.log(location);
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <NavLink to="/" className="commonBtn">
          Back Home
        </NavLink>
      }
    />
  );
};
