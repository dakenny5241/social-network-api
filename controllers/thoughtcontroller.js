const { Thought, User } = require('../models');

const thoughtcontroller = {
    
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find({});
            res.status(200).json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId).populate({
                path: 'reactions',
                select: '-__v'
            });

            if (!thought) {
                res.status(404).json({ message: 'Thought not found' });
                return;
            }

            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
}

module.exports = thoughtcontroller;