import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useAuthContext } from "../Authoration/useAuthContext";
import { updateProfile } from "../Service/userService";
import { updateExpertProfile,getExpertsById } from "../Service/expertService";
import type{Expert} from "../Types/expert"

export default function Profile() {
  const { user, setUser } = useAuthContext();
  Expert ex=await getExpertsById(user?.id)
  const [showExpertDetails, setShowExpertDetails] = useState(false);

  const [userFormData, setUserFormData] = useState({
    fullName: "",
    city: "",
    profileImage: null as File | null
  });

  const [expertFormData, setExpertFormData] = useState({
    category: ex.Category ||"",
    bio:ex.bio|| "",
    basePrice: ex.basePrice||""
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

    try {
      const data = new FormData();
      data.append("Category", expertFormData.category);
      data.append("Bio", expertFormData.bio);
      data.append("BasePrice", expertFormData.basePrice);
       data.append("City", ex.basePrice);
      data.append("Fullname", ex.basePrice);


      await updateExpertProfile(user?.id, data);
      setMessage("פרטי המומחה עודכנו בהצלחה");
    } catch (err: any) {
      setError(err.response?.data?.message || "עדכון נכשל");
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
            </form>
          )}
        </div>
      )}

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}