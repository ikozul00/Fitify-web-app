import { CheckLoginData } from "@/lib/ContentfulAPI";

export default async function handler(req, res) {
    let user=await CheckLoginData(req.body.name,req.body.password);
    res.status(200).json({ data: user});
  }

  