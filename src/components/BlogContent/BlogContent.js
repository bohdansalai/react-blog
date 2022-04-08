import { faRupiahSign } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import React, { Component, useState } from "react";
import { postsUrl } from "../../shared/projectData";
import { getAmountOfPosts } from "../../shared/projectLogic";
import "./BlogContent.css";
import { AddPostForm } from "./components/AddPostForm";
import { BlogCard } from "./components/BlogCard";

export class BlogContent extends Component {
  state = {
    showAddForm: false,
    blogArr: [],
    isPending: false,
  };
  fetchPosts = () => {
    axios
      .get(postsUrl)
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
  handleAddFormShow = () => {
    this.setState({ showAddForm: true });
  };
  handleAddFormHide = () => {
    this.setState({ showAddForm: false });
  };
  handleEscape = (e) => {
    if (e.key === "Escape" && this.state.showAddForm) this.handleAddFormHide();
  };
  // handleEnter = (e) => {
  //   console.log(this.props.postTitle);
  //   if (e.key === "Enter" && this.state.postTitle && this.state.postDesc)
  //     this.createPost(e);
  // };
  // handleEnter = (e) => {
  //   if (e.key === "Enter" && this.state.showAddForm) {
  //     e.preventDefault();
  //     console.log(e);
  //     this.addNewBlogPost(blogPost);
  //   }
  // };

  componentDidMount() {
    this.fetchPosts();
    window.addEventListener("keyup", this.handleEscape);
    // window.addEventListener("keyup", this.handleEnter);
  }
  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleEscape);
    // window.removeEventListener("keyup", this.handleEnter);
  }

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
        />
      );
    });

    if (this.state.blogArr.length === 0) return <h1>Loading data</h1>;

    return (
      <div className="blogPage">
        {this.state.showAddForm && (
          <AddPostForm
            blogArr={this.state.blogArr}
            addNewBlogPost={this.addNewBlogPost}
            handleAddFormHide={this.handleAddFormHide}
          />
        )}

        <>
          <h1>Blog</h1>
          <div className="addNewPost">
            <button className="blackBtn" onClick={this.handleAddFormShow}>
              Create new post
            </button>
          </div>
          {this.state.isPending && <h2>Wait</h2>}
          <div className="posts">{blogPosts}</div>
        </>
      </div>
    );
  }
}
