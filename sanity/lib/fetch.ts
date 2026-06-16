import { client } from "./client";

/**
 * sanityFetch — small typed wrapper around client.fetch with ISR revalidation.
 * Content edited in the Studio shows up within ~60s (or instantly on redeploy).
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { revalidate: 60 },
  });
}
