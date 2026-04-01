import React, { useState, useEffect } from "react";

const Reviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("reviews")) || {};
    setReviews(data[productId] || []);
  }, [productId]);

  const addReview = () => {
    const data = JSON.parse(localStorage.getItem("reviews")) || {};
    const updated = {
      ...data,
      [productId]: [...(data[productId] || []), text],
    };

    localStorage.setItem("reviews", JSON.stringify(updated));
    setReviews(updated[productId]);
    setText("");
  };

  return (
    <div className="mt-10">
      <h2 className="font-bold text-xl">Reviews</h2>

      {reviews.map((r, i) => (
        <p key={i} className="border p-2 mt-2">{r}</p>
      ))}

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-2 w-full mt-3"
      />

      <button
        onClick={addReview}
        className="bg-red-500 text-white px-4 py-2 mt-2"
      >
        Add Review
      </button>
    </div>
  );
};

export default Reviews;