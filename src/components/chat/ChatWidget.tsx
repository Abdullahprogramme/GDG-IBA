import { useEffect, useRef, useState, type ComponentProps, type KeyboardEvent, type ReactNode, type WheelEvent } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import "./chat.css";

type Message = { role: "user" | "assistant"; content: string };
type FormSubmitEvent = Parameters<NonNullable<ComponentProps<"form">["onSubmit"]>>[0];
const starters = ["What does the community do?", "How can I join?", "Where can I find events?"];

function renderInlineMarkdown(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\*[^*\n]+\*|`[^`]+`)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*")) return <em key={index}>{part.slice(1, -1)}</em>;
    if (part.startsWith("`") && part.endsWith("`")) return <code key={index}>{part.slice(1, -1)}</code>;
    return <span key={index}>{part}</span>;
  });
}

function renderMessage(content: string): ReactNode {
  const nodes: ReactNode[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];
  const flushParagraph = () => {
    if (paragraph.length) {
      nodes.push(<p key={`paragraph-${nodes.length}`}>{paragraph.map((line, index) => <span key={index}>{index > 0 && <br />}{renderInlineMarkdown(line)}</span>)}</p>);
      paragraph = [];
    }
  };
  const flushList = () => {
    if (list.length) {
      nodes.push(<ul key={`list-${nodes.length}`}>{list.map((line, index) => <li key={index}>{renderInlineMarkdown(line)}</li>)}</ul>);
      list = [];
    }
  };

  for (const rawLine of content.trim().split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      flushList();
    } else if (/^[-*]\s+/.test(line)) {
      flushParagraph();
      list.push(line.replace(/^[-*]\s+/, ""));
    } else {
      flushList();
      paragraph.push(line);
    }
  }
  flushParagraph();
  flushList();
  return nodes;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const transcript = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);

  useEffect(() => {
    if (transcript.current) transcript.current.scrollTop = transcript.current.scrollHeight;
  }, [messages, busy]);

  useEffect(() => {
    function onKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape" && open) setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  async function sendMessage(value: string) {
    const content = value.trim();
    if (!content || busy) return;
    const next: Message[] = [...messages, { role: "user" as const, content }].slice(-6);
    setMessages(next);
    setDraft("");
    setError("");
    setBusy(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const contentType = response.headers.get("content-type") ?? "";
      const result = contentType.includes("application/json")
        ? await response.json() as { answer?: unknown; error?: unknown }
        : null;
      if (!response.ok || typeof result?.answer !== "string") {
        throw new Error(typeof result?.error === "string" ? result.error : "Chat is unavailable locally. Run it with Vercel dev or use the deployed site.");
      }
      setMessages(current => [...current, { role: "assistant" as const, content: result.answer as string }].slice(-8));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "I couldn’t send that. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  function submit(event: FormSubmitEvent) {
    event.preventDefault();
    void sendMessage(draft);
  }

  function onInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage(draft);
    }
  }

  function onTranscriptWheel(event: WheelEvent<HTMLDivElement>) {
    const element = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (element.scrollHeight > element.clientHeight) element.scrollTop += event.deltaY;
  }

  return (
    <div className="chapter-chat" data-open={open}>
      {open && (
        <section id="chapter-chat-panel" className="chapter-chat__panel" role="dialog" aria-modal="false" aria-labelledby="chapter-chat-title">
          <header className="chapter-chat__header">
            <span className="chapter-chat__mark" aria-hidden="true"><MessageCircle size={19} strokeWidth={2.3} /></span>
            <div className="chapter-chat__heading">
              <h2 id="chapter-chat-title">Ask GDG on Campus IBA</h2>
              <p>Chapter guide</p>
            </div>
            <button className="chapter-chat__close" type="button" aria-label="Close chapter guide" onClick={() => setOpen(false)}><X size={20} /></button>
          </header>

          <div className="chapter-chat__transcript" ref={transcript} onWheel={onTranscriptWheel} aria-live="polite" aria-label="Conversation">
            {messages.length === 0 && (
              <div className="chapter-chat__welcome">
                <span className="chapter-chat__eyebrow">LEARN · BUILD · BELONG</span>
                <p>Hi! I can help you explore the chapter, its events, and how to get involved.</p>
                <span className="chapter-chat__source-note">I answer from the information published on this site.</span>
                <div className="chapter-chat__starters" aria-label="Suggested questions">
                  {starters.map(question => <button type="button" key={question} onClick={() => void sendMessage(question)}>{question}</button>)}
                </div>
              </div>
            )}
            {messages.map((message, index) => (
              <div className={`chapter-chat__message chapter-chat__message--${message.role}`} key={`${index}-${message.role}`}>
                {message.role === "assistant" ? renderMessage(message.content) : <p>{message.content}</p>}
              </div>
            ))}
            {busy && <div className="chapter-chat__message chapter-chat__message--assistant chapter-chat__typing" role="status">Looking through the chapter info…</div>}
            {error && <p className="chapter-chat__error" role="alert">{error}</p>}
          </div>

          <form className="chapter-chat__form" onSubmit={submit}>
            <label className="sr-only" htmlFor="chapter-chat-input">Ask a question about GDG on Campus IBA</label>
            <input ref={input} id="chapter-chat-input" value={draft} maxLength={800} onChange={event => setDraft(event.target.value)} onKeyDown={onInputKeyDown} placeholder="Ask about the chapter…" autoComplete="off" disabled={busy} />
            <button type="submit" aria-label="Send message" disabled={busy || !draft.trim()}><Send size={18} /></button>
          </form>
          <div className="chapter-chat__footer"><a href="/contact">Still have questions? Contact us</a><span>AI answers can be imperfect.</span></div>
        </section>
      )}

      <button className="chapter-chat__launcher" type="button" aria-expanded={open} aria-controls="chapter-chat-panel" onClick={() => setOpen(value => !value)}>
        <span className="chapter-chat__launcher-icon"><MessageCircle size={21} strokeWidth={2.2} /></span>
        <span>{open ? "Close" : "Ask GDG"}</span>
      </button>
    </div>
  );
}
