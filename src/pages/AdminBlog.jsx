import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaPlus,
  FaArrowLeft,
  FaEdit,
  FaTrash,
  FaSearch,
  FaTimes,
  FaCheck,
  FaChevronRight,
  FaChevronLeft,
  FaImage,
  FaExclamationTriangle,
  FaTag,
} from "react-icons/fa";
import { MdArticle } from "react-icons/md";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Wrapper from "../assets/wrappers/AdminBlog";
import Loading from "../components/Loading";
import {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  handleChange,
  clearFilters,
  changePage,
} from "../Features/Blog/blogSlice";
import moment from "moment";

const CATEGORIES = ["General", "Recipes", "Nutrition", "Cooking Tips", "Health", "Other"];
const STATUSES   = ["draft", "published"];
const SORT_OPTS  = ["newest", "oldest", "a-z", "z-a"];

const STATUS_STYLE = {
  published: { bg: "#dcfce7", color: "#166534" },
  draft:     { bg: "#f1f5f9", color: "#475569" },
};

const QUILL_MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    ["link"],
    ["clean"],
  ],
};

const QUILL_FORMATS = [
  "header", "bold", "italic", "underline", "strike",
  "list", "bullet", "blockquote", "code-block", "link",
];

const emptyForm = {
  title: "", content: "", category: "General", status: "draft",
  featuredImage: null, metaTitle: "", metaDescription: "",
  keywords: [], featuredImageAlt: "", slug: "",
};

