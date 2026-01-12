
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost, updatePost } from "@/services/post";
import { useSearchParams } from "next/navigation";

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || "1";

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", currentPage],
      });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || "1";

  return useMutation({
    mutationFn: updatePost,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["posts", currentPage],
      });
      queryClient.invalidateQueries({
        queryKey: ["post", variables.id],
      });
    },
  });
};
