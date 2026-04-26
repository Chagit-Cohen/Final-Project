import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getExpertsById } from "../Service/expertService";
import { getReviewsByExpertId } from "../Service/reviewService";
import type { Expert } from "../Types/expert";
import type { Review } from "../Types/review";
import { useNavigate } from "react-router";
import { addServiceCall } from "../Service/serviceCallService";
import { useAuthContext } from "../Authoration/useAuthContext";
import "../Style/Expert.css";


function StarIcon({ filled, size = 34 }: { filled: boolean; size?: number }) {
  return (
    <svg
      className={`star-svg${filled ? "" : " star-empty"}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
        fill={filled ? "#3aaa58" : "#3a5442"}
        stroke={filled ? "#3aaa58" : "#3a5442"}
        strokeWidth="0.5"
      />
    </svg>
  );
}


function StarsRow({
  rating,
  size = 34,
  className = "expert-stars-row",
  starClass = "",
}: {
  rating: number;
  size?: number;
  className?: string;
  starClass?: string;
}) {
  const rounded = Math.round(rating);
  return (
    <div className={className}>
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} filled={i < rounded} size={size} />
      ))}
    </div>
  );
}


export default function ExpertPage() {
  const { id } = useParams();
  const [expert, setExpert] = useState<Expert | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    async function loadExpert() {
      if (!id) return;
      const data = await getExpertsById(Number(id));
      setExpert(data);
      const reviewsData = await getReviewsByExpertId(Number(id));
      setReviews(reviewsData || []);
    }
    loadExpert();
  }, [id]);

 const openChat = async () => {
  if (!user) {
    navigate("/Login");
    return;
  }

  if (!expert) return;

  const serviceCall = await addServiceCall({
    clientId: user.id,
    expertId: expert.userId,
    title: "פנייה",
    description: "פנייה חדשה",
    initialImageUrl: null
  });

  navigate(`/chat/${serviceCall.id}`);
};




  if (!expert) return <p>טוען...</p>;


  const marqueeReviews = [...reviews];

  return (
    <div className="expert-page">


      <div className="expert-card-full">

        <div className="expert-card-full-top">
          <img
            src={`https://localhost:7082/Images/${expert.profileUrl}`}
            alt="Profile"

          />


          <h1>{expert.fullName}</h1>

          {expert.category && (
            <div className="expert-category-badge">{expert.category}</div>
          )}

          <div className="expert-stars-block">
            <StarsRow rating={expert.averageRating || 0} size={34} />

            <div className="expert-rating-row">
              <span className="expert-rating-num">
                {(expert.averageRating || 0).toFixed(1)}
              </span>
              <span className="expert-rating-max">מתוך 5</span>
            </div>

            {reviews.length > 0 && (
              <div className="expert-rating-count">
                {reviews.length} ביקורות
              </div>
            )}
          </div>
        </div>



        <div className="expert-card-body">


          <div className="expert-info-grid">
            <div className="expert-info-item">
              <span className="expert-info-label">עיר</span>
              <span className="expert-info-value">{expert.city}</span>
            </div>

            <div className="expert-info-item">
              <span className="expert-info-label">מחיר בסיס</span>
              <span className="expert-info-value price">₪{expert.basePrice}</span>
            </div>


            {expert.bio && (
              <div className="expert-bio-block">
                <div className="expert-bio-label">אודות</div>
                <p className="expert-bio-text">{expert.bio}</p>
              </div>

            )}
            <button onClick={openChat}>
              פתח צ׳אט עם המומחה
            </button>

          </div>
        </div>
      </div>


      {reviews.length > 0 && (
        <div className="reviews-section">
          <h2>ביקורות לקוחות</h2>

          <div className="reviews-marquee">
            <div className="reviews-track">
              {marqueeReviews.map((review, index) => (
                <div className="review-card" key={index}>


                  <div className="review-stars-row">
                    {Array.from({ length: 5 }, (_, i) => (
                      <svg
                        key={i}
                        className={`review-star-svg${i < Math.round(review.rating || 0) ? "" : " star-empty"}`}
                        width={18}
                        height={18}
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polygon
                          points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                          fill={i < Math.round(review.rating || 0) ? "#3aaa58" : "#3a5442"}
                          stroke={i < Math.round(review.rating || 0) ? "#3aaa58" : "#3a5442"}
                          strokeWidth="0.5"
                        />
                      </svg>
                    ))}
                  </div>

                  <p className="review-text">"{review.comment}"</p>
                  <p className="review-name">{review.clientName}</p>

                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
