import React from "react";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./BlogCard.css";

export const BlogCard = ({
  title,
  description,
  liked,
  likePost,
  deletePost,
  handleEditFormShow,
  handleSelectPost,
}) => {
  const showEditForm = () => {
    handleSelectPost();
    handleEditFormShow();
  };

  const heartFill = liked ? "crimson" : "black";

  return (
    <div className="post">
      <div className="postContent">
        <h2>{title}</h2>
        <p>{description}</p>
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
      <div className="postControl">
        <button onClick={showEditForm}>
          <FontAwesomeIcon icon={faEdit} size="xl" />
        </button>
        <button className="deleteBtn" onClick={deletePost}>
          <FontAwesomeIcon icon={faTrash} size="xl" />
        </button>
      </div>
    </div>
  );
};
