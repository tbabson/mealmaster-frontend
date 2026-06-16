import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/BlogWrapper";
import {
  getAllBlogs,
  handleChange,
  clearFilters,
  changePage,
} from "../Features/Blog/blogSlice";
import Loading from "../components/Loading";
import {
  FaSearch,
  FaTimes,
  FaUser,
  FaCalendarAlt,
  FaArrowRight,
  FaNewspaper,
} from "react-icons/fa";
import { formatDate } from "../utils/formatDate";
import debounce from "lodash/debounce";

const CATEGORIES = [
  "All",
  "General",
  "Recipes",
  "Nutrition",
  "Cooking Tips",
  "Health",
  "Other",
];

const SORTS = [
  { val: "newest", label: "Newest First" },
  { val: "oldest", label: "Oldest First" },
  { val: "a-z",    label: "A – Z" },
  { val: "z-a",    label: "Z – A" },
];

const stripHtml = (html) => {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

const Blog = () => {
  const dispatch   = useDispatch();
  const { isLoading, blogs = [], search, searchCategory, sort, page, numOfPages } =
    useSelector((s) => s.blog);

  const [localSearch, setLocalSearch] = useState(search);

  const debouncedSearch = useCallback(
    debounce((val) => dispatch(handleChange({ name: "search", value: val })), 450),
    [dispatch]
  );

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch, search, searchCategory, sort, page]);

  const handleSearchChange = (e) => {
    setLocalSearch(e.target.value);
    debouncedSearch(e.target.value);
  };

  const setCategory = (cat) => {
    dispatch(handleChange({ name: "searchCategory", value: cat === "All" ? "all" : cat }));
  };

  const handleClear = () => {
    setLocalSearch("");
    dispatch(clearFilters());
  };

  const activeCategory = searchCategory === "all" ? "All" : searchCategory;

  // smart ellipsis pagination
  const pageNumbers = () => {
    if (numOfPages <= 7) return Array.from({ length: numOfPages }, (_, i) => i + 1);
    const pages = [];
    for (let p = 1; p <= numOfPages; p++) {
      if (p === 1 || p === numOfPages || Math.abs(p - page) <= 1) {
        pages.push(p);
      } else if (Math.abs(p - page) === 2) {
        pages.push("...");
      }
    }
    // deduplicate consecutive dots
    return pages.filter((v, i, arr) => !(v === "..." && arr[i - 1] === "..."));
  };

  if (isLoading) return <Loading variant="blog-grid" />;

  return (
    <Wrapper>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <div className="blog-hero">
        <div className="hero-inner">
          <span className="hero-eyebrow">Meal Master Blog</span>
          <h1 className="hero-title">Recipes, Tips &amp; Food Stories</h1>
          <p className="hero-sub">
            From kitchen hacks to deep-dives on nutrition — stories worth reading.
          </p>
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search articles…"
              value={localSearch}
              onChange={handleSearchChange}
            />
            {localSearch && (
              <button className="clear-search" onClick={handleClear} title="Clear">
                <FaTimes />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Filter bar ────────────────────────────────────────────────── */}
      <div className="filter-bar">
        <div className="cat-pills">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`cat-pill${activeCategory === cat ? " active" : ""}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <select
          className="sort-select"
          value={sort}
          onChange={(e) => dispatch(handleChange({ name: "sort", value: e.target.value }))}
        >
          {SORTS.map((s) => (
            <option key={s.val} value={s.val}>{s.label}</option>
          ))}
        </select>
      </div>

      {/* ── Content ───────────────────────────────────────────────────── */}
      {blogs.length === 0 ? (
        <div className="empty-state">
          <FaNewspaper className="empty-icon" />
          <h2>No articles found</h2>
          <p>Try adjusting your search or filters.</p>
          <button className="clear-btn" onClick={handleClear}>Clear Filters</button>
        </div>
      ) : (
        <>
          <div className="blog-grid">
            {blogs.map((blog, idx) => {
              const excerpt = stripHtml(blog.content || "").substring(0, 155);
              const isFeatured = idx === 0;
              return (
                <article key={blog._id} className={`blog-card${isFeatured ? " featured" : ""}`}>
                  <Link to={`/blogs/${blog._id}`} className="card-img-wrap">
                    {blog.featuredImage ? (
                      <img src={blog.featuredImage} alt={blog.title} />
                    ) : (
                      <div className="card-img-placeholder" />
                    )}
                    <span className="card-cat">{blog.category}</span>
                  </Link>
                  <div className="card-body">
                    <h2 className="card-title">
                      <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
                    </h2>
                    <p className="card-excerpt">{excerpt}{excerpt.length >= 155 ? "…" : ""}</p>
                    <div className="card-footer">
                      <div className="card-meta">
                        <span className="meta-item">
                          <FaUser className="meta-icon" />
                          {blog.author?.fullName || "Author"}
                        </span>
                        <span className="meta-item">
                          <FaCalendarAlt className="meta-icon" />
                          {formatDate(blog.createdAt)}
                        </span>
                      </div>
                      <Link to={`/blogs/${blog._id}`} className="read-more">
                        Read <FaArrowRight className="arrow-icon" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {numOfPages > 1 && (
            <div className="pagination">
              <button
                className="pag-btn arrow"
                disabled={page === 1}
                onClick={() => dispatch(changePage(page - 1))}
              >
                ← Prev
              </button>

              {pageNumbers().map((p, i) =>
                p === "..." ? (
                  <span key={`dot-${i}`} className="pag-dots">…</span>
                ) : (
                  <button
                    key={p}
                    className={`pag-btn num${page === p ? " active" : ""}`}
                    onClick={() => dispatch(changePage(p))}
                  >
                    {p}
                  </button>
                )
              )}

              <button
                className="pag-btn arrow"
                disabled={page === numOfPages}
                onClick={() => dispatch(changePage(page + 1))}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default Blog;
