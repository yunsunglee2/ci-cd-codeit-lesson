"use client";

import { NextPage } from "next";
import { Post, Todo, useJSONPlaceholder } from "../libs/useJSONPlaceholder";

const DataFetching: NextPage = () => {
  const { data: posts } = useJSONPlaceholder<Post>("posts/1");
  const { data: todos } = useJSONPlaceholder<Todo>("todos/1");
  console.log({ posts }, "---posts---");
  console.log({ todos }, "---todos---");
  if (posts === undefined || todos === undefined) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>Data Fetching</h1>
      <h2>Posts</h2>
      <ul>
        {Object.entries(posts).map(([key, value]) => (
          <li key={key}>{`${key}: ${value}`}</li>
        ))}
      </ul>
      <h2>Todos</h2>
      <ul>
        {Object.entries(todos).map(([key, value]) => (
          <li key={key}>{`${key}: ${value}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default DataFetching;
