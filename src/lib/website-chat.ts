export type WebsiteChatSenderType = "client" | "ai" | "operator" | "system";

export interface WebsiteConversation {
  id: number;
  channel: string;
  chat_mode: string;
  supports_ai: boolean;
  client_display_name: string;
  last_message_preview?: string;
}

export interface WebsiteChatMessage {
  id: number;
  conversation_id: number;
  channel: string;
  sender_type: WebsiteChatSenderType | string;
  text: string;
  created_at: string;
}

export interface WebsiteSessionResponse {
  session_id: string;
  conversation: WebsiteConversation;
  messages: WebsiteChatMessage[];
}

export interface WebsiteSocketMessageCreatedEvent {
  type: "message.created";
  conversation_id: number;
  message: WebsiteChatMessage;
}

export interface WebsiteSocketConversationUpdatedEvent {
  type: "conversation.updated";
  conversation: WebsiteConversation;
}

export interface WebsiteSocketConversationDeletedEvent {
  type: "conversation.deleted";
  conversation_id: number;
}

export type WebsiteSocketEvent =
  | WebsiteSocketMessageCreatedEvent
  | WebsiteSocketConversationUpdatedEvent
  | WebsiteSocketConversationDeletedEvent;

export const WEBSITE_CHAT_STORAGE_KEY = "cognilabs_website_ai_session_id";

async function parseJsonSafe(response: Response) {
  try {
    return (await response.json()) as unknown;
  } catch {
    return null;
  }
}

async function assertOk<T>(response: Response, fallbackMessage: string): Promise<T> {
  if (!response.ok) {
    const data = await parseJsonSafe(response);
    const errorMessage =
      data && typeof data === "object" && "detail" in data
        ? String((data as { detail?: unknown }).detail)
        : data && typeof data === "object" && "error" in data
          ? String((data as { error?: unknown }).error)
          : `${fallbackMessage}: ${response.status}`;
    throw new Error(errorMessage);
  }

  return (await response.json()) as T;
}

export async function openWebsiteSession(sessionId?: string | null): Promise<WebsiteSessionResponse> {
  const body = sessionId ? { session_id: sessionId } : {};
  const response = await fetch(`/api/website-chat/session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return assertOk<WebsiteSessionResponse>(response, "Failed to open website AI session");
}

export async function getWebsiteMessages(sessionId: string): Promise<WebsiteSessionResponse> {
  const response = await fetch(`/api/website-chat/messages?session_id=${encodeURIComponent(sessionId)}`, {
    method: "GET",
  });
  return assertOk<WebsiteSessionResponse>(response, "Failed to fetch website AI messages");
}

export async function sendWebsiteMessage(sessionId: string, text: string): Promise<WebsiteSessionResponse> {
  const response = await fetch(`/api/website-chat/send-message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionId, text }),
  });

  return assertOk<WebsiteSessionResponse>(response, "Failed to send website AI message");
}
