import React, { useEffect, useState } from "react";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./BlogCard.css";
import "../BlogPage.css";
import { useParams } from "react-router-dom";
import { postsUrl } from "../../../shared/projectData";
import axios from "axios";

export const BlogCardPage = ({
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

  const { postId } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    axios
      .get(postsUrl + postId)
      .then((response) => {
        setPost(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [postId, setPost]);

  const heartFill = post.liked ? "crimson" : "black";

  return (
    <div className="post">
      <div className="postContent">
        <h2>{post.title}</h2>
        <p>{post.description}</p>
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
      {isAdmin && (
        <div className="postControl">
          <button onClick={showEditForm}>
            <FontAwesomeIcon icon={faEdit} size="xl" />
          </button>
          <button className="deleteBtn" onClick={deletePost}>
            <FontAwesomeIcon icon={faTrash} size="xl" />
          </button>
        </div>
      )}
    </div>
  );
};
