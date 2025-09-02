import { FastifyReply } from "fastify";

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface SuccessOptions<T = any> {
  reply: FastifyReply;
  data?: T;
  message?: string;
  statusCode?: number;
  pagination?: PaginationInfo;
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
  pagination,
}: SuccessOptions<T>) => {
  const response: any = {
    status: "success",
    message,
    data: data ?? null,
  };

  if (pagination) {
    response.pagination = {
      currentPage: pagination.currentPage,
      totalPages: pagination.totalPages,
      totalItems: pagination.totalItems,
      itemsPerPage: pagination.itemsPerPage,
      hasNextPage: pagination.hasNextPage,
      hasPreviousPage: pagination.hasPreviousPage,
    };
  }

  return reply.status(statusCode).send(response);
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
