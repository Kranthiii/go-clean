import { getToken } from "next-auth/jwt";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(req, res) {
  const statuses = {
    pending: 0,
    completed: 1,
  };
  const token = await getToken({ req, secret });
  if (!token?.user || token?.user?.role !== "admin") {
    return res.status(403).json({ ok: false, result: "Login required.." });
  }
  if (req.method === "POST") {
    const {
      // newStatuses: [{id: <id>, status: "pending"/"completed"}]
      body: { statusObj },
    } = req;
    try {
      if (!Object.keys(statuses).includes(statusObj.status))
        throw new Error("The status is not defined");
      let connection = await clientPromise;
      let db = connection.db("waste_tracking");
      let data;
      // if (Array.isArray(newStatus))
      //   data = await db
      //     .collection("user_details")
      //     .find({ username: { $in: newStatus } })
      //     .project({ reports: 1, _id: 1, username: 1, volunteerForms: 1 })
      //     .toArray();
      // else
      data = await db.collection("user_details").updateOne(
        { "volunteeringForms._id": ObjectId(statusObj.id) },
        {
          $set: {
            "volunteeringForms.$.status": statusObj.status,
          },
        }
      );
      res.status(200).json({ ok: true, result: data });
    } catch (err) {
      console.log("Caught Error: ", err);
      res.status(500).json({ ok: false, result: null, error: err });
    }
  } else {
    res
      .status(400)
      .json({ message: "No api endpoint found for the request type" });
  }
}
