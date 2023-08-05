const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const streamifier = require("streamifier");
import { getToken } from "next-auth/jwt";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

// Disable nextjs default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(req, res) {
  if (req.method == "POST") {
    const token = await getToken({ req, secret });
    if (!token?.user) {
      return res.status(403).json({ ok: false, result: "Login required.." });
    }
    let { username } = token.user;
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
      const {
        body: { geoLocation, description, sinceDate, address, wasteType },
      } = multerReq;
      const imageURL = uploadRes.secure_url;

      let connection = await clientPromise;
      let db = connection.db("waste_tracking");
      const prev_data = await db
        .collection("user_details")
        .findOne({ username: username });
      const status = await db.collection("user_details").updateOne(
        {
          username,
        },
        {
          $set: {
            reports: [
              ...(prev_data?.reports || []),
              {
                _id: new ObjectId(),
                geoLocation: {
                  lat: parseFloat(geoLocation.lat),
                  long: parseFloat(geoLocation.long),
                },
                description,
                sinceDate,
                address,
                wasteType,
                imageURL,
                status: "pending",
              },
            ],
          },
        }
      );
      res.status(200).json({
        ok: true,
        result: {
          username,
          report: {
            geoLocation,
            description,
            sinceDate,
            address,
            wasteType,
            imageURL,
          },
        },
      });
    } catch (error) {
      console.log("Caught Error ", error);
      res.status(500).json({ ok: false, result: null, message: error });
    }
  } else {
    res.status(400).json({
      ok: false,
      message: "No api endpoint found for the request type",
    });
  }
}
