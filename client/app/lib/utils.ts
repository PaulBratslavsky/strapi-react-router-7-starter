import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Handles API response errors consistently across all routes
 * 
 * @param data - The API response data (any shape from Strapi SDK)
 * @param resourceName - Optional name of the resource for better error messages (e.g., "landing page", "article")
 * @throws Error when the response indicates failure (non-404 errors)
 * @returns void - Function either succeeds silently or throws
 */
export function handleApiError(
  data: any,
  resourceName?: string
): void {
  if (!data) {
    throw new Error(`Failed to load ${resourceName || "resource"}`);
  }

  // Handle 404 errors specifically 
  if (data?.error?.status === 404) {
    throw new Response("Not Found", { status: 404 });
  }

  // Handle all other API errors
  if (data?.error || !data?.data) {
    const errorMessage = data?.error?.message || `Failed to load ${resourceName || "resource"}`;
    throw new Error(errorMessage);
  }
}

/**
 * Validates and extracts data from API response, handling errors automatically
 * 
 * @param data - The API response data (any shape from Strapi SDK)
 * @param resourceName - Optional name of the resource for better error messages
 * @returns The extracted data from the response
 * @throws Error when the response indicates failure
 */
export function validateApiResponse<T>(
  data: any,
  resourceName?: string
): T {
  handleApiError(data, resourceName);
  return data!.data!;
}

// Get Strapi media URL
export function getStrapiMedia(url: string): string {
  if (!url) return '';
  if (url.startsWith("data:") || url.startsWith("http") || url.startsWith("//")) {
    return url;
  }
  const BASE_URL = import.meta.env.VITE_STRAPI_BASE_URL ?? "http://localhost:1337";
  return `${BASE_URL}${url}`;
}