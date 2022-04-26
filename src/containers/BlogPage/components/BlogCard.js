import React from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./BlogCard.css";
import "../BlogPage.css";
import { Link } from "react-router-dom";

export const BlogCard = ({
  id,
  title,
  description,
  liked,
  likePost,
  deletePost,
  handleEditFormShow,
  handleSelectPost,
  isAdmin,
}) => {
  const showEditForm = () => {
    handleSelectPost();
    handleEditFormShow();
  };

  const heartFill = liked ? "crimson" : "black";

  return (
    <div className="post">
      <div className="postContent">
        <div className="postHeaderDiv">
          <div>{title}</div>
          <div>
            <button onClick={likePost}>
              <FontAwesomeIcon
                icon={faHeart}
                size="xl"
                style={{ color: heartFill }}
              />
            </button>
          </div>
        </div>
        <div className="postDesc">{description}</div>

        <div className="postControl">
          {isAdmin && (
            <div>
              <button className="commonBtn" onClick={showEditForm}>
                Edit
              </button>
              <button className="commonBtn" onClick={deletePost}>
                Delete
              </button>
            </div>
          )}

          <Link className="commonBtn" to={`/blog/${id}`}>
            Open
          </Link>
        </div>
      </div>
    </div>
  );
};
