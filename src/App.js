import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';

const PROFILE = {
  name: 'Meghsham Jade',
  title: 'Full Stack & AI Developer',
  location: 'Pune, Maharashtra, India',
  email: 'meghshamjade.contact@gmail.com',
  phone: '+919325366493',
  phoneDisplay: '+91 93253 66493',
  portrait: {
    webp240: `${process.env.PUBLIC_URL}/images/meghsham-jade-full-stack-developer-240.webp`,
    webp480: `${process.env.PUBLIC_URL}/images/meghsham-jade-full-stack-developer-480.webp`,
    jpg240: `${process.env.PUBLIC_URL}/images/meghsham-jade-full-stack-developer-240.jpg`,
    jpg480: `${process.env.PUBLIC_URL}/images/meghsham-jade-full-stack-developer-480.jpg`,
    alt: 'Meghsham Jade — Full Stack Developer and AI Developer in Pune, professional headshot',
  },
  portfolio: 'https://meghsham15.github.io/react-portfolio/',
  github: 'https://github.com/Meghsham15',
  linkedin: 'https://www.linkedin.com/in/meghsham-jade-2a3406218/',
  skills: [
    'React.js',
    'Next.js',
    'Node.js',
    'TypeScript',
    'WebSockets',
    'AI APIs',
    'Web3 / ICP',
  ],
  keywords: [
    'Full Stack Developer',
    'React.js Developer',
    'Next.js Developer',
    'Node.js Developer',
    'AI Developer',
  ],
};

const THEMES = [
  {
    id: 'imperial',
    name: 'Imperial',
    hint: 'Royal Purple & Gold',
  },
  {
    id: 'regency',
    name: 'Regency',
    hint: 'Velvet & Rose Gold',
  },
  {
    id: 'sovereign',
    name: 'Sovereign',
    hint: 'Emerald & Brass',
  },
];

