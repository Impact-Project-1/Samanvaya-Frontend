import { z } from "zod";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface RequestOptions {
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, string>;
}

class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

async function request<T>(
  method: string,
  path: string,
  schema?: z.ZodSchema<T>,
  options: RequestOptions = {}
): Promise<T> {
  const url = new URL(path, BASE_URL);
  if (options.params) {
    Object.entries(options.params).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        url.searchParams.append(key, val);
      }
    });
  }

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const config: RequestInit = {
    method,
    headers,
    cache: "no-store",
  };

  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  const response = await fetch(url.toString(), config);

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = null;
    }
    throw new ApiError(
      response.statusText || "Request failed",
      response.status,
      errorData
    );
  }

  const result = await response.json();

  if (schema) {
    // Some API envelopes might wrap the response in { data: ... }
    const dataToValidate = result && typeof result === "object" && "data" in result ? result.data : result;
    return schema.parse(dataToValidate);
  }

  return result as T;
}

export const apiClient = {
  get: <T>(path: string, schema?: z.ZodSchema<T>, params?: Record<string, string>) =>
    request<T>("GET", path, schema, { params }),
  post: <T>(path: string, body: any, schema?: z.ZodSchema<T>) =>
    request<T>("POST", path, schema, { body }),
  put: <T>(path: string, body: any, schema?: z.ZodSchema<T>) =>
    request<T>("PUT", path, schema, { body }),
  delete: <T>(path: string, schema?: z.ZodSchema<T>) =>
    request<T>("DELETE", path, schema),
};

export const publicApiClient = apiClient;
