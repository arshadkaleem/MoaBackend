import { Router } from "express";
import catchAsync from "../../utils/catchAsync";
import { validateJoi } from "../../utils/validateJoi";
import eventValidator from "../../validators/event.validator";
import eventController from "../../controllers/event.controller";

const eventRoute = Router();

// Create Event
eventRoute.post('/', validateJoi(eventValidator.eventJoiSchema), catchAsync(eventController.addEvent));
// Get All Event
eventRoute.get('/', catchAsync(eventController.getAllEvent));
// Get Event By Status
eventRoute.get('/status=:status', catchAsync(eventController.getEventByStatus));
// Get Event By ID
eventRoute.put('/:id', validateJoi(eventValidator.updateEventJoiSchema), catchAsync(eventController.updateEvent));
// Update Event
eventRoute.delete('/:id', catchAsync(eventController.deleteEvent));

export default eventRoute;

