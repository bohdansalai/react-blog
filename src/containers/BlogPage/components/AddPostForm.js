import React, { useState } from "react";
import "./AddPostForm.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const AddPostForm = (props) => {
  const [postTitle, setPostTitle] = useState("");
  const [postDesc, setPostDesc] = useState("");

  const handlePostTitleChange = (e) => {
    setPostTitle(e.target.value);
  };
  const handlePostDescChange = (e) => {
    setPostDesc(e.target.value);
  };
  const createPost = (e) => {
    e.preventDefault();
    const post = {
      title: postTitle,
      description: postDesc,
      liked: false,
    };

    props.addNewBlogPost(post);
    props.handleAddFormHide();
  };
  const handleEscape = (e) => {
    if (e.key === "Escape") props.handleAddFormHide();
  };

  const handleAddFormHide = props.handleAddFormHide;
  return (
    <>
      <form className="addPostForm" onSubmit={createPost}>
        <button className="hideBtn" type="button" onClick={handleAddFormHide}>
          <FontAwesomeIcon icon={faTimes} size="xl" />
        </button>
        <h2>Creating post</h2>
        <div>
          <input
            className="addFormInput"
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
            placeholder="Information "
            value={postDesc}
            onChange={handlePostDescChange}
            required
            rows="8"
          />
        </div>
        <div>
          <button type="submit" className="blackBtn">
            Add post
          </button>
        </div>
      </form>
      <div className="overlay" onClick={props.handleAddFormHide}></div>
    </>
  );
};
