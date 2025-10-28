import { PORT } from "@/config";
import {
  globalErrorHandler,
  globalNotFoundHandler,
} from "@/middlewares/common";
import type { Request, Response } from "express";
import { connectDB } from "./config/db";
import { app } from "./server";

// Connect MongoDB before starting the server
connectDB();

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ data: `Hello, world! - ${PORT}` });
});

app.use(globalNotFoundHandler);
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});

export { app };
