import React, { useState } from "react";
import { useFormContext, useController } from "react-hook-form";
import {
  mobileDevice,
  telecom,
  computers,
  general,
  other,
} from "@/data/services";
import css from "@/styles/Company/Company.module.css";

const CategoryGroup = ({ name, items }) => {
  const { control } = useFormContext();
  const {
    field: { value = [], onChange },
  } = useController({ name: `companyCategories.${name}`, control });

  const toggleValue = (val) => {
    const updated = value.includes(val)
      ? value.filter((v) => v !== val)
      : [...value, val];
    onChange(updated);
  };

  const checkAll = () => onChange(items.map((item) => item.value));
  const uncheckAll = () => onChange([]);

  return (
    <div>
      <div className={css.checkboxContainer}>
        <ul className={css.checkbox}>
          {items.map((item) => (
            <li key={item.id || item.value}>
              <input
                type="checkbox"
                id={`cat_${name}_${item.id}`}
                checked={value.includes(item.value)}
                onChange={() => toggleValue(item.value)}
              />
              <label htmlFor={`cat_${name}_${item.id}`}>{item.label}</label>
            </li>
          ))}
        </ul>
      </div>
      <div className={css.checkBtn}>
        <button type="button" onClick={checkAll}>
          Check All
        </button>
        <button type="button" onClick={uncheckAll}>
          Uncheck All
        </button>
      </div>
    </div>
  );
};

const Categories = () => {
  const [onlyReceiveMatch, setOnlyReceiveMatch] = useState({
    computers: true,
    telecom: false,
    mobileDevice: false,
    general: false,
    other: false,
  });

  const toggleOnlyReceiveMatch = (type) => {
    setOnlyReceiveMatch({
      computers: false,
      telecom: false,
      mobileDevice: false,
      general: false,
      other: false,
      [type]: true,
    });
  };

  return (
    <div className={`border p-4 ${css.onlyReceiveMatch}`}>
      <div className={css.categoriesToggleButton}>
        {["computers", "telecom", "mobileDevice", "general", "other"].map(
          (type) => (
            <button
              key={type}
              type="button"
              className={onlyReceiveMatch[type] ? css.active : ""}
              onClick={() => toggleOnlyReceiveMatch(type)}
            >
              {type}
            </button>
          )
        )}
      </div>

      {onlyReceiveMatch.computers && (
        <CategoryGroup name="computers" items={computers} />
      )}
      {onlyReceiveMatch.telecom && (
        <CategoryGroup name="telecom" items={telecom} />
      )}
      {onlyReceiveMatch.mobileDevice && (
        <CategoryGroup name="mobileDevice" items={mobileDevice} />
      )}
      {onlyReceiveMatch.general && (
        <CategoryGroup name="general" items={general} />
      )}
      {onlyReceiveMatch.other && <CategoryGroup name="other" items={other} />}
    </div>
  );
};

export default Categories;
