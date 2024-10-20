import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../redux/slices/filterSlice";
import { useNavigate } from "react-router-dom";

const Filters = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filter = useSelector((state) => state.filter.filter);

  const changeHandler = (value) => {
    dispatch(changeFilter(value));
  };

  return (
    <section>
      <div className="d-flex gap-4 fw-semibold ">
        <p>Filter By:</p>
        <p
          className={`${
            filter === "all" && "bg-filter  rounded-4 px-3 "
          } pointer`}
          onClick={() => changeHandler("all")}>
          All
        </p>
        <p
          className={`${
            filter === "unread" && "bg-filter  rounded-4 px-3 "
          } pointer`}
          onClick={() => changeHandler("unread")}>
          Unread
        </p>
        <p
          className={`${
            filter === "read" && "bg-filter  rounded-4 px-3 "
          } pointer`}
          onClick={() => changeHandler("read")}>
          Read
        </p>
        <p
          className={`${
            filter === "favorites" && "bg-filter  rounded-4 px-3 "
          } pointer`}
          onClick={() => changeHandler("favorites")}>
          Favorites
        </p>
      </div>
    </section>
  );
};

export default Filters;
