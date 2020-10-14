import React, { useState, useEffect } from "react";
import Rating from "../rating";

export default function RatingContainer({
  onRating,
  rate,
}: {
  onRating: Function;
  rate: number;
}) {
  const [value, setValue] = useState(rate);

  useEffect(() => {
    onRating(value);
  }, [value]);

  return (
    <Rating size="16px" value={value} onChange={(value) => setValue(value)} />
  );
}
