import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { Component, useState } from "react";
import { postsUrl } from "../../shared/projectData";
import { getAmountOfPosts } from "../../shared/projectLogic";
import "./BlogPage.css";
import { AddPostForm } from "./components/AddPostForm";
import { BlogCard } from "./components/BlogCard";
import { EditPostForm } from "./components/EditPostForm";

let source;

export class BlogPage extends Component {
  state = {
    showAddForm: false,
    showEditForm: false,
    blogArr: [],
    isPending: false,
    selectedPost: {},
  };
  fetchPosts = () => {
    source = axios.CancelToken.source();
    axios
      .get(postsUrl, { cancelToken: source.token })
      .then((response) => {
        this.setState({
          blogArr: response.data,
          isPending: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    this.fetchPosts();
  }
  componentWillUnmount() {
    if (source) {
      source.cancel();
    }
  }
  likePost = (blogPost) => {
    const temp = { ...blogPost };
    temp.liked = !temp.liked;
    axios
      .put(postsUrl + blogPost.id, temp)
      .then((response) => {
        console.log(response);
        this.fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  deletePost = (blogPost) => {
    if (window.confirm(`Do you want to delete ${blogPost.title}?`)) {
      this.setState({
        isPending: true,
      });
      axios
        .delete(postsUrl + blogPost.id)
        .then((response) => {
          console.log("post deleted " + response.data);
          this.fetchPosts();
        })
        .catch((err) => {
          console.log(err);
        });

      // this.setState((state) => {
      //   axios.delete(' ')
      //   const temp = [...state.blogArr];
      //   temp.splice(pos, 1);
      //   localStorage.setItem("blogPosts", JSON.stringify(temp));
      //   return {
      //     blogArr: temp,
      //   };
      // });
    }
  };
  addNewBlogPost = (blogPost) => {
    this.setState({
      isPending: true,
    });
    axios
      .post(postsUrl, blogPost)
      .then((response) => {
        console.log("created post ", response.data);
        this.fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  editBlogPost = (updatedBlogPost) => {
    console.log(updatedBlogPost);
    this.setState({
      isPending: true,
    });
    axios
      .put(postsUrl + updatedBlogPost.id, updatedBlogPost)
      .then((response) => {
        // console.log("updated  post ", response.data);
        this.fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleAddFormShow = () => {
    this.setState({ showAddForm: true });
  };
  handleAddFormHide = () => {
    this.setState({ showAddForm: false });
  };
  handleEditFormShow = () => {
    this.setState({ showEditForm: true });
  };
  handleEditFormHide = () => {
    this.setState({ showEditForm: false });
  };
  handleSelectPost = (blogPost) => {
    this.setState({
      selectedPost: blogPost,
    });
  };

  render() {
    const blogPosts = this.state.blogArr.map((item, pos) => {
      return (
        <BlogCard
          key={item.id}
          title={item.title}
          description={item.description}
          liked={item.liked}
          likePost={() => this.likePost(item)}
          deletePost={() => this.deletePost(item)}
          handleEditFormShow={this.handleEditFormShow}
          handleSelectPost={() => this.handleSelectPost(item)}
        />
      );
    });

    if (this.state.blogArr.length === 0) return <h1>Loading data</h1>;

    const postsOpacity = this.state.isPending ? 0.5 : 1;

    return (
      <div className="blogPage">
        {this.state.showAddForm && (
          <AddPostForm
            blogArr={this.state.blogArr}
            addNewBlogPost={this.addNewBlogPost}
            handleAddFormHide={this.handleAddFormHide}
          />
        )}
        {this.state.showEditForm && (
          <EditPostForm
            handleEditFormHide={this.handleEditFormHide}
            selectedPost={this.state.selectedPost}
            editBlogPost={this.editBlogPost}
          />
        )}
        <>
          <h1>Blog</h1>
          <div className="addNewPost">
            <button className="blackBtn" onClick={this.handleAddFormShow}>
              Create new post
            </button>
          </div>
          {this.state.isPending && (
            <FontAwesomeIcon
              icon={faSpinner}
              className="icon-spin preloader"
              size="xl"
            />
          )}
          <div className="posts" style={{ opacity: postsOpacity }}>
            {blogPosts}
          </div>
        </>
      </div>
    );
  }
}
