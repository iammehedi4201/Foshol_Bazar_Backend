interface DuplicateError {
  code?: string;
  meta?: {
    target?: string[];
  };
}

const handleDuplicateError = (err: DuplicateError) => {
  const targets = err.meta?.target ?? [];

  return {
    statusCode: 400,
    status: "error",
    message: "Validation Error",
    errorDetails: targets
      .map((target) => `${target} is already taken`)
      .join(" . "),
    errorSource: targets.map((target) => ({
      path: [target],
      message: `${target} is already taken`,
    })),
  };
};

export default handleDuplicateError;
