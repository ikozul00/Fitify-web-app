import { GetUserData } from "@/lib/ContentfulAPI";

export default async function handler(req, res) {
    let user=await GetUserData(req.body.name);
    res.status(200).json({ data: user});
  }