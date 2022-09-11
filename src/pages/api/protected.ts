// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "../../libs/middlewares";
import { StatusCodes as HTTP_STATUS } from "http-status-codes";

function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.authorized)
    res.status(HTTP_STATUS.UNAUTHORIZED).json({ authorized: "NO!!!!!!" });
  else
    res
      .status(HTTP_STATUS.OK)
      .json({ authorized: "YES!!!!!", joke: "Why bunny is funny?" });
}

export default withAuth(handler);
