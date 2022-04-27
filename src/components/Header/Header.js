import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AddPostForm } from "../../containers/BlogPage/components/AddPostForm";
import { useAddPost } from "../../shared/queries";
import "./Header.css";

export const Header = ({
  isLoggedIn,
  setIsLoggedIn,
  userName,
  isAdmin,
  setIsAdmin,
}) => {
  const handleLogOut = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  const [showAddForm, setShowAddForm] = useState(false);
  const addMutation = useAddPost();

  const addNewBlogPost = (newBlogPost) => {
    addMutation.mutate(newBlogPost);
  };
  const handleAddFormHide = () => {
    setShowAddForm(false);
  };
  const handleAddFormShow = () => {
    setShowAddForm(true);
    console.log("ddd");
  };

  return (
    <header>
      <div className="headerInner">
        <div>
          <Link className="commonBtn" to="/">
            MY BLOG IN REACT
          </Link>
        </div>
        {isLoggedIn ? (
          <div>
            Logged in as&nbsp; <span>{userName}</span>
            &nbsp;&nbsp;
            {isAdmin && (
              <>
                <button className="commonBtn" onClick={handleAddFormShow}>
                  Create new post
                </button>
              </>
            )}
            {
              <>
                <NavLink onClick={handleLogOut} to="/react-blog/login">
                  <button className="commonBtn">Log out</button>
                </NavLink>
              </>
            }
          </div>
        ) : null}
      </div>
      {showAddForm && (
        <AddPostForm
          addNewBlogPost={addNewBlogPost}
          handleAddFormHide={handleAddFormHide}
        />
      )}
    </header>
  );
};
