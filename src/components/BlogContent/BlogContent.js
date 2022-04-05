import React, { Component, useState } from "react";
import { posts } from "../../shared/projectData";
import { getAmountOfPosts } from "../../shared/projectLogic";
import "./BlogContent.css";
import { BlogCard } from "./components/BlogCard";

export class BlogContent extends Component {
  state = {
    showBlog: true,
    blogArr: JSON.parse(localStorage.getItem("blogPosts")) || posts,
  };

  likePost = (pos) => {
    const temp = [...this.state.blogArr];
    temp[pos].liked = !temp[pos].liked;
    this.setState({
      blogArr: temp,
    });
    localStorage.setItem("blogPosts", JSON.stringify(temp));
  };

  toggleBlog = () => {
    this.setState(({ showBlog }) => {
      return {
        showBlog: !showBlog,
      };
    });
  };

  deletePost = (pos) => {
    if (
      window.confirm(`Do you want to delete ${this.state.blogArr[pos].title}?`)
    ) {
      const temp = [...this.state.blogArr];
      temp.splice(pos, 1);
      this.setState({
        blogArr: temp,
      });
      localStorage.setItem("blogPosts", JSON.stringify(temp));
    }
  };

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
    return (
      <>
        <button onClick={this.toggleBlog}>
          {this.state.showBlog ? `Hide blog` : `Show blog`}
        </button>
        {this.state.showBlog ? (
          <>
            <h1>Simple Blog</h1>
            <div className="posts">{blogPosts}</div>
          </>
        ) : null}
      </>
    );
  }
}
