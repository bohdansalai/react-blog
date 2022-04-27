import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { postsUrl } from "./projectData";

export const useGetPosts = () => {
  return useQuery("posts", () => {
    return axios
      .get(postsUrl)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err);
      });
  });
};

export const useGetSinglePost = (postId) => {
  return useQuery(["post", postId], () => {
    return axios
      .get(postsUrl + postId)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err);
      });
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (updatedPost) => {
      return axios
        .put(postsUrl + updatedPost.id, updatedPost)
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err);
        });
    },
    {
      onSuccess: (updatedPost) => {
        queryClient.invalidateQueries("posts");
        queryClient.setQueryData(["post", updatedPost.id], updatedPost);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const history = useNavigate();
  const locaion = useLocation();
  return useMutation(
    (blogPost) => {
      return axios
        .delete(postsUrl + blogPost.id)
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err);
        });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
        if (locaion !== "/react-blog/blog") {
          history("/react-blog/blog");
        }
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
};

export const useEditPost = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (updatedPost) => {
      return axios
        .put(postsUrl + updatedPost.id, updatedPost)
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err);
        });
    },
    {
      onSuccess: (updatedPost) => {
        queryClient.invalidateQueries("posts");
        queryClient.setQueryData(["post", updatedPost.id], updatedPost);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
};

export const useAddPost = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (newBlogPost) => {
      return axios
        .post(postsUrl, newBlogPost)
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err);
        });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
};
