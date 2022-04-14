import React, { useEffect, useState } from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./BlogCard.css";
import "../BlogPage.css";
import { useParams, useNavigate } from "react-router-dom";
import { postsUrl } from "../../../shared/projectData";
import { EditPostForm } from "./EditPostForm";
import {
  useDeletePost,
  useEditPost,
  useGetSinglePost,
  useLikePost,
} from "../../../shared/queries";

export const BlogCardPage = ({ isAdmin }) => {
  const { postId } = useParams();
  const [selectedPost, setSelectedPost] = useState({});
  const [showEditForm, setShowEditForm] = useState(false);
  const history = useNavigate();

  const {
    data: post,
    isLoading,
    isError,
    error,
    isFetching,
  } = useGetSinglePost(postId);

  const likeMutation = useLikePost();
  const deleteMutation = useDeletePost();
  const editMutation = useEditPost();

  if (isFetching) return <h1>Loading data</h1>;
  if (isError) return <h1>{error.message}</h1>;
  const postsOpacity = isFetching ? 0.5 : 1;

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

  const handleEditFormShow = (blogPost) => {
    setShowEditForm(true);
    setSelectedPost(blogPost);
  };
  const handleEditFormHide = () => {
    setShowEditForm(false);
  };

  const heartFill = post.liked ? "crimson" : "black";

  return (
    <div className="post" style={{ opacity: postsOpacity }}>
      {showEditForm && (
        <EditPostForm
          handleEditFormHide={handleEditFormHide}
          selectedPost={selectedPost}
          editBlogPost={editBlogPost}
        />
      )}
      <div className="postContent">
        <h2>{post.title}</h2>
        <p>{post.description}</p>
        <div>
          <button onClick={() => likePost(post)}>
            <FontAwesomeIcon
              icon={faHeart}
              size="xl"
              style={{ color: heartFill }}
            />
          </button>
        </div>
      </div>
      {isAdmin && (
        <div className="postControl">
          <button onClick={() => handleEditFormShow(post)}>
            <FontAwesomeIcon icon={faEdit} size="xl" />
          </button>
          <button className="deleteBtn" onClick={() => deletePost(post)}>
            <FontAwesomeIcon icon={faTrash} size="xl" />
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
    </div>
  );
};
