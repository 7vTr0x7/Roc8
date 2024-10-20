const categories = ["a", "b", "c", "d", "e", "f"];

const returnFiltered = (params, data) => {
  const filteredData = data.filter((item) => {
    const itemDay = item.Day || item.day;
    const [day, month, year] = itemDay.split("/").map(Number);
    const itemDate = new Date(year, month - 1, day);
    const age = item.Age || item.age;
    const gender = item.Gender || item.gender;

    if (
      age === params?.age &&
      gender.toLowerCase() === params?.gender.toLowerCase() &&
      itemDate >= new Date(params?.startDate) &&
      itemDate <= new Date(params?.endDate)
    ) {
      return item;
    }
    return false;
  });

  return filteredData.length === 0 ? [] : filteredData;
};

export const barData = (params, data) => {
  if (params?.age) {
    const newData = categories.map((cat) => {
      const total = returnFiltered(params, data).reduce(
        (acc, curr) => acc + Number(curr[cat.toUpperCase()]),
        0
      );

      return { category: cat.toUpperCase(), value: total };
    });
    return newData;
  } else {
    const newData = categories.map((cat) => {
      const total = data.reduce(
        (acc, curr) => acc + Number(curr[cat.toUpperCase()]),
        0
      );
      return { category: cat.toUpperCase(), value: total };
    });
    return newData;
  }
};

export const selectedBar = (index) => {
  return [...categories]?.reverse()[index];
};

export const lineData = (bar, params, data) => {
  if (params?.age) {
    return returnFiltered(params, data).map((line) => ({
      value: Number(line[bar.toUpperCase()]),
      date: line.day || line.Day,
    }));
  } else {
    return data.map((line) => {
      return {
        value: Number(line[bar.toUpperCase()]),
        date: line.day || line.Day,
      };
    });
  }
};
