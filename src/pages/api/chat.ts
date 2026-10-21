import type { APIRoute } from "astro";
import { handleChat } from "../../../api/chat";

export const prerender = false;

/** Shares the chapter-chat handler with local Astro development and Vercel. */
export const POST: APIRoute = ({ request }) =>
  handleChat(request, {
    apiKey: import.meta.env.GEMINI_API_KEY ?? process.env.GEMINI_API_KEY,
    model: import.meta.env.GEMINI_CHAT_MODEL ?? process.env.GEMINI_CHAT_MODEL,
  });
