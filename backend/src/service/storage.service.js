// import ImageKit from '@imagekit/nodejs';

// const client = new ImageKit({
//   privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted
// });

// const response = await client.files.upload({
//   file: fs.createReadStream('path/to/file'),
//   fileName: 'file-name.jpg',
// });

// console.log(response);

const { URLEndpoints } = require("@imagekit/nodejs/resources/accounts.js");
var ImageKit = require("imagekit");
var mongoose = require("mongoose");

var imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

function uploadFile(file) {
  return new Promise((resolve, reject) => {
    imagekit.upload(
      {
        file: file.buffer,
        fileName:new mongoose.Types.ObjectId().toString(),
        folder:"Moody-Player",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );
  });
}

module.exports = uploadFile;
