import { useRef, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactPlayer from 'react-player/youtube';
import { paraData } from '../../paraData.js';
import { surahData } from '../../surahData.js';
import { QuranRosette } from './QuranRosette';
import '../App.css';



const SurahShowcase = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const playerWrapperRef = useRef(null);

  // Check if this is a Surah or a Para
  const isSurah = id?.startsWith('surah-');
  const numericId = isSurah ? parseInt(id.replace('surah-', ''), 10) : parseInt(id, 10);
  const dataMap = isSurah ? surahData : paraData;
  const currentItem = dataMap[numericId];
  const maxItems = isSurah ? 114 : 30;

  // Checkbox completion state for this item
  const storageKey = isSurah ? `surah-${numericId}` : String(numericId);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Read checkbox state
    try {
      const stored = JSON.parse(localStorage.getItem('checkboxes')) || {};
      setIsCompleted(!!stored[storageKey]);
    } catch {
      // safe fallback
    }

    // Save as last played para if this is a Para
    if (!isSurah && numericId >= 1 && numericId <= 30) {
      try {
        localStorage.setItem('lastPlayedPara', String(numericId));
      } catch {
        // safe fallback
      }
    }
  }, [storageKey, isSurah, numericId]);

  // Fullscreen orientation handling
  useEffect(() => {
    const handleFullscreenChange = async () => {
      const currentFullscreenElement = document.fullscreenElement;
      const isPlayerFullscreen =
        currentFullscreenElement &&
        playerWrapperRef.current &&
        (currentFullscreenElement === playerWrapperRef.current ||
          playerWrapperRef.current.contains(currentFullscreenElement));

      if (isPlayerFullscreen) {
        playerWrapperRef.current?.classList.add('landscape-mode');
        if (screen.orientation && screen.orientation.lock) {
          try {
            await screen.orientation.lock('landscape');
          } catch (error) {
            console.warn('Orientation lock not supported:', error);
          }
        }
      } else {
        playerWrapperRef.current?.classList.remove('landscape-mode');
        if (screen.orientation && screen.orientation.unlock) {
          screen.orientation.unlock();
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Toggle completion
  const handleToggleCompleted = () => {
    const nextState = !isCompleted;
    setIsCompleted(nextState);
    try {
      const stored = JSON.parse(localStorage.getItem('checkboxes')) || {};
      stored[storageKey] = nextState;
      localStorage.setItem('checkboxes', JSON.stringify(stored));
    } catch {
      // safe fallback
    }
  };

  // Previous and Next item navigation
  const prevId = numericId > 1 ? numericId - 1 : null;
  const nextId = numericId < maxItems ? numericId + 1 : null;

  const navigateTo = (targetNum) => {
    const path = isSurah ? `/Surahs/surah-${targetNum}` : `/Surahs/${targetNum}`;
    navigate(path);
  };

  return (
    <div className="islamic-bg-pattern app-viewport">
      {/* TOP STICKY BAR */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 30,
          backgroundColor: 'rgba(45, 5, 12, 0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(223, 183, 108, 0.3)',
          padding: '0.6rem 1rem',
          display: 'grid',
          gridTemplateColumns: 'minmax(78px, auto) 1fr minmax(78px, auto)',
          alignItems: 'center',
          maxWidth: '900px',
          width: '100%',
          margin: '0 auto',
          boxSizing: 'border-box',
        }}
      >
        {/* Back Button (44px min tap) */}
        <Link
          to="/Surahs"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '44px',
            minHeight: '44px',
            padding: '0 12px',
            borderRadius: '10px',
            background: 'rgba(223, 183, 108, 0.15)',
            border: '1px solid rgba(223, 183, 108, 0.35)',
            color: '#f5dc93',
            fontSize: '0.95rem',
            fontFamily: "'Noto Nastaliq Urdu', serif",
            lineHeight: 1.2,
            gap: '6px',
            textDecoration: 'none',
            justifySelf: 'start',
          }}
          aria-label="فہرست پر واپس جائیں"
        >
          <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>←</span>
          <span style={{ lineHeight: 1 }}>فہرست</span>
        </Link>

        {/* Center Title: Perfectly centered, unclipped calligraphy */}
        <div style={{ textAlign: 'center', padding: '0 8px', justifySelf: 'center' }}>
          <div
            style={{
              fontFamily: "'Amiri', serif",
              fontSize: '1.3rem',
              fontWeight: 700,
              color: '#dfb76c',
              lineHeight: 1.35,
              paddingTop: '2px',
            }}
          >
            {currentItem ? currentItem.name : 'القرآن الکریم'}
          </div>
          <div
            style={{
              fontSize: '0.78rem',
              color: '#e2cfab',
              fontFamily: "'Noto Nastaliq Urdu', serif",
              lineHeight: 1.35,
            }}
          >
            {isSurah ? `سورت ${numericId}` : `پارہ نمبر ${numericId}`}
          </div>
        </div>

        {/* Home shortcut */}
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '44px',
            minHeight: '44px',
            padding: '0 12px',
            borderRadius: '10px',
            background: 'rgba(223, 183, 108, 0.15)',
            border: '1px solid rgba(223, 183, 108, 0.35)',
            color: '#f5dc93',
            fontSize: '1.2rem',
            lineHeight: 1,
            textDecoration: 'none',
            justifySelf: 'end',
          }}
          title="ہوم اسکرین"
        >
          ⌂
        </Link>
      </header>

      {/* MAIN CONTENT AREA */}
      <main
        className="main-content"
        style={{
          padding: '1rem',
          maxWidth: '840px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {currentItem ? (
          <>
            {/* HOLY DETAILS CARD */}
            <div
              style={{
                width: '100%',
                background: 'linear-gradient(180deg, rgba(74, 9, 20, 0.85) 0%, rgba(45, 5, 12, 0.95) 100%)',
                border: '1px solid rgba(223, 183, 108, 0.35)',
                borderRadius: '18px',
                padding: '1rem 1.25rem',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              }}
            >
              {/* Right: Pure Vector SVG Rosette */}
              <QuranRosette
                number={numericId < 10 ? `0${numericId}` : numericId}
                size={54}
              />

              {/* Center: Title */}
              <div style={{ textAlign: 'right', flex: 1, padding: '0 1rem' }}>
                <h2
                  style={{
                    margin: 0,
                    fontFamily: "'Amiri', 'Noto Nastaliq Urdu', serif",
                    fontSize: '1.9rem',
                    color: '#ffffff',
                    fontWeight: 700,
                    lineHeight: 1.5,
                    padding: '4px 0',
                    display: 'inline-block',
                  }}
                >
                  {currentItem.name}
                </h2>
              </div>

              {/* Left: Completed toggle status */}
              <button
                type="button"
                onClick={handleToggleCompleted}
                style={{
                  minHeight: '44px',
                  padding: '6px 14px',
                  borderRadius: '12px',
                  background: isCompleted ? 'rgba(223, 183, 108, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                  border: isCompleted ? '1.5px solid #dfb76c' : '1px solid rgba(223, 183, 108, 0.3)',
                  color: isCompleted ? '#f5dc93' : '#e0cfb8',
                  fontSize: '0.9rem',
                  fontFamily: "'Noto Nastaliq Urdu', serif",
                  lineHeight: 1.2,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <span>{isCompleted ? '✓ مکمل شدہ' : 'نشان لگائیں'}</span>
              </button>
            </div>

            {/* VIDEO PLAYER CONTAINER (100% width on mobile, 16:9 ratio) */}
            <div
              ref={playerWrapperRef}
              className="video-responsive-container"
              style={{
                width: '100%',
                marginBottom: '1.25rem',
              }}
            >
              <ReactPlayer
                url={currentItem.link}
                controls
                width="100%"
                height="100%"
                config={{
                  youtube: {
                    playerVars: {
                      playsinline: 1,
                      rel: 0,
                      modestbranding: 1,
                    },
                  },
                }}
              />
            </div>

            {/* QUICK PREVIOUS / NEXT CONTROLS (Greatly eases mobile navigation for seniors) */}
            <div
              style={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginBottom: '1rem',
              }}
            >
              {/* Previous Para Button */}
              <button
                type="button"
                disabled={!prevId}
                onClick={() => prevId && navigateTo(prevId)}
                style={{
                  minHeight: '52px',
                  borderRadius: '14px',
                  background: prevId ? 'rgba(74, 9, 20, 0.9)' : 'rgba(255, 255, 255, 0.05)',
                  border: prevId ? '1.5px solid rgba(223, 183, 108, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
                  color: prevId ? '#f5dc93' : 'rgba(255, 255, 255, 0.3)',
                  fontSize: '1.05rem',
                  fontFamily: "'Amiri', 'Noto Nastaliq Urdu', serif",
                  cursor: prevId ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>→</span>
                <span>{isSurah ? 'پچھلی سورت' : 'پچھلا پارہ'}</span>
              </button>

              {/* Next Para Button */}
              <button
                type="button"
                disabled={!nextId}
                onClick={() => nextId && navigateTo(nextId)}
                style={{
                  minHeight: '52px',
                  borderRadius: '14px',
                  background: nextId
                    ? 'linear-gradient(180deg, #dfb76c 0%, #b88828 100%)'
                    : 'rgba(255, 255, 255, 0.05)',
                  border: nextId ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                  color: nextId ? '#2a040b' : 'rgba(255, 255, 255, 0.3)',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  fontFamily: "'Amiri', 'Noto Nastaliq Urdu', serif",
                  cursor: nextId ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <span>{isSurah ? 'اگلی سورت' : 'اگلا پارہ'}</span>
                <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>←</span>
              </button>
            </div>

            {/* HELPFUL ADVICE / INSTRUCTIONS CARD FOR ELDERLY */}
            <div
              style={{
                width: '100%',
                background: 'rgba(31, 3, 8, 0.65)',
                border: '1px solid rgba(223, 183, 108, 0.2)',
                borderRadius: '14px',
                padding: '0.9rem 1.1rem',
                color: '#d6c19c',
                fontSize: '0.88rem',
                fontFamily: "'Noto Nastaliq Urdu', serif",
                lineHeight: 1.95,
                textAlign: 'center',
              }}
            >
              <div>💡 <strong>رہنمائی:</strong> ویڈیو کو فل سکرین کرنے کے لیے ویڈیو پلیر کے نچلے دائیں کونے والے آئیکون پر ٹیپ کریں۔ تلاوت سننے کے بعد اوپر دیے گئے بٹن سے <strong>&quot;مکمل شدہ&quot;</strong> نشان زد کریں۔</div>
            </div>
          </>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '4rem 1rem',
              color: '#ffffff',
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚠️</div>
            <h2 style={{ fontFamily: "'Amiri', serif", color: '#dfb76c' }}>
              پارہ یا سورت نہیں ملی
            </h2>
            <Link
              to="/Surahs"
              style={{
                display: 'inline-block',
                marginTop: '1rem',
                padding: '10px 20px',
                background: '#dfb76c',
                color: '#2a040b',
                borderRadius: '10px',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              فہرست پر واپس جائیں
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default SurahShowcase;