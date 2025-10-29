import CatchAsync from "@/Utils/CatchAsync";
import { ZodObject } from "zod";

const ValidateRequest = (Schema: ZodObject<any>) => {
  return CatchAsync(async (req, res, next) => {
    await Schema.parseAsync({
      body: req.body,
    });
    next();
  });
};

export default ValidateRequest;
