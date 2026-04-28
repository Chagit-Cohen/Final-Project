import { useState, type ChangeEvent, type FormEvent } from "react";
import { register } from "../Service/auth.service";
import "../Style/Register.css"; 
import { useNavigate } from "react-router";
import { useAuthContext } from "../Authoration/useAuthContext";
import axiosInstance from "../Service/axios";

export default function Register() {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    city: "",
    profileImage: null as File | null
  });


  const isFormValid =
    formData.fullName.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.password.trim() !== "" &&
    formData.city.trim() !== "";


  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = event.target;

    if (name === "profileImage") {
      setFormData((prev) => ({
        ...prev,
        profileImage: files && files.length > 0 ? files[0] : null
      }));
    }
    else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      const data = new FormData();

      data.append("FullName", formData.fullName);
      data.append("Email", formData.email);
      data.append("Password", formData.password);
      data.append("City", formData.city);

      if (formData.profileImage) {
        data.append("ProfileImage", formData.profileImage);
      }

      await register(data);

      setMessage("נרשמת בהצלחה");

      setFormData({
        fullName: "",
        email: "",
        password: "",
        city: "",
        profileImage: null
      });
      // localStorage.removeItem("token");
      // delete axiosInstance.defaults.headers.common.Authorization;
      // setUser(null);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
    catch (err: any) {
      setError(err.response?.data?.message || "הרשמה נכשלה");
    }
  }

  return (
    <div className="auth-page register-page">
      <div className="auth-card">
        <h2>הרשמה</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>שם מלא:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>אימייל:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>סיסמה:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>עיר:</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>תמונת פרופיל:</label>
            <input
              type="file"
              name="profileImage"
              onChange={handleChange}
            />
          </div>

          <button type="submit" disabled={!isFormValid}
            className={`auth-btn ${!isFormValid ? "disabled" : ""}`}>להירשם</button>
        </form>

        {message && <p className="auth-message success">{message}</p>}
        {error && <p className="auth-message error">{error}</p>}
      </div>
    </div>
  );
}