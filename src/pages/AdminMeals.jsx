import { useState, useEffect, useRef } from "react";
import Wrapper from "../assets/wrappers/AdminMeals";
import Loading from "../components/Loading";
import {
  FaPlus,
  FaArrowLeft,
  FaEdit,
  FaTrash,
  FaSearch,
  FaTimes,
  FaExclamationTriangle,
  FaStar,
  FaImage,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { MEAL, DIETARY, SORT } from "../utils/constants";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { allMealsQuery } from "../actionsAndLoaders/MealsLoader";

const TYPE_COLORS = {
  Breakfast: { bg: "#fef9c3", color: "#854d0e" },
  Lunch:     { bg: "#dbeafe", color: "#1e40af" },
  Dinner:    { bg: "#ede9fe", color: "#5b21b6" },
  Desert:    { bg: "#fce7f3", color: "#9d174d" },
  Junk:      { bg: "#fee2e2", color: "#991b1b" },
  Snack:     { bg: "#dcfce7", color: "#166534" },
};

const DIETARY_COLORS = {
  none:         { bg: "#f1f5f9", color: "#64748b" },
  vegan:        { bg: "#dcfce7", color: "#166534" },
  vegetarian:   { bg: "#d1fae5", color: "#065f46" },
  "gluten-free":{ bg: "#fef9c3", color: "#854d0e" },
  halal:        { bg: "#dbeafe", color: "#1e40af" },
  kosher:       { bg: "#ede9fe", color: "#5b21b6" },
};

const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced"];

const emptyIngredient = () => ({ name: "", quantity: "", unit: "", substitutions: [], price: "" });
const emptyStep = (num) => ({ stepNumber: num, instruction: "", duration: "" });

const AdminMeals = () => {
  const navigate = useNavigate();
  const { searchValues } = useLoaderData();
  const fileInputRef = useRef(null);

  // ── Filters ──────────────────────────────────────────────────────────
  const [filters, setFilters] = useState({
    name:     searchValues.name     || "",
    country:  searchValues.country  || "",
    mealType: searchValues.mealType || "all",
    dietary:  searchValues.dietary  || "all",
    sort:     searchValues.sort     || "Newest",
    page:     searchValues.page ? Number(searchValues.page) : 1,
  });

  const { data, isLoading } = useQuery(allMealsQuery(filters));
  const meals = data?.meals || [];
  const numOfPages = data?.numOfPages || 1;

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.name)              params.set("name",     filters.name);
    if (filters.country)           params.set("country",  filters.country);
    if (filters.mealType !== "all") params.set("mealType", filters.mealType);
    if (filters.dietary  !== "all") params.set("dietary",  filters.dietary);
    if (filters.sort !== "Newest") params.set("sort",     filters.sort);
    if (filters.page !== 1)        params.set("page",     filters.page.toString());
    navigate(`?${params.toString()}`);
  }, [filters, navigate]);

  const setFilter = (field, value) =>
    setFilters((prev) => ({
      ...prev,
      [field]: field === "page" ? Number(value) : value,
      page: field !== "page" ? 1 : Number(value),
    }));

  const clearFilters = () =>
    setFilters({ name: "", country: "", mealType: "all", dietary: "all", sort: "Newest", page: 1 });

  // ── View / Form state ─────────────────────────────────────────────────
  const [showForm,      setShowForm]      = useState(false);
  const [imageFile,     setImageFile]     = useState(null);
  const [imagePreview,  setImagePreview]  = useState(null);
  const [deleteTarget,  setDeleteTarget]  = useState(null);
  const [deleting,      setDeleting]      = useState(false);
  const [submitting,    setSubmitting]    = useState(false);

  // ── Form state ────────────────────────────────────────────────────────
  const [mealForm, setMealForm] = useState({
    name: "", mealType: MEAL.BREAKFAST, country: "", dietary: [], isRecommended: false,
  });
  const [ingredientList, setIngredientList] = useState([emptyIngredient()]);
  const [prepSteps, setPrepSteps] = useState({
    description: "", skillLevel: "Beginner", steps: [emptyStep(1)],
  });

  const resetForm = () => {
    setMealForm({ name: "", mealType: MEAL.BREAKFAST, country: "", dietary: [], isRecommended: false });
    setIngredientList([emptyIngredient()]);
    setPrepSteps({ description: "", skillLevel: "Beginner", steps: [emptyStep(1)] });
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const openCreate = () => { resetForm(); setShowForm(true); };
  const closeForm  = () => { resetForm(); setShowForm(false); };

  // ── Image ──────────────────────────────────────────────────────────────
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // ── Dietary checkboxes ────────────────────────────────────────────────
  const toggleDietary = (value) => {
    setMealForm((prev) => {
      const current = prev.dietary || [];
      return {
        ...prev,
        dietary: current.includes(value) ? current.filter((d) => d !== value) : [...current, value],
      };
    });
  };

  // ── Ingredient helpers ────────────────────────────────────────────────
  const updateIngredient = (idx, field, val) =>
    setIngredientList((prev) => prev.map((ing, i) => i === idx ? { ...ing, [field]: val } : ing));

  const addIngredient = () => setIngredientList((prev) => [...prev, emptyIngredient()]);

  const removeIngredient = (idx) =>
    setIngredientList((prev) => prev.length > 1 ? prev.filter((_, i) => i !== idx) : prev);

  const addSubstitution = (ingIdx) =>
    setIngredientList((prev) =>
      prev.map((ing, i) =>
        i === ingIdx
          ? { ...ing, substitutions: [...(ing.substitutions || []), { name: "", quantity: "", unit: "" }] }
          : ing
      )
    );

  const updateSubstitution = (ingIdx, subIdx, field, val) =>
    setIngredientList((prev) =>
      prev.map((ing, i) =>
        i === ingIdx
          ? {
              ...ing,
              substitutions: ing.substitutions.map((s, j) =>
                j === subIdx ? { ...s, [field]: val } : s
              ),
            }
          : ing
      )
    );

  const removeSubstitution = (ingIdx, subIdx) =>
    setIngredientList((prev) =>
      prev.map((ing, i) =>
        i === ingIdx
          ? { ...ing, substitutions: ing.substitutions.filter((_, j) => j !== subIdx) }
          : ing
      )
    );

  // ── Prep step helpers ─────────────────────────────────────────────────
  const addStep = () =>
    setPrepSteps((prev) => ({
      ...prev,
      steps: [...prev.steps, emptyStep(prev.steps.length + 1)],
    }));

  const updateStep = (idx, field, val) =>
    setPrepSteps((prev) => ({
      ...prev,
      steps: prev.steps.map((s, i) => i === idx ? { ...s, [field]: val } : s),
    }));

  const removeStep = (idx) =>
    setPrepSteps((prev) => {
      if (prev.steps.length <= 1) return prev;
      const steps = prev.steps
        .filter((_, i) => i !== idx)
        .map((s, i) => ({ ...s, stepNumber: i + 1 }));
      return { ...prev, steps };
    });

  // ── Submit (create only) ─────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mealForm.name.trim())    return toast.error("Meal name is required");
    if (!mealForm.country.trim()) return toast.error("Country is required");
    const validIngredients = ingredientList.filter((i) => i.name.trim());
    if (!validIngredients.length) return toast.error("Add at least one ingredient");
    const validSteps = prepSteps.steps.filter((s) => s.instruction.trim());
    if (!validSteps.length)        return toast.error("Add at least one preparation step");
    if (!imageFile)                return toast.error("Please add a meal image");

    const dietaryValues = mealForm.dietary?.length ? mealForm.dietary : [DIETARY.NONE];
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("name",          mealForm.name);
      fd.append("mealType",      mealForm.mealType);
      fd.append("country",       mealForm.country);
      fd.append("isRecommended", mealForm.isRecommended);
      for (const d of dietaryValues) fd.append("dietary", d);
      fd.append("image", imageFile);

      const { data: mRes } = await customFetch.post("/meals", fd);
      const mealId = mRes.meal._id;
      for (const ing of validIngredients) await customFetch.post("/ingredients", { ...ing, meal: mealId });
      await customFetch.post("/preparationSteps", {
        description: prepSteps.description, skillLevel: prepSteps.skillLevel,
        steps: validSteps, meal: mealId,
      });

      toast.success("Meal created successfully");
      resetForm();
      setShowForm(false);
      navigate("?");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const { data: res } = await customFetch.get(`/meals/${deleteTarget}`);
      const meal = res.meal;

      for (const ing of meal.ingredients || []) {
        try { await customFetch.delete(`/ingredients/${typeof ing === "object" ? ing._id : ing}`); }
        catch { /* non-fatal */ }
      }
      for (const step of meal.preparationSteps || []) {
        try { await customFetch.delete(`/preparationSteps/${typeof step === "object" ? step._id : step}`); }
        catch { /* non-fatal */ }
      }
      await customFetch.delete(`/meals/${deleteTarget}`);
      toast.success("Meal deleted successfully");
      setDeleteTarget(null);
      navigate("?");
    } catch (err) {
      toast.error("Error deleting meal: " + (err.response?.data?.message || err.message));
    } finally {
      setDeleting(false);
    }
  };

  // ── Pagination ────────────────────────────────────────────────────────
  const pageList = (() => {
    if (numOfPages <= 7) return Array.from({ length: numOfPages }, (_, i) => i + 1);
    const pages = [1];
    if (filters.page > 3) pages.push("...");
    for (let i = Math.max(2, filters.page - 1); i <= Math.min(numOfPages - 1, filters.page + 1); i++) pages.push(i);
    if (filters.page < numOfPages - 2) pages.push("...");
    pages.push(numOfPages);
    return pages;
  })();

  // ═══════════════════════════════════════════════════════════════════════
  //  RENDER
  // ═══════════════════════════════════════════════════════════════════════
  return (
    <Wrapper>
      {/* ── Form view ────────────────────────────────────────────────── */}
      {showForm ? (
        <div className="form-page">
          {/* Sticky header */}
          <div className="form-topbar">
            <button className="back-btn" onClick={closeForm}>
              <FaArrowLeft /> Back to Meals
            </button>
            <h1 className="form-title">Create New Meal</h1>
            <div className="form-top-actions">
              <button type="button" className="btn-cancel" onClick={closeForm}>
                Cancel
              </button>
              <button
                type="submit"
                form="meal-form"
                className="btn-save"
                disabled={submitting}
              >
                {submitting ? "Saving…" : "Create Meal"}
              </button>
            </div>
          </div>

          <form id="meal-form" onSubmit={handleSubmit} className="form-body">
            {/* ── Section 1: Basic Info ── */}
            <div className="form-card">
              <h2 className="form-section-title">Basic Information</h2>

              <div className="field-grid two-col">
                <div className="field-group">
                  <label className="field-label">Meal Name <span className="req">*</span></label>
                  <input
                    className="field-input"
                    type="text"
                    placeholder="e.g. Jollof Rice"
                    value={mealForm.name}
                    onChange={(e) => setMealForm({ ...mealForm, name: e.target.value })}
                  />
                </div>
                <div className="field-group">
                  <label className="field-label">Country <span className="req">*</span></label>
                  <input
                    className="field-input"
                    type="text"
                    placeholder="e.g. Nigeria"
                    value={mealForm.country}
                    onChange={(e) => setMealForm({ ...mealForm, country: e.target.value })}
                  />
                </div>
              </div>

              <div className="field-grid two-col">
                <div className="field-group">
                  <label className="field-label">Meal Type</label>
                  <select
                    className="field-input"
                    value={mealForm.mealType}
                    onChange={(e) => setMealForm({ ...mealForm, mealType: e.target.value })}
                  >
                    {Object.values(MEAL).map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="field-group">
                  <label className="field-label">Recommended</label>
                  <label className="toggle-row">
                    <div className={`toggle-switch${mealForm.isRecommended ? " on" : ""}`}
                      onClick={() => setMealForm((p) => ({ ...p, isRecommended: !p.isRecommended }))}>
                      <div className="toggle-thumb" />
                    </div>
                    <span className="toggle-label">
                      {mealForm.isRecommended ? "Yes — Featured on homepage" : "No"}
                    </span>
                  </label>
                </div>
              </div>

              <div className="field-group">
                <label className="field-label">Dietary Options</label>
                <div className="dietary-grid">
                  {Object.values(DIETARY).map((d) => (
                    <label key={d} className={`dietary-chip${(mealForm.dietary || []).includes(d) ? " selected" : ""}`}>
                      <input
                        type="checkbox"
                        checked={(mealForm.dietary || []).includes(d)}
                        onChange={() => toggleDietary(d)}
                      />
                      {d}
                    </label>
                  ))}
                </div>
              </div>

              {/* Image upload */}
              <div className="field-group">
                <label className="field-label">Meal Image <span className="req">*</span></label>
                <div className="image-upload-area" onClick={() => fileInputRef.current?.click()}>
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="image-preview" />
                  ) : (
                    <div className="image-placeholder">
                      <FaImage className="image-placeholder-icon" />
                      <span>Click to upload image</span>
                      <span className="image-hint">PNG, JPG, WEBP</span>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <button
                    type="button"
                    className="change-image-btn"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Change image
                  </button>
                )}
              </div>
            </div>

            {/* ── Section 2: Ingredients ── */}
            <div className="form-card">
              <div className="section-header-row">
                <h2 className="form-section-title">Ingredients</h2>
                <button type="button" className="add-card-btn" onClick={addIngredient}>
                  <FaPlus /> Add Ingredient
                </button>
              </div>

              {ingredientList.map((ing, idx) => (
                <div key={idx} className="sub-card">
                  <div className="sub-card-header">
                    <span className="sub-card-num">{idx + 1}</span>
                    <span className="sub-card-label">Ingredient {idx + 1}</span>
                    {ingredientList.length > 1 && (
                      <button type="button" className="remove-icon-btn" onClick={() => removeIngredient(idx)}>
                        <FaTimes />
                      </button>
                    )}
                  </div>

                  <div className="field-grid two-col">
                    <div className="field-group">
                      <label className="field-label">Name</label>
                      <input className="field-input" type="text" placeholder="e.g. Tomato"
                        value={ing.name} onChange={(e) => updateIngredient(idx, "name", e.target.value)} />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Price (₦)</label>
                      <input className="field-input" type="text" placeholder="e.g. 500"
                        value={ing.price} onChange={(e) => updateIngredient(idx, "price", e.target.value)} />
                    </div>
                  </div>

                  <div className="field-grid three-col">
                    <div className="field-group">
                      <label className="field-label">Quantity</label>
                      <input className="field-input" type="text" placeholder="e.g. 2"
                        value={ing.quantity} onChange={(e) => updateIngredient(idx, "quantity", e.target.value)} />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Unit</label>
                      <input className="field-input" type="text" placeholder="e.g. cups"
                        value={ing.unit} onChange={(e) => updateIngredient(idx, "unit", e.target.value)} />
                    </div>
                  </div>

                  {/* Substitutions */}
                  {ing.substitutions?.length > 0 && (
                    <div className="substitutions">
                      <p className="sub-section-label">Substitutions</p>
                      {ing.substitutions.map((sub, sIdx) => (
                        <div key={sIdx} className="sub-row">
                          <div className="field-grid three-col no-mb">
                            <div className="field-group">
                              <input className="field-input sm" type="text" placeholder="Name"
                                value={sub.name || ""}
                                onChange={(e) => updateSubstitution(idx, sIdx, "name", e.target.value)} />
                            </div>
                            <div className="field-group">
                              <input className="field-input sm" type="text" placeholder="Qty"
                                value={sub.quantity || ""}
                                onChange={(e) => updateSubstitution(idx, sIdx, "quantity", e.target.value)} />
                            </div>
                            <div className="field-group">
                              <input className="field-input sm" type="text" placeholder="Unit"
                                value={sub.unit || ""}
                                onChange={(e) => updateSubstitution(idx, sIdx, "unit", e.target.value)} />
                            </div>
                          </div>
                          <button type="button" className="remove-sub-btn"
                            onClick={() => removeSubstitution(idx, sIdx)}>
                            <FaTimes />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <button type="button" className="add-sub-btn" onClick={() => addSubstitution(idx)}>
                    + Add substitution
                  </button>
                </div>
              ))}
            </div>

            {/* ── Section 3: Preparation Steps ── */}
            <div className="form-card">
              <div className="section-header-row">
                <h2 className="form-section-title">Preparation</h2>
                <button type="button" className="add-card-btn" onClick={addStep}>
                  <FaPlus /> Add Step
                </button>
              </div>

              <div className="field-grid two-col">
                <div className="field-group">
                  <label className="field-label">Overview / Description</label>
                  <input className="field-input" type="text" placeholder="Brief overview of the dish..."
                    value={prepSteps.description}
                    onChange={(e) => setPrepSteps({ ...prepSteps, description: e.target.value })} />
                </div>
                <div className="field-group">
                  <label className="field-label">Skill Level</label>
                  <select className="field-input" value={prepSteps.skillLevel}
                    onChange={(e) => setPrepSteps({ ...prepSteps, skillLevel: e.target.value })}>
                    {SKILL_LEVELS.map((l) => <option key={l}>{l}</option>)}
                  </select>
                </div>
              </div>

              {prepSteps.steps.map((step, idx) => (
                <div key={idx} className="sub-card step-card">
                  <div className="sub-card-header">
                    <span className="sub-card-num">{step.stepNumber}</span>
                    <span className="sub-card-label">Step {step.stepNumber}</span>
                    {prepSteps.steps.length > 1 && (
                      <button type="button" className="remove-icon-btn" onClick={() => removeStep(idx)}>
                        <FaTimes />
                      </button>
                    )}
                  </div>
                  <div className="field-group">
                    <label className="field-label">Instruction</label>
                    <textarea className="field-textarea" rows={3}
                      placeholder="Describe this step clearly…"
                      value={step.instruction}
                      onChange={(e) => updateStep(idx, "instruction", e.target.value)} />
                  </div>
                  <div className="field-group" style={{ maxWidth: "260px" }}>
                    <label className="field-label">Duration</label>
                    <input className="field-input" type="text" placeholder="e.g. 10 minutes"
                      value={step.duration}
                      onChange={(e) => updateStep(idx, "duration", e.target.value)} />
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom action row */}
            <div className="form-bottom-actions">
              <button type="button" className="btn-cancel" onClick={closeForm}>Cancel</button>
              <button type="submit" className="btn-save" disabled={submitting}>
                {submitting ? "Saving…" : "Create Meal"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        // ── List view ────────────────────────────────────────────────────
        <div className="list-page">
          {/* Page header */}
          <div className="page-header">
            <div>
              <h1 className="page-title">Meal Management</h1>
              <p className="page-sub">{data?.totalMeals ?? meals.length} meals total</p>
            </div>
            <button className="create-btn" onClick={openCreate}>
              <FaPlus /> Create Meal
            </button>
          </div>

          {/* Filter bar */}
          <div className="filter-bar">
            <div className="search-wrap">
              <FaSearch className="search-icon" />
              <input
                className="search-input"
                type="text"
                placeholder="Search by name…"
                value={filters.name}
                onChange={(e) => setFilter("name", e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && setFilter("name", filters.name)}
              />
            </div>
            <input
              className="filter-input"
              type="text"
              placeholder="Country…"
              value={filters.country}
              onChange={(e) => setFilter("country", e.target.value)}
            />
            <select className="filter-select" value={filters.mealType}
              onChange={(e) => setFilter("mealType", e.target.value)}>
              <option value="all">All Types</option>
              {Object.values(MEAL).map((t) => <option key={t}>{t}</option>)}
            </select>
            <select className="filter-select" value={filters.dietary}
              onChange={(e) => setFilter("dietary", e.target.value)}>
              <option value="all">All Dietary</option>
              {Object.values(DIETARY).map((d) => <option key={d}>{d}</option>)}
            </select>
            <select className="filter-select" value={filters.sort}
              onChange={(e) => setFilter("sort", e.target.value)}>
              {Object.values(SORT).map((s) => <option key={s}>{s}</option>)}
            </select>
            <button className="clear-btn" onClick={clearFilters}>Clear</button>
          </div>

          {/* Table */}
          <div className="table-card">
            {isLoading ? (
              <Loading variant="admin-rows" />
            ) : meals.length === 0 ? (
              <div className="empty-state">
                <span className="empty-emoji">🍽️</span>
                <p>No meals found</p>
              </div>
            ) : (
              <div className="table-wrap">
                <table className="meals-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Meal</th>
                      <th>Type</th>
                      <th>Country</th>
                      <th>Dietary</th>
                      <th>Featured</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {meals.map((meal, idx) => {
                      const typeStyle = TYPE_COLORS[meal.mealType] || { bg: "#f1f5f9", color: "#64748b" };
                      const dietaryList = Array.isArray(meal.dietary) ? meal.dietary.filter(Boolean) : [];
                      return (
                        <tr key={meal._id}>
                          <td className="row-num">
                            {(filters.page - 1) * 10 + idx + 1}
                          </td>
                          <td>
                            <div className="meal-cell">
                              <img
                                src={meal.image}
                                alt={meal.name}
                                className="meal-thumb"
                                onError={(e) => { e.target.style.display = "none"; }}
                              />
                              <span className="meal-name">{meal.name}</span>
                            </div>
                          </td>
                          <td>
                            <span
                              className="type-pill"
                              style={{ background: typeStyle.bg, color: typeStyle.color }}
                            >
                              {meal.mealType}
                            </span>
                          </td>
                          <td className="country-cell">{meal.country}</td>
                          <td>
                            <div className="dietary-tags">
                              {dietaryList.length === 0 || (dietaryList.length === 1 && dietaryList[0] === "none") ? (
                                <span className="dietary-tag" style={DIETARY_COLORS["none"]}>none</span>
                              ) : (
                                dietaryList.filter((d) => d !== "none").map((d) => {
                                  const s = DIETARY_COLORS[d] || { bg: "#f1f5f9", color: "#64748b" };
                                  return (
                                    <span key={d} className="dietary-tag" style={{ background: s.bg, color: s.color }}>
                                      {d}
                                    </span>
                                  );
                                })
                              )}
                            </div>
                          </td>
                          <td className="recommended-cell">
                            {meal.isRecommended ? (
                              <span className="rec-badge"><FaStar /> Featured</span>
                            ) : (
                              <span className="no-rec">—</span>
                            )}
                          </td>
                          <td>
                            <div className="action-row">
                              <button className="edit-btn" title="Edit meal" onClick={() => navigate(`/admin/meals/${meal._id}/edit`)}>
                                <FaEdit />
                              </button>
                              <button className="del-btn" title="Delete meal" onClick={() => setDeleteTarget(meal._id)}>
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
              <button className="page-nav" disabled={filters.page === 1}
                onClick={() => setFilter("page", filters.page - 1)}>
                <FaChevronLeft />
              </button>
              {pageList.map((p, i) =>
                p === "..." ? (
                  <span key={`e-${i}`} className="ellipsis">…</span>
                ) : (
                  <button key={p} className={`page-btn${p === filters.page ? " active" : ""}`}
                    onClick={() => setFilter("page", p)}>
                    {p}
                  </button>
                )
              )}
              <button className="page-nav" disabled={filters.page === numOfPages}
                onClick={() => setFilter("page", filters.page + 1)}>
                <FaChevronRight />
              </button>
              <span className="page-info">{filters.page} / {numOfPages}</span>
            </div>
          )}
        </div>
      )}

      {/* ── Delete Confirm Modal ── */}
      {deleteTarget && (
        <div className="modal-overlay" onClick={() => !deleting && setDeleteTarget(null)}>
          <div className="modal confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-icon">
              <FaExclamationTriangle />
            </div>
            <h2 className="confirm-title">Delete Meal?</h2>
            <p className="confirm-text">
              This will permanently delete the meal along with all its ingredients and preparation steps.
              This action cannot be undone.
            </p>
            <div className="confirm-actions">
              <button className="btn-cancel-sm" disabled={deleting}
                onClick={() => setDeleteTarget(null)}>
                Cancel
              </button>
              <button className="btn-delete-sm" disabled={deleting} onClick={handleDelete}>
                {deleting ? "Deleting…" : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default AdminMeals;
