import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { MEAL, DIETARY } from "../utils/constants";
import Wrapper from "../assets/wrappers/UpdateMeal";
import {
  FaArrowLeft,
  FaPlus,
  FaTimes,
  FaCamera,
  FaExclamationTriangle,
  FaCheck,
  FaStar,
  FaChevronRight,
} from "react-icons/fa";
import { MdOutlineRestaurantMenu } from "react-icons/md";

const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced"];

const TYPE_COLORS = {
  Breakfast: { bg: "#fef9c3", color: "#854d0e" },
  Lunch:     { bg: "#dbeafe", color: "#1e40af" },
  Dinner:    { bg: "#ede9fe", color: "#5b21b6" },
  Desert:    { bg: "#fce7f3", color: "#9d174d" },
  Junk:      { bg: "#fee2e2", color: "#991b1b" },
  Snack:     { bg: "#dcfce7", color: "#166534" },
};

const emptyIngredient = () => ({
  name: "", quantity: "", unit: "", substitutions: [], price: "",
});
const emptyStep = (num) => ({ stepNumber: num, instruction: "", duration: "" });

const UpdateMeal = () => {
  const { mealId } = useParams();
  const navigate   = useNavigate();
  const fileInputRef = useRef(null);

  // ── Fetch meal ────────────────────────────────────────────────────────
  const { data: meal, isLoading: fetching, isError } = useQuery({
    queryKey: ["adminMeal", mealId],
    queryFn: async () => {
      const { data } = await customFetch.get(`/meals/${mealId}`);
      return data.meal;
    },
    retry: false,
  });

  // ── Form state ────────────────────────────────────────────────────────
  const [mealForm, setMealForm] = useState({
    name: "", mealType: MEAL.BREAKFAST, country: "", dietary: [], isRecommended: false,
  });
  const [ingredientList, setIngredientList] = useState([emptyIngredient()]);
  const [prepSteps, setPrepSteps] = useState({
    description: "", skillLevel: "Beginner", steps: [emptyStep(1)],
  });
  const [imageFile,    setImageFile]    = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting,   setSubmitting]   = useState(false);
  const [initialized,  setInitialized]  = useState(false);

  // ── Populate form once data loads ─────────────────────────────────────
  useEffect(() => {
    if (!meal || initialized) return;

    setMealForm({
      name:          meal.name          || "",
      mealType:      meal.mealType      || MEAL.BREAKFAST,
      country:       meal.country       || "",
      dietary:       meal.dietary       || [],
      isRecommended: meal.isRecommended || false,
    });

    if (meal.image) setImagePreview(meal.image);

    setIngredientList(
      meal.ingredients?.length
        ? meal.ingredients.map((ing) => ({
            name:          ing.name          || "",
            quantity:      ing.quantity      || "",
            unit:          ing.unit          || "",
            substitutions: Array.isArray(ing.substitutions) ? ing.substitutions : [],
            price:         ing.price         || "",
          }))
        : [emptyIngredient()]
    );

    if (meal.preparationSteps?.length) {
      const ps      = meal.preparationSteps[0];
      const rawSteps = ps.steps || [];
      const steps = rawSteps.length
        ? typeof rawSteps[0] === "string"
          ? rawSteps.map((s, i) => ({ stepNumber: i + 1, instruction: s, duration: "" }))
          : rawSteps
        : [emptyStep(1)];
      setPrepSteps({ description: ps.description || "", skillLevel: ps.skillLevel || "Beginner", steps });
    }

    setInitialized(true);
  }, [meal, initialized]);

  // ── Image ──────────────────────────────────────────────────────────────
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    e.target.value = "";          // allow re-selecting same file
  };

  // ── Dietary ───────────────────────────────────────────────────────────
  const toggleDietary = (val) =>
    setMealForm((p) => ({
      ...p,
      dietary: (p.dietary || []).includes(val)
        ? p.dietary.filter((d) => d !== val)
        : [...(p.dietary || []), val],
    }));

  // ── Ingredient helpers ────────────────────────────────────────────────
  const updateIngredient = (idx, field, val) =>
    setIngredientList((prev) =>
      prev.map((ing, i) => (i === idx ? { ...ing, [field]: val } : ing))
    );

  const addIngredient    = () => setIngredientList((p) => [...p, emptyIngredient()]);

  const removeIngredient = (idx) =>
    setIngredientList((p) => p.length > 1 ? p.filter((_, i) => i !== idx) : p);

  const addSubstitution = (ingIdx) =>
    setIngredientList((p) =>
      p.map((ing, i) =>
        i === ingIdx
          ? { ...ing, substitutions: [...(ing.substitutions || []), { name: "", quantity: "", unit: "" }] }
          : ing
      )
    );

  const updateSubstitution = (ingIdx, subIdx, field, val) =>
    setIngredientList((p) =>
      p.map((ing, i) =>
        i === ingIdx
          ? { ...ing, substitutions: ing.substitutions.map((s, j) => j === subIdx ? { ...s, [field]: val } : s) }
          : ing
      )
    );

  const removeSubstitution = (ingIdx, subIdx) =>
    setIngredientList((p) =>
      p.map((ing, i) =>
        i === ingIdx
          ? { ...ing, substitutions: ing.substitutions.filter((_, j) => j !== subIdx) }
          : ing
      )
    );

  // ── Step helpers ──────────────────────────────────────────────────────
  const addStep = () =>
    setPrepSteps((p) => ({ ...p, steps: [...p.steps, emptyStep(p.steps.length + 1)] }));

  const updateStep = (idx, field, val) =>
    setPrepSteps((p) => ({ ...p, steps: p.steps.map((s, i) => i === idx ? { ...s, [field]: val } : s) }));

  const removeStep = (idx) =>
    setPrepSteps((p) => {
      if (p.steps.length <= 1) return p;
      return { ...p, steps: p.steps.filter((_, i) => i !== idx).map((s, i) => ({ ...s, stepNumber: i + 1 })) };
    });

  // ── Submit ────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mealForm.name.trim())    return toast.error("Meal name is required");
    if (!mealForm.country.trim()) return toast.error("Country is required");
    const validIngredients = ingredientList.filter((i) => i.name.trim());
    if (!validIngredients.length) return toast.error("Add at least one ingredient");
    const validSteps = prepSteps.steps.filter((s) => s.instruction.trim());
    if (!validSteps.length)        return toast.error("Add at least one preparation step");

    const dietaryValues = mealForm.dietary?.length ? mealForm.dietary : [DIETARY.NONE];
    setSubmitting(true);
    try {
      // 1 — Patch basic info + optional new image
      const fd = new FormData();
      fd.append("name",          mealForm.name);
      fd.append("mealType",      mealForm.mealType);
      fd.append("country",       mealForm.country);
      fd.append("isRecommended", mealForm.isRecommended);
      for (const d of dietaryValues) fd.append("dietary", d);
      if (imageFile) fd.append("image", imageFile);
      await customFetch.patch(`/meals/${mealId}`, fd);

      // 2 — Re-fetch for current IDs
      const { data: fresh } = await customFetch.get(`/meals/${mealId}`);
      const freshMeal        = fresh.meal;
      const existingIngrs    = freshMeal.ingredients || [];
      const existingIds      = new Map(existingIngrs.map((i) => [i._id, i]));

      // 3 — Sync ingredients
      for (let i = 0; i < validIngredients.length; i++) {
        if (i < existingIngrs.length) {
          const eid = existingIngrs[i]._id;
          await customFetch.patch(`/ingredients/${eid}`, { ...validIngredients[i], meal: mealId });
          existingIds.delete(eid);
        } else {
          await customFetch.post("/ingredients", { ...validIngredients[i], meal: mealId });
        }
      }
      for (const [id] of existingIds) await customFetch.delete(`/ingredients/${id}`);

      // 4 — Sync prep steps
      const existingSteps = freshMeal.preparationSteps || [];
      const stepPayload   = { description: prepSteps.description, skillLevel: prepSteps.skillLevel, steps: validSteps, meal: mealId };
      if (existingSteps.length) {
        await customFetch.patch(`/preparationSteps/${existingSteps[0]._id}`, stepPayload);
      } else {
        await customFetch.post("/preparationSteps", stepPayload);
      }

      toast.success("Meal updated successfully");
      navigate("/admin/meals");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Loading / Error ───────────────────────────────────────────────────
  if (fetching) {
    return (
      <Wrapper>
        <div className="state-center">
          <div className="spinner" />
          <p className="state-text">Loading meal…</p>
        </div>
      </Wrapper>
    );
  }

  if (isError || !meal) {
    return (
      <Wrapper>
        <div className="state-center error">
          <FaExclamationTriangle className="state-icon warning" />
          <h2 className="state-title">Meal not found</h2>
          <p className="state-text">This meal doesn't exist or could not be loaded.</p>
          <button className="btn-back-error" onClick={() => navigate("/admin/meals")}>
            <FaArrowLeft /> Back to Meals
          </button>
        </div>
      </Wrapper>
    );
  }

  const typeStyle = TYPE_COLORS[meal.mealType] || { bg: "#f1f5f9", color: "#64748b" };

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <Wrapper>
      {/* ══ Topbar ══════════════════════════════════════════════════════ */}
      <div className="topbar">
        <button className="back-btn" onClick={() => navigate("/admin/meals")}>
          <FaArrowLeft />
          <span>Meals</span>
        </button>

        <nav className="breadcrumb" aria-label="breadcrumb">
          <span className="bc-seg">Admin</span>
          <FaChevronRight className="bc-sep" />
          <span className="bc-seg">Meals</span>
          <FaChevronRight className="bc-sep" />
          <span className="bc-seg current" title={meal.name}>{meal.name}</span>
        </nav>

        <div className="topbar-right">
          <button type="button" className="btn-discard" onClick={() => navigate("/admin/meals")}>
            Discard
          </button>
          <button
            type="submit"
            form="update-meal-form"
            className="btn-save"
            disabled={submitting}
          >
            {submitting
              ? <><span className="btn-spinner" /> Saving…</>
              : <><FaCheck /> Save Changes</>
            }
          </button>
        </div>
      </div>

      {/* ══ Form ════════════════════════════════════════════════════════ */}
      <form id="update-meal-form" onSubmit={handleSubmit} className="form-wrap">

        {/* ── Card 1: Image + Basic Info ──────────────────────────────── */}
        <div className="form-card">
          <div className="card-inner-grid">

            {/* Left: image upload */}
            <div className="image-col">
              <p className="col-label">Meal Photo</p>
              <div
                className="image-upload-zone"
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
              >
                {imagePreview ? (
                  <>
                    <img src={imagePreview} alt="Meal preview" className="img-preview" />
                    <div className="img-overlay">
                      <FaCamera className="overlay-icon" />
                      <span>Change Photo</span>
                    </div>
                  </>
                ) : (
                  <div className="upload-placeholder">
                    <MdOutlineRestaurantMenu className="placeholder-icon" />
                    <span className="placeholder-text">Upload photo</span>
                    <span className="placeholder-hint">PNG · JPG · WEBP</span>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
              {imageFile && (
                <p className="new-image-note">
                  <FaCheck className="note-check" /> New image selected
                </p>
              )}
            </div>

            {/* Right: basic fields */}
            <div className="info-col">
              <div className="card-head">
                <h2 className="card-title">Basic Information</h2>
                <span className="type-badge" style={{ background: typeStyle.bg, color: typeStyle.color }}>
                  {mealForm.mealType}
                </span>
              </div>

              <div className="field-row">
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

              <div className="field-row">
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
                  <label className="field-label">Featured</label>
                  <button
                    type="button"
                    className={`featured-btn${mealForm.isRecommended ? " active" : ""}`}
                    onClick={() => setMealForm((p) => ({ ...p, isRecommended: !p.isRecommended }))}
                  >
                    <FaStar />
                    {mealForm.isRecommended ? "Featured on homepage" : "Not featured"}
                  </button>
                </div>
              </div>

              <div className="field-group">
                <label className="field-label">Dietary Options</label>
                <div className="dietary-row">
                  {Object.values(DIETARY).map((d) => (
                    <button
                      key={d}
                      type="button"
                      className={`diet-chip${(mealForm.dietary || []).includes(d) ? " on" : ""}`}
                      onClick={() => toggleDietary(d)}
                    >
                      {(mealForm.dietary || []).includes(d) && <FaCheck className="chip-check" />}
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Card 2: Ingredients ─────────────────────────────────────── */}
        <div className="form-card">
          <div className="card-head-row">
            <div>
              <h2 className="card-title">Ingredients</h2>
              <p className="card-sub">{ingredientList.length} ingredient{ingredientList.length !== 1 ? "s" : ""}</p>
            </div>
            <button type="button" className="add-btn" onClick={addIngredient}>
              <FaPlus /> Add Ingredient
            </button>
          </div>

          <div className="ingredients-list">
            {ingredientList.map((ing, idx) => (
              <div key={idx} className="ing-card">
                <div className="ing-card-head">
                  <span className="ing-num">{idx + 1}</span>
                  <span className="ing-name-preview">{ing.name || `Ingredient ${idx + 1}`}</span>
                  {ingredientList.length > 1 && (
                    <button type="button" className="remove-btn" title="Remove" onClick={() => removeIngredient(idx)}>
                      <FaTimes />
                    </button>
                  )}
                </div>

                <div className="field-row">
                  <div className="field-group" style={{ flex: 2 }}>
                    <label className="field-label">Name</label>
                    <input className="field-input" type="text" placeholder="e.g. Tomato"
                      value={ing.name} onChange={(e) => updateIngredient(idx, "name", e.target.value)} />
                  </div>
                  <div className="field-group" style={{ flex: 1 }}>
                    <label className="field-label">Price (₦)</label>
                    <input className="field-input" type="text" placeholder="e.g. 500"
                      value={ing.price} onChange={(e) => updateIngredient(idx, "price", e.target.value)} />
                  </div>
                </div>

                <div className="field-row">
                  <div className="field-group" style={{ flex: 1 }}>
                    <label className="field-label">Quantity</label>
                    <input className="field-input" type="text" placeholder="e.g. 2"
                      value={ing.quantity} onChange={(e) => updateIngredient(idx, "quantity", e.target.value)} />
                  </div>
                  <div className="field-group" style={{ flex: 1 }}>
                    <label className="field-label">Unit</label>
                    <input className="field-input" type="text" placeholder="e.g. cups"
                      value={ing.unit} onChange={(e) => updateIngredient(idx, "unit", e.target.value)} />
                  </div>
                  <div className="field-group" style={{ flex: 2 }} />
                </div>

                {/* Substitutions */}
                {ing.substitutions?.length > 0 && (
                  <div className="subs-block">
                    <p className="subs-label">Substitutions</p>
                    {ing.substitutions.map((sub, sIdx) => (
                      <div key={sIdx} className="sub-row">
                        <input className="field-input sm" type="text" placeholder="Name"
                          value={sub.name || ""} onChange={(e) => updateSubstitution(idx, sIdx, "name", e.target.value)} />
                        <input className="field-input sm" type="text" placeholder="Qty"
                          value={sub.quantity || ""} onChange={(e) => updateSubstitution(idx, sIdx, "quantity", e.target.value)} />
                        <input className="field-input sm" type="text" placeholder="Unit"
                          value={sub.unit || ""} onChange={(e) => updateSubstitution(idx, sIdx, "unit", e.target.value)} />
                        <button type="button" className="sub-remove-btn" onClick={() => removeSubstitution(idx, sIdx)}>
                          <FaTimes />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <button type="button" className="add-sub-link" onClick={() => addSubstitution(idx)}>
                  + Add substitution
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ── Card 3: Preparation ─────────────────────────────────────── */}
        <div className="form-card">
          <div className="card-head-row">
            <div>
              <h2 className="card-title">Preparation Steps</h2>
              <p className="card-sub">{prepSteps.steps.length} step{prepSteps.steps.length !== 1 ? "s" : ""}</p>
            </div>
            <button type="button" className="add-btn" onClick={addStep}>
              <FaPlus /> Add Step
            </button>
          </div>

          <div className="field-row">
            <div className="field-group" style={{ flex: 2 }}>
              <label className="field-label">Overview / Description</label>
              <input className="field-input" type="text" placeholder="Brief overview of the dish…"
                value={prepSteps.description}
                onChange={(e) => setPrepSteps({ ...prepSteps, description: e.target.value })} />
            </div>
            <div className="field-group" style={{ flex: 1 }}>
              <label className="field-label">Skill Level</label>
              <select className="field-input" value={prepSteps.skillLevel}
                onChange={(e) => setPrepSteps({ ...prepSteps, skillLevel: e.target.value })}>
                {SKILL_LEVELS.map((l) => <option key={l}>{l}</option>)}
              </select>
            </div>
          </div>

          <div className="steps-list">
            {prepSteps.steps.map((step, idx) => (
              <div key={idx} className="step-card">
                <div className="step-card-head">
                  <span className="step-num">{step.stepNumber}</span>
                  <span className="step-label">Step {step.stepNumber}</span>
                  {prepSteps.steps.length > 1 && (
                    <button type="button" className="remove-btn" title="Remove step" onClick={() => removeStep(idx)}>
                      <FaTimes />
                    </button>
                  )}
                </div>
                <div className="field-group">
                  <label className="field-label">Instruction</label>
                  <textarea className="field-textarea" rows={3} placeholder="Describe this step clearly…"
                    value={step.instruction}
                    onChange={(e) => updateStep(idx, "instruction", e.target.value)} />
                </div>
                <div className="field-group duration-group">
                  <label className="field-label">Duration</label>
                  <input className="field-input" type="text" placeholder="e.g. 10 minutes"
                    value={step.duration}
                    onChange={(e) => updateStep(idx, "duration", e.target.value)} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom actions */}
        <div className="form-footer">
          <button type="button" className="btn-discard" onClick={() => navigate("/admin/meals")}>
            Discard Changes
          </button>
          <button type="submit" className="btn-save" disabled={submitting}>
            {submitting
              ? <><span className="btn-spinner" /> Saving…</>
              : <><FaCheck /> Save Changes</>
            }
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default UpdateMeal;
