

import { useEffect, useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router";
import "../Style/Home.css";
import { getExperts } from "../Service/expertService";
import type { Expert } from "../Types/expert";



const Home = () => {
  const navigate = useNavigate();

  const [Data, setData] = useState({
    city: "",
    basePrice: "1000", // 🔴 שינוי: במקום ריק, ברירת מחדל נוחה
    category: ""
  });

  const [search, setSearch] = useState("");
  const [expertsData, setExpertsData] = useState<Expert[]>([]); // 🔴 שינוי: טיפוס מסודר
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        setLoading(true);
        const data = await getExperts();
        setExpertsData(data);
      } catch (err: any) {
        setError(err.response?.data?.message || "אירעה שגיאה");
      } finally {
        setLoading(false);
      }
    };

    fetchExperts();
  }, []);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  const filteredExperts = expertsData.filter((expert: Expert) => {
    const matchSearch =
      !search ||
      expert.fullName.toLowerCase().trim().includes(search.toLowerCase().trim()); // 🔴 שינוי

    const matchCity =
      !Data.city ||
      expert.city.toLowerCase().trim().includes(Data.city.toLowerCase().trim()); // 🔴 שינוי

    const matchCategory =
      !Data.category ||
      expert.category.toLowerCase().trim() === Data.category.toLowerCase().trim(); // 🔴 שינוי

    const matchPrice =
      !Data.basePrice || expert.basePrice <= Number(Data.basePrice);

    return matchSearch && matchCity && matchCategory && matchPrice;
  });

  return (
    <div className="home-page">
      <button onClick={() => navigate("/ExpertRegister")}>
        מומחה? הצטרף למאגר המומחים שלנו
      </button>

      <section className="hero-section">
        <h1>מאגר המומחים</h1>
        <p>חפשי את המומחה שמתאים לך בצורה נוחה ומהירה</p>

        {/* 🔴 חדש: כל אזור הסינונים בשורה */}
        <div className="filters-row">
          <input
            className="search-input"
            type="text"
            placeholder="חיפוש מומחה..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* 🔴 חדש: עטיפת פילטר */}
          <div className="form-group filter-box">
            <label>קטגוריה:</label>
            <select
              name="category"
              value={Data.category}
              onChange={handleChange}
            >
              <option value="">בחרי מקצוע</option>

              {/* 🔴 חדש: קבוצות מסודרות */}
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

          {/* 🔴 חדש: עטיפת פילטר */}
          <div className="form-group filter-box">
            <label>עיר:</label>
            <input
              type="text"
              name="city"
              value={Data.city}
              onChange={handleChange}
              placeholder="סינון לפי עיר"
            />
          </div>

          {/* 🔴 חדש: עיצוב טוב יותר למחיר */}
          <div className="form-group filter-box price-filter">
            <label>
              מחיר מקסימלי:
              <span>{Data.basePrice} ₪</span>
            </label>
            <input
              className="price-range"
              type="range"
              name="basePrice"
              min="0"
              max="1000"
              step="50"
              value={Data.basePrice}
              onChange={handleChange}
            />
          </div>
        </div>
      </section>

      {loading && <p>טוען מומחים...</p>}
      {error && <p>{error}</p>}

      <div className="experts-grid">
        {!loading &&
          !error &&
          filteredExperts.map((expert: Expert) => (
            // 🔴 חשוב: משאיר את הלוגיקה שלך עם userId
            <Link
              key={expert.id}
              to={`/expert/${expert.userId}`}
              className="expert-link"
            >
              <div className="expert-card">
                <div className="expert-avatar">
                  <img
                    src={`https://localhost:7082/Images/${expert.profileUrl ? expert.profileUrl : "default.png"}`}
                    alt="Expert"
                    style={{ width: "80px", height: "80px", borderRadius: "50%" }}
                  />
                </div>    

                <h3>{expert.fullName}</h3> 

                <p>{expert.category}</p>
                <p>{expert.city}</p>
                <p>{expert.basePrice} ₪</p>

                <span className="expert-more">לצפייה בפרטים</span>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Home;



