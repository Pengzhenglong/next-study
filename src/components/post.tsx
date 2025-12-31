interface PostProps {
  post?: Post;
}

const Post = ({ post }: PostProps) => {
  const { title = '--', content = '-', createdAt = 0 } = post || {};

  return (
    <div className="w-full border-b border-white/10 py-6 py-">
      <h3 className="text-sm text-white font-bold"> {title}</h3>

      <p className="text-sm text-white/50">{content}</p>
      <p className="text-sm text-white/50">
        {new Date(createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default Post;
