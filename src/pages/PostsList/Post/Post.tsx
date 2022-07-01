import { IPost } from "../../../types/post";
import "./styles.css";

const Post: React.FC<{ post: IPost }> = ({ post }) => {
  return (
    <div className="post-card">
      <p>{post.created_time.toString()}</p>
      <p>{post.message}</p>
    </div>
  );
};
export default Post;
