import crypto from 'crypto';

type SignBody = {
  paramsToSign?: Record<string, string | number | undefined>;
};

export async function POST(request: Request) {
  try {
    const cloudinaryUrl = process.env.CLOUDINARY_URL;
    if (!cloudinaryUrl) {
      return new Response(
        JSON.stringify({ error: 'Missing CLOUDINARY_URL in environment' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const parsed = new URL(cloudinaryUrl);
    const cloudName = parsed.host;
    const apiKey = decodeURIComponent(parsed.username);
    const apiSecret = decodeURIComponent(parsed.password);
    if (!cloudName || !apiKey || !apiSecret) {
      return new Response(
        JSON.stringify({ error: 'Invalid CLOUDINARY_URL format' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = (await request.json()) as SignBody;
    const params = body?.paramsToSign || {};

    // Ensure timestamp exists
    if (!params.timestamp) {
      params.timestamp = Math.floor(Date.now() / 1000);
    }

    // Build string to sign (alphabetical by key, exclude null/undefined and signature)
    const toSign = Object.keys(params)
      .filter((k) => params[k] !== undefined && params[k] !== null && k !== 'signature')
      .sort()
      .map((k) => `${k}=${params[k]}`)
      .join('&');

    const signature = crypto
      .createHash('sha1')
      .update(toSign + apiSecret)
      .digest('hex');

    return new Response(
      JSON.stringify({
        signature,
        timestamp: params.timestamp,
        apiKey,
        cloudName,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: 'Signature generation failed', details: err?.message || String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
