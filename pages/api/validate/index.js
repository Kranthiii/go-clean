import { compare } from "bcryptjs";
import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const {
    body: { username, password },
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
    const checkedPwd = await compare(password, userWithUsername.password);
    if (!checkedPwd) return res.status(200).json({ ok: false, user: null });
    res.status(200).json({
      ok: true,
      // TODO: Remove the '||'
      user: {
        username: username,
        role: userWithUsername?.role || "user",
        email: userWithUsername.email,
      },
    });
  } catch (err) {
    console.log("Caught Error: ", err);
    res.status(500).json({ ok: false, user: null });
  }
}
