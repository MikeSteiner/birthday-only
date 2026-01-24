import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
import { getContext } from '@netlify/angular-runtime/context.mjs';

const angularAppEngine = new AngularAppEngine();

/**
 * Netlify Edge Function entry point.
 * Handles all incoming requests and renders Angular SSR responses.
 */
export async function netlifyAppEngineHandler(
  request: Request
): Promise<Response> {
  const context = getContext();

  const response = await angularAppEngine.handle(request, context);
  return response ?? new Response('Not found', { status: 404 });
}

/**
 * Request handler used by Angular CLI during dev-server and build.
 */
export const reqHandler = createRequestHandler(
  netlifyAppEngineHandler
);
