const formatDate = (date: string) => {
  const newDate = new Date(date);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  }).format(newDate);
};

export { formatDate };
