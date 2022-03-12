export const parseDate = (date) => {
  const parts = date.split("-");
  const postDate = {
    year: parts[0],
    month: parts[1],
    day: parts[2].slice(0, 2),
  };
  return postDate;
};
