import Wrapper from "../assets/wrappers/SearchContainer";
import { Form, useSubmit, Link } from "react-router-dom";
import { MEAL, DIETARY, SORT } from "../utils/constants";
import { useAllMealsContext } from "../pages/Meals";
import { FaSearch, FaSlidersH } from "react-icons/fa";
import { useState } from "react";

const SearchContainer = () => {
  const { searchValues } = useAllMealsContext();
  const {
    name = "",
    country = "",
    mealType = "all",
    dietary = "all",
    sort = "Newest",
  } = searchValues;

  const submit = useSubmit();
  const [open, setOpen] = useState(false);

  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => { onChange(form); }, 500);
    };
  };

  const hasActiveFilters =
    name ||
    country ||
    (mealType && mealType !== "all") ||
    (dietary && dietary !== "all");

  const activeChips = [
    name && { label: `"${name}"`, key: "name" },
    country && { label: country, key: "country" },
    mealType && mealType !== "all" && { label: mealType, key: "mealType" },
    dietary && dietary !== "all" && { label: dietary, key: "dietary" },
  ].filter(Boolean);

  return (
    <Wrapper>
      <button
        type="button"
        className="mobile-toggle"
        onClick={() => setOpen((p) => !p)}
      >
        <FaSlidersH /> Filters {open ? "▲" : "▼"}
      </button>

      <div className={`filter-panel${open ? " open" : ""}`}>
        <div className="filter-header">
          <span className="filter-title">Filters</span>
          {hasActiveFilters && (
            <Link to="/meals" className="clear-all">Clear all</Link>
          )}
        </div>

        {activeChips.length > 0 && (
          <div className="active-chips">
            {activeChips.map((chip) => (
              <span key={chip.key} className="chip">{chip.label}</span>
            ))}
          </div>
        )}

        <Form className="filter-form" action="/meals">
          <div className="filter-group">
            <label className="filter-label">Meal Name</label>
            <div className="input-wrap">
              <FaSearch className="input-icon" />
              <input
                className="filter-input"
                type="text"
                name="name"
                placeholder="Search meals…"
                defaultValue={name}
                onChange={debounce((form) => submit(form))}
              />
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">Country / Origin</label>
            <div className="input-wrap">
              <FaSearch className="input-icon" />
              <input
                className="filter-input"
                type="text"
                name="country"
                placeholder="e.g. Nigerian…"
                defaultValue={country}
                onChange={debounce((form) => submit(form))}
              />
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">Meal Type</label>
            <select
              className="filter-select"
              name="mealType"
              defaultValue={mealType}
              onChange={(e) => submit(e.currentTarget.form)}
            >
              <option value="all">All types</option>
              {Object.values(MEAL).map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Dietary</label>
            <select
              className="filter-select"
              name="dietary"
              defaultValue={dietary}
              onChange={(e) => submit(e.currentTarget.form)}
            >
              <option value="all">All dietary</option>
              {Object.values(DIETARY).map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Sort By</label>
            <select
              className="filter-select"
              name="sort"
              defaultValue={sort}
              onChange={(e) => submit(e.currentTarget.form)}
            >
              {Object.values(SORT).map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </Form>
      </div>
    </Wrapper>
  );
};

export default SearchContainer;
