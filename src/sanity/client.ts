import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

export async function sanityFetch<T>(query: string, params: Record<string, string | number | boolean> = {}) {
  return client.fetch<T>(query, params, { cache: "no-store" });
}
