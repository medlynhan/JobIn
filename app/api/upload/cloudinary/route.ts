import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const cloudinaryUrl = process.env.CLOUDINARY_URL;
    if (!cloudinaryUrl) {
      return new Response(
        JSON.stringify({ error: 'Missing CLOUDINARY_URL in environment' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const form = await request.formData();
    const file = form.get('file') as File | null;
    if (!file) {
      return new Response(
        JSON.stringify({ error: 'No file provided' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
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

    const timestamp = Math.floor(Date.now() / 1000);
    const folder = process.env.CLOUDINARY_FOLDER || 'JobIn/uploads';

    // Build signature string with all params you send (alphabetically sorted)
    const paramsToSign: Record<string, string> = { timestamp: String(timestamp) };
    if (folder) paramsToSign.folder = folder;
    const toSign = Object.keys(paramsToSign)
      .sort()
      .map((k) => `${k}=${paramsToSign[k]}`)
      .join('&');
    const signature = crypto.createHash('sha1').update(toSign + apiSecret).digest('hex');

    const cloudinaryEndpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const uploadForm = new FormData();
    uploadForm.append('file', file);
    uploadForm.append('api_key', apiKey);
    uploadForm.append('timestamp', String(timestamp));
    uploadForm.append('signature', signature);
    if (folder) uploadForm.append('folder', folder);

    const res = await fetch(cloudinaryEndpoint, { method: 'POST', body: uploadForm });
    const json = await res.json();
    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: 'Cloudinary upload failed', details: json }),
        { status: res.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ url: json.secure_url || json.url }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: 'Unexpected server error', details: err?.message || String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
