import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { postsUrl } from "../../shared/projectData";
import { getAmountOfPosts } from "../../shared/projectLogic";
import "./BlogPage.css";
import { AddPostForm } from "./components/AddPostForm";
import { BlogCard } from "./components/BlogCard";
import { EditPostForm } from "./components/EditPostForm";

let source;

export const BlogPage = ({ isAdmin }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [blogArr, setBlogArr] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});

  const fetchPosts = () => {
    source = axios.CancelToken.source();
    axios
      .get(postsUrl, { cancelToken: source.token })
      .then((response) => {
        setBlogArr(response.data);
        setIsPending(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchPosts();
    return () => {
      if (source) {
        source.cancel();
      }
    };
  }, []);

  const likePost = (blogPost) => {
    const temp = { ...blogPost };
    temp.liked = !temp.liked;
    axios
      .put(postsUrl + blogPost.id, temp)
      .then((response) => {
        console.log(response);
        fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deletePost = (blogPost) => {
    if (window.confirm(`Do you want to delete ${blogPost.title}?`)) {
      setIsPending(true);
      axios
        .delete(postsUrl + blogPost.id)
        .then((response) => {
          console.log("post deleted " + response.data);
          fetchPosts();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const addNewBlogPost = (blogPost) => {
    setIsPending(true);
    axios
      .post(postsUrl, blogPost)
      .then((response) => {
        console.log("created post ", response.data);
        fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const editBlogPost = (updatedBlogPost) => {
    console.log(updatedBlogPost);
    setIsPending(true);
    axios
      .put(postsUrl + updatedBlogPost.id, updatedBlogPost)
      .then((response) => {
        fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleAddFormShow = () => {
    setShowAddForm(true);
  };
  const handleAddFormHide = () => {
    setShowAddForm(false);
  };
  const handleEditFormShow = () => {
    setShowEditForm(true);
  };
  const handleEditFormHide = () => {
    setShowEditForm(false);
  };
  const handleSelectPost = (blogPost) => {
    setSelectedPost(blogPost);
  };

  const blogPosts = blogArr.map((item, pos) => {
    return (
      <React.Fragment key={item.id}>
        <BlogCard
          key={item.id}
          title={item.title}
          description={item.description}
          liked={item.liked}
          likePost={() => likePost(item)}
          deletePost={() => deletePost(item)}
          handleEditFormShow={handleEditFormShow}
          handleSelectPost={() => handleSelectPost(item)}
          isAdmin={isAdmin}
        />
        <Link to={`/blog/${item.id}`}>Open</Link>
      </React.Fragment>
    );
  });

  if (blogArr.length === 0) return <h1>Loading data</h1>;

  const postsOpacity = isPending ? 0.5 : 1;

  return (
    <div className="blogPage">
      {showAddForm && (
        <AddPostForm
          blogArr={blogArr}
          addNewBlogPost={addNewBlogPost}
          handleAddFormHide={handleAddFormHide}
        />
      )}
      {showEditForm && (
        <EditPostForm
          handleEditFormHide={handleEditFormHide}
          selectedPost={selectedPost}
          editBlogPost={editBlogPost}
        />
      )}
      <>
        <h1>Blog</h1>
        {isAdmin && (
          <div className="addNewPost">
            <button className="blackBtn" onClick={handleAddFormShow}>
              Create new post
            </button>
          </div>
        )}

        {isPending && (
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
};
