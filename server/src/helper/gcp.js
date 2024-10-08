"use strict";

const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  projectId: "clean-mountain-329507",
});

const bucket = storage.bucket("heavenlly-commerce");

async function uploadFileToGCP(file) {
  try {
    const destination = `product/${file.originalname}`;
    const blob = bucket.file(destination);
    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: file.mimetype,
    });

    return new Promise((resolve, reject) => {
      blobStream
        .on("finish", async () => {
          const imageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
          resolve(imageUrl);
        })
        .on("error", (err) => {
          console.error("Error uploading to GCP:", err);
          reject({ success: false });
        });

      blobStream.end(file.buffer);
    });
  } catch (err) {
    console.error("GCP upload error:", err);
    throw new Error("Failed to upload file to GCP");
  }
}

async function checkImageIsExist(file, folder) {
  const fileName = `${folder}/${file.originalname}`;
  const fileImage = bucket.file(fileName);
  const [exist] = await fileImage.exists();
  return exist;
}

module.exports = {
  uploadFileToGCP,
  checkImageIsExist,
};
