import axios from "axios";

export const GetPosts = () => {
  return axios.get("assignment/posts", {
    params: {
      sl_token: localStorage.getItem("user_token"),
    },
  });
};
