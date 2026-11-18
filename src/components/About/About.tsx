import React from 'react';

const PILLARS = [
  {
    n: '01',
    title: 'Ship it, then make it good',
    body:
      'The inventory app went to the shop before it had a dashboard. Watching someone use it for a week decided what got built next, better than any plan would have.'
  },
  {
    n: '02',
    title: 'Fail toward the user',
    body:
      'When the licence server cannot be reached, the app stays open. A system that locks a shop out of its own records to protect a licence has its priorities backwards.'
  },
  {
    n: '03',
    title: 'Automate what I keep redoing',
    body:
      'Reading three class group chats every evening was a chore with a shape. Most of my automation starts as something I was already doing by hand.'
  }
];

export const About: React.FC = () => (
  <section className="band band-ink approach" id="approach">
    <div className="wrap">
      <div className="approach-grid">
        <div className="approach-intro">
          <p className="eyebrow">Approach / 02</p>
          <h2>Useful beats impressive.</h2>
          <p className="lede">
            Most of what I build is small software for people who were doing the job on
            paper. That sets the bar: it has to be quicker than the paper on the first day.
          </p>
        </div>

        <ol className="pillars">
          {PILLARS.map(p => (
            <li key={p.n}>
              <span className="mono pillar-n">{p.n}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </section>
);
