import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useAuthContext } from "../Authoration/useAuthContext";
import { updateProfile } from "../Service/userService";
import { updateExpertProfile,getExpertsById,deleteExpertById } from "../Service/expertService";

export default function Profile() {
  const { user, setUser } = useAuthContext();
  const [showExpertDetails, setShowExpertDetails] = useState(false);
  const [userFormData, setUserFormData] = useState({
    fullName: "",
    city: "",
    profileImage: null as File | null
  });

  const [expertFormData, setExpertFormData] = useState({
    category:"",
    bio: "",
    basePrice:""
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
    if (!user?.id || !user?.isExpert) return;

    try {
      const  ex = await getExpertsById(user.id);

      


      setExpertFormData({
        category: ex.category || "",
        bio: ex.bio || "",
        basePrice: ex.basePrice || ""
      });
      
    } catch (err) {
      console.log(err);
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
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    if(!user)return;
    try {
      const data = new FormData();
      data.append("Category", expertFormData.category);
      data.append("Bio", expertFormData.bio);
      data.append("BasePrice", expertFormData.basePrice);

       data.append("City", user.city);
      data.append("FullName", user.fullName);


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

      setShowExpertDetails(false);
      setMessage("המומחה נמחק בהצלחה");
    } catch (err: any) {
      setError(err.response?.data?.message || "מחיקת מומחה נכשלה");
    }
  }




  return (
    <div>
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
                <input
                  type="text"
                  name="category"
                  value={expertFormData.category}
                  onChange={handleExpertChange}
                />
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
              <button type="button" onClick={handleDeleteExpert}>הפוך פרופיל מומחה ל- לא פעיל</button>
            </form>
          )}
        </div>
      )}

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}