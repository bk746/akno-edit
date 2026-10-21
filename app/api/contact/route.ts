import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const endpoint = process.env.FORM_ENDPOINT;
  if (!endpoint) {
    return NextResponse.json(
      { ok: false, error: "FORM_ENDPOINT not configured" },
      { status: 503 },
    );
  }

  const formData = await request.formData();
  if (formData.get("_gotcha")) {
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      return NextResponse.json({ ok: false }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
