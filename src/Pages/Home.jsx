import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { paraData } from '../../paraData';
import goldSeal from '../assets/images/islamic_gold_seal_1791997211910.jpg';
import portalArch from '../assets/images/splash_portal_islamic_1791997211558.jpg';
import '../App.css';

export const Home = () => {
  const navigate = useNavigate();
  const [lastPlayed, setLastPlayed] = useState(null);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    // Read last played para if available
    try {
      const savedLastPlayed = localStorage.getItem('lastPlayedPara');
      if (savedLastPlayed && paraData[savedLastPlayed]) {
        setLastPlayed({
          id: savedLastPlayed,
          ...paraData[savedLastPlayed],
        });
      }

      // Read completed checkboxes
      const storedValues = JSON.parse(localStorage.getItem('checkboxes')) || {};
      const count = Object.values(storedValues).filter(Boolean).length;
      setCompletedCount(count);
    } catch {
      // safe fallback
    }
  }, []);

  return (
    <div
      className="islamic-bg-pattern app-viewport"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.25rem 1rem 2rem 1rem',
        minHeight: '100vh',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle Atmospheric Entrance Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(223, 183, 108, 0.12) 0%, rgba(93, 13, 27, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* TOP REGION: Sacred Invocation and Holy Title */}
      <header
        style={{
          width: '100%',
          maxWidth: '520px',
          textAlign: 'center',
          zIndex: 1,
          marginTop: '0.75rem',
        }}
      >
        {/* Bismillah Calligraphy */}
        <div
          style={{
            fontFamily: "'Amiri', serif",
            color: '#dfb76c',
            fontSize: '1.4rem',
            letterSpacing: '1px',
            marginBottom: '0.5rem',
            textShadow: '0 2px 8px rgba(0,0,0,0.7)',
          }}
        >
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </div>

        {/* Holy Quran Grand Title */}
        <h1
          style={{
            margin: '0.2rem 0',
            fontFamily: "'Amiri', 'Noto Nastaliq Urdu', serif",
            fontSize: 'clamp(2.8rem, 8vw, 3.8rem)',
            fontWeight: 700,
            background: 'linear-gradient(180deg, #fff2c2 0%, #dfb76c 60%, #b88628 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 4px 20px rgba(0,0,0,0.8)',
            lineHeight: 1.25,
          }}
        >
          القرآن الکریم
        </h1>

        {/* Subtitle */}
        <p
          style={{
            margin: '0',
            color: '#e2cfab',
            fontSize: '1.1rem',
            fontFamily: "'Noto Nastaliq Urdu', serif",
            opacity: 0.9,
          }}
        >
          عربی مع اردو ترجمہ متن و مکمل تلاوت
        </p>

        {/* Decorative Arabesque Accent Line */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            margin: '0.75rem auto 0 auto',
            maxWidth: '260px',
          }}
        >
          <span style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(223, 183, 108, 0.6))' }} />
          <span style={{ color: '#dfb76c', fontSize: '0.9rem' }}>✦ ۞ ✦</span>
          <span style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(223, 183, 108, 0.6), transparent)' }} />
        </div>
      </header>

      {/* CENTER REGION: The Sacred Entrance Portal & Medallion */}
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '460px',
          margin: 'auto 0',
          zIndex: 1,
          position: 'relative',
        }}
      >
        {/* Entrance Portal Frame (Inspiring Arch Aesthetic) */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '340px',
            aspectRatio: '1 / 1.15',
            borderRadius: '160px 160px 32px 32px',
            background: 'linear-gradient(180deg, #500b17 0%, #29040a 100%)',
            border: '2px solid rgba(223, 183, 108, 0.45)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.8), inset 0 0 35px rgba(223, 183, 108, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem 1rem',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Arch Background Texture */}
          <img
            src={portalArch}
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.18,
              mixBlendMode: 'overlay',
              pointerEvents: 'none',
            }}
          />

          {/* Mihrab Arch Header Verse */}
          <div
            style={{
              position: 'relative',
              textAlign: 'center',
              color: '#f5dc93',
              fontSize: '0.95rem',
              fontFamily: "'Amiri', serif",
              marginBottom: '1rem',
              textShadow: '0 2px 6px rgba(0,0,0,0.9)',
              padding: '0 12px',
            }}
          >
            وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا
            <div style={{ fontSize: '0.78rem', opacity: 0.85, marginTop: '2px', fontFamily: "'Noto Nastaliq Urdu', serif" }}>
              (اور قرآن کو خوب ٹھہر ٹھہر کر پڑھا کرو)
            </div>
          </div>

          {/* MAIN ENTRANCE PORTAL BUTTON: "تلاوتِ کلام" */}
          <Link
            to="/Surahs"
            className="animate-gold-pulse"
            style={{
              position: 'relative',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              background: 'radial-gradient(circle at 45% 35%, #7e1224 0%, #460912 60%, #200307 100%)',
              border: '3px solid #dfb76c',
              boxShadow: '0 10px 30px rgba(0,0,0,0.7), inset 0 0 20px rgba(223, 183, 108, 0.35)',
              cursor: 'pointer',
              transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            aria-label="قرآن مجید کی تلاوت میں داخل ہوں"
          >
            {/* Medallion Texture Overlay */}
            <img
              src={goldSeal}
              alt=""
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                objectFit: 'cover',
                opacity: 0.4,
                mixBlendMode: 'screen',
                pointerEvents: 'none',
              }}
            />

            {/* Inner Ring */}
            <div
              style={{
                position: 'absolute',
                inset: '8px',
                borderRadius: '50%',
                border: '1px dashed rgba(223, 183, 108, 0.6)',
                pointerEvents: 'none',
              }}
            />

            {/* Button Content */}
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                textAlign: 'center',
                padding: '0 8px',
              }}
            >
              <div
                style={{
                  color: '#fff5d6',
                  fontFamily: "'Amiri', 'Noto Nastaliq Urdu', serif",
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  textShadow: '0 2px 10px rgba(0,0,0,0.9)',
                }}
              >
                تلاوتِ کلام
              </div>
              <div
                style={{
                  color: '#dfb76c',
                  fontSize: '0.85rem',
                  fontFamily: "'Noto Nastaliq Urdu', serif",
                  marginTop: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                }}
              >
                <span>داخل ہوں</span>
                <span style={{ fontSize: '1rem' }}>◀</span>
              </div>
            </div>
          </Link>

          {/* Quick Counter / Info below portal */}
          <div
            style={{
              position: 'relative',
              marginTop: '1.2rem',
              color: '#d6c19c',
              fontSize: '0.9rem',
              textAlign: 'center',
              fontFamily: "'Noto Nastaliq Urdu', serif",
            }}
          >
            ۳۰ پارے مکمل تلاوت و ترجمہ
          </div>
        </div>

        {/* QUICK RESUME CARD (Father-friendly 1-tap continuation) */}
        {lastPlayed ? (
          <div
            onClick={() => navigate(`/Surahs/${lastPlayed.id}`)}
            className="touch-card"
            style={{
              width: '100%',
              marginTop: '1.25rem',
              background: 'linear-gradient(135deg, rgba(88, 12, 24, 0.95), rgba(45, 5, 12, 0.95))',
              border: '1px solid rgba(223, 183, 108, 0.5)',
              borderRadius: '16px',
              padding: '0.9rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              direction: 'rtl',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', width: '100%' }}>
              {/* Play Button: Vertically centered with arrow pointing left for RTL */}
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #dfb76c, #a87922)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#2a040b',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                  flexShrink: 0,
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ display: 'block', transform: 'translateX(-1px)' }}
                >
                  <path d="M16 5l-10 7 10 7V5z" />
                </svg>
              </div>

              {/* Subtitle and Name */}
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.85rem', color: '#dfb76c', fontFamily: "'Noto Nastaliq Urdu', serif", lineHeight: 1.3 }}>
                  جہاں سے چھوڑا تھا
                </div>
                <div style={{ fontSize: '1.45rem', color: '#ffffff', fontWeight: 700, fontFamily: "'Amiri', serif", lineHeight: 1.25, marginTop: '2px' }}>
                  {lastPlayed.name}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </main>

      {/* FOOTER REGION: Reading Progress & Action */}
      <footer
        style={{
          width: '100%',
          maxWidth: '520px',
          textAlign: 'center',
          zIndex: 1,
          marginTop: '1rem',
        }}
      >
        {/* Reading Progress indicator if any completed */}
        {completedCount > 0 && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '20px',
              background: 'rgba(223, 183, 108, 0.12)',
              border: '1px solid rgba(223, 183, 108, 0.3)',
              marginBottom: '0.75rem',
              color: '#f5dc93',
              fontSize: '0.88rem',
            }}
          >
            <span>مکمل تلاوت:</span>
            <strong style={{ color: '#ffffff' }}>{completedCount} / ۳۰ پارے</strong>
            <span>({Math.round((completedCount / 30) * 100)}٪)</span>
          </div>
        )}

        <p
          style={{
            margin: '0.65rem 0 0 0',
            fontSize: '0.78rem',
            color: 'rgba(223, 183, 108, 0.6)',
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Holy Qur&apos;an · Arabic Recitation &amp; Urdu Translation
        </p>
      </footer>
    </div>
  );
};

export default Home;
