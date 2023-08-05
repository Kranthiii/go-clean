const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const streamifier = require("streamifier");

// Disable nextjs default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  let multerUpload = (req, res) => {
    let storage = multer.memoryStorage();
    let uploadParser = multer({
      limits: {
        fileSize: 10485760, // 10Mb
      },
      storage: storage,
    }).single("image");
    return new Promise((resolve, reject) => {
      uploadParser(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
          reject(err);
        } else if (err) {
          reject(err);
        } else {
          resolve(req);
        }
      });
    });
  };

  let uploadFromBuffer = (req) => {
    cloudinary.config({
      secure: true,
    });
    return new Promise((resolve, reject) => {
      let cld_upload_stream = cloudinary.uploader.upload_stream(
        {
          folder: "waste-tracking",
        },
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
    });
  };
  try {
    let multerReq = await multerUpload(req, res);
    let uploadRes = await uploadFromBuffer(multerReq);
    res.status(200).json({ error: null, result: uploadRes });
  } catch (error) {
    console.log("Caught Error ", error);
    res.status(500).json({ error, result: null });
  }
}
