import moment from "moment";

export const sunTimeFormat = (date: number | null) => {
  const result = date
    ? moment.unix(date).format("h:mm A")
    :  "-:-- AM";
  return result;
};

export const hourlyFormat = (date: number) => moment(date).format("h:mm A");

export const dateFormat = (date?: number) => moment(date).format("ddd, D MMM");

export const dayFormat = (date: number) => {
  return moment(date).format("ddd");
};
