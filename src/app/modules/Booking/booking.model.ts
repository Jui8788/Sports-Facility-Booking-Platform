import { Schema, model } from 'mongoose'
import { TBooking } from './booking.interface'
import { BookingStatus } from './booking.constant'
import { Facility } from '../Facility/facility.model'

const bookingSchema = new Schema<TBooking>({
  date: { type: Date, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  facility: { type: Schema.Types.ObjectId, ref: 'Facility', required: true },
  payableAmount: { type: Number, required: true },
  isBooked: {
    type: String,
    enum: {
      values: BookingStatus,
      message: '{VALUE} is not valid',
    },
    required: true,
  },
})

bookingSchema.pre<TBooking>('save', function (next) {
  const duration =
    (this.endTime.getTime() - this.startTime.getTime()) / (1000 * 60 * 60)
  Facility.findById(
    this.facility,
    (err: any, facility: { pricePerHour: number }) => {
      if (facility) {
        this.payableAmount = duration * facility.pricePerHour
        next()
      } else {
        next(new Error('Facility not found'))
      }
    }
  )
})

export const Booking = model<TBooking>('Booking', bookingSchema)
