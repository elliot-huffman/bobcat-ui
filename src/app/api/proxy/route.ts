import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const targetUrl = body.targetUrl;

    if (!targetUrl) {
      return NextResponse.json(
        {
          success: false,
          error: "Target URL is required",
        },
        { status: 400 }
      );
    }

    const start = Date.now();

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(targetUrl, {
      method: body.method || "GET",
      signal: controller.signal,
    });
    clearTimeout(timeout);

    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    const headers = Object.fromEntries(response.headers.entries());

    const duration = Date.now() - start;

    return NextResponse.json({
      success: true,
      status: response.status,
      duration,
      headers,
      data,
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Proxy request failed";

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}