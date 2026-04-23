
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../Authoration/useAuthContext";
import { register } from "../Service/expertService";




export default function RegisterExpert() {
  const navigate = useNavigate();


  const { user, setUser } = useAuthContext();
  const [formData, setFormData] = useState({
    description: "",
    basePrice: "",
    category: ""
  });
  const isFormValid =
    formData.description.trim() !== "" &&
    formData.basePrice.trim() !== "" &&
    formData.category.trim() !== "";

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
      data.append("profileUrl", user?.profileUrl ?? "");

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
      setError(err.response?.data?.message || "הרשמת מומחה נכשלה");
    }
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

  <optgroup label="עבודות לבית">
    <option value="אינסטלציה">אינסטלציה</option>
    <option value="חשמל">חשמל</option>
    <option value="נגרות">נגרות</option>
    <option value="צביעה">צביעה</option>
    <option value="שיפוצים">שיפוצים</option>
    <option value="מיזוג אוויר">מיזוג אוויר</option>
    <option value="מנעולנות">מנעולנות</option>
  </optgroup>

  <optgroup label="תחזוקה ושירותים">
    <option value="טכנאות מחשבים">טכנאות מחשבים</option>
    <option value="ניקיון">ניקיון</option>
    <option value="גינון">גינון</option>
    <option value="הדברה">הדברה</option>
    <option value="הובלות">הובלות</option>
  </optgroup>

  <optgroup label="דיגיטל ויצירה">
    <option value="עיצוב גרפי">עיצוב גרפי</option>
    <option value="פיתוח תוכנה">פיתוח תוכנה</option>
    <option value="בניית אתרים">בניית אתרים</option>
    <option value="צילום">צילום</option>
  </optgroup>

  <optgroup label="שירותים מקצועיים">
    <option value="ייעוץ עסקי">ייעוץ עסקי</option>
    <option value="ראיית חשבון">ראיית חשבון</option>
    <option value="עריכת דין">עריכת דין</option>
    <option value="אימון אישי">אימון אישי</option>
  </optgroup>

  <optgroup label="אפשרויות נוספות">
    <option value="אחר">אחר</option>
  </optgroup>
</select>
          </div>

          <button type="submit" disabled={!isFormValid} className={`auth-btn ${!isFormValid ? "disabled" : ""}`}>לרישום כמומחה</button>
        </form>

        {message && <p className="auth-message success">{message}</p>}
        {error && <p className="auth-message error">{error}</p>}
      </div>
    </div>
  );
}