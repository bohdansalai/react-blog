import React from "react";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./BlogCard.css";

export const BlogCard = ({
  title,
  description,
  liked,
  likePost,
  deletePost,
}) => {
  const heartFill = liked ? "crimson" : "black";

  const heartStyles = {};

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
      <button className="deleteBtn" onClick={deletePost}>
        <FontAwesomeIcon icon={faTrash} size="xl" />
      </button>
    </div>
  );
};
