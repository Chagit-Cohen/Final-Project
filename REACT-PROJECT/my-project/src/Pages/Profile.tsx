import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useAuthContext } from "../Authoration/useAuthContext";
import { updateProfile } from "../Service/userService";
import { updateExpertProfile, getExpertsById, deleteExpertById, returnExpertById,getExpertByIdJustToTheUser } from "../Service/expertService";
import "../Style/Profile.css";

export default function Profile() {
  const [hasExpertProfile, setHasExpertProfile] = useState(false);
  const { user, setUser } = useAuthContext();
  const [showExpertDetails, setShowExpertDetails] = useState(false);
  const [userFormData, setUserFormData] = useState({
    fullName: "",
    city: "",
    profileImage: null as File | null
  });

  const [expertFormData, setExpertFormData] = useState({
    category: "",
    bio: "",
    basePrice: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setUserFormData({
        fullName: user.fullName || "",
        city: user.city || "",
        profileImage: null
      });
    }
  }, [user]);


  useEffect(() => {
  async function loadExpert() {
    if (!user?.id) return;

    try {
      const ex = await getExpertByIdJustToTheUser(user.id);

      if (!ex) {
        setHasExpertProfile(false);
        return;
      }

      setHasExpertProfile(true);

      setExpertFormData({
        category: ex.category || "",
        bio: ex.bio || "",
        basePrice: ex.basePrice || ""
      });
    } catch (err) {
      setHasExpertProfile(false);
    }
  }

  loadExpert();
}, [user]);






  function handleUserChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = event.target;

    if (name === "profileImage") {
      setUserFormData((prev) => ({
        ...prev,
        profileImage: files && files.length > 0 ? files[0] : null
      }));
    } else {
      setUserFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  }

function handleExpertChange(
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) {
  const { name, value } = event.target;

  setExpertFormData((prev) => ({
    ...prev,
    [name]: value
  }));
}

  async function handleSubmitUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      const data = new FormData();
      data.append("FullName", userFormData.fullName);
      data.append("City", userFormData.city);

      if (userFormData.profileImage) {
        data.append("ProfileImage", userFormData.profileImage);
      }

      const updatedUser = await updateProfile(user?.id, data);
      setUser(updatedUser);
      setMessage("הפרטים עודכנו בהצלחה");
    } catch (err: any) {
      setError(err.response?.data?.message || "עדכון נכשל");
    }
  }

  async function handleSubmitExpert(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    if (!user) return;
    try {
      const data = new FormData();
      data.append("Category", expertFormData.category);
      console.log(expertFormData.category)
      data.append("Bio", expertFormData.bio);
      data.append("BasePrice", expertFormData.basePrice);

      data.append("City", user.city);
      data.append("FullName", user.fullName);

      data.append("profileurl",user.profileUrl || "");
     


      await updateExpertProfile(user.id, data);
      setMessage("פרטי המומחה עודכנו בהצלחה");
    } catch (err: any) {
      setError(err.response?.data?.message || "עדכון נכשל");
    }
  }




  async function handleDeleteExpert() {
    setError("");
    setMessage("");
    if (!user) return;

    try {
      await deleteExpertById(user.id);

      setUser({
        ...user,
        isExpert: false
      });
      setHasExpertProfile(true);
      setShowExpertDetails(false);
      setMessage("המומחה נמחק בהצלחה");
    } catch (err: any) {
      setError(err.response?.data?.message || "מחיקת מומחה נכשלה");
    }
  }
  async function handleReturnExpert() {
  setError("");
  setMessage("");
  if (!user) return;

  try {
    await returnExpertById(user.id);

    const ex = await getExpertByIdJustToTheUser(user.id);

    if (ex) {
      setExpertFormData({
        category: ex.category || "",
        bio: ex.bio || "",
        basePrice: ex.basePrice || ""
      });

      setHasExpertProfile(true);
    }

    setUser({
      ...user,
      isExpert: true
    });

    setShowExpertDetails(true);
    setMessage("פרופיל המומחה הוחזר בהצלחה");
  } catch (err: any) {
    setError(err.response?.data?.message || "החזרת מומחה נכשלה");
  }
}


  return (
    <div className="profile-page">
      <h2>הפרופיל שלי</h2>

      <form onSubmit={handleSubmitUser}>
        <div>
          <label>שם מלא:</label>
          <input
            type="text"
            name="fullName"
            value={userFormData.fullName}
            onChange={handleUserChange}
          />
        </div>

        <div>
          <label>עיר:</label>
          <input
            type="text"
            name="city"
            value={userFormData.city}
            onChange={handleUserChange}
          />
        </div>

        <div>
          <label>תמונת פרופיל:</label>
          <input
            type="file"
            name="profileImage"
            onChange={handleUserChange}
          />
        </div>

        <button type="submit">שמור שינויים</button>
      </form>

      {user?.isExpert && (
        <div>
          <button
            type="button"
            onClick={() => setShowExpertDetails((prev) => !prev)}
          >
            {showExpertDetails ? "סגור פרטי מומחה" : "לפרטי המומחה שלי"}
          </button>

          {showExpertDetails && (
            <form onSubmit={handleSubmitExpert}>
              <div>
                <label>קטגוריה:</label>
                <select
                  name="category"
                  value={expertFormData.category}
                  onChange={handleExpertChange}>
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

              <div>
                <label>תיאור:</label>
                <textarea
                  name="bio"
                  value={expertFormData.bio}
                  onChange={handleExpertChange}
                />
              </div>

              <div>
                <label>מחיר בסיס:</label>
                <input
                  type="text"
                  name="basePrice"
                  value={expertFormData.basePrice}
                  onChange={handleExpertChange}
                />
              </div>

              <button type="submit">שמור פרטי מומחה</button>
              <button type="button" onClick={handleDeleteExpert}>
                הפוך פרופיל מומחה ללא פעיל
              </button>
            </form>
          )}
        </div>
      )}

      {!user?.isExpert && hasExpertProfile && (
        <div>
          <button type="button" onClick={handleReturnExpert}>
            החזר פרופיל מומחה
          </button>
        </div>
      )}

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}