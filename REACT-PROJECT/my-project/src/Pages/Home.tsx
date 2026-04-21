import { useEffect, useState,type ChangeEvent,type FormEvent } from "react"
import { Link } from "react-router"
import "../Style/Home.css";
import { useNavigate } from "react-router";
import { getExperts } from "../Service/expertService";
import type { Expert } from "../Types/expert";


const Home = () => {

  const navigate = useNavigate();
    const [Data, setData] = useState({
    city: "",
    basePrice: "", 
    category: ""
  });
  const [search, setSearch] = useState("")
  const [expertsData, setExpertsData] = useState([]) // === תיקון ===
  const [loading, setLoading] = useState(true) // === תיקון ===
  const [error, setError] = useState("") // === תיקון ===

  useEffect(() => { // === תיקון ===
    const fetchExperts = async () => {
      try {
        setLoading(true)
        const data = await getExperts()
        setExpertsData(data)
      } catch (err:any) {
        setError(err.response?.data?.message || "אירעה שגיאה")     
       } finally {
        setLoading(false)
      }
    }
    fetchExperts()
  }, [])


  function handleChange(
      event: ChangeEvent<HTMLInputElement  | HTMLSelectElement>
    ) {
      const { name, value } = event.target;
      setData((prev) => ({ ...prev, [name]: value }));
    }





 const filteredExperts = expertsData.filter((expert: Expert) => {
  const matchSearch =
    expert.fullName.includes(search);

  const matchCity =
    !Data.city || expert.city.includes(Data.city);

  const matchCategory =
    !Data.category || expert.category.toString() === Data.category;

  const matchPrice =
    !Data.basePrice || expert.basePrice <= Number(Data.basePrice);

  return matchSearch && matchCity && matchCategory && matchPrice;
});

  return (

     <div className="home-page"> 
           
      <button onClick={() => navigate("/ExpertRegister")}>מומחה? הצטרף למאגר המומחים שלנו</button>
      <section className="hero-section"> 
        <h1>מאגר המומחים</h1>
        <p>חפשי את המומחה שמתאים לך בצורה נוחה ומהירה</p>

        <input
          className="search-input" 
          placeholder="חיפוש מומחה..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
         <div className="form-group">
            <label>קטגוריה:</label>
            <select
              name="category"
              value={Data.category}
              onChange={handleChange}
            >
              <option value="">בחרי מקצוע</option>
              <option value="1">עיצוב</option>
              <option value="2">פיתוח</option>
              <option value="3">ייעוץ</option>
              <option value="4">צילום</option>
            </select>
          </div>


          <div className="form-group">
          <label>עיר:</label>
          <input
            type="text"
            name="city"
            value={Data.city}
            onChange={handleChange}
            placeholder="סינון לפי עיר"
              />
          </div>

           <div className="form-group">
            <label>מחיר מקסימלי:</label>
            <input
              type="range"
              name="basePrice"
              min="0"
              max="1000"
              step="50"
              value={Data.basePrice || 0}
              onChange={handleChange}
            />
            <span>{Data.basePrice || 0} ₪</span>
           </div>

      </section>


      {loading && <p>טוען מומחים...</p>} {/* === תיקון === */}
      {error && <p>{error}</p>} {/* === תיקון === */}

      <div className="experts-grid"> 
        {!loading && !error && filteredExperts.map((expert: any) => (
          <Link key={expert.id} to={`/expert/${expert.userId}`} className="expert-link"> 
            <div className="expert-card"> 
              <div className="expert-avatar"> 
                {expert.fullName.charAt(0)}
              </div>

              <h3>{expert.fullName}</h3>
              <p>{expert.basePrice}</p>

              <span className="expert-more">לצפייה בפרטים</span>  
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home












