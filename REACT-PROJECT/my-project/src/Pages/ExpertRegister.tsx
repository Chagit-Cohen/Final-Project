
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../Authoration/useAuthContext";
import { register } from "../Service/expertService";




export default function RegisterExpert() {
  const navigate = useNavigate();


  const { user,setUser } = useAuthContext(); 
  const [formData, setFormData] = useState({
    description: "",
    basePrice: "",
    category: ""
  });
  const isFormValid =
  formData.description.trim() !== "" &&
  formData.basePrice.trim() !== "" &&
  formData.category.trim() !== "" ;

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      const data = new FormData();

      data.append("BasePrice", formData.basePrice);
      data.append("Bio", formData.description);
      data.append("Category", formData.category.toString());
      data.append("FullName", user?.fullName ?? "");
      data.append("City", user?.city ?? "");
       data.append("UserId", (user?.id ?? 0).toString());

      // כאן תחליפי לפונקציית השירות שלך
       await register(data);
         setUser({
      ...user!,
      isExpert: true
    });

      setMessage("המומחה נרשם בהצלחה");

      setFormData({
        description: "",
        basePrice: "",
        category: ""
      });

      setTimeout(() => {
        navigate("/home");
      }, 3000);
    } catch (err: any) {
         setError(err.response?.data?.message || "הרשמת מומחה נכשלה");    }
  }

  return (
    <div className="auth-page register-page">
      <div className="auth-card">
        <h2>הרשמת מומחה</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>תיאור על עצמך:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
            />
          </div>

          <div className="form-group">
            <label>מחיר בסיס:</label>
            <input
              type="number"
              name="basePrice"
              value={formData.basePrice}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>קטגוריה:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">בחרי מקצוע</option>
              <option value="1">עיצוב</option>
              <option value="2">פיתוח</option>
              <option value="3">ייעוץ</option>
              <option value="4">צילום</option>
            </select>
          </div>

          <button type="submit" disabled={!isFormValid}    className={`auth-btn ${!isFormValid ? "disabled" : ""}`}>לרישום כמומחה</button>
        </form>

        {message && <p className="auth-message success">{message}</p>}
        {error && <p className="auth-message error">{error}</p>}
      </div>
    </div>
  );
}