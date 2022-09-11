import { NextApiResponse, NextApiRequest, NextApiHandler } from "next";
import { auth } from "./firebaseAdmin";
import nookies from "nookies";
import { StatusCodes as HTTP_STATUS } from "http-status-codes";

export function withAuth(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { token } = nookies.get({ req });

    let decodedToken: { uid: string };
    try {
      if (token) {
        decodedToken = await auth.verifyIdToken(token);
        req.uid = decodedToken?.uid;
        if (req.uid && req.uid.length) req.authorized = true;
        else req.authorized = false;
      } else {
        req.authorized = false;
      }
    } catch (error) {
      console.log(error.status);

      return res
        .status(error?.status || HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ error: error.errorInfo.code });
    }

    return handler(req, res);
  };
}
