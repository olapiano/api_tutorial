const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    
    // check if not null
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.'});
    
    // check for duplicate usernames
    const duplicate = await User.findOne({ username: user }).exec();
    if (duplicate) return res.sendStatus(409); // Conflict

    try {
        // encrypt the passwords (10 salt rounds)
        const hashedPassword = await bcrypt.hash(pwd, 10);
        
        // create and store the new users
        const result = await User.create({ 
            "username": user, 
            "password": hashedPassword,
        });

        console.log(result);

        res.status(201).json({ 'success': `New user ${user} created!`});
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }

}

module.exports = { handleNewUser };
