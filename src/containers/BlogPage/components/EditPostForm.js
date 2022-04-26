import React, { useState, useEffect } from "react";
import "./EditPostForm.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const EditPostForm = (props) => {
  const [postTitle, setPostTitle] = useState(props.selectedPost.title);
  const [postDesc, setPostDesc] = useState(props.selectedPost.description);

  const handlePostTitleChange = (e) => {
    setPostTitle(e.target.value);
  };
  const handlePostDescChange = (e) => {
    setPostDesc(e.target.value);
  };
  const updatePost = (e) => {
    e.preventDefault();
    const post = {
      id: props.selectedPost.id,
      title: postTitle,
      description: postDesc,
      liked: props.selectedPost.liked,
    };

    props.editBlogPost(post);
    props.handleEditFormHide();
  };
  const handleEscape = (e) => {
    if (e.key === "Escape") props.handleEditFormHide();
  };
  useEffect(() => {
    window.addEventListener("keyup", handleEscape);
    return () => window.removeEventListener("keyup", handleEscape);
  }, [props]);

  return (
    <>
      <form className="editPostForm" onSubmit={updatePost}>
        <button
          className="hideBtn"
          type="button"
          onClick={props.handleEditFormHide}
        >
          <FontAwesomeIcon icon={faTimes} size="xl" />
        </button>
        <h2>Editing post</h2>
        <div>
          <input
            className="editFormInput"
            type="text"
            name="postTitle"
            placeholder="Title"
            value={postTitle}
            onChange={handlePostTitleChange}
            required
          />
        </div>
        <div>
          <textarea
            className="addFormInput"
            name="postDescription"
            placeholder="Information"
            value={postDesc}
            onChange={handlePostDescChange}
            required
            rows="8"
          />
        </div>
        <div className="addPostControl">
          <button type="submit" className="commonBtn">
            Save post
          </button>
        </div>
      </form>
      <div className="overlay" onClick={props.handleEditFormHide}></div>
    </>
  );
};
