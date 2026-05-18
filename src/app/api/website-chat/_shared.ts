const DEFAULT_WEBSITE_AI_BASE_URL = "https://api.project.cims.cognilabs.org";

export function getWebsiteAiBaseUrl() {
  return (process.env.WEBSITE_AI_BASE_URL || DEFAULT_WEBSITE_AI_BASE_URL).replace(/\/$/, "");
}

export function buildWebsiteAiPublicUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getWebsiteAiBaseUrl()}${normalizedPath}`;
}

export async function parseJsonSafe(response: Response) {
  try {
    return (await response.json()) as unknown;
  } catch {
    return null;
  }
}
