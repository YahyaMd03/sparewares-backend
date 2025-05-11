const axios = require("axios");

const queryString = require("querystring");

async function smsApi(customerPhoneNumber, text, templateid) {
  const params = {
    user: "sparewares",
    authkey: "92Xa0RFQ93Rrk",
    sender: "SPWRES",
    mobile: `${customerPhoneNumber}`,
    text: text,
    entityid: "1001635210966519359",
    templateid: templateid,
  };

  const url = `https://amazesms.in/api/pushsms?${queryString.stringify(
    params
  )}`;

  try {
    await axios.get(url);
  } catch (error) {}
}



module.exports={smsApi}