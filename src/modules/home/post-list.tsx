"use client";

import Link from "next/link";
import Post from "@/components/post";
import Pagination from "@/modules/home/pagination";
import useQueryPostList from "@/hooks/use-query-post-list";

const PostList = () => {
  const { data, isLoading, error } = useQueryPostList();
  const { posts = [], totalPages } = data || {};

  return (
    <div className="mt-8">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!isLoading && !error && posts?.length === 0 && <p>No posts found</p>}
      {!isLoading &&
        posts?.map((post: Post) => (
          <div key={post.id} className="relative">
            <Link href={`/post/${post.id}`}>
              <Post post={post} />
            </Link>
          </div>
        ))}
      <div className="mt-8">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default PostList;
