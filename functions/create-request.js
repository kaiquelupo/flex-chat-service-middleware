const axios = require('axios');
const crypto = require('crypto');
const qs = require('querystring');
    
exports.create_request = function (url, params) {

    var signedUrl = url; 
    var parameterArray = [];
    
    for (const attribute in params) {
        parameterArray.push(attribute);
    }
    
    parameterArray.sort();
    
    parameterArray.forEach(item => {
        signedUrl += item + params[item];
    });
    
    const hashBuffer = crypto.createHmac('sha1', process.env.AUTH_TOKEN)
             .update(signedUrl)
             .digest();
             
    const signature = hashBuffer.toString('base64');
    
    const config = {
      headers: {
        'X-Twilio-Signature': signature,
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      }
    };
        
    return axios.post(
        url, 
        qs.stringify(params),
        config
    )
}