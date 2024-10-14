import express from 'express';
import { user_obj } from '../main.js';

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
   return res.json([{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }]);
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

/**
 * @swagger
 * /user/create:
 *   post:
 *     description: Create a user
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: user
 *         in: body
 *         schema:
 *           type: object 
 *           properties:
 *             username:
 *               type: string
 *             lol:
 *               type: string
 *     responses:
 *       200:
 *         description: A user object
 */

router.post('/user/create', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.emaill;
    const first_name = req.body.first_name;
    //const display_name = req.body.display_name;
    const last_name = req.body.last_name;
    const birthDate = req.body.birthDate;
    //req.log('Initalizing user creator!');
    console.log(req.body);

    return res.json(user_obj.User_creator(username=username,password=password,email=email,first_name=first_name,display_name=display_name,
        last_name=last_name,birthDate=birthDate)
    );
})

export default router;