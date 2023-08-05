import { hash } from "bcryptjs";
import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    //Getting email and password from body
    const { username, password, email } = req.body;
    // Validate
    if (!username || !password) {
      res.status(422).json({ ok: false, message: "Invalid Data" });
      return;
    }
    let connection = await clientPromise;
    let db = connection.db("waste_tracking");
    //Check existing
    const checkExisting = await db
      .collection("user_details")
      .findOne({ $or: [{ username: username }, { email: email }] });
    // const checkExisting = await db
    //   .collection("user_details")
    //   .findOne({ $or: [{ username: username }, { ip_address: ip }] });
    //Send error response if duplicate user is found
    if (checkExisting) {
      res.status(422).json({ ok: false, message: "User already exists" });
      return;
    }
    //Hash password
    const status = await db.collection("user_details").insertOne({
      username,
      email,
      password: await hash(password, 12),
    });
    //Send success response
    res.status(201).json({ ok: true, message: "User created", ...status });
  } else {
    //Response for other than POST method
    res.status(500).json({ ok: false, message: "Route not valid" });
  }
}
