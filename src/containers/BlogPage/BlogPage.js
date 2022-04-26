import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component, useEffect, useState } from "react";
import "./components/AddPostForm.css";
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

  const { data: posts, isLoading, isError, error, isFetching } = useGetPosts();

  const likeMutation = useLikePost();
  const deleteMutation = useDeletePost();
  const editMutation = useEditPost();
  const addMutation = useAddPost();

  if (isLoading)
    return (
      <FontAwesomeIcon
        icon={faSpinner}
        className="icon-spin preloader"
        size="xl"
      />
    );
  if (isError) return <h1>{error.message}</h1>;

  const likePost = (blogPost) => {
    const updatedPost = { ...blogPost };
    updatedPost.liked = !updatedPost.liked;
    likeMutation.mutate(updatedPost);
  };
  const deletePost = (blogPost) => {
    if (window.confirm(`Do you want to delete ${blogPost.title}?`)) {
      deleteMutation.mutate(blogPost);
    }
  };
  const editBlogPost = (updatedBlogPost) => {
    editMutation.mutate(updatedBlogPost);
  };

  const addNewBlogPost = (newBlogPost) => {
    addMutation.mutate(newBlogPost);
  };

  const handleAddFormShow = () => {
    setShowAddForm(true);
    console.log("ddd");
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
          id={item.id}
          title={item.title}
          description={
            item.description.length > 200
              ? item.description.slice(0, 200) + "..."
              : item.description
          }
          liked={item.liked}
          likePost={() => likePost(item)}
          deletePost={() => deletePost(item)}
          handleEditFormShow={handleEditFormShow}
          handleSelectPost={() => handleSelectPost(item)}
          isAdmin={isAdmin}
        />
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
