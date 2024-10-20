import Chart from "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";
import React, { useEffect, useState, useMemo } from "react";
import BarChart from "../components/BarChart";
import Filters from "../components/Filters";
import LineChart from "../components/LineChart";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../redux/slices/dataSlice";
import { reset } from "../redux/slices/filtersSlice";

Chart.register(zoomPlugin);

const Charts = () => {
  const [paramsData, setParamsData] = useState({});
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true); // Loading state
  const [refresh, setRefresh] = useState(false);

  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters.filters);
  const resetValue = useSelector((state) => state.filters.reset);

  const age = searchParams.get("age");
  const gender = searchParams.get("gender");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  useEffect(() => {
    if (age && gender && startDate && endDate) {
      const data = {
        age,
        gender,
        startDate,
        endDate,
      };
      setParamsData(data);
    }
  }, [age, gender, startDate, endDate, filters]);

  const memoizedParamsData = useMemo(() => {
    return paramsData?.age ? paramsData : {};
  }, [paramsData]);

  const fetchChartData = async () => {
    try {
      setLoading(true); // Start loading
      const res = await fetch(
        "https://charts-backend.vercel.app/api/user/chart/data",
        {
          credentials: "include",
        }
      );

      if (!res.ok) {
        console.log("Failed to get data");
      }

      const data = await res.json();
      if (data.data) {
        dispatch(addData(data.data));
      }
      dispatch(reset(false));

      setLoading(false); // Stop loading after data is fetched
    } catch (error) {
      console.log(error);
      setLoading(false); // Stop loading if error occurs
    }
  };
  useEffect(() => {
    fetchChartData();
  }, []);

  useEffect(() => {
    if (resetValue) {
      setParamsData({});
    }
  }, [resetValue]);

  return (
    <div className="flex justify-center mt-10 h-auto px-4">
      <div className="w-full max-w-7xl">
        <Filters
          paramsData={memoizedParamsData ? memoizedParamsData : filters}
        />
        {loading ? (
          <div>Loading...</div> // Show loading while data is being fetched
        ) : (
          <div className="flex flex-col lg:flex-row lg:gap-5 gap-4 mt-5">
            {/* Wrap each chart with a responsive div */}
            <div className="flex-1 w-full h-[400px] md:h-[300px] sm:h-[250px]">
              <BarChart
                paramsData={
                  memoizedParamsData?.age ? memoizedParamsData : filters
                }
              />
            </div>
            <div className="flex-1 w-full h-[400px] md:h-[300px] sm:h-[250px]">
              <LineChart
                paramsData={
                  memoizedParamsData?.age ? memoizedParamsData : filters
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Charts;
