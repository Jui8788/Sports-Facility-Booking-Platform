import { Schema } from 'mongoose'

export type BookingStatus = 'confirmed' | 'unconfirmed' | 'canceled'

export type TBooking = {
  date: Date
  startTime: Date
  endTime: Date
  user: Schema.Types.ObjectId
  facility: Schema.Types.ObjectId
  payableAmount: number
  isBooked: BookingStatus
}
