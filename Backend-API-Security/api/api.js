const config = require('../config/config');
// currently unused function, is here to allow sending requests to other places
// Fully modular at that, you can specify your payload, as long as its a json, your method as in GET, POST and so on, and the specific endpoint, server adderss is changed in the config
async function sendRequest(endpoint, payload, method){
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: method,
    headers: myHeaders,
    body: JSON.stringify(payload) || null,
    redirect: 'follow',
  };
  try {
    const response = await fetch(config.server + endpoint, requestOptions);
    const data = await response.json();  // Parse JSON response
    return data;
  } catch (error) {
    console.error("API request error:", error);
  }
}

module.exports = sendRequest;