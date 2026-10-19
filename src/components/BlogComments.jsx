import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, deleteComment } from "../Features/Blog/blogSlice";
import { formatDate } from "../utils/formatDate";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/BlogComment";

const BlogComments = ({ blogId }) => {
  const dispatch = useDispatch();
  const { blog } = useSelector((store) => store.blog);
  const { user } = useSelector((store) => store.user);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await dispatch(
        addComment({ blogId, comment: { content: comment.trim() } })
      ).unwrap();
      setComment("");
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Failed to add comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?"))
      return;

    try {
      await dispatch(deleteComment({ blogId, commentId })).unwrap();
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Failed to delete comment");
    }
  };

  // Mirrors the API: the comment's author, the post's author, or an admin
  const canDelete = (comment) =>
    !!user &&
    (user.role === "admin" ||
      user._id === comment.user?._id ||
      user._id === (blog?.author?._id || blog?.author));

  return (
    <Wrapper>
      <div className="comments-section">
        <h3>Comments</h3>
        {blog?.comments?.map((comment) => (
          <div key={comment._id} className="comment">
            <div className="comment-header">
              <span className="comment-author">{comment.user?.fullName || "Former member"}</span>
              <span className="comment-date">
                {formatDate(comment.createdAt)}
              </span>
            </div>
            <p>{comment.content}</p>
            {canDelete(comment) && (
              <button
                className="btn-danger btn-sm"
                onClick={() => handleDelete(comment._id)}
              >
                <FaTrash />
              </button>
            )}
          </div>
        ))}
        {user ? (
          <form onSubmit={handleSubmit} className="comment-form">
            <div className="form-control">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                maxLength={2000}
                rows="3"
              />
            </div>
            <button type="submit" className="btn" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Comment"}
            </button>
          </form>
        ) : (
          <p className="login-message">Please log in to leave a comment.</p>
        )}
      </div>
    </Wrapper>
  );
};

export default BlogComments;
