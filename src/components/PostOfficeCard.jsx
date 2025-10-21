import React from "react";

function PostOfficeCard({ office }) {
  return (
    <div className="post-office-card">
      <h3>{office.Name}</h3>
      <p>
        <strong>Pincode:</strong> {office.Pincode}
      </p>
      <p>
        <strong>District:</strong> {office.District}
      </p>
      <p>
        <strong>State:</strong> {office.State}
      </p>
    </div>
  );
}

export default PostOfficeCard;
