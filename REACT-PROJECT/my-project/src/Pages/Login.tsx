import { useState, type ChangeEvent, type FormEvent } from "react"
import { login } from "../Service/auth.service";
import { setSession } from "../Authoration/Seesion";
import { useAuthContext } from "../Authoration/useAuthContext";
import "../Style/Login.css";  // [נוסף]
import { useNavigate } from "react-router"


export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const isFormValid =
    formData.email.trim() !== "" &&
    formData.password.trim() !== "";


  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { setUser } = useAuthContext();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    try {
      const { user, token } = await login(formData.email, formData.password);

      setSession(token);
      setUser(user);

      setMessage("התחברת בהצלחה");

      console.log("Login result:", user, token);

      setFormData({ email: "", password: "" });
          navigate("/");

    }
    catch (err: any) {
      setError(err.response?.data?.message || "אירעה שגיאה")
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>התחברות</h2>

        <form onSubmit={handleSubmit} className="auth-form">
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

          <button type="submit" disabled={!isFormValid}
            className={`auth-btn ${!isFormValid ? "disabled" : ""}`}>להתחבר</button>
        </form>

        {message && <p className="auth-message success">{message}</p>}
        {error && <p className="auth-message error">{error}</p>}
      </div>
    </div>
  );
}


