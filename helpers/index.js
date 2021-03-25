

const dbValidators = require('./db_validators');
const googleVerify = require('./google-verify');
const generarJWT = require('./generarJWT');
const fileUplo = require('./uploadFile');


module.exports = {
    ...dbValidators
,   ...googleVerify
,   ...generarJWT
,   ...fileUplo

}