function Icon({ name }) {
  const icons = {
    mail: (
      <path d="M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5v-11Zm1.7-.2 6.3 4.4 6.3-4.4H5.7Zm12.8 1.66-6.04 4.2a1.2 1.2 0 0 1-1.32 0L5.1 7.96V17.2h13.4V7.96Z" />
    ),
    phone: (
      <path d="M7.4 3.8c.4-.4 1-.5 1.5-.3l2.3 1c.5.2.8.7.8 1.2l-.2 2.4c0 .4-.2.7-.5.9l-1.3.9a11.2 11.2 0 0 0 5.1 5.1l.9-1.3c.2-.3.5-.5.9-.5l2.4-.2c.5 0 1 .3 1.2.8l1 2.3c.2.5.1 1.1-.3 1.5l-1.5 1.5c-.4.4-1 .6-1.6.5-3.7-.5-7.2-2.5-9.9-5.2-2.7-2.7-4.7-6.2-5.2-9.9-.1-.6.1-1.2.5-1.6L7.4 3.8Z" />
    ),
    whatsapp: (
      <path d="M12 3.2A8.7 8.7 0 0 0 4.4 16.4L3.2 20.8l4.5-1.2A8.8 8.8 0 1 0 12 3.2Zm0 16a7.1 7.1 0 0 1-3.6-1l-.26-.15-2.67.7.72-2.6-.16-.27A7.2 7.2 0 1 1 12 19.2Zm4-5.3c-.22-.11-1.3-.64-1.5-.71-.2-.08-.35-.11-.5.11-.15.22-.57.71-.7.86-.13.14-.26.16-.48.05-1.3-.64-2.15-1.14-3-2.58-.23-.4.23-.37.65-1.23.07-.14.04-.26-.02-.37-.05-.11-.5-1.2-.68-1.64-.18-.43-.36-.37-.5-.38h-.42c-.15 0-.37.05-.57.26-.2.22-.75.73-.75 1.78s.77 2.07.88 2.21c.11.14 1.5 2.3 3.64 3.22 1.35.58 1.88.63 2.55.53.41-.06 1.3-.53 1.48-1.04.18-.51.18-.95.13-1.04-.06-.1-.2-.15-.42-.26Z" />
    ),
    github: (
      <path d="M12 2.2A9.8 9.8 0 0 0 2.2 12c0 4.32 2.8 8 6.69 9.29.49.1.67-.21.67-.47v-1.66c-2.72.59-3.3-1.31-3.3-1.31-.45-1.13-1.1-1.43-1.1-1.43-.9-.61.07-.6.07-.6 1 .07 1.52 1.03 1.52 1.03.88 1.52 2.32 1.08 2.88.83.09-.64.35-1.08.63-1.33-2.17-.25-4.46-1.09-4.46-4.83 0-1.07.38-1.94 1.02-2.63-.1-.25-.44-1.26.1-2.62 0 0 .83-.27 2.73 1.01a9.4 9.4 0 0 1 4.97 0c1.9-1.28 2.73-1.01 2.73-1.01.54 1.36.2 2.37.1 2.62.64.69 1.02 1.56 1.02 2.63 0 3.75-2.3 4.58-4.48 4.82.36.31.68.92.68 1.86v2.76c0 .26.18.57.68.47A9.8 9.8 0 0 0 21.8 12 9.8 9.8 0 0 0 12 2.2Z" />
    ),
    linkedin: (
      <path d="M6.5 9.2H3.7V20h2.8V9.2ZM5.1 4a1.65 1.65 0 1 0 0 3.3 1.65 1.65 0 0 0 0-3.3ZM20.3 20h-2.8v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V20H10.8V9.2h2.68v1.47h.04c.37-.7 1.28-1.44 2.64-1.44 2.82 0 3.34 1.86 3.34 4.27V20Z" />
    ),
    pin: (
      <path d="M12 2.8a6.2 6.2 0 0 0-6.2 6.2c0 4.66 5.4 11.16 5.63 11.43a.8.8 0 0 0 1.14 0C12.8 20.16 18.2 13.66 18.2 9A6.2 6.2 0 0 0 12 2.8Zm0 8.4A2.2 2.2 0 1 1 12 7a2.2 2.2 0 0 1 0 4.2Z" />
    ),
    globe: (
      <path d="M12 3.2a8.8 8.8 0 1 0 0 17.6 8.8 8.8 0 0 0 0-17.6Zm5.9 5.6h-2.5a13 13 0 0 0-1.1-3.4A7.1 7.1 0 0 1 17.9 8.8ZM12 4.9c.7.9 1.3 2.1 1.7 3.9H10.3c.4-1.8 1-3 1.7-3.9ZM6.1 14.4h2.7c.1.8.3 1.6.5 2.4A7.1 7.1 0 0 1 6.1 14.4Zm2.7-1.6H6.1A7.1 7.1 0 0 1 9.3 8.8h2.2c-.2.8-.3 1.7-.4 2.4H8.8Zm1.8 1.6h2.8c-.1.9-.3 1.7-.5 2.5h-1.8c-.2-.8-.4-1.6-.5-2.5Zm3.1-1.6h-2.8c.1-.8.2-1.6.4-2.4h2.2A7.1 7.1 0 0 1 17.9 12.8h-2.7c0-.3-.1-.6-.2-.6h-.4Zm.6 4c.2-.8.4-1.6.5-2.4h2.7a7.1 7.1 0 0 1-3.2 2.4Zm-6.3-8.6a13 13 0 0 0-1.1 3.4H6.1A7.1 7.1 0 0 1 9.3 5.4Z" />
    ),
    card: (
      <path d="M4.5 6.5A1.5 1.5 0 0 1 6 5h12a1.5 1.5 0 0 1 1.5 1.5v11A1.5 1.5 0 0 1 18 19H6a1.5 1.5 0 0 1-1.5-1.5v-11ZM6 8.2h12V7H6v1.2Zm0 2.3v7.5h12v-7.5H6Zm2 2.2h4.2v1.3H8V12.7Z" />
    ),
    share: (
      <path d="M15.4 6.8a2.6 2.6 0 1 0-1.06.1l-4.2 2.45a2.6 2.6 0 1 0 0 3.3l4.2 2.45a2.6 2.6 0 1 0 .9-1.55l-4.2-2.45a2.7 2.7 0 0 0 0-.2l4.2-2.45c.3.3.7.5 1.16.5a2.6 2.6 0 0 0 0-5.2Z" />
    ),
    arrow: (
      <path d="M7 12h8.2l-2.4-2.4 1.1-1.1 4.3 4.3-4.3 4.3-1.1-1.1 2.4-2.4H7V12Z" />
    ),
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
      {icons[name]}
    </svg>
  );
}

