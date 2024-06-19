"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const auth_1 = require("../../middleware/auth");
const facility_validation_1 = require("../Facility/facility.validation");
const user_constant_1 = require("../User/user.constant");
const facility_controller_1 = require("./facility.controller");
const router = express_1.default.Router();
router.post('/', (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(facility_validation_1.FacilityValidations.createFacilityValidationSchema), facility_controller_1.FacilityControllers.createFacility);
router.get('/', facility_controller_1.FacilityControllers.getAllFacility);
router.put('/:id', (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), facility_controller_1.FacilityControllers.updateFacility);
router.delete('/:id', (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), facility_controller_1.FacilityControllers.deleteFacility);
exports.FacilityRoutes = router;
