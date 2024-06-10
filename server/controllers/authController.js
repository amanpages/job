const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async (req, res) => {
    const { email, password, role, skills } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ email, password, role, skills });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id,
                role: user.role,
            },
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.status(201).json({ token, user: { id: user.id, email: user.email, role: user.role } });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'Invalid login request: Email or password missing' });
    }
    
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials: User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials: Password incorrect' });
        }

        const payload = {
            user: {
                id: user.id,
                role: user.role,
            },
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) {
                return res.status(500).json({ msg: 'Server error' });
            }
            res.status(200).json({ token, user: { id: user.id, email: user.email, role: user.role } });
        });
    } catch (err) {
        console.error('Error during login:', err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};
