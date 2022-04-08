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
  };

  likePost = (pos) => {
    this.setState((state) => {
      const temp = [...state.blogArr];
      temp[pos].liked = !temp[pos].liked;
      localStorage.setItem("blogPosts", JSON.stringify(temp));
      return {
        blogArr: temp,
      };
    });
  };

  deletePost = (pos) => {
    if (
      window.confirm(`Do you want to delete ${this.state.blogArr[pos].title}?`)
    ) {
      this.setState((state) => {
        const temp = [...state.blogArr];
        temp.splice(pos, 1);
        localStorage.setItem("blogPosts", JSON.stringify(temp));
        return {
          blogArr: temp,
        };
      });
    }
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

  addNewBlogPost = (blogPost) => {
    this.setState((state) => {
      const posts = [...state.blogArr];
      posts.push(blogPost);
      localStorage.setItem("blogPosts", JSON.stringify(posts));
      return {
        blogArr: posts,
      };
    });
  };

  componentDidMount() {
    axios
      .get(postsUrl)
      .then((response) => {
        this.setState({
          blogArr: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
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
          likePost={() => this.likePost(pos)}
          deletePost={() => this.deletePost(pos)}
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
          <div className="posts">{blogPosts}</div>
        </>
      </div>
    );
  }
}
