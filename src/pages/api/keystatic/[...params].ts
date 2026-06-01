export const prerender = false;

export async function ALL({ request }: { request: Request }) {
  try {
    const { makeGenericAPIRouteHandler } = await import('@keystatic/core/api/generic');
    const { default: keystaticConfig } = await import('../../../../keystatic.config.ts');
    const handler = makeGenericAPIRouteHandler({ config: keystaticConfig });
    const { body, headers, status } = await handler(request);
    return new Response(body as BodyInit, { status, headers: headers as HeadersInit });
  } catch (err) {
    console.error('[keystatic-api]', err);
    return new Response(String(err), { status: 500 });
  }
}
