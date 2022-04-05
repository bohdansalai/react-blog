import React from "react";
import "./AddPostForm.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class AddPostForm extends React.Component {
  state = {
    postTitle: "",
    postDesc: "",
  };

  handlePostTitleChange = (e) => {
    this.setState({ postTitle: e.target.value });
  };
  handlePostDescChange = (e) => {
    this.setState({ postDesc: e.target.value });
  };

  render() {
    const handleAddFormHide = this.props.handleAddFormHide;
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
              value={this.state.postTitle}
              onChange={this.handlePostTitleChange}
            />
          </div>
          <div>
            <textarea
              className="addFormInput"
              name="postDescription"
              placeholder="Information "
              value={this.state.postDescription}
              onChange={this.handlePostDescChange}
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
  }
}
