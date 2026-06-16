import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/AdminReviews";
import Loading from "../components/Loading";
import {
  deleteReview,
  getAllReviews,
  updateReview,
} from "../Features/Review/reviewSlice";
import {
  FaEdit,
  FaTrash,
  FaStar,
  FaSave,
  FaTimes,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaRegCommentDots,
} from "react-icons/fa";
import { formatDate } from "../utils/formatDate";

const RATING_COLOR = {
  5: "#16a34a",
  4: "#84cc16",
  3: "#f59e0b",
  2: "#f97316",
  1: "#ef4444",
};

const AdminReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    isLoading,
    reviews = [],
    totalReviews = 0,
    numOfPages = 1,
    error,
  } = useSelector((store) => store.review);

  const [searchParams, setSearchParams] = useState({
    search: "",
    rating: "all",
    sort: "latest",
    page: 1,
  });

  const [editingReview, setEditingReview] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", comment: "", rating: 1 });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const next = {
      search: params.get("search") || "",
      rating: params.get("rating") || "all",
      sort:   params.get("sort")   || "latest",
      page:   parseInt(params.get("page")) || 1,
    };
    setSearchParams(next);
    dispatch(getAllReviews(next));
  }, [location.search, dispatch]);

  const pushParams = (params) => {
    const qs = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v && v !== "all" && v !== 1) qs.set(k, v);
    });
    navigate(`?${qs.toString()}`);
  };

  const handleFilterChange = (field, value) => {
    const next = {
      ...searchParams,
      [field]: value,
      page: field === "page" ? Number(value) : 1,
    };
    setSearchParams(next);
    pushParams(next);
    dispatch(getAllReviews(next));
  };

  const clearFilters = () => {
    const def = { search: "", rating: "all", sort: "latest", page: 1 };
    setSearchParams(def);
    navigate("");
    dispatch(getAllReviews(def));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this review? This cannot be undone.")) return;
    try {
      await dispatch(deleteReview(id)).unwrap();
    } catch {
      /* toast handled in slice */
    }
  };

  const handleEditStart = (review) => {
    setEditingReview(review._id);
    setEditForm({ title: review.title, comment: review.comment, rating: review.rating });
  };

  const handleEditCancel = () => {
    setEditingReview(null);
    setEditForm({ title: "", comment: "", rating: 1 });
  };

  const handleEditSave = async (reviewId) => {
    setSaving(true);
    try {
      await dispatch(updateReview({ reviewId, reviewData: editForm })).unwrap();
      setEditingReview(null);
      setEditForm({ title: "", comment: "", rating: 1 });
    } catch {
      /* toast handled in slice */
    } finally {
      setSaving(false);
    }
  };

  const hasActiveFilters =
    searchParams.search || searchParams.rating !== "all" || searchParams.sort !== "latest";

  const currentPage = searchParams.page;

  if (isLoading) return <Wrapper><Loading /></Wrapper>;

  if (error) {
    return (
      <Wrapper>
        <div className="error-box">
          <h3>Something went wrong</h3>
          <p>{error}</p>
        </div>
      </Wrapper>
    );
  }

  /* ── Ellipsis page numbers ─────────────────────────────────────── */
  const pageNumbers = Array.from({ length: numOfPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === numOfPages || Math.abs(p - currentPage) <= 1
  );

  return (
    <Wrapper>
      <div className="page-wrap">
        {/* ── Page header ──────────────────────────────────────── */}
        <div className="page-header">
          <div>
            <h1 className="page-title">
              <FaStar className="title-icon" /> Reviews
            </h1>
            <p className="page-sub">Manage all meal reviews</p>
          </div>
          <div className="header-badge">
            <span className="badge-num">{totalReviews}</span>
            <span className="badge-label">total reviews</span>
          </div>
        </div>

        {/* ── Filter bar ───────────────────────────────────────── */}
        <div className="filter-bar">
          <div className="search-wrap">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search reviews…"
              value={searchParams.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>

          <select
            className="filter-select"
            value={searchParams.rating}
            onChange={(e) => handleFilterChange("rating", e.target.value)}
          >
            <option value="all">All Ratings</option>
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {"★".repeat(r)}{"☆".repeat(5 - r)} ({r})
              </option>
            ))}
          </select>

          <select
            className="filter-select"
            value={searchParams.sort}
            onChange={(e) => handleFilterChange("sort", e.target.value)}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="highest rating">Highest Rating</option>
            <option value="lowest rating">Lowest Rating</option>
          </select>

          {hasActiveFilters && (
            <button className="clear-btn" onClick={clearFilters}>
              <FaTimes /> Clear
            </button>
          )}
        </div>

        {/* ── Empty state ──────────────────────────────────────── */}
        {reviews.length === 0 ? (
          <div className="empty-state">
            <FaRegCommentDots className="empty-icon" />
            <h4>No reviews found</h4>
            <p>Try adjusting your search or filters</p>
            {hasActiveFilters && (
              <button className="clear-btn" onClick={clearFilters}>
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            {/* ── Review list ──────────────────────────────────── */}
            <div className="reviews-list">
              {reviews.map((review) => {
                const accent = RATING_COLOR[review.rating] || "#94a3b8";
                const isEditing = editingReview === review._id;

                return (
                  <div
                    key={review._id}
                    className={`review-card${isEditing ? " editing" : ""}`}
                    style={{ "--accent": accent }}
                  >
                    <div className="card-accent" />

                    {isEditing ? (
                      /* ── Edit mode ─────────────────────────── */
                      <div className="card-body">
                        <p className="edit-context">
                          Editing review for{" "}
                          <strong>{review.meal?.name || "Unknown Meal"}</strong>
                        </p>

                        <div className="field-group">
                          <label className="field-label">Title</label>
                          <input
                            type="text"
                            className="field-input"
                            name="title"
                            value={editForm.title}
                            onChange={(e) =>
                              setEditForm((p) => ({ ...p, title: e.target.value }))
                            }
                            placeholder="Review title…"
                          />
                        </div>

                        <div className="field-group">
                          <label className="field-label">Rating</label>
                          <div className="star-picker">
                            {[1, 2, 3, 4, 5].map((n) => (
                              <button
                                key={n}
                                type="button"
                                className={`star-btn${editForm.rating >= n ? " lit" : ""}`}
                                onClick={() =>
                                  setEditForm((p) => ({ ...p, rating: n }))
                                }
                                style={editForm.rating >= n ? { color: RATING_COLOR[editForm.rating] } : {}}
                              >
                                <FaStar />
                              </button>
                            ))}
                            <span className="star-label">
                              {editForm.rating} / 5
                            </span>
                          </div>
                        </div>

                        <div className="field-group">
                          <label className="field-label">Comment</label>
                          <div className="textarea-wrap">
                            <textarea
                              className="field-input field-textarea"
                              name="comment"
                              value={editForm.comment}
                              onChange={(e) =>
                                setEditForm((p) => ({ ...p, comment: e.target.value }))
                              }
                              placeholder="Review comment…"
                              maxLength="500"
                            />
                            <span className="char-count">
                              {500 - editForm.comment.length}
                            </span>
                          </div>
                        </div>

                        <div className="edit-footer">
                          <button
                            className="cancel-btn"
                            onClick={handleEditCancel}
                            disabled={saving}
                          >
                            Cancel
                          </button>
                          <button
                            className="save-btn"
                            onClick={() => handleEditSave(review._id)}
                            disabled={saving}
                          >
                            <FaSave /> {saving ? "Saving…" : "Save Changes"}
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* ── View mode ─────────────────────────── */
                      <div className="card-body">
                        <div className="card-top">
                          <div className="card-left">
                            <p className="meal-name">
                              {review.meal?.name || "Unknown Meal"}
                            </p>
                            <h3 className="review-title">{review.title}</h3>
                            <div className="star-row">
                              {[1, 2, 3, 4, 5].map((n) => (
                                <FaStar
                                  key={n}
                                  style={{
                                    color: n <= review.rating ? accent : "#e2e8f0",
                                    fontSize: "0.95rem",
                                  }}
                                />
                              ))}
                              <span className="rating-num">{review.rating}.0</span>
                            </div>
                          </div>
                          <div className="card-actions">
                            <button
                              className="act-btn edit"
                              onClick={() => handleEditStart(review)}
                              title="Edit review"
                            >
                              <FaEdit />
                            </button>
                            <button
                              className="act-btn del"
                              onClick={() => handleDelete(review._id)}
                              title="Delete review"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>

                        <p className="review-comment">{review.comment}</p>

                        <div className="card-meta">
                          <div className="meta-reviewer">
                            <div className="reviewer-init">
                              {(review.user?.fullName || "A").charAt(0).toUpperCase()}
                            </div>
                            <span>{review.user?.fullName || "Anonymous"}</span>
                          </div>
                          <span className="meta-date">
                            {formatDate(review.createdAt)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ── Pagination ───────────────────────────────────── */}
            {numOfPages > 1 && (
              <div className="pagination">
                <button
                  className="page-btn"
                  disabled={currentPage === 1}
                  onClick={() => handleFilterChange("page", 1)}
                >
                  First
                </button>
                <button
                  className="page-btn icon"
                  disabled={currentPage === 1}
                  onClick={() => handleFilterChange("page", currentPage - 1)}
                >
                  <FaChevronLeft />
                </button>

                {pageNumbers.reduce((acc, p, idx, arr) => {
                  if (idx > 0 && p - arr[idx - 1] > 1)
                    acc.push(<span key={`e-${p}`} className="ellipsis">…</span>);
                  acc.push(
                    <button
                      key={p}
                      className={`page-btn num${currentPage === p ? " active" : ""}`}
                      onClick={() => handleFilterChange("page", p)}
                    >
                      {p}
                    </button>
                  );
                  return acc;
                }, [])}

                <button
                  className="page-btn icon"
                  disabled={currentPage === numOfPages}
                  onClick={() => handleFilterChange("page", currentPage + 1)}
                >
                  <FaChevronRight />
                </button>
                <button
                  className="page-btn"
                  disabled={currentPage === numOfPages}
                  onClick={() => handleFilterChange("page", numOfPages)}
                >
                  Last
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </Wrapper>
  );
};

export default AdminReviews;
