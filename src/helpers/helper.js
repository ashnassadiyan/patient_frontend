export const formatDateToYYYYMMDD = (dateString) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const formatDateToYYYYMMDDHHMM = (dateString) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export const convertISO = (dateStr) => {
  const date = new Date(dateStr);
  const formattedDate = date.toString().split(" ").slice(0, 5).join(" ");
  return formattedDate;
};

export const extractOutputs = (str) => {
  console.log(str, "str");
  if (!str) return "";
  const regex = /### outputs:\s*({[^}]+})/;
  const match = str.match(regex);

  if (match) {
    return JSON.parse(match[1].replace(/'/g, '"'));
  }

  return null;
};
