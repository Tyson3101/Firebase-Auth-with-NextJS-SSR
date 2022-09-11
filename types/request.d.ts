import { IncomingMessage } from "http";
declare module "next" {
  export interface NextApiRequest extends IncomingMessage {
    uid: string;
    user: { uid: string; email: string };
    authorized: boolean;
  }
}
