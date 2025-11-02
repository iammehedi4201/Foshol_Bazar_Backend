import mongoose from "mongoose";

export const performDBTransaction = async <T>(
  fn: (session: mongoose.ClientSession) => Promise<T>,
): Promise<T> => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const result = await fn(session);

    await session.commitTransaction();
    session.endSession();

    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
