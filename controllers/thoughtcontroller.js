const { Thought, User } = require('../models');

const thoughtcontroller = {
    
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find({});
            res.status(200).json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = thoughtcontroller;