import { ChatMessage } from '../types';

const HISTORY_KEY = 'jaleelo_ai_history';

class AIAssistantService {

  public getHistory(): ChatMessage[] {
    try {
      const raw = sessionStorage.getItem(HISTORY_KEY);
      if (raw) return JSON.parse(raw);
    } catch {
      // Fallback
    }

    return [
      {
        id: 'init-msg',
        sender: 'assistant',
        text: "Hi \u2014 ask me about Mostafa's projects, what he builds with, or how to reach him. I answer from a short fixed set of notes about him, not from a model.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  }

  public saveHistory(history: ChatMessage[]): void {
    try {
      sessionStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch {
      // Quota fallback
    }
  }

  public clearHistory(): ChatMessage[] {
    sessionStorage.removeItem(HISTORY_KEY);
    return this.getHistory();
  }

  public renderMarkdownWithCode(text: string): string {
    if (!text) return '';

    // Escape everything first: user messages are rendered through this too
    const safe = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

    // First handle code blocks ```lang code ```
    let formatted = safe.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
      const language = lang || 'code';
      const cleanCode = code; // already escaped above

      return `<div style="margin: 10px 0; background: #05070c; border: 1px solid rgba(136, 217, 255, 0.2); border-radius: 8px; overflow: hidden;">
        <div style="background: rgba(255,255,255,0.04); padding: 4px 10px; font-size: 0.7rem; font-family: DM Mono, monospace; color: var(--accent); display: flex; justify: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.06);">
          <span>${language.toUpperCase()}</span>
          <span style="color: var(--text-dim);">Code Snippet</span>
        </div>
        <pre style="margin: 0; padding: 10px 12px; font-family: 'DM Mono', monospace; font-size: 0.8rem; color: #88d9ff; overflow-x: auto; white-space: pre-wrap;"><code>${cleanCode}</code></pre>
      </div>`;
    });

    // Handle Inline Code `code`
    formatted = formatted.replace(/`([^`]+)`/g, '<code style="background: rgba(255,255,255,0.08); padding: 2px 6px; border-radius: 4px; font-family: DM Mono, monospace; color: var(--accent); font-size: 0.8rem;">$1</code>');

    // Bold **text**
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong style="color: #ffffff;">$1</strong>');

    // Italic *text*
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Newlines to <br/>
    formatted = formatted.replace(/\n/g, '<br/>');

    return formatted;
  }

  /**
   * Answers come from this fixed set, not from a model. Keep every claim here
   * true and checkable against the projects on the page.
   */
  private generateKnowledgeResponse(query: string): string {
    const q = query.toLowerCase();

    if (q.includes('available') || q.includes('hire') || q.includes('recruiter') || q.includes('job') || q.includes('internship') || q.includes('role')) {
      return `Mostafa is open to **internships and junior roles**, and to freelance project work.\n\n- **Based in**: Cairo, Egypt \u2014 open to remote\n- **Studying**: Information Technology at Cairo University (FCAI)\n- **Works on**: web and mobile apps, .NET backends, and automation\n- **Contact**: mostafaabduljaleelahmed@gmail.com | WhatsApp +20 101 131 9867`;
    }

    if (q.includes('stack') || q.includes('dotnet') || q.includes('c#') || q.includes('backend') || q.includes('skills') || q.includes('tech')) {
      return `What Mostafa builds with:\n\n- **Web**: React, TypeScript, Vite\n- **Mobile**: Capacitor and Flutter, shipping Android builds\n- **Backend**: .NET 8 / C# with ASP.NET Core, Supabase (PostgreSQL), SQL Server\n- **Automation**: Python, n8n, Telegram bots, LLM APIs\n- **Around it**: Git and GitHub Actions, Vercel`;
    }

    if (q.includes('negma') || q.includes('nigma') || q.includes('inventory') || q.includes('shop')) {
      return `**Negma Fit \u2014 Inventory** is a daily stock-check app for a local shop: record what went out and what came back per product, and see revenue, cost, net profit and margin, with a dashboard over any date range.\n\nReact 19 and TypeScript, packaged for Android with Capacitor 8, on Supabase.\n\nTwo things worth knowing: the original source was lost with an old laptop, so the project was rebuilt from the shipped APK and verified screen by screen \u2014 and the licence check is built so that being offline never locks the shop out of its own records.`;
    }

    if (q.includes('barber') || q.includes('queue')) {
      return `**Barber House** is a web app for a barbershop built around a live queue instead of appointments \u2014 see who is in the chair, pick a service, and take your place in line. Mobile-first and dark, because it is used on a phone inside a shop.\n\nLive at barber-house-demo.vercel.app.`;
    }

    if (q.includes('bot') || q.includes('whatsapp') || q.includes('telegram') || q.includes('tracker')) {
      return `The **University Group Tracker** reads his department's WhatsApp groups, decides which messages are real announcements, and pushes them to Telegram \u2014 with a digest at 6am and 6pm.\n\nIt runs in Termux on an Android phone, classifies messages through the Gemini API, and delivers through a Telegram bot. The whole thing stays on free tiers, which is why it lives on a phone rather than a cloud VM.`;
    }

    if (q.includes('project') || q.includes('work') || q.includes('portfolio') || q.includes('built')) {
      return `Three projects are written up on this page:\n\n1. **Negma Fit \u2014 Inventory**: a daily stock-check Android app for a shop, React + Capacitor on Supabase.\n2. **Barber House**: a live-queue web app for a barbershop, instead of appointment booking.\n3. **University Group Tracker**: a bot that filters WhatsApp group announcements through Gemini and sends them to Telegram.\n\nAsk about any of them by name for the details.`;
    }

    if (q.includes('education') || q.includes('university') || q.includes('cairo') || q.includes('degree') || q.includes('study')) {
      return `Mostafa is studying for a **BSc in Information Technology** at the **Faculty of Computers and Artificial Intelligence, Cairo University**, started 2023.\n\nHis department track is networking, and alongside it he works on web and mobile development and automation.`;
    }

    if (q.includes('contact') || q.includes('email') || q.includes('reach')) {
      return `Email: **mostafaabduljaleelahmed@gmail.com**\nWhatsApp: **+20 101 131 9867**\nGitHub and LinkedIn are linked in the header.`;
    }

    return `Mostafa Abduljaleel (Jaleelo) is an Information Technology student at Cairo University who builds web and mobile apps and automates the work around them.\n\nAsk about **his projects**, **what he builds with**, **his studies**, or **how to reach him**.`;
  }

  public streamResponse(
    query: string,
    onToken: (tokenText: string) => void,
    onComplete: (fullText: string) => void
  ): void {
    const fullResponse = this.generateKnowledgeResponse(query);
    let currentIndex = 0;
    const chunkSize = 2; // Stream 2 characters per frame tick

    const interval = setInterval(() => {
      currentIndex += chunkSize;
      const currentChunk = fullResponse.slice(0, currentIndex);
      onToken(currentChunk);

      if (currentIndex >= fullResponse.length) {
        clearInterval(interval);
        onComplete(fullResponse);
      }
    }, 18);
  }
}

export const aiAssistantService = new AIAssistantService();
