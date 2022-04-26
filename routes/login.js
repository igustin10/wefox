const jwt = require('jsonwebtoken');
const User = require('../models/User')

module.exports = function(app){

    /**
     * @swagger
     * /login:
     *    post:
     *      description: Login with user account
     *    parameters:
     *      - name: "email"
     *        in: "body"
     *        required: true
     *        schema:
     *          type: "string"
     *      - name: "password"
     *        in: "body"
     *        required: true
     *        schema:
     *          type: "string"
     *    responses:
     *      '201':
     *        description: User login correctly
     *      '400':
     *        description: Invalid credentials
     *      '500':
     *        description: Server error
     */


    app.post('/login', async (req, res) => {

        const {email, password} = req.body

        const user = await User.findOne({ email: email })
        if (!user) return res.status(400).json({success: 'failed', msg:'bad credentials'})


        const validPassword = await user.matchPassword(password);
        if (!validPassword) return res.status(400).json({success: 'failed', msg:'bad credentials'})

        const token = jwt.sign({
            email: email,
            id: user.id
        }, process.env.TOKEN_SECRET, { expiresIn: process.env.EXPIRESIN })

        return res
            .status(200)
            .header('auth-token', token)
            .json({error: null, data: {token}, success: 'success', msg:'provide'})
    })

}



