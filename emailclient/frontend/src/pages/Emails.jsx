import React from "react";
import Filters from "../components/Filters";
import EmailList from "../components/EmailList";

const Emails = () => {
  return (
    <section className="px-5 py-4">
      <Filters />
      <EmailList />
    </section>
  );
};

export default Emails;
