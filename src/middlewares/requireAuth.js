const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');


module.exports = (req, res, next) => {
    
    const authorization  = req.headers.authorization;
    
    if(!authorization) {
        return res.status(401).send({error: 'You must be logged in'})
    }
    // console.log('authorization', authorization);
    

 
    const token = req.headers.authorization.split(' ')[1];
    console.log('token', token);
    

    jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
        if (err) {
            return res.status(401).send({error: err.message})
        }

        const {userId} = payload

        const user = await User.findById(userId);

        req.user = user;

        next();
    });


}