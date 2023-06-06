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

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);

            const user = await User.findOneAndUpdate(
                { _id: req.body.userId},
                { $push: { thoughts: thought._id } },
                { new: true }
                );

            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            res.status(200).json(thought);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, {
                $set: req.body
            }, { new: true });
    

    if (!thought) {
        res.status(404).json({ message: 'Thought not found' });
        return;
    }

    res.status(200).json(thought);

        } catch (err) {
            res.status(500).json(err);
        }
},

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.thoughtId);

            if (!thought) {
                res.status(404).json({ message: 'Thought not found' });
                return;
            }

            const user = await User.findOneAndUpdate(
                { _id: req.params.userId},
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );

            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            res.status(200).json(thought);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId},
                { $addToSet: { reactions: req.body} },
                { new: true }
                );

            if (!thought) {
                res.status(404).json({ message: 'Thought not found' });
                return;
            }

            res.status(200).json(thought);

        } catch (err) {
            res.status(500).json(err);
        }
    
    },

    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId},
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
                );

            if (!thought) {
                res.status(404).json({ message: 'Thought not found' });
                return;
            }

            res.status(200).json(thought);

        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = thoughtcontroller;