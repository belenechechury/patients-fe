const BASE_URL = `${import.meta.env.VITE_BASE_URL}`;

/**
 * Convert a backend document path to a full URL for frontend usage.
 * @param path - The path returned from backend, e.g., "documents/uuid.jpg"
 * @returns Full URL to access the file
 */
export function getDocumentUrl(path?: string): string {
  if (!path) return ''; // Return empty string if path is undefined
  return `${BASE_URL}/storage/${path}`;
}
