import React from "react";
import { firstChar, getDate } from "../utils/constants";
import { useSelector } from "react-redux";

const EmailCard = ({ email, isEmailOpen }) => {
  const char = firstChar(email);

  const favorites = useSelector((state) => state.emails.favorites);
  const exists = favorites.find((mail) => mail.id === email.id);

  const time = getDate(email);

  return (
    <>
      <div>
        <p className="m-0 fs-4 px-3 py-1  bg-accent rounded-circle text-white">
          {char}
        </p>
      </div>
      <div>
        <p className="m-0">
          From:
          <span className="fw-semibold"> {email.from.name}</span>
          <span className="fw-semibold"> {`<${email.from.email}>`}</span>
        </p>
        <p className="m-0">
          Subject:
          <span className="fw-semibold"> {email.subject}</span>
        </p>
        <p className="m-0">
          {isEmailOpen
            ? `${email.short_description.slice(0, 50)}...`
            : email.short_description}
        </p>
        <div className="d-flex gap-4">
          <p className="mb-0 mt-1 small">{time}</p>
          <p className="mb-0 mt-1 small fw-semibold text-accent">
            {exists && "favorite"}
          </p>
        </div>
      </div>
    </>
  );
};

export default EmailCard;
