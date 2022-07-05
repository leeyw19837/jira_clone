import { catchErrors } from '../errors';
import createAccount from '../database/createGuestAccount';
import {signToken} from "../utils/authToken";

export const createGuestAccount = catchErrors(async (_req, res) => {
  const user = await createAccount();
  console.log('user = ', user)
  res.respond({
    authToken: signToken({ sub: user.id }),
  });
});
