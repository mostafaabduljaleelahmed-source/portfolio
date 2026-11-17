export interface ProjectCase {
  number: string;
  title: string;
  meta: string;
  summary: string;
  problem: string;
  goal: string;
  architecture: string;
  architectureDiagram?: string[];
  challenges: string[];
  decisions: string[];
  technologies: string[];
  results: string[];
  link?: string;
  code?: string;
}

export interface ExperimentSignal {
  tag: string;
  title: string;
  description: string;
}

export const SITE_CONFIG = {
  name: 'Mostafa Abduljaleel Ahmed',
  handle: 'Jaleelo',
  version: 'v3.0',
  title: 'Mostafa Abduljaleel — Web, Apps & Automation',
  description: 'Information Technology student at Cairo University. I build web and mobile apps and automate the work around them.',
  location: 'CAIRO / EGYPT',
  email: 'mostafaabduljaleelahmed@gmail.com',
  whatsapp: 'https://wa.me/201011319867',
  github: 'https://github.com/mostafaabduljaleelahmed-source',
  linkedin: 'https://www.linkedin.com/in/mostafa-abduljaleel-7980893a3/',

  stack: [
    { name: 'React & TypeScript', category: 'Web apps', tag: 'Vite' },
    { name: '.NET 8 / C#', category: 'Backend', tag: 'ASP.NET Core' },
    { name: 'Flutter & Capacitor', category: 'Mobile', tag: 'Android' },
    { name: 'Supabase & SQL Server', category: 'Data', tag: 'PostgreSQL' },
    { name: 'Python & n8n', category: 'Automation', tag: 'Bots & LLM workflows' }
  ],

  projects: [
    {
      number: '01',
      title: 'Negma Fit — Inventory',
      meta: 'Built for a local shop • React + Capacitor • Supabase',
      summary:
        'An Android app the shop runs every day: record how much of each product went out and how much came back, and get revenue, cost, net profit and margin for that check — plus a dashboard across any date range.',
      problem:
        'The shop tracked stock by hand, so nobody could answer the questions that actually matter: which products make money, which keep coming back, and what a given week earned.',
      goal:
        'A daily stock-check app the staff can use without training, a dashboard that covers every product rather than a top-five list, and a licence I can manage remotely.',
      architecture:
        'React 19 and TypeScript on Vite, packaged for Android with Capacitor 8. Supabase (PostgreSQL) holds both the inventory data and the licensing tables, with admin actions behind server-side functions. The signed APK is built in GitHub Actions.',
      architectureDiagram: [
        '[ Android app (Capacitor shell + React UI) ]',
        '       | HTTPS',
        '       v',
        '[ Supabase / PostgreSQL ]',
        '       |-- inventory: products, checks, movements',
        '       |-- licensing: activation_codes, license_status, last_seen_at',
        '       `-- admin_* functions (server-side, confirmed email required)',
        '',
        '[ GitHub Actions ] --> signed APK'
      ],
      challenges: [
        'The original source was lost with an old laptop. The project had to be rebuilt from the shipped v1.0.3 APK and verified screen by screen against the original bundle.',
        'Licensing had to work offline — a shop with a bad connection must never be locked out of its own stock records.'
      ],
      decisions: [
        'The licence lock is cached on the device and re-checked on launch, on resume, when the connection returns and every 15 minutes — but being offline, or a server error, never locks the app.',
        'Every admin action is a Supabase function that runs server-side behind an admin table and a confirmed email, so the hidden developer screen in the app cannot grant itself anything.'
      ],
      technologies: ['React 19', 'TypeScript', 'Vite', 'Capacitor 8', 'Supabase', 'PostgreSQL', 'GitHub Actions'],
      results: [
        'Rebuilt release matches the original APK screen by screen — same layouts, same numbers, same behaviour on identical data.',
        'The dashboard reports on every product: best seller, highest return rate, items selling below cost, and anything that has not moved.'
      ]
    },
    {
      number: '02',
      title: 'Barber House',
      meta: 'Live queue for a barbershop • Mobile-first web app',
      summary:
        'A web app for a barbershop built around a live queue instead of appointments: see who is in the chair, pick your service, and take your place in line.',
      problem:
        'Walk-in barbershops do not run on appointment slots. Customers either wait on the premises with no idea how long it will be, or call to ask.',
      goal:
        'Let someone check the queue from their phone, choose a service, and join the line — so the shop keeps its walk-in flow and customers stop guessing.',
      architecture:
        'Mobile-first single-page app deployed on Vercel, with a dark interface designed for phones held one-handed in a shop.',
      challenges: [
        'The queue is only useful if it reflects the shop in real time, so state has to stay in step across every open phone.'
      ],
      decisions: [
        'Modelled around a queue rather than a booking calendar, which matches how walk-in barbershops actually work.'
      ],
      technologies: ['TypeScript', 'Mobile-first UI', 'Vercel'],
      results: [
        'Deployed and reachable at barber-house-demo.vercel.app.'
      ],
      link: 'https://barber-house-demo.vercel.app'
    },
    {
      number: '03',
      title: 'University Group Tracker',
      meta: 'Personal automation • WhatsApp -> Gemini -> Telegram',
      summary:
        'A bot that reads my department’s WhatsApp groups, works out which messages are real announcements, and pushes them to me on Telegram with a digest every morning and evening.',
      problem:
        'Assignments, quizzes and registration deadlines get announced in class WhatsApp groups between hundreds of unrelated messages, and scroll out of sight within hours.',
      goal:
        'Follow a chosen set of groups, separate an actual announcement from chatter, check whether anyone replied confirming it, and deliver only that — on a channel I already watch.',
      architecture:
        'Runs in Termux on an Android phone with a linked WhatsApp session. Messages from the selected groups are classified with the Gemini API, and anything that survives the filter is delivered through a Telegram bot, which also serves on-demand commands.',
      architectureDiagram: [
        '[ WhatsApp groups ]',
        '       | linked session (Termux, Android)',
        '       v',
        '[ Message filter ] --> [ Gemini API: is this an announcement? ]',
        '       | deadlines, quizzes, registrations',
        '       v',
        '[ Telegram bot ] --> alerts + 6am / 6pm digests + /summaries, /review'
      ],
      challenges: [
        'A phone-hosted WhatsApp session drops. Keeping it linked and recovering on its own was most of the work.',
        'The whole thing had to cost nothing, which ruled out paid hosting and paid model usage.'
      ],
      decisions: [
        'Kept it on a personal Android phone that is online anyway, instead of a cloud VM that wanted a prepayment — the free tiers I looked at all came with a card.',
        'Two scheduled digests rather than live notifications, so a busy group cannot turn into a stream of alerts.'
      ],
      technologies: ['Termux / Android', 'WhatsApp session', 'Gemini API', 'Telegram Bot API'],
      results: [
        'Running on free tiers only — no hosting bill and no paid API usage.',
        'Digests at 6am and 6pm, plus /summaries and /review on demand.'
      ]
    }
  ] as ProjectCase[],

  experiments: [
    {
      tag: 'Publishing tools',
      title: 'Jaleelo Studio',
      description:
        'My own tool for publishing Reels to a Facebook Page and pushing drafts into the TikTok inbox, through the Meta and TikTok developer APIs.'
    },
    {
      tag: 'ASP.NET Core',
      title: 'Auto-graded learning platform',
      description:
        'A Web API for teaching programming: hand out exercises, run submitted code against test cases, and grade them without a human in the loop.'
    },
    {
      tag: 'Back office',
      title: 'Academy admin system',
      description:
        'An internal system for a programming and languages academy — students, groups, attendance and payments in one place instead of spreadsheets.'
    }
  ] as ExperimentSignal[],

  aiKnowledge: {
    available:
      'Mostafa is open to internships and junior roles — web and mobile development, backend (.NET), and automation work.',
    stack:
      'Core stack: React and TypeScript, .NET 8 / C# with ASP.NET Core, Flutter and Capacitor for Android, Supabase and SQL Server, and Python for automation and LLM workflows.',
    projects:
      'Featured work: Negma Fit Inventory (a daily stock-check Android app on Supabase), Barber House (a live-queue web app for a barbershop), and a University Group Tracker that filters WhatsApp group announcements through Gemini and delivers them on Telegram.',
    university:
      'Education: Information Technology at Cairo University, Faculty of Computers and Artificial Intelligence.',
    contact:
      'Email: mostafaabduljaleelahmed@gmail.com | WhatsApp: +20 101 131 9867 | LinkedIn: Mostafa Abduljaleel'
  } as Record<string, string>
};
