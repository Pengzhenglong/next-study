"use client";
import { useState } from "react";
import Post from "@/components/post";
import { useRouter } from "next/navigation";
import useQueryPost from "@/hooks/use-query-post";
import { useDeletePost } from "@/hooks/use-post-mutation";
import CommentEditor from "@/modules/home/comment-editor";

const Content = () => {
  const router = useRouter();
  const { data, isLoading, error } = useQueryPost();
  const { mutate: deletePostMutate } = useDeletePost();

  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      deletePostMutate(id, {
        onSuccess: () => {
          router.push("/");
        },
      });
    }
  };

  const handleEdit = () => {
    setIsEditorOpen(true);
  };

  return (
    <div>
      <button
        onClick={() => router.back()}
        className="text-sm text-white font-bold mb-4"
      >
        {"← Back"}
      </button>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <Post post={data} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      <CommentEditor
        key={data?.id || 'new'}
        isOpen={isEditorOpen}
        setIsOpen={setIsEditorOpen}
        post={data}
      />
    </div>
  );
};

export default Content;