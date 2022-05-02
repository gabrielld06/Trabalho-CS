import asyncHandler from 'express-async-handler';
import Event from '../../model/Events/eventModel.js'
import mongoose from 'mongoose'

const getEvents = asyncHandler(async (req, res) => {
    const { filter } = req.body;
    const events = await Event.find({});
    res.json(events.filter(e => e.name.includes(filter)));
});

const getEventPresentationsByName = asyncHandler(async (req, res) => {
    const { eventName } = req.body;

    const eventPresentations = await Event.aggregate([
        {
            "$match": {
                "name": eventName
            }
        },
        {
            "$lookup": {
                "from": "apresentacoes",
                "localField": "_id",
                "foreignField": "event",
                "as": "presentationList"
            }
        }]);

    res.json(eventPresentations);
})

const getEventPresentationsByNameAndCreator = asyncHandler(async (req, res) => {
    const { eventName, creatorId } = req.body;

    const id = mongoose.Types.ObjectId(creatorId);

    const event = await Event.aggregate([
        {
            "$match": {
                "$and": [
                    {
                        "name": eventName
                    },
                    {
                        "creator": id
                    }
                ]
            }
        },
        {
            "$lookup": {
                "from": "apresentacoes",
                "localField": "_id",
                "foreignField": "event",
                "as": "presentationList"
            }
        }]);

    res.json(event);
})

const getEventByName = asyncHandler(async (req, res) => {
    const { eventName } = req.body;
    const event = await Event.find({ name: eventName });
    res.json(event);
})

const getUserEvents = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    const userEvents = await Event.find({ creator: userId });
    console.log(userEvents);
    res.json(userEvents);
})

const newEvent = asyncHandler(async (req, res) => {
    const { thumb, name, creator, description, ticketsAvailable, ticketPrice, location, startDate, finishDate } = req.body;
    const ticketsSold = 0;
    const newEvent = await Event.create({
        thumb,
        name,
        creator,
        description,
        ticketsAvailable,
        ticketsSold,
        ticketPrice,
        location,
        startDate,
        finishDate
    });
    if (newEvent) {
        res.status(201).json({
            _id: newEvent._id,
            thumb: newEvent.thumb,
            name: newEvent.name,
            creator: newEvent.creator,
            description: newEvent.description,
            ticketsAvailable: newEvent.ticketsAvailable,
            ticketPrice: newEvent.ticketPrice,
            location: newEvent.location,
            startDate: newEvent.startDate,
            finishDate: newEvent.finishDate
        });
    } else {
        res.status(400);
        throw new Error('Algo deu errado :(');
    }
});

const updateEvent = asyncHandler(async (req, res) => {
    const { _id, thumb, name, creator, description, ticketsAvailable, ticketsSold, ticketPrice, location, startDate, finishDate } = req.body;

    await Event.findByIdAndUpdate({ '_id': _id }, {
        thumb: thumb,
        name: name,
        creator: creator,
        description: description,
        ticketsAvailable: ticketsAvailable,
        ticketsSold: ticketsSold,
        ticketPrice: ticketPrice,
        location: location,
        startDate: startDate,
        finishDate: finishDate,
    }, (err, result) => {
        if (err) {
            res.send(err);
        }
        if (result) {
            res.status(201).json({
                _id,
                thumb,
                name,
                creator,
                description,
                ticketsAvailable,
                ticketsSold,
                ticketPrice,
                location,
                startDate,
                finishDate,
            })
        }
    }).clone().catch(function (err) { console.log(err) });
});

export { getEvents, getEventPresentationsByName, getEventPresentationsByNameAndCreator, getEventByName, getUserEvents, newEvent, updateEvent };