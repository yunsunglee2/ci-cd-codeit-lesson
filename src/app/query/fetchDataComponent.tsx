import { useEffect, useState } from "react";

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export const FakeFetch = () => {
  return new Promise<Post>((resolve, reject) => {
    resolve({
      id: 1,
      userId: 1,
      title: "fake title",
      body: "fake body",
    });
  });
};

export const FetchDataComponent: React.FC = () => {
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    FakeFetch().then((data) => {
      setPost(data);
    });
  }, []);

  console.log(post);

  return (
    <div>
      {post && (
        <ul>
          <li>{`id: ${post.id}`}</li>
          <li>{`userId: ${post.userId}`}</li>
          <li>{`title: ${post.title}`}</li>
          <li>{`body: ${post.body}`}</li>
        </ul>
      )}
    </div>
  );
};