const AdminBlog = () => {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const location  = useLocation();
  const imgRef    = useRef(null);

  const { isLoading, blogs, totalBlogs, numOfPages, page, search, searchStatus, searchCategory, sort } =
    useSelector((s) => s.blog);

  const [showForm,    setShowForm]    = useState(false);
  const [isEditing,   setIsEditing]   = useState(false);
  const [selectedId,  setSelectedId]  = useState(null);
  const [blogForm,    setBlogForm]    = useState(emptyForm);
  const [imgPreview,  setImgPreview]  = useState(null);
  const [saving,      setSaving]      = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null); // { id, title }
  const [keywordInput, setKeywordInput] = useState("");

  // ── Sync URL → Redux filters ──────────────────────────────────────
  useEffect(() => {
    const p = new URLSearchParams(location.search);
    [["search",""], ["searchStatus","all"], ["searchCategory","all"], ["sort","newest"]].forEach(
      ([key, def]) => { const v = p.get(key === "searchStatus" ? "status" : key === "searchCategory" ? "category" : key) || def; if (v) dispatch(handleChange({ name: key, value: v })); }
    );
    dispatch(getAllBlogs());
  }, [location.search, dispatch]);

  // ── Sync Redux filters → URL ──────────────────────────────────────
  useEffect(() => {
    const p = new URLSearchParams();
    if (search)                     p.append("search",   search);
    if (searchStatus !== "all")     p.append("status",   searchStatus);
    if (searchCategory !== "all")   p.append("category", searchCategory);
    if (sort !== "newest")          p.append("sort",     sort);
    if (page !== 1)                 p.append("page",     page);
    navigate(`?${p.toString()}`, { replace: true });
  }, [search, searchStatus, searchCategory, sort, page, navigate]);

  const setFilter = (name, value) => {
    dispatch(handleChange({ name, value }));
    if (name !== "page") dispatch(changePage(1));
  };

  // ── Form helpers ──────────────────────────────────────────────────
  const resetForm = () => {
    setBlogForm(emptyForm);
    setImgPreview(null);
    setSelectedId(null);
    setIsEditing(false);
    setKeywordInput("");
  };

  const openCreate = () => { resetForm(); setShowForm(true); };

  const openEdit = (blog) => {
    setBlogForm({
      title: blog.title, content: blog.content, category: blog.category,
      status: blog.status, featuredImage: null,
      metaTitle: blog.metaTitle || "", metaDescription: blog.metaDescription || "",
      keywords: blog.keywords || [], featuredImageAlt: blog.featuredImageAlt || "",
      slug: blog.slug || "",
    });
    setImgPreview(blog.featuredImage || null);
    setSelectedId(blog._id);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setBlogForm((p) => ({ ...p, featuredImage: file }));
    setImgPreview(URL.createObjectURL(file));
    e.target.value = "";
  };

  const addKeyword = () => {
    const kw = keywordInput.trim();
    if (!kw) return;
    setBlogForm((p) => ({ ...p, keywords: [...p.keywords, kw] }));
    setKeywordInput("");
  };

  const removeKeyword = (i) =>
    setBlogForm((p) => ({ ...p, keywords: p.keywords.filter((_, j) => j !== i) }));

  // ── Submit ────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!blogForm.title.trim())        return toast.error("Blog title is required");
    if (!blogForm.content.trim())      return toast.error("Blog content is required");
    if (!isEditing && !blogForm.featuredImage) return toast.error("Featured image is required");
    if (!blogForm.featuredImageAlt)    return toast.error("Image alt text is required");

    const slug = blogForm.slug || blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const fd   = new FormData();
    fd.append("title",           blogForm.title);
    fd.append("content",         blogForm.content);
    fd.append("category",        blogForm.category);
    fd.append("status",          blogForm.status);
    fd.append("metaTitle",       blogForm.metaTitle || blogForm.title);
    fd.append("metaDescription", blogForm.metaDescription);
    fd.append("keywords",        JSON.stringify(blogForm.keywords));
    fd.append("featuredImageAlt",blogForm.featuredImageAlt);
    fd.append("slug",            slug);
    if (blogForm.featuredImage) fd.append("featuredImage", blogForm.featuredImage);

    setSaving(true);
    try {
      if (isEditing) {
        await dispatch(updateBlog({ blogId: selectedId, blog: fd })).unwrap();
        toast.success("Blog updated");
      } else {
        await dispatch(createBlog(fd)).unwrap();
        toast.success("Blog created");
      }
      resetForm();
      setShowForm(false);
      dispatch(getAllBlogs());
    } catch (err) {
      toast.error(err || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  // ── Delete ────────────────────────────────────────────────────────
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await dispatch(deleteBlog(deleteTarget.id)).unwrap();
      toast.success("Blog deleted");
    } catch (err) {
      toast.error(err || "Failed to delete");
    } finally {
      setDeleteTarget(null);
    }
  };

  // ── Pagination ────────────────────────────────────────────────────
  const pageNumbers = () => {
    if (numOfPages <= 7) return Array.from({ length: numOfPages }, (_, i) => i + 1);
    const pages = [];
    for (let p2 = 1; p2 <= numOfPages; p2++) {
      if (p2 === 1 || p2 === numOfPages || Math.abs(p2 - page) <= 1) pages.push(p2);
      else if (Math.abs(p2 - page) === 2) pages.push("...");
    }
    return pages.filter((v, i, arr) => !(v === "..." && arr[i - 1] === "..."));
  };

  // ─────────────────────────────────────────────────────────────────
  return (
    <Wrapper>

      {/* ══ FORM VIEW ═══════════════════════════════════════════════ */}
      {showForm ? (
        <>
          {/* Topbar */}
          <div className="topbar">
            <button className="back-btn" onClick={() => { setShowForm(false); resetForm(); }}>
              <FaArrowLeft /><span>Blogs</span>
            </button>
            <nav className="breadcrumb">
              <span className="bc-seg">Admin</span>
              <FaChevronRight className="bc-sep" />
              <span className="bc-seg">Blog</span>
              <FaChevronRight className="bc-sep" />
              <span className="bc-seg current">{isEditing ? "Edit Post" : "New Post"}</span>
            </nav>
            <div className="topbar-right">
              <button type="button" className="btn-discard" onClick={() => { setShowForm(false); resetForm(); }}>
                Discard
              </button>
              <button type="submit" form="blog-form" className="btn-save" disabled={saving}>
                {saving ? <><span className="btn-spinner" />Saving…</> : <><FaCheck />{isEditing ? "Update" : "Publish"}</>}
              </button>
            </div>
          </div>

          {/* Two-column form */}
          <form id="blog-form" onSubmit={handleSubmit} className="form-layout">

            {/* Main column */}
            <div className="form-main">
              {/* Title */}
              <div className="form-card">
                <div className="field-group">
                  <label className="field-label">Post Title <span className="req">*</span></label>
                  <input
                    className="field-input title-input"
                    type="text"
                    placeholder="Enter an engaging title…"
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="form-card">
                <label className="field-label">Content <span className="req">*</span></label>
                <div className="quill-wrap">
                  <ReactQuill
                    value={blogForm.content}
                    onChange={(content) => setBlogForm({ ...blogForm, content })}
                    modules={QUILL_MODULES}
                    formats={QUILL_FORMATS}
                    placeholder="Write your post content here…"
                    theme="snow"
                  />
                </div>
              </div>

              {/* SEO */}
              <div className="form-card">
                <div className="card-section-head">
                  <h3 className="section-title">SEO Settings</h3>
                  <p className="section-sub">Help search engines find this post</p>
                </div>
                <div className="field-group">
                  <label className="field-label">Meta Title</label>
                  <input
                    className="field-input"
                    type="text"
                    placeholder="SEO title (max 60 chars)"
                    maxLength={60}
                    value={blogForm.metaTitle}
                    onChange={(e) => setBlogForm({ ...blogForm, metaTitle: e.target.value })}
                  />
                  <span className="char-count">{blogForm.metaTitle.length}/60</span>
                </div>
                <div className="field-group">
                  <label className="field-label">Meta Description</label>
                  <textarea
                    className="field-textarea"
                    rows={3}
                    placeholder="SEO description (max 160 chars)"
                    maxLength={160}
                    value={blogForm.metaDescription}
                    onChange={(e) => setBlogForm({ ...blogForm, metaDescription: e.target.value })}
                  />
                  <span className="char-count">{blogForm.metaDescription.length}/160</span>
                </div>
                <div className="field-group">
                  <label className="field-label">URL Slug</label>
                  <input
                    className="field-input"
                    type="text"
                    placeholder="custom-url-slug (auto-generated if empty)"
                    value={blogForm.slug}
                    onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                  />
                </div>
                <div className="field-group">
                  <label className="field-label">Keywords</label>
                  <div className="keyword-input-row">
                    <input
                      className="field-input"
                      type="text"
                      placeholder="Add keyword then press Enter or ,"
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addKeyword(); }
                      }}
                    />
                    <button type="button" className="add-kw-btn" onClick={addKeyword}>Add</button>
                  </div>
                  {blogForm.keywords.length > 0 && (
                    <div className="kw-tags">
                      {blogForm.keywords.map((kw, i) => (
                        <span key={i} className="kw-tag">
                          <FaTag className="kw-icon" />{kw}
                          <button type="button" onClick={() => removeKeyword(i)}><FaTimes /></button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar column */}
            <aside className="form-sidebar">

              {/* Publish settings */}
              <div className="form-card">
                <h3 className="section-title">Publish Settings</h3>
                <div className="field-group">
                  <label className="field-label">Category</label>
                  <select
                    className="field-input"
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                  >
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="field-group">
                  <label className="field-label">Status</label>
                  <div className="status-toggle">
                    {STATUSES.map((s) => (
                      <button
                        key={s}
                        type="button"
                        className={`status-opt${blogForm.status === s ? " active" : ""}`}
                        onClick={() => setBlogForm({ ...blogForm, status: s })}
                        style={blogForm.status === s ? STATUS_STYLE[s] : {}}
                      >
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Featured image */}
              <div className="form-card">
                <h3 className="section-title">Featured Image</h3>
                <div
                  className="img-upload-zone"
                  onClick={() => imgRef.current?.click()}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && imgRef.current?.click()}
                >
                  {imgPreview ? (
                    <>
                      <img src={imgPreview} alt="preview" className="img-preview" />
                      <div className="img-overlay">
                        <FaImage className="overlay-icon" />
                        <span>Change Image</span>
                      </div>
                    </>
                  ) : (
                    <div className="img-placeholder">
                      <FaImage className="placeholder-icon" />
                      <span>Click to upload</span>
                      <small>PNG · JPG · WEBP</small>
                    </div>
                  )}
                </div>
                <input ref={imgRef} type="file" accept="image/*" hidden onChange={handleImageChange} />
                <div className="field-group" style={{ marginTop: "0.75rem" }}>
                  <label className="field-label">Alt Text <span className="req">*</span></label>
                  <input
                    className="field-input"
                    type="text"
                    placeholder="Describe the image for accessibility"
                    value={blogForm.featuredImageAlt}
                    onChange={(e) => setBlogForm({ ...blogForm, featuredImageAlt: e.target.value })}
                  />
                </div>
              </div>
            </aside>
          </form>
        </>
      ) : (

      /* ══ LIST VIEW ════════════════════════════════════════════════ */
        <div className="list-page">
          {/* Header */}
          <div className="list-header">
            <div>
              <h1 className="page-title">Blog Posts</h1>
              <p className="page-sub">{totalBlogs ?? blogs.length} post{blogs.length !== 1 ? "s" : ""} total</p>
            </div>
            <button className="btn-create" onClick={openCreate}>
              <FaPlus /> New Post
            </button>
          </div>

          {/* Filter bar */}
          <div className="filter-card">
            <div className="filter-field">
              <FaSearch className="filter-search-icon" />
              <input
                className="filter-input"
                type="text"
                placeholder="Search posts…"
                value={search}
                onChange={(e) => setFilter("search", e.target.value)}
              />
              {search && (
                <button className="filter-clear-x" onClick={() => setFilter("search", "")}>
                  <FaTimes />
                </button>
              )}
            </div>
            <select className="filter-select" value={searchStatus} onChange={(e) => setFilter("searchStatus", e.target.value)}>
              <option value="all">All Status</option>
              {STATUSES.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
            </select>
            <select className="filter-select" value={searchCategory} onChange={(e) => setFilter("searchCategory", e.target.value)}>
              <option value="all">All Categories</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select className="filter-select" value={sort} onChange={(e) => setFilter("sort", e.target.value)}>
              {SORT_OPTS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <button className="filter-clear-btn" onClick={() => dispatch(clearFilters())}>
              <FaTimes /> Clear
            </button>
          </div>

          {/* Table */}
          <div className="table-card">
            {isLoading ? (
              <Loading variant="admin-rows" />
            ) : blogs.length === 0 ? (
              <div className="empty-state">
                <MdArticle className="empty-icon" />
                <p>No posts found. Try adjusting your filters.</p>
                <button className="clear-btn" onClick={() => dispatch(clearFilters())}>Clear Filters</button>
              </div>
            ) : (
              <div className="table-wrap">
                <table className="blog-table">
                  <thead>
                    <tr>
                      <th style={{ width: 60 }}>#</th>
                      <th>Post</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th style={{ width: 100 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogs.map((blog, idx) => {
                      const ss = STATUS_STYLE[blog.status] || STATUS_STYLE.draft;
                      return (
                        <tr key={blog._id}>
                          <td className="td-num">{(page - 1) * 10 + idx + 1}</td>
                          <td className="td-post">
                            {blog.featuredImage ? (
                              <img src={blog.featuredImage} alt={blog.title} className="post-thumb" />
                            ) : (
                              <div className="post-thumb-placeholder"><FaImage /></div>
                            )}
                            <span className="post-title">{blog.title}</span>
                          </td>
                          <td><span className="cat-badge">{blog.category}</span></td>
                          <td>
                            <span className="status-badge" style={{ background: ss.bg, color: ss.color }}>
                              {blog.status}
                            </span>
                          </td>
                          <td className="td-date">{moment(blog.createdAt).format("MMM D, YYYY")}</td>
                          <td>
                            <div className="row-actions">
                              <button className="action-btn edit" title="Edit" onClick={() => openEdit(blog)}>
                                <FaEdit />
                              </button>
                              <button className="action-btn delete" title="Delete" onClick={() => setDeleteTarget({ id: blog._id, title: blog.title })}>
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Pagination */}
          {numOfPages > 1 && (
            <div className="pagination">
              <button className="pag-btn" disabled={page === 1} onClick={() => setFilter("page", page - 1)}>
                <FaChevronLeft />
              </button>
              {pageNumbers().map((p, i) =>
                p === "..." ? (
                  <span key={`d-${i}`} className="pag-dots">…</span>
                ) : (
                  <button key={p} className={`pag-btn${page === p ? " active" : ""}`} onClick={() => setFilter("page", p)}>
                    {p}
                  </button>
                )
              )}
              <button className="pag-btn" disabled={page === numOfPages} onClick={() => setFilter("page", page + 1)}>
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ══ Delete Confirmation Modal ════════════════════════════════ */}
      {deleteTarget && (
        <div className="modal-overlay">
          <div className="confirm-modal">
            <FaExclamationTriangle className="confirm-icon" />
            <h3>Delete Post?</h3>
            <p>
              <strong>"{deleteTarget.title}"</strong> will be permanently deleted. This cannot be undone.
            </p>
            <div className="confirm-actions">
              <button className="cancel-btn" onClick={() => setDeleteTarget(null)}>Cancel</button>
              <button className="delete-confirm-btn" onClick={confirmDelete}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default AdminBlog;
