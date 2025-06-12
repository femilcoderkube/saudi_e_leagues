import React from "react";
import { Link, useParams } from "react-router-dom";

export default function PrimeHome() {
  const { id } = useParams();

  return (
    <>
      <Link to={`/${id}/lobby`}>Go to Lobby</Link>
    </>
  );
}
