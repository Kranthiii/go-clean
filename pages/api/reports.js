import { getToken } from "next-auth/jwt";
import clientPromise from "../../lib/mongodb";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(req, res) {
  const token = await getToken({ req, secret });
  if (!token?.user) {
    return res.status(403).json({ ok: false, result: "Login required.." });
  }
  if (req.method === "POST") {
    const {
      body: { usernames },
    } = req;
    try {
      let connection = await clientPromise;
      let db = connection.db("waste_tracking");
      let data;
      if (usernames)
        data = await db
          .collection("user_details")
          .find({ username: { $in: usernames } })
          .project({ reports: 1, _id: 0, username: 1 })
          .toArray();
      else
        data = await db
          .collection("user_details")
          .find({})
          .project({ reports: 1, _id: 0, username: 1 })
          .toArray();
      res.status(200).json({ ok: true, result: data });
    } catch (err) {
      console.log("Caught Error: ", err);
      res.status(500).json({ ok: false, result: null });
    }
  } else {
    res
      .status(400)
      .json({ message: "No api endpoint found for the request type" });
  }
}
