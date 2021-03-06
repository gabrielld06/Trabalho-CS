import asyncHandler from 'express-async-handler';
import Ticket from '../../model/Tickets/ticketModel.js'
import mongoose from 'mongoose'

const newTicket = asyncHandler(async (req, res) => {
    const { eventId, userId, ticketCount } = req.body;
    var tickets = [];
    const event = mongoose.Types.ObjectId(eventId);
    const user = mongoose.Types.ObjectId(userId);

    for (let i = 0; i < ticketCount; i++) {
        const newTicket = await Ticket.create({
            event,
            user,
        });
        if (newTicket) {
            tickets.push({
                _id: newTicket._id,
                event: newTicket.event,
                user: newTicket.user
            });
        }
    }
    if (newTicket) {
        res.status(201).json(tickets);
    } else {
        res.status(400);
        throw new Error('Algo deu errado :(');
    }
});

const getUserTickets = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    const id = mongoose.Types.ObjectId(userId);
    const ticketList = await Ticket.aggregate([
        {
            "$match": {
                "user": id
            }
        },
        {
            "$lookup": {
                "from": "eventos",
                "localField": "event",
                "foreignField": "_id",
                "as": "eventInfo"
            }
        },
        {
            "$unwind": "$eventInfo"
        }
    ]);

    res.json(ticketList);
})

const getTickets = asyncHandler(async (req, res) => {
    const { userId, eventId } = req.body;
    const user = mongoose.Types.ObjectId(userId);
    const event = mongoose.Types.ObjectId(eventId);

    const tickets = await Ticket.find({user: user, event : event});

    res.json(tickets);
})

export { newTicket, getUserTickets, getTickets };