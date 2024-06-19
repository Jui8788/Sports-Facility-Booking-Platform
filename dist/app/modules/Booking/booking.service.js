"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingServices = void 0;
const facility_model_1 = require("../Facility/facility.model");
const booking_model_1 = require("./booking.model");
const checkAvailabilityFromDB = (date) => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield booking_model_1.Booking.find({
        date: new Date(date),
        isBooked: 'confirmed',
    });
    const timeSlots = [
        { startTime: '08:00', endTime: '10:00' },
        { startTime: '10:00', endTime: '12:00' },
        { startTime: '12:00', endTime: '14:00' },
        { startTime: '14:00', endTime: '16:00' },
        { startTime: '16:00', endTime: '18:00' },
        { startTime: '18:00', endTime: '20:00' },
        { startTime: '20:00', endTime: '22:00' },
    ];
    bookings.forEach((booking) => {
        timeSlots.forEach((slot) => {
            if ((new Date(`1970-01-01T${slot.startTime}:00.000Z`) <=
                booking.startTime &&
                new Date(`1970-01-01T${slot.endTime}:00.000Z`) > booking.startTime) ||
                (new Date(`1970-01-01T${slot.startTime}:00.000Z`) < booking.endTime &&
                    new Date(`1970-01-01T${slot.endTime}:00.000Z`) >= booking.endTime)) {
                slot.startTime = '';
                slot.endTime = '';
            }
        });
    });
    return timeSlots.filter((slot) => slot.startTime && slot.endTime);
});
const createBookingIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { startTime, endTime, facility } = payload;
    if (!startTime || !endTime) {
        throw new Error('Start time and end time are required');
    }
    // Find the facility document
    const facilityDoc = yield facility_model_1.Facility.findById(facility);
    if (!facilityDoc) {
        throw new Error('Facility not found');
    }
    // Convert startTime and endTime to Date objects
    const startDateTime = new Date(`${payload.date}T${startTime}`);
    const endDateTime = new Date(`${payload.date}T${endTime}`);
    // Calculate duration in hours
    const duration = (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60 * 60);
    const payableAmount = duration * facilityDoc.pricePerHour;
    const booking = new booking_model_1.Booking(Object.assign(Object.assign({}, payload), { startTime: startDateTime, endTime: endDateTime, payableAmount, isBooked: 'confirmed' }));
    const result = yield booking.save();
    return result;
});
const getAllBookingsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find().populate('user facility');
    return result;
});
const getUserBookingsFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find({ user: userId }).populate('facility');
    return result;
});
const cancelBookingFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.findByIdAndUpdate(id, { isBooked: 'canceled' }, { new: true }).populate('user facility');
    return result;
});
exports.BookingServices = {
    checkAvailabilityFromDB,
    createBookingIntoDB,
    getAllBookingsFromDB,
    getUserBookingsFromDB,
    cancelBookingFromDB,
};