function buildVCard() {
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Jade;Meghsham;;;',
    'FN:Meghsham Jade',
    'TITLE:Full Stack & AI Developer',
    `TEL;TYPE=CELL:${PROFILE.phone}`,
    `EMAIL:${PROFILE.email}`,
    `URL:${PROFILE.portfolio}`,
    `URL:${PROFILE.github}`,
    `URL:${PROFILE.linkedin}`,
    'ADR;TYPE=HOME:;;Pune;Maharashtra;;India',
    'NOTE:React.js Developer · Next.js Developer · Full Stack Developer',
    'END:VCARD',
  ].join('\r\n');
}

function App() {
  const [theme, setTheme] = useState('imperial');
  const [toast, setToast] = useState('');
  const [avatarFailed, setAvatarFailed] = useState(false);
  const cardRef = useRef(null);

  const actions = useMemo(
    () => [
      { label: 'Email', href: `mailto:${PROFILE.email}`, icon: 'mail' },
      { label: 'Call', href: `tel:${PROFILE.phone}`, icon: 'phone' },
      {
        label: 'WhatsApp',
        href: `https://wa.me/${PROFILE.phone.replace('+', '')}`,
        icon: 'whatsapp',
        external: true,
      },
      { label: 'GitHub', href: PROFILE.github, icon: 'github', external: true },
      { label: 'LinkedIn', href: PROFILE.linkedin, icon: 'linkedin', external: true },
      { label: 'Portfolio', href: PROFILE.portfolio, icon: 'globe', external: true },
    ],
    []
  );

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;

    function onMove(event) {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const tiltX = (0.5 - y) * 8;
      const tiltY = (x - 0.5) * 10;
      card.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`);
      card.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`);
      card.style.setProperty('--shine-x', `${(x * 100).toFixed(1)}%`);
      card.style.setProperty('--shine-y', `${(y * 100).toFixed(1)}%`);
    }

    function onLeave() {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
      card.style.setProperty('--shine-x', '50%');
      card.style.setProperty('--shine-y', '0%');
    }

    card.addEventListener('pointermove', onMove);
    card.addEventListener('pointerleave', onLeave);
    return () => {
      card.removeEventListener('pointermove', onMove);
      card.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  function showToast(message) {
    setToast(message);
    window.setTimeout(() => setToast(''), 2200);
  }

  function downloadVCard() {
    const blob = new Blob([buildVCard()], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Meghsham_Jade.vcf';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast('Contact saved');
  }

  async function shareCard() {
    const payload = {
      title: 'Meghsham Jade — Full Stack Developer',
      text: 'Full Stack & AI Developer · React.js · Next.js · digital visiting card',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(payload);
        return;
      }
    } catch {
      /* fall through to clipboard */
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast('Link copied');
    } catch {
      showToast('Unable to share');
    }
  }

  return (
    <div className="stage" data-theme={theme}>
      <div className="atmosphere" aria-hidden="true">
        <span className="glow glow-a" />
        <span className="glow glow-b" />
        <span className="glow glow-c" />
        <span className="spark spark-1" />
        <span className="spark spark-2" />
        <span className="spark spark-3" />
        <span className="spark spark-4" />
        <span className="vignette" />
        <span className="watermark">MJ</span>
      </div>

      <header className="topbar">
        <p className="eyebrow">Private Collection</p>
        <div className="theme-switch" role="tablist" aria-label="Card collection">
          {THEMES.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={theme === item.id}
              className={theme === item.id ? 'theme-btn is-active' : 'theme-btn'}
              onClick={() => setTheme(item.id)}
            >
              <span className="theme-name">{item.name}</span>
              <span className="theme-hint">{item.hint}</span>
            </button>
          ))}
        </div>
      </header>

      <main
        ref={cardRef}
        className="card"
        aria-label="Meghsham Jade digital visiting card"
        itemScope
        itemType="https://schema.org/Person"
      >
        <div className="card-edge" aria-hidden="true" />
        <div className="card-frame" aria-hidden="true" />
        <div className="card-shine" aria-hidden="true" />
        <span className="corner corner-tl" aria-hidden="true" />
        <span className="corner corner-tr" aria-hidden="true" />
        <span className="corner corner-bl" aria-hidden="true" />
        <span className="corner corner-br" aria-hidden="true" />

        <section className="identity">
          <div className="portrait-ring">
            <span className="portrait-orbit" aria-hidden="true" />
            {avatarFailed ? (
              <div className="monogram" aria-hidden="true">
                MJ
              </div>
            ) : (
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${PROFILE.portrait.webp240} 240w, ${PROFILE.portrait.webp480} 480w`}
                  sizes="132px"
                />
                <img
                  src={PROFILE.portrait.jpg240}
                  srcSet={`${PROFILE.portrait.jpg240} 240w, ${PROFILE.portrait.jpg480} 480w`}
                  sizes="132px"
                  alt={PROFILE.portrait.alt}
                  className="portrait"
                  itemProp="image"
                  width="132"
                  height="132"
                  decoding="async"
                  fetchPriority="high"
                  onError={() => setAvatarFailed(true)}
                />
              </picture>
            )}
          </div>

          <h1 className="royal-name" itemProp="name">
            <span className="royal-name-foil">{PROFILE.name}</span>
          </h1>

          <p className="title" itemProp="jobTitle">
            {PROFILE.title}
          </p>
          <p className="motto">Code · Craft · Intelligence</p>
          <p className="location" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <Icon name="pin" />
            <span itemProp="addressLocality">Pune</span>
            <span>, </span>
            <span itemProp="addressRegion">Maharashtra</span>
            <span>, </span>
            <span itemProp="addressCountry">India</span>
          </p>

          <ul className="keyword-row" aria-label="Professional focus">
            {PROFILE.keywords.map((keyword) => (
              <li key={keyword}>{keyword}</li>
            ))}
          </ul>
        </section>

        <div className="actions">
          {actions.map((action) => (
            <a
              key={action.label}
              className="action"
              href={action.href}
              target={action.external ? '_blank' : undefined}
              rel={action.external ? 'noopener noreferrer' : undefined}
            >
              <span className="action-icon">
                <Icon name={action.icon} />
              </span>
              <span>{action.label}</span>
            </a>
          ))}
        </div>

        <div className="cta-row">
          <button type="button" className="cta" onClick={downloadVCard}>
            <Icon name="card" />
            Add to Contacts
          </button>
          <button type="button" className="cta ghost" onClick={shareCard}>
            <Icon name="share" />
            Share
          </button>
        </div>

        <section className="expertise" aria-label="Technical expertise">
          <div className="rule">
            <span className="rule-gem" aria-hidden="true" />
            <span>Expertise</span>
            <span className="rule-gem" aria-hidden="true" />
          </div>
          <ul>
            {PROFILE.skills.map((skill) => (
              <li key={skill} itemProp="knowsAbout">
                {skill}
              </li>
            ))}
          </ul>
        </section>

        <section className="about" aria-labelledby="about-heading">
          <div className="rule">
            <span className="rule-gem" aria-hidden="true" />
            <span id="about-heading">About</span>
            <span className="rule-gem" aria-hidden="true" />
          </div>
          <p itemProp="description">
            <strong>Meghsham Jade</strong> is a <strong>Full Stack Developer</strong> and{' '}
            <strong>AI Developer</strong> based in Pune. As a <strong>React.js developer</strong> and{' '}
            <strong>Next.js developer</strong>, he builds polished product experiences with Node.js,
            TypeScript, WebSockets, AI APIs, and Web3 / ICP — from landing pages to realtime systems.
          </p>
          <meta itemProp="email" content={PROFILE.email} />
          <meta itemProp="telephone" content={PROFILE.phone} />
          <link itemProp="url" href="https://meghsham15.github.io/mj-card/" />
          <link itemProp="sameAs" href={PROFILE.github} />
          <link itemProp="sameAs" href={PROFILE.linkedin} />
          <link itemProp="sameAs" href={PROFILE.portfolio} />
        </section>

        <a
          className="portfolio-btn"
          href={PROFILE.portfolio}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="globe" />
          Explore my portfolio
          <Icon name="arrow" />
        </a>

        <p className="serial">MJ · Pune · MMXXVI</p>
      </main>

      {toast ? (
        <div className="toast" role="status">
          {toast}
        </div>
      ) : null}
    </div>
  );
}

export default App;
