import { Link } from 'gatsby';
import React, { useEffect, useState } from 'react';

import { browserLang, Lang, LANG_NAME, t } from '@/src/i18n';

export type Alternate = { lang: Lang; slug: string; title: string };

type LangSwitchProps = {
  current: Lang;
  alternates: Alternate[];
};

const DISMISS_KEY = 'lang-notice-dismissed';

const boxStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '8px 14px',
  margin: '0 0 24px',
  padding: '10px 14px',
  border: '1px solid rgba(128,128,128,0.35)',
  borderRadius: 8,
  fontSize: 14,
};

/**
 * Language links for the other versions of a post, plus a one-time dismissible hint when the browser language
 * matches a translation. It never redirects on its own.
 */
const LangSwitch: React.FC<LangSwitchProps> = ({ current, alternates }) => {
  const [hint, setHint] = useState<Alternate | undefined>();

  useEffect(() => {
    try {
      if (window.localStorage.getItem(DISMISS_KEY)) return;
    } catch {
      return;
    }
    const wanted = browserLang(window.navigator.language);
    if (!wanted || wanted === current) return;
    setHint(alternates.find((a) => a.lang === wanted));
  }, [current, alternates]);

  const dismiss = () => {
    try {
      window.localStorage.setItem(DISMISS_KEY, '1');
    } catch {
      /* ignore */
    }
    setHint(undefined);
  };

  if (alternates.length < 2) return null;

  return (
    <>
      {hint && (
        <div role='note' style={{ ...boxStyle, justifyContent: 'space-between' }}>
          <span>
            <Link to={hint.slug} hrefLang={hint.lang} lang={hint.lang} onClick={dismiss}>
              {t(hint.lang).noticeAvailable(LANG_NAME[hint.lang])}
            </Link>
          </span>
          <button type='button' onClick={dismiss} style={{ cursor: 'pointer' }}>
            {t(current).noticeDismiss}
          </button>
        </div>
      )}
      <nav aria-label={t(current).languages} style={boxStyle}>
        <span style={{ opacity: 0.7 }}>{t(current).readIn}:</span>
        {alternates.map((a) =>
          a.lang === current ? (
            <strong key={a.lang} lang={a.lang} aria-current='page'>
              {LANG_NAME[a.lang]}
            </strong>
          ) : (
            <Link key={a.lang} to={a.slug} hrefLang={a.lang} lang={a.lang}>
              {LANG_NAME[a.lang]}
            </Link>
          ),
        )}
      </nav>
    </>
  );
};

export default LangSwitch;
