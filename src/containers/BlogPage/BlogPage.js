import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { postsUrl } from "../../shared/projectData";
import { getAmountOfPosts } from "../../shared/projectLogic";
import {
  useAddPost,
  useDeletePost,
  useEditPost,
  useGetPosts,
  useLikePost,
} from "../../shared/queries";
import "./BlogPage.css";
import { AddPostForm } from "./components/AddPostForm";
import { BlogCard } from "./components/BlogCard";
import { EditPostForm } from "./components/EditPostForm";

export const BlogPage = ({ isAdmin }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});

  const {
    data: posts,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useGetPosts();

  const likeMutation = useLikePost();
  const deleteMutation = useDeletePost();
  const editMutation = useEditPost();
  const addMutation = useAddPost();

  if (isLoading) return <h1>Loading data</h1>;
  if (isError) return <h1>{error.message}</h1>;

  const likePost = (blogPost) => {
    const updatedPost = { ...blogPost };
    updatedPost.liked = !updatedPost.liked;
    likeMutation
      .mutateAsync(updatedPost)
      .then(refetch)
      .catch((err) => console.log(err));
  };
  const deletePost = (blogPost) => {
    if (window.confirm(`Do you want to delete ${blogPost.title}?`)) {
      deleteMutation
        .mutateAsync(blogPost)
        .then(refetch)
        .catch((err) => console.log(err));
    }
  };
  const editBlogPost = (updatedBlogPost) => {
    editMutation
      .mutateAsync(updatedBlogPost)
      .then(refetch)
      .catch((err) => console.log(err));
  };

  const addNewBlogPost = (newBlogPost) => {
    addMutation
      .mutateAsync(newBlogPost)
      .then(refetch)
      .catch((err) => console.log(err));
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

  const blogPosts = posts.map((item, pos) => {
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

  const postsOpacity = isFetching ? 0.5 : 1;

  return (
    <div className="blogPage">
      {showAddForm && (
        <AddPostForm
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

        {isFetching && (
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
