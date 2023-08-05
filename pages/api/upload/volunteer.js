import { getToken } from "next-auth/jwt";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(req, res) {
  const token = await getToken({ req, secret });
  if (!token?.user) {
    return res.status(403).json({ ok: false, result: "Login required.." });
  }
  const {
    body: { username, desc1, desc2, geoLocation, uploadTime },
  } = req;
  if (req.method != "POST")
    return res.status(400).json({ error: "No endpoint found", result: null });
  try {
    let connection = await clientPromise;
    let db = connection.db("waste_tracking");
    const userWithUsername = await db
      .collection("user_details")
      .findOne({ username: username });
    if (!userWithUsername) {
      return res.status(200).json({ ok: false, user: null });
    }
    const status = await db.collection("user_details").updateOne(
      {
        username,
      },
      {
        $set: {
          volunteeringForms: [
            ...(userWithUsername?.volunteeringForms || []),
            {
              _id: new ObjectId(),
              desc1,
              desc2,
              geoLocation,
              uploadTime,
              status: "pending",
            },
          ],
        },
      }
    );
    res.status(200).json({ ok: true, user: { username: username } });
  } catch (err) {
    console.log("Caught Error: ", err);
    res.status(500).json({ ok: false, user: null });
  }
}
