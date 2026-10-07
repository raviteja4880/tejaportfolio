import { generatePortfolioAnswer } from "./agent";
import { checkRateLimit } from "./rate-limit";
import { validatePortfolioRequest } from "./validation";

const ALLOWED_ORIGINS = new Set([
  "https://tejaportfolio1.netlify.app"
]);

const getCorsHeaders = (request: Request) => {
  const origin = request.headers.get("origin");
  const allowedOrigin = origin && ALLOWED_ORIGINS.has(origin) ? origin : "https://tejaportfolio1.netlify.app";

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
    "Access-Control-Max-Age": "600",
    "Vary": "Origin"
  };
};

const jsonResponse = (status: number, body: Record<string, unknown>, request: Request) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...getCorsHeaders(request)
    }
  });

const getClientIp = (request: Request): string => {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    "anonymous"
  );
};

Deno.serve(async (request: Request) => {
  const origin = request.headers.get("origin");
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        ...getCorsHeaders(request),
        "Content-Length": "0"
      }
    });
  }

  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return jsonResponse(403, {
      success: false,
      error: { code: "INVALID_REQUEST", message: "Invalid request." },
      agent: "ravi-ai",
      version: "1.0"
    }, request);
  }

  if (request.method !== "POST") {
    return jsonResponse(405, {
      success: false,
      error: { code: "INVALID_REQUEST", message: "Invalid request." },
      agent: "ravi-ai",
      version: "1.0"
    }, request);
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return jsonResponse(400, {
      success: false,
      error: { code: "INVALID_REQUEST", message: "Invalid request." },
      agent: "ravi-ai",
      version: "1.0"
    }, request);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse(400, {
      success: false,
      error: { code: "INVALID_REQUEST", message: "Invalid request." },
      agent: "ravi-ai",
      version: "1.0"
    }, request);
  }

  const validation = validatePortfolioRequest(body);
  if (!validation.valid) {
    return jsonResponse(400, {
      success: false,
      error: validation.error ?? { code: "INVALID_REQUEST", message: "Invalid request." },
      agent: "ravi-ai",
      version: "1.0"
    }, request);
  }

  const clientIp = getClientIp(request);
  if (!checkRateLimit(clientIp)) {
    return jsonResponse(429, {
      success: false,
      error: {
        code: "RATE_LIMITED",
        message: "Too many requests. Please try again in a moment."
      },
      agent: "ravi-ai",
      version: "1.0"
    }, request);
  }

  try {
    const result = await generatePortfolioAnswer(validation.message ?? "");

    return jsonResponse(200, {
      success: true,
      answer: result.answer,
      sources: result.sources,
      agent: "ravi-ai",
      version: "1.0"
    }, request);
  } catch {
    return jsonResponse(503, {
      success: false,
      error: {
        code: "SERVICE_UNAVAILABLE",
        message: "I’m unable to answer right now. Please try again shortly."
      },
      agent: "ravi-ai",
      version: "1.0"
    }, request);
  }
});
