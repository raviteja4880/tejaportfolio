const MAX_MESSAGE_LENGTH = 2000;
const MAX_REQUEST_BYTES = 16384;

export function validatePortfolioRequest(body: unknown): {
  valid: boolean;
  message?: string;
  error?: { code: string; message: string };
} {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return {
      valid: false,
      error: { code: "INVALID_REQUEST", message: "Invalid request." }
    };
  }

  const message = (body as Record<string, unknown>).message;
  if (typeof message !== "string") {
    return {
      valid: false,
      error: { code: "INVALID_REQUEST", message: "Invalid request." }
    };
  }

  const trimmed = message.trim();
  if (trimmed.length === 0) {
    return {
      valid: false,
      error: { code: "INVALID_REQUEST", message: "Invalid request." }
    };
  }

  if (trimmed.length > MAX_MESSAGE_LENGTH) {
    return {
      valid: false,
      error: { code: "INVALID_REQUEST", message: "Invalid request." }
    };
  }

  if (JSON.stringify(body).length > MAX_REQUEST_BYTES) {
    return {
      valid: false,
      error: { code: "INVALID_REQUEST", message: "Invalid request." }
    };
  }

  return { valid: true, message: trimmed };
}
