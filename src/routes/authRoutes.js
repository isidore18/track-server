const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');

router.post('/signup', async(req, res) => {
    const { email, password} = req.body;
    
    try {
        const user = new User({ email, password});
        await user.save();
        const token = jwt.sign(
            {userId: user._id},
            'MY_SECRET_KEY'
        );
        // ok at this level
        console.log('save ok');
        
        res.send({token});
    } catch(err) {
        console.log('save not ok');
        
        return res.status(422).send(err);
    }
})

router.post('/signin', async(req, res) => {
    console.log('signin attempt post');
    
    const {email, password}= req.body
    console.log(email, password);
    
    if (!email || !password) {
        return res.status(422).send({error: 'Must provide email and password'})
    }

    const user = await User.findOne({email});
    console.log('user', user);
    
    if (!user) {
        return res.status(422).send({error: 'Invalid password or email'})
    }

    try {
        await user.comparePassword(password)
        const token = jwt.sign({userId: user._id}, 'MY_SECRET_KEY')
        res.send({token})
    } catch (err) {
        return res.status(422).send({error: 'Invalid password or email'})
    }
})

module.exports = router;