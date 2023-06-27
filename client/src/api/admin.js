/* eslint-disable no-return-await */

import { getClient } from './customWrapper'
const RootAddress = ''

export const getAllTours = token =>
  getClient(
    `${RootAddress}/getAllTour
`,
    { token }
  )

export const getTourById = id =>
  getClient(
    `${RootAddress}/getTourById/${id}

`
  )
export const getAllTourDetails = () =>
  getClient(
    `${RootAddress}/getAllTourDetails

`
  )
export const getTourDetailsById = id =>
  getClient(
    `${RootAddress}/getTourDetailsById/${id}

`
  )
export const updateTourDetails = (id, body) =>
  getClient(`${RootAddress}/updateTourDetails/${id}`, {
    postMethod: true,
    body: body
  })
export const createTourDetails = body =>
  getClient(`${RootAddress}/createTourDetails`, {
    postMethod: true,
    body: body
  })
export const createGuide = body =>
  getClient(`${RootAddress}/createGuide`, {
    postMethod: true,
    body: body
  })

export const updateTour = (id, body) =>
  getClient(`${RootAddress}/updateTour/${id}`, {
    postMethod: true,
    body: body
  })
export const updateGuide = (id, body) =>
  getClient(`${RootAddress}/updateGuide/${id}`, {
    postMethod: true,
    body: body
  })

export const getAllGuides = () => getClient(`${RootAddress}/getAllGuides`)
export const getGuideById = id => getClient(`${RootAddress}/getGuideById/${id}`)
