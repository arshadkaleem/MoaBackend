import { Request, Response, NextFunction } from "express"
import createHttpError from "http-errors"
import EventModel from "../models/Event.model";
import { IEvent } from "../interfaces/events"

const addEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    title,
    description,
    banner,
    startDate,
    endDate = null,
    status = 'upcoming',
    url
  } = req.body as Omit<IEvent, '_id' | 'createdAt' | 'updatedAt'>;

  const event = new EventModel({
    title,
    description,
    banner,
    startDate,
    endDate,
    status,
    url
  });

  await event.save();

  res.status(200).json({
    success: true,
    message: "Event added successfully",
  })
}

const getAllEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  const events = await EventModel.find();

  res.status(200).json({
    success: true,
    data: {
      upcoming: events.filter(event => event.status === 'upcoming'),
      past: events.filter(event => event.status === 'past')
    }
  })
}

const getEventByStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  const { status } = req.params;

  const events = await EventModel.find({ status });

  res.status(200).json({
    success: true,
    data: events
  })
}

const updateEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  const {
    title,
    description,
    banner,
    startDate,
    endDate,
    status,
    url
  } = req.body as Omit<IEvent, '_id' | 'createdAt' | 'updatedAt'>;
  const { id } = req.params;

  const updatedEvent = await EventModel.findByIdAndUpdate(id, {
    title,
    description,
    banner,
    startDate,
    endDate,
    status,
    url
  }, { new: true });

  res.status(200).json({
    success: true,
    message: "Event updated successfully",
    data: updatedEvent
  })
}

const deleteEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  const { id } = req.params;

  await EventModel.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Event deleted successfully"
  })
}

export default {
  addEvent,
  getAllEvent,
  getEventByStatus,
  updateEvent,
  deleteEvent
}
