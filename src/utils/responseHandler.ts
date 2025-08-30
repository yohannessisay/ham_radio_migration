import { FastifyReply } from "fastify";

interface SuccessOptions<T = any> {
  reply: FastifyReply;
  data?: T;
  message?: string;
  statusCode?: number;
}

interface ErrorOptions {
  reply: FastifyReply;
  error?: any;
  message?: string;
  statusCode?: number;
}

export const sendSuccess = <T = any>({
  reply,
  data,
  message = "Success",
  statusCode = 200,
}: SuccessOptions<T>) => {
  return reply.status(statusCode).send({
    status: "success",
    message,
    data: data ?? null,
  });
};

export const sendError = ({
  reply,
  error,
  message = "Something went wrong",
  statusCode = 500,
}: ErrorOptions) => {
  console.error(error); // log full error for debugging
  return reply.status(statusCode).send({
    status: "error",
    message,
    error: error?.message ?? error ?? null,
  });
};
