import React, { useState } from "react";
import css from "./styles/Form.module.css";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    checkName: false,
    checkEmail: false,
    signature: "",
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;

    const val = type === "checkbox" ? checked : value; // Use checked for checkboxes, value for other inputs
    setFormData((prevFormData) => ({ ...prevFormData, [name]: val }));
  };

  // Construct textarea content based on checkbox states
  const textAreaContent = [
    formData.checkName ? `${formData.name}` : "",
    formData.checkEmail ? `${formData.email}` : "",
  ]
    .filter(Boolean)
    .join("\n"); // Filter out empty strings and join with newline

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.signature = textAreaContent.split("\n");
    console.log(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={css.form}>
        <span>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
        </span>
        <span>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
        </span>
        <span>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
        </span>
        <span>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </span>
        <div>
          <span>
            <label htmlFor="checkName">Check Name</label>
            <input
              type="checkbox"
              name="checkName"
              id="checkName"
              checked={formData.checkName}
              onChange={handleChange}
            />
          </span>
          <span>
            <label htmlFor="checkEmail">Check Email</label>
            <input
              type="checkbox"
              name="checkEmail"
              id="checkEmail"
              checked={formData.checkEmail}
              onChange={handleChange}
            />
          </span>
        </div>
        <textarea readOnly value={textAreaContent} name="signature"></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
