// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const forwarded = req.headers["x-forwarded-for"];

  const ip =
    typeof forwarded === "string"
      ? forwarded.split(/, /)[0]
      : req.socket.remoteAddress;

  console.log(ip);
  res.status(200).json({ name: "John Doe", ip: ip });
}
