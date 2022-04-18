import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";

export default function DrillCard({ drill, showCreator }) {
  return (
    <div className="card mb-3">
      <img
        src={drill.data().imgLink}
        alt={drill.data().name}
        className="card-img-top mx-auto"
      />
      <div className="card-body">
        <Link to={`/drill/${drill.id}`}>
          <h5 className="card-title">{drill.data().name}</h5>
        </Link>
        <p className="card-text">{drill.data().description}</p>
        <p className="card-text">
          <small className="text-muted">
            {drill.data().difficulty} - {drill.data().type}
          </small>
        </p>
      </div>

      {showCreator && (
        <div className="card-footer">
          <p className="card-text">
            Skapad av:{" "}
            <Link to={"/user/" + drill.data().uid}>{drill.data().uname}</Link>{" "}
          </p>
        </div>
      )}
    </div>
  );
}
