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

export {
  navigateToTourDetails,
  navigateToTourDetailsEdit,
  navigateToTourInfo,
  navigateToTourEdit
}
