import React, { useEffect, useState } from "react";
import EmailCard from "./EmailCard";
import EmailBody from "./EmailBody";
import Pagination from "./Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useFetchEmails } from "../hooks/useFetchEmails";
import { updateUnread } from "../redux/slices/emailSlice";

const EmailList = () => {
  const [page, setPage] = useState(1);
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState({});

  useFetchEmails(page);

  const dispatch = useDispatch();

  const filter = useSelector((state) => state.filter.filter);

  const emails = useSelector((state) => state.emails[filter]);
  const readEmails = useSelector((state) => state.emails.read);

  const nextPageHandler = () => {
    if (page < 2) {
      setPage((prev) => prev + 1);
    }
  };

  const previousPageHandler = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const clickHandler = (email) => {
    dispatch(updateUnread(email));
    setIsEmailOpen(true);
    setSelectedEmail(email);
  };

  const closeEmailBodyHandler = () => {
    setIsEmailOpen(false);
  };

  return (
    <>
      <div>
        {emails?.length === 0 && (
          <p className="text-center my-4  fw-semibold">{filter} is empty</p>
        )}
      </div>
      <div className={` ${isEmailOpen && "row"}  `}>
        <div className={` ${isEmailOpen && "col-md-5"}  `}>
          <>
            {emails?.length > 0 &&
              emails
                ?.slice(
                  (page - 1) * emails?.length - emails?.length,
                  page * emails?.length
                )
                .map((email) => (
                  <div
                    key={email.id}
                    className={`mb-3 d-flex gap-3 border-color px-4 py-2 rounded-2 pointer ${
                      isEmailOpen && selectedEmail.id === email.id
                        ? "bg-email-open"
                        : "bg-email"
                    }  ${
                      readEmails.find((mail) => mail.id === email.id) &&
                      " bg-read-email "
                    }`}
                    onClick={() => clickHandler(email)}>
                    <EmailCard email={email} isEmailOpen={isEmailOpen} />
                  </div>
                ))}
            {filter === "all" && emails?.length > 0 && (
              <Pagination
                page={page}
                previousPageHandler={previousPageHandler}
                nextPageHandler={nextPageHandler}
                emailsLength={emails.length}
              />
            )}
          </>
        </div>
        {emails?.length > 0 && isEmailOpen && (
          <div className="col-md-7  ">
            <EmailBody
              email={selectedEmail}
              closeEmailBodyHandler={closeEmailBodyHandler}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default EmailList;
