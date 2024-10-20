export const getDate = (email) => {
  const date = new Date(email?.date);

  const time = date.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return time;
};

export const firstChar = (email) => {
  return email?.from?.name?.charAt(0).toUpperCase();
};
