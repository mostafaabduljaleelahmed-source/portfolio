export interface ProjectMedia {
  type: 'image' | 'video';
  src: string;
  alt: string;
  caption?: string;
  /** Poster frame for a video, also used as its thumbnail. */
  poster?: string;
  /** Phone captures are tall; the stage letterboxes them instead of cropping. */
  orientation?: 'landscape' | 'portrait';
}

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
  media?: ProjectMedia[];
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
  resumeUrl: '/Mostafa-Abduljaleel-CV.pdf',

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
      media: [
        {
          type: 'video',
          orientation: 'portrait',
          src: '/media/negma-fit/walkthrough.mp4',
          poster: '/media/negma-fit/poster.jpg',
          alt: 'Screen recording of the Negma Fit inventory app on an Android phone',
          caption: 'A full daily check on the phone: enter what went out and came back per product, and watch the totals build as you type.'
        },
        {
          type: 'image',
          orientation: 'portrait',
          src: '/media/negma-fit/01-new-check.jpg',
          alt: 'New check screen listing each product with its selling price and cost price',
          caption: 'Each product carries its selling and cost price, so profit falls out of the same entry the staff were making anyway.'
        },
        {
          type: 'image',
          orientation: 'portrait',
          src: '/media/negma-fit/02-check-totals.jpg',
          alt: 'Check totals showing revenue, cost, net profit and profit margin',
          caption: 'The check closes with revenue, cost, net profit and margin \u2014 the numbers the shop could not get off paper.'
        },
        {
          type: 'image',
          orientation: 'portrait',
          src: '/media/negma-fit/03-dashboard.jpg',
          alt: 'Dashboard with revenue and profit trend, quantity movement charts and product highlights',
          caption: 'Revenue, profit and quantity plotted over the selected range, with highlights like best seller surfaced on top.'
        },
        {
          type: 'image',
          orientation: 'portrait',
          src: '/media/negma-fit/04-product-performance.jpg',
          alt: 'Per-product performance table with net sold, revenue, profit, margin and last sold date',
          caption: 'Every product, including the ones that never moved \u2014 which is usually the more useful half of the list.'
        }
      ],
      results: [
        'Rebuilt release matches the original APK screen by screen — same layouts, same numbers, same behaviour on identical data.',
        'The dashboard reports on every product: best seller, highest return rate, items selling below cost, and anything that has not moved.'
      ]
    },
    {
      number: '02',
      title: 'Barber House',
      meta: 'Live queue for a barbershop \u00b7 Bilingual \u00b7 Web app',
      summary:
        'A barbershop runs on walk-ins, not appointment slots. This is the shop floor on your phone: who is in each chair, how many minutes are left, who is next, and a button to take your own place in the line.',
      problem:
        'A walk-in shop cannot sell you a 4:30 slot, so the customer\u2019s only options are to sit in the shop not knowing how long it will be, or to phone and ask. The barbers get interrupted either way.',
      goal:
        'Put the live state of the shop on a phone screen \u2014 every chair, every turn \u2014 so someone can decide from home whether to walk over now, and join the line before they leave.',
      architecture:
        'A single page with a live view of each barber station, a shared waiting list, and a staff dashboard for confirming and calling people through. The whole interface is bilingual, English and Arabic.',
      challenges: [
        'A queue is only worth looking at if it is correct right now, so every open phone has to agree with the shop floor without anyone pressing refresh.',
        'Someone who gets called while they are still walking over should not lose their turn, and someone who never shows up should not hold up the chair.'
      ],
      decisions: [
        'Built around a queue rather than a booking calendar \u2014 the shop keeps its walk-in flow instead of being forced into slots it does not use.',
        'A called customer\u2019s chair is held for two minutes: long enough to cover the walk in, short enough that the barber is not left waiting.',
        'Each service carries its own duration, so the \u201cminutes left\u201d and the estimate for everyone further down the line come out of the queue itself rather than being guessed.'
      ],
      technologies: ['TypeScript', 'Live queue state', 'Bilingual UI (EN / AR)', 'Vercel'],
      results: [
        'Shows in-the-chair, in-line and walk-in wait at a glance, with per-customer estimates down the queue.',
        'Staff dashboard for confirming walk-ins and calling the next customer.'
      ],
      media: [
        {
          type: 'image',
          src: '/media/barber-house/01-hero.jpg',
          alt: 'Barber House landing page showing the live counters for chairs, line and walk-in wait',
          caption: 'The first thing you see is the shop\u2019s current state: two in the chair, three in line, no wait for a walk-in.'
        },
        {
          type: 'image',
          src: '/media/barber-house/02-live-queue.jpg',
          alt: 'Live queue view with now-serving cards and the waiting list',
          caption: 'Each chair shows who is in it and how long is left; the waiting list shows each person\u2019s service, barber and estimate.'
        },
        {
          type: 'image',
          src: '/media/barber-house/03-services.jpg',
          alt: 'Services menu listing each cut with its duration and price in EGP',
          caption: 'Every service carries a duration, which is what the queue estimates are calculated from.'
        },
        {
          type: 'image',
          src: '/media/barber-house/04-barbers.jpg',
          alt: 'Barber profiles showing live cutting or available status',
          caption: 'Each barber shows live status, so you can ask for one by name \u2014 or take whoever is free.'
        }
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
      media: [
        {
          type: 'image',
          orientation: 'portrait',
          src: '/media/uni-tracker/02-evening-digest.jpg',
          alt: 'Telegram evening digest listing deadlines, overdue items and unanswered questions',
          caption: 'The 6pm digest: what is due this week, what passed without being marked done, and which questions nobody answered.'
        },
        {
          type: 'image',
          orientation: 'portrait',
          src: '/media/uni-tracker/01-announcements.jpg',
          alt: 'Telegram cards for an assignment and a schedule question, each with a status',
          caption: 'Each announcement arrives as a card with a status \u2014 confirmed, official, or still unanswered \u2014 and the group it came from.'
        },
        {
          type: 'image',
          orientation: 'portrait',
          src: '/media/uni-tracker/03-schedule-change.jpg',
          alt: 'Schedule change alert with reminder buttons, and WhatsApp reconnection notices',
          caption: 'A schedule change with one-tap \u201cremind me\u201d and \u201cdone\u201d buttons. Underneath, the bot reporting its own WhatsApp session dropping and recovering.'
        },
        {
          type: 'image',
          orientation: 'portrait',
          src: '/media/uni-tracker/04-weekly-digest.jpg',
          alt: 'Digest summarising discussions across four groups',
          caption: 'Seventeen messages across four groups, reduced to the three that actually needed reading.'
        }
      ],
      results: [
        'Running on free tiers only — no hosting bill and no paid API usage.',
        'Digests at 6am and 6pm, plus /summaries and /review on demand.'
      ]
    },
    {
      number: '04',
      title: 'Student Management System',
      meta: 'Live for a tutoring centre \u00b7 ASP.NET Core 8 \u00b7 SQL Server',
      summary:
        'The back office a private tutoring centre runs on: students, groups and their weekly schedule, attendance taken session by session, and tuition payments \u2014 with the owner and their assistants seeing different things.',
      problem:
        'A tutoring centre tracked attendance and tuition on paper across several groups. Nobody could say reliably who had stopped showing up, who still owed fees, or which session a student missed \u2014 and the owner did not want assistants browsing the money.',
      goal:
        'One system both the owner and the assistants work in every day, where the rules that used to live in someone\u2019s head \u2014 how many absences before a student is out, which schedule each group follows \u2014 are enforced by the system itself.',
      architecture:
        'ASP.NET Core 8 Web API in a Clean Architecture solution: Domain holds the entities and nothing else, Application the services and validation, Persistence the EF Core context and repositories, Infrastructure the hashing and Excel work, and Api the controllers and JWT middleware. EF Core 8 against SQL Server. A separate React front end consumes it.',
      architectureDiagram: [
        '[ Web client (React, Arabic RTL) ]',
        '        | HTTPS / JSON + JWT',
        '        v',
        '[ StudentManagement.Api ]  controllers, auth middleware, Swagger',
        '        v',
        '[ Application ]  services, DTOs, FluentValidation',
        '        v',
        '[ Domain ]  Student, Group, GroupDay, Session, Attendance, Payment, User',
        '        ^                              ^',
        '[ Persistence ]  EF Core 8,    [ Infrastructure ]  BCrypt,',
        '  repositories, backup           EPPlus import/export',
        '        v',
        '[ SQL Server ]',
        '',
        'push to master -> GitHub Actions -> app_offline.htm -> FTP -> live'
      ],
      challenges: [
        'A weekly timetable is not a list of dates. Recurring group days have to be turned into real dated sessions ahead of time without ever producing a duplicate when the job runs twice.',
        'Expelling a student automatically is destructive, so it needed a way back: status is a lifecycle rather than a delete, and every change is written to an activity log.',
        'Cancelling a session cannot leave attendance behind \u2014 the records for that session have to move with it.'
      ],
      decisions: [
        'The owner and their assistants use the same system, but financial data is withheld from assistants, and the owner\u2019s own destructive actions sit behind a second PIN as well as their password.',
        'The rules are enforced in the database too, not only in C#: check constraints on status values and weekday ranges, and unique indexes on (session, student) and (group, date, time), so a bug in the app cannot write a record the domain does not allow.',
        'Deployment takes the app pool down with app_offline.htm before uploading and brings it back afterwards, so a half-uploaded build is never serving requests.'
      ],
      technologies: ['ASP.NET Core 8', 'C#', 'Clean Architecture', 'EF Core 8', 'SQL Server', 'JWT + refresh tokens', 'BCrypt', 'EPPlus', 'GitHub Actions'],
      results: [
        'In production for a real tutoring centre: 507 students on the roll across 9 groups, deployed from master automatically.',
        'Absence threshold, session generation and payment history are settings and rules in the system rather than habits someone has to remember.',
        'Excel import and export, plus a JSON backup and restore the owner can run themselves.'
      ],
      media: [
        {
          type: 'image',
          src: '/media/student-system/02-dashboard.jpg',
          alt: 'Owner dashboard showing student totals, group count and the day\u2019s attendance',
          caption: 'The owner\u2019s view: 507 students across 9 groups, today\u2019s sessions and attendance, and how the roll splits by school year.'
        },
        {
          type: 'image',
          src: '/media/student-system/05-attendance.jpg',
          alt: 'Taking attendance for one session, with present and absent counters',
          caption: 'Taking a register: one tap per student, with running counts. Hitting absent enough times moves a student out of the group on its own.'
        },
        {
          type: 'image',
          src: '/media/student-system/03-groups.jpg',
          alt: 'Groups with their recurring weekly days and times',
          caption: 'Each group carries its weekly days and times. \u201cGenerate 30 days\u201d turns that pattern into real dated sessions, skipping any that already exist.'
        },
        {
          type: 'image',
          src: '/media/student-system/04-students.jpg',
          alt: 'Student roll with filters, transfer and status actions, and Excel import and export',
          caption: 'The roll: filter by group or status, move a student between groups, and import or export the whole thing as Excel.'
        },
        {
          type: 'image',
          src: '/media/student-system/01-login.jpg',
          alt: 'Sign-in screen, in Arabic',
          caption: 'Signing in: the owner needs a password and a PIN, assistants only a password. The interface is Arabic, laid out right to left.'
        }
      ],
      link: 'https://assemacademy.vercel.app'
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
  ] as ExperimentSignal[]
};
