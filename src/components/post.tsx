interface PostProps {
  post?: Post;
  onEdit?: (post: Post) => void;
  onDelete?: (id: string) => void;
}

const Post = ({ post, onEdit, onDelete }: PostProps) => {
  const { title = '--', content = '-', createdAt = 0 } = post || {};

  return (
    <div className="w-full border-b border-white/10 py-6 group relative">
      <div className="flex justify-between items-start">
        <h3 className="text-sm text-white font-bold"> {title}</h3>
        <div className="flex gap-2">
          {onEdit && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onEdit(post!);
              }}
              className="text-xs text-white/50 hover:text-white transition-colors"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDelete(post!.id);
              }}
              className="text-xs text-red-500/50 hover:text-red-500 transition-colors"
            >
              Delete
            </button>
          )}
        </div>
      </div>

      <p className="text-sm text-white/50 mt-1">{content}</p>
      <p className="text-xs text-white/30 mt-2">
        {new Date(createdAt).toLocaleDateString()}{' '}
        {new Date(createdAt).toLocaleTimeString()}
      </p>
    </div>
  );
};

export default Post;
