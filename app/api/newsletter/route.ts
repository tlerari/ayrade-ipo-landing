import { NextResponse } from 'next/server';

/**
 * Newsletter subscription endpoint stub.
 *
 * Production: wire to AYRADE's emailing provider (Mailchimp / Sendinblue /
 * custom backend). For now returns success for any valid email so the UI
 * flow can be demoed.
 */
export async function POST(req: Request) {
  try {
    const { email } = (await req.json()) as { email?: string };
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'invalid-email' }, { status: 400 });
    }

    const endpoint = process.env.NEWSLETTER_API_URL;
    const token = process.env.NEWSLETTER_API_TOKEN;

    if (!endpoint) {
      console.warn('[newsletter] NEWSLETTER_API_URL not set — no backend call made.');
      return NextResponse.json({ ok: true, stub: true });
    }

    const upstream = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ email, source: 'ipo.ayrade.com', subscribedAt: new Date().toISOString() }),
    });

    if (!upstream.ok) {
      return NextResponse.json({ error: 'upstream-error' }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'bad-request' }, { status: 400 });
  }
}
