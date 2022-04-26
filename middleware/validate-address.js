const axios = require('axios').default;

const verifyAddress = async (req, res, next) => {

    const {street, streetNumber, town, postalCode, country} = req.query

    const streetClear = street.replace(' ','+')
    const streetNumberClear = streetNumber.replace(' ','+')
    const townClear = town.replace(' ','+')
    const postalCodeClear = postalCode.replace(' ','+')
    const countryClear = country.replace(' ','+')

    const address = streetClear + '+' + streetClear + '+' + streetNumberClear + '+'  + townClear + '+'  + postalCodeClear + '+'  + countryClear

    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key='+process.env.GOOGLE_API_KEY

    axios.get(url)
        .then(function (response) {
            const status = response.data.status
            const results = response.data.results

            if (results.length == 0 || status == 'ZERO_RESULTS') return res.status(400).json({success: 'failed', msg:'bad address'})
            else{
                const location = response.data.results[0].geometry.location
                req.location = location
                next()
            }

        })
        .catch(function (error) {
            console.log(error);
            res.status(500).json({success: 'failed', msg:'server error'})
        })

}

module.exports = verifyAddress;