import { useState, useEffect,type ChangeEvent, type FormEvent } from "react";
import { useAuthContext } from "../Authoration/useAuthContext";
import { updateProfile } from "../Service/userService";

export default function Profile() {
  const { user, setUser } = useAuthContext();

  const [formData, setFormData] = useState({
    fullName: "",
    city: "",
    profileImage: null as File | null
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        city: user.city || "",
        profileImage: null
      });
    }
  }, [user]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = event.target;

    if (name === "profileImage") {
      setFormData((prev) => ({
        ...prev,
        profileImage: files && files.length > 0 ? files[0] : null
      }));
    } else {
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
      data.append("City", formData.city);

      if (formData.profileImage) {
        data.append("ProfileImage", formData.profileImage);
      }

      const updatedUser = await updateProfile(user?.id,data);

      setUser(updatedUser);
      setMessage("הפרטים עודכנו בהצלחה");
    } catch (err: any) {
      setError(err.response?.data?.message || "עדכון נכשל");
    }
  }

  return (
    <div>
      <h2>הפרופיל שלי</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>שם מלא:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>

       
        <div>
          <label>עיר:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>תמונת פרופיל:</label>
          <input
            type="file"
            name="profileImage"
            onChange={handleChange}
          />
        </div>

        <button type="submit">שמור שינויים</button>
      </form>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}