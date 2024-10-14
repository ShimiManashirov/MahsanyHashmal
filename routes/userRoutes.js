// routes/userRoutes.js
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     description: Get all users
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get('/users', (req, res) => {
    res.json([{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }]);
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     description: Get a user by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Numeric ID of the user to get
 *     responses:
 *       200:
 *         description: A user object
 */
router.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.json({ id: userId, name: `User ${userId}` });
});

module.exports = router;
