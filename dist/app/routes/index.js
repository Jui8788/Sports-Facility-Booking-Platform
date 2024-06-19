"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/Auth/auth.route");
const facility_route_1 = require("../modules/Facility/facility.route");
const booking_route_1 = require("../modules/Booking/booking.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/facility',
        route: facility_route_1.FacilityRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/bookings',
        route: booking_route_1.BookingRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
