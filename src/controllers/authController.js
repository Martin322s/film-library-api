const router = require('express').Router();
const authService = require('../services/authServices');

router.post('/register', async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password,
        rePass } = req.body;

    try {
        if (password !== rePass) {
            return res.status(400).json({ message: 'Passwords do not match' });
        } else {
            const result = await authService.registerUser({ firstName, lastName, email, password, role: 'user' });

            if (typeof result === 'string') {
                throw result;
            } else {
                const token = await authService.generateToken({ _id: result._id });
                res.json({
                    _id: result._id,
                    email: result.email,
                    firstName: result.firstName,
                    lastName: result.lastName,
                    role: result.role,
                    accessToken: token
                });
            }
        }
    } catch (err) {
        res.json(err);
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await authService.loginUser({ email, password });

        if (typeof user === 'string') {
            throw user;
        } else {
            const token = await authService.generateToken({ _id: user._id });
            res.json({
                _id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                role: user.role,
                accessToken: token
            });
        }
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/logout', (req, res) => {
    if (req.headers['x-authorization']) {
        res.json();
    }
});

router.get('/users', async (req, res) => {
    const users = await authService.getAllUsers();
    return res.json(users);
});

router.delete('/delete/:userId', async (req, res) => {
    const userId = req.params.userId;
    await authService.deleteUser(userId);
    res.json({});
});

router.patch('/update/:userId', async (req, res) => {
    const userId = req.params.userId;
    const { status } = req.body;
    const user = await authService.updateUser(userId, status);
    res.json(user);
});

module.exports = router;