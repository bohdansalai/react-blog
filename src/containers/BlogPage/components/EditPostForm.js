import React from "react";
import "./EditPostForm.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class EditPostForm extends React.Component {
  state = {
    postTitle: this.props.selectedPost.title,
    postDesc: this.props.selectedPost.description,
  };

  handlePostTitleChange = (e) => {
    this.setState({ postTitle: e.target.value });
  };
  handlePostDescChange = (e) => {
    this.setState({ postDesc: e.target.value });
  };
  handleEnter = (e) => {
    if (e.key === "Enter" && this.state.postTitle && this.state.postDesc)
      this.updatePost(e);
  };
  updatePost = (e) => {
    e.preventDefault();
    const post = {
      id: this.props.selectedPost.id,
      title: this.state.postTitle,
      description: this.state.postDesc,
      liked: this.props.selectedPost.liked,
    };

    this.props.editBlogPost(post);
    this.props.handleEditFormHide();
  };
  handleEscape = (e) => {
    if (e.key === "Escape") this.props.handleEditFormHide();
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
    const handleEditFormHide = this.props.handleEditFormHide;
    return (
      <>
        <form className="editPostForm" onSubmit={this.updatePost}>
          <button
            className="hideBtn"
            type="button"
            onClick={handleEditFormHide}
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
              value={this.state.postDesc}
              onChange={this.handlePostDescChange}
              required
            />
          </div>
          <div>
            <button type="submit" className="blackBtn">
              Save post
            </button>
          </div>
        </form>
        <div className="overlay" onClick={handleEditFormHide}></div>
      </>
    );
  }
}
