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
  handleEnter = (e) => {
    if (e.key === "Enter" && this.state.postTitle && this.state.postDesc)
      this.createPost(e);
  };
  createPost = (e) => {
    e.preventDefault();
    const post = {
      title: this.state.postTitle,
      description: this.state.postDesc,
      liked: false,
    };

    this.props.addNewBlogPost(post);
    this.props.handleAddFormHide();
  };
  handleEscape = (e) => {
    if (e.key === "Escape") this.props.handleAddFormHide();
  };
  componentDidMount() {
    window.addEventListener("keyup", this.handleEnter);
    window.addEventListener("keyup", this.handleEscape);
  }
  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleEnter);
    window.removeEventListener("keyup", this.handleEscape);
  }

  render() {
    const handleAddFormHide = this.props.handleAddFormHide;
    return (
      <>
        <form className="addPostForm" onSubmit={this.createPost}>
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
              value={this.state.postTitle}
              onChange={this.handlePostTitleChange}
              required
            />
          </div>
          <div>
            <textarea
              className="addFormInput"
              name="postDescription"
              placeholder="Information "
              value={this.state.postDescription}
              onChange={this.handlePostDescChange}
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
        <div className="overlay" onClick={handleAddFormHide}></div>
      </>
    );
  }
}
