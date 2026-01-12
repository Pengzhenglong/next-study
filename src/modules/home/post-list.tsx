"use client";

import Link from "next/link";
import Post from "@/components/post";
import Pagination from "@/modules/home/pagination";
import useQueryPostList from "@/hooks/use-query-post-list";
import { useDeletePost } from "@/hooks/use-post-mutation";
import CommentEditor from "./comment-editor";
import { useState } from "react";

const PostList = () => {
  const { data, isLoading, error } = useQueryPostList();
  const { posts = [], totalPages } = data || {};
  const { mutate: deletePostMutate } = useDeletePost();
  
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      deletePostMutate(id);
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setIsEditorOpen(true);
  };

  return (
    <div className="mt-8">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!isLoading && !error && posts?.length === 0 && <p>No posts found</p>}
      {!isLoading &&
        posts?.map((post: Post) => (
          <div key={post.id} className="relative">
            <Link href={`/post/${post.id}`}>
              <Post post={post} onEdit={handleEdit} onDelete={handleDelete} />
            </Link>
          </div>
        ))}
      <div className="mt-8">
        <Pagination totalPages={totalPages} />
      </div>

      <CommentEditor
        key={editingPost?.id || 'new'}
        isOpen={isEditorOpen}
        setIsOpen={setIsEditorOpen}
        post={editingPost || undefined}
        onSuccess={() => setEditingPost(null)}
      />
    </div>
  );
};

export default PostList;
