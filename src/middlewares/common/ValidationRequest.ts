import CatchAsync from "@/Utils/CatchAsync";
import { ZodObject } from "zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ValidateRequest = (Schema: ZodObject<any>) => {
  return CatchAsync(async (req, res, next) => {
    await Schema.parseAsync({
      body: req.body,
    });
    next();
  });
};

export default ValidateRequest;
