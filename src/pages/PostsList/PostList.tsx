import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { GetPosts } from "../../services/posts.service";
import { IPost } from "../../types/post";
import { ISender } from "../../types/sender";
import Post from "./Post/Post";
import Sender from "./Sender/Sender";
import "./styles.css";

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [currentSender, setCurrentSender] = useState<string>();

  const [senderPosts, setSenderPosts] = useState<IPost[]>([]);
  const [tempSenderPosts, setTempSenderPosts] = useState<IPost[]>([]);

  const [senders, setSenders] = useState<ISender[]>([]);
  const [tempSenders, setTempSenders] = useState<ISender[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    GetPosts().then((res) => {
      setPosts(res.data.data.posts);
    });
  }, []);
  useEffect(() => {
    countSenders();
    getSenderPosts(searchParams.get("user") || "");
  }, [posts]);

  const sortPosts = (sortType: string) => {
    const sortedPosts = tempSenderPosts.sort((a: IPost, b: IPost) => {
      if (sortType === ">") {
        return new Date(a.created_time) > new Date(b.created_time) ? -1 : 1;
      } else {
        return new Date(a.created_time) < new Date(b.created_time) ? -1 : 1;
      }
    });

    setTempSenderPosts((tempSenderPosts) => [...tempSenderPosts]);
  };

  const getSenderPosts = (senderName: string) => {
    setCurrentSender(senderName);
    const filteredPosts = posts
      .filter((post: IPost) => post.from_name === senderName)
      .sort((a: IPost, b: IPost) =>
        new Date(a.created_time) > new Date(b.created_time) ? -1 : 1
      );
    setSenderPosts(filteredPosts);
    setTempSenderPosts(filteredPosts);
  };

  const filterPosts = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const search_term = (event.target as HTMLInputElement).value;
    setTempSenderPosts(
      senderPosts.filter((post: IPost) => post.message.includes(search_term))
    );
  };
  const listPosts = () => {
    return tempSenderPosts.map((post: IPost) => (
      <li key={post.id}>
        <Post post={post} />
      </li>
    ));
  };

  const countSenders = () => {
    let sendersList: string[] | ISender[] = Array.from(
      new Set(posts.map((post: IPost) => post.from_name))
    );

    sendersList = sendersList.sort().map((senderName: string) => {
      return {
        name: senderName,
        postsCount: posts.filter((post: IPost) => post.from_name === senderName)
          .length,
      };
    });

    setSenders(sendersList);
    setTempSenders(sendersList);
  };
  const filterSenders = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const search_term = (event.target as HTMLInputElement).value;
    setTempSenders(
      senders.filter((sender: ISender) => sender.name.includes(search_term))
    );
  };
  const listSenders = () => {
    return tempSenders.map((sender: ISender) => (
      <li
        className={currentSender === sender.name ? "current" : ""}
        onClick={() => getSenderPosts(sender.name)}
        key={sender.name}
      >
        <Sender name={sender.name} postsCount={sender.postsCount} />
      </li>
    ));
  };
  return (
    <div className="posts-list--container">
      <div className="posts-list--container__senders">
        <input
          type="text"
          placeholder="Search for senders"
          autoFocus
          onKeyUp={filterSenders}
        />
        <ul>{listSenders()}</ul>
      </div>
      <div className="posts-list--container__posts">
        <div className="posts-list--container__sort-controls">
          <div>
            <button
              disabled={senderPosts.length ? false : true}
              type="button"
              onClick={() => sortPosts(">")}
            >
              Recent Posts
            </button>
            <button
              disabled={senderPosts.length ? false : true}
              type="button"
              onClick={() => sortPosts("<")}
            >
              Old Posts
            </button>
          </div>
          <input
            type="text"
            placeholder="Search for text"
            autoFocus
            onKeyUp={filterPosts}
          />
        </div>
        <ul>{listPosts()}</ul>
      </div>
    </div>
  );
};
export default PostList;
