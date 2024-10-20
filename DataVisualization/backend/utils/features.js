import jwt from "jsonwebtoken";
import paper from "papaparse";

export const sendCookie = (user, res, message, statusCode) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({ success: true, message, token });
};

export const getData = async () => {
  const res = await fetch(
    `https://docs.google.com/spreadsheets/d/1l7GstWHc69HPV0irSdvoMIyHgtufUPKsbtCiNw7IKR0/export?format=csv&gid=485741054`
  );

  const csvData = await res.text();
  const parsedData = paper.parse(csvData, { header: true });
  return parsedData.data;
};
