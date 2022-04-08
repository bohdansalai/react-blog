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
      id: this.props.blogArr.length + 1,
      title: this.state.postTitle,
      description: this.state.postDesc,
      liked: false,
    };

    this.props.addNewBlogPost(post);
    this.props.handleAddFormHide();
  };
  componentDidMount() {
    window.addEventListener("keyup", this.handleEnter);
  }
  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleEnter);
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
