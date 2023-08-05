import openai, { generatePrompt } from "../../lib/openai";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(req, res) {
  const token = await getToken({ req, secret });
  if (!token?.user) {
    return res.status(403).json({ ok: false, result: "Login required.." });
  }
  if (req.method === "POST") {
    const {
      body: { location, description, date },
    } = req;
    try {
      const mailBody = await openai.createCompletion({
        model: "text-davinci-003",
        max_tokens: 1000,
        prompt:
          req.body?.prompt ||
          generatePrompt({ description, location, sinceDate: date }),
      });
      res.status(200).json({ ok: true, result: mailBody.data });
    } catch (err) {
      console.log("Caught Error: ", err);
      return res.status(200).json({
        ok: true,
        result: {
          choices: [
            {
              text: `Dear [Government Authority], %0D%0A%0D%0AI am writing to inquire about the trash collection schedule in ${location}. I noticed that the trash along the streets has not been collected since ${date}. As a result, the area has become unsightly with piles of garbage and plastic bags thrown along the side of the road. %0D%0A%0D%0AI understand that there may be unforeseen circumstances that may cause delays in trash collection, but I believe it is important for the community to maintain a clean and healthy environment. I would greatly appreciate any information you can provide on when the trash in London will be collected and any steps that can be taken to prevent this from happening in the future. %0D%0A%0D%0AThank you for your attention to this matter. I look forward to hearing from you soon. %0D%0A%0D%0ASincerely, %0D%0A${token.user.username}`,
            },
          ],
        },
      });
    }
  } else {
    res
      .status(400)
      .json({ message: "No api endpoint found for the request type" });
  }
}
