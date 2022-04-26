import React, { useState } from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./BlogCard.css";
import "../BlogPage.css";
import "./BlogCardPage.css";
import { useParams, useNavigate, Link } from "react-router-dom";
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

  if (isFetching)
    return (
      <FontAwesomeIcon
        icon={faSpinner}
        className="icon-spin preloader"
        size="xl"
      />
    );
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
    <div className="posts">
      <div className="onePost" style={{ opacity: postsOpacity }}>
        {showEditForm && (
          <EditPostForm
            handleEditFormHide={handleEditFormHide}
            selectedPost={selectedPost}
            editBlogPost={editBlogPost}
          />
        )}
        <div className="postContent">
          <div className="postHeaderDiv">
            <div>{post.title}</div>
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
          <span>{post.description}</span>
        </div>
        <div className="postControl">
          {isAdmin && (
            <>
              <button
                className="commonBtn"
                onClick={() => handleEditFormShow(post)}
              >
                Edit
              </button>
              <button className="commonBtn" onClick={() => deletePost(post)}>
                Delete
              </button>
            </>
          )}
          <Link className="commonBtn" to="/">
            Go back
          </Link>
        </div>
        {isFetching && (
          <FontAwesomeIcon
            icon={faSpinner}
            className="icon-spin preloader"
            size="xl"
          />
        )}
      </div>
    </div>
  );
};
