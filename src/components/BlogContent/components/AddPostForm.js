import React from "react";
import "./AddPostForm.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const AddPostForm = ({ handleAddFormHide }) => {
  return (
    <>
      <form className="addPostForm" action="">
        <button className="hideBtn">
          <FontAwesomeIcon
            icon={faTimes}
            onClick="handleAddFormHide"
            size="xl"
          />
        </button>
        <h2>Creating post</h2>
        <div>
          <input
            className="addFormInput"
            type="text"
            name="postTitle"
            placeholder="Title"
          />
        </div>
        <div>
          <textarea
            className="addFormInput"
            name="postDescription"
            placeholder="Information "
          />
        </div>
        <div>
          <button
            type="button"
            onClick={handleAddFormHide}
            className="blackBtn "
          >
            Add post
          </button>
        </div>
      </form>
      <div className="overlay" onClick={handleAddFormHide}></div>
    </>
  );
};
