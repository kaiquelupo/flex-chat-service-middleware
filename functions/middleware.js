const axios = require("axios");

let path = Runtime.getFunctions()['create-request'].path;
let assets = require(path);

//FLEX_FLOW_WEBHOOK format: https://webhooks.twilio.com/v1/Accounts/ACxxxxxxxxxx/Proxy/KSxxxxxxx/Webhooks/ChatEvent/ProxyIdentifier/PNxxxxxx

exports.handler = async function(context, event, callback) {
        
	await axios.post(process.env.SERVICE, event);
	
	try {
	  
	    await assets.create_request(process.env.FLEX_FLOW_WEBHOOK, event);
	    
	} catch (err) {
	    
	    console.log(err); 
	    
	}

	throw Error();
	
	callback(null);
};
