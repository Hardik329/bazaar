import React from "react";
import { ShimmerThumbnail, ShimmerText } from "react-shimmer-effects";

function ShimmerCard() {
  return (
    <div className="product-container">
      <ShimmerThumbnail rounded={true} />
      <div className="product-desc">
        <ShimmerText line={3} />
      </div>
      <div className="product-info"></div>
    </div>
  );
}

export default function Shimmer() {
  return (
    <>
      {Array(10)
        .fill(1)
        .map((item, i) => (
          <ShimmerCard key={i} />
        ))}
    </>
  );
}
