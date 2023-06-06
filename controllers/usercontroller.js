const { User, Thought } = require('../models');

const usercontroller = {
    
    async getAllUsers(req, res) {
        try {
            const users = await User.find({});
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getUserById(req, res) {
        try {
            const user = await User.findById(req.params.userId)
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            });

            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
    
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(200).json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, {
                $set: req.body
            }, { new: true });

            if (!user) {
                res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
},

async deleteUser(req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
    },

    async addFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                { $push: { friends: req.params.friendId } },
                { new: true }
            );
            
            if (!user) {
                res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json(user);
        }

        catch (err) {
            res.status(500).json(err);
        }
    },

    async removeFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );

            if (!user) {
                res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json(user);

        } catch (err) {
            res.status(500).json(err);
        }
        
    }

};

module.exports = usercontroller;