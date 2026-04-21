import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getExpertsById } from "../Service/expertService";
import type { Expert } from "../Types/expert";
import "../Style/Expert.css";

export default function ExpertPage() {
  const { id } = useParams();
  const [expert, setExpert] = useState<Expert | null>(null);

  useEffect(() => {
    async function loadExpert() {
      if (!id) return;

      const data = await getExpertsById(Number(id));
      setExpert(data);
    }

    loadExpert();
  }, [id]);

  function renderStars(rating: number) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;

    let stars = "";

    for (let i = 0; i < full; i++) {
      stars += "★";
    }

    if (half) {
      stars += "☆"; // אפשר לשנות לחצי כוכב אמיתי אם תרצי
    }

    while (stars.length < 5) {
      stars += "☆";
    }

    return stars;
  }

  if (!expert) return <p>טוען...</p>;
return (
  <div className="expert-page">

    {/* 🔴 דיב חדש מתחיל */}
    <div className="expert-card-full">

      <h1>{expert.fullName}</h1>

      <p><strong>עיר:</strong> {expert.city}</p>

      <p><strong>מחיר:</strong> ₪{expert.basePrice}</p>

      <p><strong>תיאור:</strong> {expert.bio}</p>

      <p>
        <strong>דירוג:</strong>{" "}
        {renderStars(expert.averageRating || 0)}
      </p>

    </div>
    {/* 🔴 כאן סוגרים אותו */}

  </div>
);
}