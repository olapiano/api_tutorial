const User = require('../model/User');

const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) {
        return res.status(404).json({'message': 'No users found'});
    }
    res.json({users});
};

const getUser = async (req, res) => {
    if (!req.params.id) {
        return res.status(404).json({'message': 'No user found'});
    }
    const user = await Users.findOne({ _id: req.params.id }).exec();
    if(!user) {
        return res.status(204).json({'message': 'No user found'});
    }
    res.json(user);
};

const deleteUser = async (req, res) => {
    if (!req?.body?.id) return res.status(404).json({'message': 'No user found'});
    const user = await Users.findOne({ _id: req.body.id }).exec();
    if (!user) return res.status(204).json({'message': `No user matches ID ${req.body.id}.`});
    const result = await Users.deleteOne({ _id: req.body.id });
    console.log(result);
    res.json(result);
};

module.exports = {
    getAllUsers,
    getUser,
    deleteUser,
};