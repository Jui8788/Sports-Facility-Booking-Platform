import { Facility } from '../Facility/facility.model'
import { TBooking } from './booking.interface'
import { Booking } from './booking.model'

const checkAvailabilityFromDB = async (date: string) => {
  const bookings = await Booking.find({
    date: new Date(date),
    isBooked: 'confirmed',
  })

  const timeSlots = [
    { startTime: '08:00', endTime: '10:00' },
    { startTime: '10:00', endTime: '12:00' },
    { startTime: '12:00', endTime: '14:00' },
    { startTime: '14:00', endTime: '16:00' },
    { startTime: '16:00', endTime: '18:00' },
    { startTime: '18:00', endTime: '20:00' },
    { startTime: '20:00', endTime: '22:00' },
  ]

  bookings.forEach((booking) => {
    timeSlots.forEach((slot) => {
      if (
        (new Date(`1970-01-01T${slot.startTime}:00.000Z`) <=
          booking.startTime &&
          new Date(`1970-01-01T${slot.endTime}:00.000Z`) > booking.startTime) ||
        (new Date(`1970-01-01T${slot.startTime}:00.000Z`) < booking.endTime &&
          new Date(`1970-01-01T${slot.endTime}:00.000Z`) >= booking.endTime)
      ) {
        slot.startTime = ''
        slot.endTime = ''
      }
    })
  })

  return timeSlots.filter((slot) => slot.startTime && slot.endTime)
}

const createBookingIntoDB = async (
  payload: Partial<TBooking>
): Promise<TBooking> => {
  const { startTime, endTime, facility } = payload

  if (!startTime || !endTime) {
    throw new Error('Start time and end time are required')
  }

  // Find the facility document
  const facilityDoc = await Facility.findById(facility)
  if (!facilityDoc) {
    throw new Error('Facility not found')
  }

  // Convert startTime and endTime to Date objects
  const startDateTime = new Date(`${payload.date}T${startTime}`)
  const endDateTime = new Date(`${payload.date}T${endTime}`)

  // Calculate duration in hours
  const duration =
    (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60 * 60)
  const payableAmount = duration * facilityDoc.pricePerHour

  const booking = new Booking({
    ...payload,
    startTime: startDateTime,
    endTime: endDateTime,
    payableAmount,
    isBooked: 'confirmed',
  })

  const result = await booking.save()
  return result
}

const getAllBookingsFromDB = async (): Promise<TBooking[]> => {
  const result = await Booking.find().populate('user facility')
  return result
}

const getUserBookingsFromDB = async (userId: string): Promise<TBooking[]> => {
  const result = await Booking.find({ user: userId }).populate('facility')
  return result
}

const cancelBookingFromDB = async (id: string): Promise<TBooking | null> => {
  const result = await Booking.findByIdAndUpdate(
    id,
    { isBooked: 'canceled' },
    { new: true }
  ).populate('user facility')

  return result
}

export const BookingServices = {
  checkAvailabilityFromDB,
  createBookingIntoDB,
  getAllBookingsFromDB,
  getUserBookingsFromDB,
  cancelBookingFromDB,
}
