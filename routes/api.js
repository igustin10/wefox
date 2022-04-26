const verifyToken = require('../middleware/validate-tokens')
const verifyAddress = require('../middleware/validate-address')
const axios = require('axios').default;

module.exports = function(app){

    /**
     * @swagger
     * /api/verifyaddress:
     *    get:
     *      description: Verify a given Address
     *    parameters:
     *      - name: street
     *        in: query
     *        description: Name of the street
     *        required: true
     *        schema:
     *          type: string
     *          format: string
     *      - name: streetNumber
     *        in: query
     *        description: Street number
     *        required: true
     *        schema:
     *          type: int
     *          format: int
     *      - name: town
     *        in: query
     *        description: Town
     *        required: true
     *        schema:
     *          type: string
     *          format: string
     *      - name: postalCode
     *        in: query
     *        description: PostalCode
     *        required: true
     *        schema:
     *          type: int
     *          format: int
     *      - name: country
     *        in: query
     *        description: Country
     *        required: true
     *        schema:
     *          type: string
     *          format: string
     *    responses:
     *      '201':
     *        description: Valid Address
     *        schema:
     *             type: "string"
     *      '400':
     *        description: Invalid Address
     *        schema:
     *             type: "string"
     *      '500':
     *        description: Server error
     */

    app.get('/api/verifyaddress', verifyAddress, async (req, res) => {

        return res
            .status(200)
            .json({ success: 'success', msg:'La direccion introducida es valida', location: req.location})
    })

    /**
     * @swagger
     * /api/viewweather:
     *    get:
     *      description: Verify a given Address
     *    parameters:
     *      - name: "auth-token"
     *        in: "header"
     *        required: true
     *        schema:
     *          type: "string"
     *      - name: street
     *        in: query
     *        description: Name of the street
     *        required: true
     *        schema:
     *          type: string
     *          format: string
     *      - name: streetNumber
     *        in: query
     *        description: Street number
     *        required: true
     *        schema:
     *          type: int
     *          format: int
     *      - name: town
     *        in: query
     *        description: Town
     *        required: true
     *        schema:
     *          type: string
     *          format: string
     *      - name: postalCode
     *        in: query
     *        description: PostalCode
     *        required: true
     *        schema:
     *          type: int
     *          format: int
     *      - name: country
     *        in: query
     *        description: Country
     *        required: true
     *        schema:
     *          type: string
     *          format: string
     *    responses:
     *      '201':
     *        description: Valid Address & Weather
     *        schema:
     *             type: "string"
     *      '400':
     *        description: Invalid Address
     *        schema:
     *             type: "string"
     *      '500':
     *        description: Server error
     */

    app.get('/api/viewweather', [verifyToken, verifyAddress], async (req, res) => {

        const {lat, lng} = req.location

        const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lng+'&appid='+process.env.WEATHER_API_KEY

        axios.get(url)
            .then(function (response) {
                if (response.cod === 400)res.status(400).json({success: 'failed', msg:'Mal las coordenadas'})
                else{
                    clima = response.data.main
                    return res
                        .status(200)
                        .json({ success: 'success', msg:'Se obtuvo correctamente el clima', clima: clima})
                }

            })
            .catch(function (error) {
                console.log(error);
                res.status(500).json({success: 'failed', msg:'error del servidor'})
            })

    })

}



