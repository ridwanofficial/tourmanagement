const navigateToTourDetails = (navigate, tourId) => {
  navigate(`/tour-details/${tourId}`)
}
const navigateToTourDetailsEdit = (navigate, tourId) => {
  navigate(`/tour-details/${tourId}/edit`)
}

const navigateToTourInfo = (navigate, tourId) => {
  navigate(`/tour/${tourId}`)
}
const navigateToTourEdit = (navigate, tourId) => {
  navigate(`/tour/${tourId}/edit`)
}
const navigateToCreateTourDetails = navigate => {
  navigate(`/create-tour-details`)
}

// create - tour - details

export {
  navigateToTourDetails,
  navigateToTourDetailsEdit,
  navigateToTourInfo,
  navigateToTourEdit,
  navigateToCreateTourDetails
}
