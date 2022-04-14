import { red } from "@material-ui/core/colors";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { posts, postsUrl } from "./projectData";

export const useGetPosts = () => {
  return useQuery(
    "posts",
    () => {
      return axios
        .get(postsUrl)
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err);
        });
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000,
    }
  );
};

export const useLikePost = () => {
  return useMutation((updatedPost) => {
    return axios
      .put(postsUrl + updatedPost.id, updatedPost)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err);
      });
  });
};

export const useDeletePost = () => {
  return useMutation((blogPost) => {
    return axios
      .delete(postsUrl + blogPost.id)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err);
      });
  });
};

export const useEditPost = () => {
  return useMutation((updatedPost) => {
    return axios
      .put(postsUrl + updatedPost.id, updatedPost)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err);
      });
  });
};

export const useAddPost = () => {
  return useMutation((newBlogPost) => {
    return axios
      .post(postsUrl, newBlogPost)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err);
      });
  });
};

export const useGetSinglePost = (postId) => {
  return useQuery(
    ["posts", postId],
    () => {
      return axios
        .get(postsUrl + postId)
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err);
        });
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000,
    }
  );
};
