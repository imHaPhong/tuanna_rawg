import React from "react";

const Rating = ({ rating = 0 }) => {
  const colorOfRating = (rating) => {
    if (rating < 50) return "#ff6a38";
    if (rating < 80) return "#e8d548";
    if (rating < 100) return "#6ee823";
  };

  return (
    <div
      style={{
        display: "inline-block",
        color: colorOfRating(rating),
        border: `1px solid ${colorOfRating(rating)}`,
        padding: ".2rem 1rem",
        borderRadius: "5px",
      }}
    >
      {rating}
    </div>
  );
};

export default Rating;
