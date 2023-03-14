const request = require("request");
const geocode = (address, callback) => {
  const url =
    "https://geocode.xyz/Hauptstr.,+57632+" +
    encodeURIComponent(address) +
    "?json=1&auth=361674043089105398542x66463";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (body.error) {
      callback("Unable to find location, Try another search", undefined);
    } else {
      callback(undefined, {
        latitude: body.latt,
        longitude: body.longt,
        location: body.standard.addresst,
      });
    }
  });
};

module.exports = geocode;
