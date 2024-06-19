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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingControllers = void 0;
const booking_service_1 = require("./booking.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config/config"));
const user_model_1 = require("../User/user.model");
const checkAvailability = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = req.query.date ? new Date(req.query.date) : new Date();
    const result = yield booking_service_1.BookingServices.checkAvailabilityFromDB(date.toISOString().split('T')[0]);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Availability checked successfully',
        data: result,
    });
}));
const createBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract token and verify user
    const tokenWithBearer = req.headers.authorization;
    if (!tokenWithBearer) {
        throw new AppError_1.default(401, 'Unauthorized users!');
    }
    const token = tokenWithBearer.split(' ')[1];
    const verifiedToken = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
    const { email } = verifiedToken;
    // Find user by email
    const user = yield user_model_1.User.findOne({ email });
    if (!user) {
        throw new AppError_1.default(401, 'User not found');
    }
    // Add user ID to request body
    req.body.user = user._id;
    const result = yield booking_service_1.BookingServices.createBookingIntoDB(req.body);
    // Send response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Booking created successfully',
        data: result,
    });
}));
const getAllBookings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield booking_service_1.BookingServices.getAllBookingsFromDB();
        // send response
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Bookings retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        // send response
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            success: false,
            message: 'No Data Found',
            data: [],
        });
    }
}));
const getUserBookings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const result = yield booking_service_1.BookingServices.getUserBookingsFromDB(userId);
        // send response
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'User bookings retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        // send response
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            success: false,
            message: 'No Data Found',
            data: [],
        });
    }
}));
const cancelBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.BookingServices.cancelBookingFromDB(req.params.id);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Booking canceled successfully',
        data: result,
    });
}));
exports.BookingControllers = {
    checkAvailability,
    createBooking,
    getAllBookings,
    getUserBookings,
    cancelBooking,
};
