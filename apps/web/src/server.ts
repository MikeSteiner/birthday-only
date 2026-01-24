import { AngularAppEngine, createRequestHandler } from '@angular/ssr'
import { getContext } from '@netlify/angular-runtime/context.mjs'

const angularAppEngine = new AngularAppEngine()

export async function netlifyAppEngineHandler(
  request: Request
): Promise<Response> {
  const context = getContext()
  const response = await angularAppEngine.handle(request, context)
  return response ?? new Response('Not found', { status: 404 })
}

/**
 * Used by Angular CLI and Netlify
 */
export const reqHandler = createRequestHandler(netlifyAppEngineHandler)
