import moment from "moment";

export const sunTimeFormat = (date: number) =>
  moment.unix(date).format("h:mm A");

export const hourlyFormat = (date: number) => moment(date).format("h:mm A");

export const dateFormat = (date?: number) => moment(date).format("ddd, D MMM");

export const dayFormat = (date: number) => {
  return moment(date).format("ddd");
};