import React, { useEffect } from "react";
import { firstChar, getDate } from "../utils/constants";
import { useState } from "react";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../redux/slices/emailSlice";

const EmailBody = ({ email, closeEmailBodyHandler }) => {
  const [emailData, setEmailData] = useState(null);

  const char = firstChar(email);

  const time = getDate(email);

  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.emails.favorites);
  const exists = favorites.find((mail) => mail.id === email.id);

  const fetchEmail = async () => {
    try {
      const res = await fetch(
        `https://flipkart-email-mock.vercel.app/?id=${email?.id}`
      );

      const data = await res.json();
      setEmailData(data.body);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmail();
  }, [email?.id]);

  const removeHandler = (id) => {
    dispatch(removeFromFavorites(id));
  };
  const addHandler = (email) => {
    dispatch(addToFavorites(email));
  };

  return (
    <>
      <div className="d-flex gap-4 py-4 px-4 border-color rounded-2 bg-email">
        <div>
          <p className="m-0 fs-4 px-3 py-1  bg-accent rounded-circle text-white">
            {char}
          </p>
        </div>
        <div className="w-100">
          <div className="d-flex justify-content-between align-items-center">
            <p className="m-0 fs-3 fw-semibold ">{email?.subject}</p>
            <div className="d-flex gap-3">
              {exists ? (
                <p
                  className="m-0 small border-0 px-3 py-1 bg-accent rounded-5 text-white pointer"
                  onClick={() => removeHandler(email.id)}>
                  Remove from Favorite
                </p>
              ) : (
                <p
                  className="m-0 small border-0 px-3 py-1 bg-accent rounded-5 text-white pointer"
                  onClick={() => addHandler(email)}>
                  Mark as Favorite
                </p>
              )}
              <p
                className="m-0 small border-0 px-3 py-1 bg-accent rounded-5 text-white pointer"
                onClick={closeEmailBodyHandler}>
                Close
              </p>
            </div>
          </div>
          <div>
            <p className="mb-0 mt-3">{time && time}</p>
          </div>
          <div className="my-4">
            {emailData ? parse(emailData) : "Loading..."}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailBody;
