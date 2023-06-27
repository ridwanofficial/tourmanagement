import moment from 'moment'

export function dateConverter (momentObj, time, formatString = 'DD.MM.YYYY') {
  return momentObj.set(moment(time).toObject()).format(formatString)
}
export function formatDate (date, formatString = 'YYYY-DD-MM') {
  return moment(date).format(formatString)
}
