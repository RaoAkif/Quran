import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { paraData } from '../../paraData';
import { surahData } from '../../surahData';
import headerBanner from '../assets/images/quran_header_banner_1791997212285.jpg';
import { QuranRosette } from './QuranRosette';
import '../App.css';

// Eastern Arabic numerals mapping for reference
const toArabicNumerals = (num) => {
  const digits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(num).replace(/[0-9]/g, (d) => digits[d]);
};

// Format numbers as two digits for single digits (e.g., 01, 02) or clean string
const formatIndexNumber = (num) => {
  const n = parseInt(num, 10);
  if (isNaN(n)) return num;
  return n < 10 ? `0${n}` : `${n}`;
};

const Surahs = () => {
  const navigate = useNavigate();

  // Mode: 'paras' (30 Juz) or 'surahs' (114 Surahs)
  const [activeTab, setActiveTab] = useState('paras');
  const [searchQuery, setSearchQuery] = useState('');
  const [checkboxes, setCheckboxes] = useState({});
  const [showClearModal, setShowClearModal] = useState(false);

  // Load stored checkboxes on mount
  useEffect(() => {
    try {
      const storedValues = JSON.parse(localStorage.getItem('checkboxes')) || {};
      setCheckboxes(storedValues);
    } catch {
      // safe fallback
    }
  }, []);

  // Sync checkboxes to localStorage
  const handleToggleCheck = (e, id) => {
    e.stopPropagation(); // prevent row click navigation
    setCheckboxes((prev) => {
      const updated = {
        ...prev,
        [id]: !prev[id],
      };
      try {
        localStorage.setItem('checkboxes', JSON.stringify(updated));
      } catch {
        // storage fallback
      }
      return updated;
    });
  };

  // Clear all checkboxes confirmation
  const handleConfirmClear = () => {
    setCheckboxes({});
    try {
      localStorage.setItem('checkboxes', JSON.stringify({}));
    } catch {
      // safe fallback
    }
    setShowClearModal(false);
  };

  // Filtered dataset
  const currentList = useMemo(() => {
    const rawData = activeTab === 'paras' ? paraData : surahData;
    const query = searchQuery.trim().toLowerCase();

    return Object.entries(rawData).filter(([id, item]) => {
      if (!query) return true;
      const matchId = String(id) === query || toArabicNumerals(id).includes(query);
      const matchName = item.name && item.name.toLowerCase().includes(query);
      const matchEnName = item.en_name && item.en_name.toLowerCase().includes(query);
      return matchId || matchName || matchEnName;
    });
  }, [activeTab, searchQuery]);

  // Completion calculation
  const totalItems = activeTab === 'paras' ? 30 : 114;
  const completedCount = useMemo(() => {
    const prefix = activeTab === 'paras' ? '' : 'surah-';
    let count = 0;
    for (let i = 1; i <= totalItems; i++) {
      const key = `${prefix}${i}`;
      if (checkboxes[key]) count++;
    }
    return count;
  }, [checkboxes, activeTab, totalItems]);

  const progressPercentage = Math.round((completedCount / totalItems) * 100);

  return (
    <div className="islamic-bg-pattern app-viewport" dir="rtl">
      {/* STICKY TOP APP BAR FOR MOBILE */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 30,
          backgroundColor: 'rgba(45, 5, 12, 0.96)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(223, 183, 108, 0.3)',
          padding: '0.65rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '900px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        {/* Right side: Back to Home Button (44px min tap target) */}
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '44px',
            minHeight: '44px',
            padding: '0 14px',
            borderRadius: '10px',
            background: 'rgba(223, 183, 108, 0.15)',
            border: '1px solid rgba(223, 183, 108, 0.35)',
            color: '#f5dc93',
            fontSize: '0.95rem',
            fontFamily: "'Noto Nastaliq Urdu', serif",
            gap: '8px',
            textDecoration: 'none',
          }}
          aria-label="ہوم اسکرین پر واپس جائیں"
        >
          <span style={{ fontSize: '1.2rem' }}>⌂</span>
          <span>شروعات</span>
        </Link>

        {/* Center: Title */}
        <div style={{ textAlign: 'center' }}>
          <h1
            style={{
              margin: 0,
              fontFamily: "'Amiri', serif",
              fontSize: '1.45rem',
              fontWeight: 700,
              color: '#dfb76c',
              lineHeight: 1.1,
            }}
          >
            القرآن الکریم
          </h1>
          <span
            style={{
              fontSize: '0.78rem',
              color: '#d1b88e',
              fontFamily: "'Noto Nastaliq Urdu', serif",
            }}
          >
            عربی مع اردو ترجمہ
          </span>
        </div>

        {/* Left side: Clear All Marks Trigger */}
        <button
          onClick={() => setShowClearModal(true)}
          style={{
            minWidth: '44px',
            minHeight: '44px',
            padding: '0 12px',
            borderRadius: '10px',
            background: 'rgba(116, 17, 34, 0.65)',
            border: '1px solid rgba(223, 183, 108, 0.3)',
            color: '#f5dc93',
            fontSize: '0.85rem',
            fontFamily: "'Noto Nastaliq Urdu', serif",
            cursor: 'pointer',
          }}
          title="تمام نشانات صاف کریں"
        >
          نشانات صاف
        </button>
      </header>

      {/* MAIN CONTAINER */}
      <main className="main-content" style={{ padding: '1rem', boxSizing: 'border-box' }}>
        {/* ILLUMINATED QURAN BANNER */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '130px',
            borderRadius: '18px',
            overflow: 'hidden',
            marginBottom: '1.25rem',
            border: '1px solid rgba(223, 183, 108, 0.4)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
          }}
        >
          <img
            src={headerBanner}
            alt="القرآن الکریم"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(31, 3, 8, 0.25) 0%, rgba(31, 3, 8, 0.8) 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'center',
              padding: '0.75rem',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: "'Amiri', serif",
                color: '#fff3c7',
                fontSize: '1.25rem',
                textShadow: '0 2px 8px rgba(0,0,0,0.9)',
              }}
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
          </div>
        </div>

        {/* PROGRESS CARD & TABS SECTION */}
        <div
          style={{
            background: 'linear-gradient(180deg, rgba(74, 9, 20, 0.85) 0%, rgba(45, 5, 12, 0.95) 100%)',
            border: '1px solid rgba(223, 183, 108, 0.3)',
            borderRadius: '16px',
            padding: '1rem',
            marginBottom: '1.25rem',
            boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
          }}
        >
          {/* Progress Bar & Counter */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.6rem',
              color: '#f5dc93',
              fontSize: '0.95rem',
              fontFamily: "'Noto Nastaliq Urdu', serif",
            }}
          >
            <div>
              <span>تکمیل شدہ تلاوت: </span>
              <span
                dir="ltr"
                style={{
                  display: 'inline-block',
                  color: '#ffffff',
                  fontSize: '1.15rem',
                  fontWeight: 'bold',
                }}
              >
                {completedCount} / {totalItems}
              </span>
            </div>
            <div
              style={{
                background: 'rgba(223, 183, 108, 0.18)',
                border: '1px solid rgba(223, 183, 108, 0.35)',
                borderRadius: '14px',
                minWidth: '56px',
                height: '28px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 8px',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.88rem',
                lineHeight: 1,
                boxSizing: 'border-box',
              }}
            >
              <span
                dir="ltr"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: 1,
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
              >
                {progressPercentage}%
              </span>
            </div>
          </div>

          {/* Golden Progress Track */}
          <div
            style={{
              width: '100%',
              height: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '6px',
              overflow: 'hidden',
              marginBottom: '1rem',
            }}
          >
            <div
              style={{
                width: `${progressPercentage}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #b88628, #dfb76c, #fff1b8)',
                borderRadius: '6px',
                transition: 'width 0.4s ease',
              }}
            />
          </div>

          {/* SEGMENTED TAB SWITCH: 30 پارے vs 114 سورتیں */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px',
              padding: '4px',
              backgroundColor: 'rgba(31, 3, 8, 0.8)',
              borderRadius: '12px',
              border: '1px solid rgba(223, 183, 108, 0.2)',
            }}
          >
            <button
              onClick={() => setActiveTab('paras')}
              style={{
                minHeight: '44px',
                borderRadius: '10px',
                border: 'none',
                background:
                  activeTab === 'paras'
                    ? 'linear-gradient(180deg, #dfb76c 0%, #b88828 100%)'
                    : 'transparent',
                color: activeTab === 'paras' ? '#2a040b' : '#dfb76c',
                fontSize: '1.2rem',
                fontWeight: 700,
                fontFamily: "'Amiri', 'Noto Nastaliq Urdu', serif",
                transition: 'all 0.2s ease',
              }}
            >
              ۳۰ پارے
            </button>
            <button
              onClick={() => setActiveTab('surahs')}
              style={{
                minHeight: '44px',
                borderRadius: '10px',
                border: 'none',
                background:
                  activeTab === 'surahs'
                    ? 'linear-gradient(180deg, #dfb76c 0%, #b88828 100%)'
                    : 'transparent',
                color: activeTab === 'surahs' ? '#2a040b' : '#dfb76c',
                fontSize: '1.2rem',
                fontWeight: 700,
                fontFamily: "'Amiri', 'Noto Nastaliq Urdu', serif",
                transition: 'all 0.2s ease',
              }}
            >
              ۱۱۴ سورتیں
            </button>
          </div>
        </div>

        {/* SEARCH BAR (Large, Touch-Friendly for Elder Fingers) */}
        <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={activeTab === 'paras' ? 'پارہ نمبر یا نام تلاش کریں...' : 'سورت نمبر یا نام تلاش کریں...'}
            style={{
              width: '100%',
              height: '52px',
              minHeight: '52px',
              padding: '0 48px 0 48px',
              borderRadius: '14px',
              background: 'rgba(31, 3, 8, 0.85)',
              border: '1.5px solid rgba(223, 183, 108, 0.4)',
              color: '#ffffff',
              fontSize: '1.05rem',
              fontFamily: "'Noto Nastaliq Urdu', 'Amiri', serif",
              outline: 'none',
              boxSizing: 'border-box',
              textAlign: 'right',
            }}
          />
          {/* Search Icon / Clear Button */}
          {searchQuery ? (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(223, 183, 108, 0.22)',
                border: '1px solid rgba(223, 183, 108, 0.35)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                color: '#f5dc93',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                margin: 0,
                boxSizing: 'border-box',
              }}
              aria-label="تلاش صاف کریں"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ display: 'block', margin: 'auto' }}
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          ) : (
            <span
              style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#dfb76c',
                fontSize: '1.2rem',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '24px',
                height: '24px',
              }}
            >
              🔍
            </span>
          )}
        </div>

        {/* AYAT / PARA CARDS LIST — HARMONIOUS, WELL-BALANCED RTL ARCHITECTURE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {currentList.map(([id, item]) => {
            const isSurah = activeTab === 'surahs';
            const itemKey = isSurah ? `surah-${id}` : id;
            const isCompleted = !!checkboxes[itemKey];
            const targetUrl = isSurah ? `/Surahs/surah-${id}` : `/Surahs/${id}`;

            return (
              <div
                key={itemKey}
                onClick={() => navigate(targetUrl)}
                className="touch-card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  direction: 'rtl',
                  padding: '14px 20px',
                  minHeight: '82px',
                  borderRadius: '16px',
                  backgroundColor: isCompleted ? '#faf6ec' : '#fffdfa',
                  border: isCompleted
                    ? '1.5px solid #d4af37'
                    : '1px solid rgba(223, 183, 108, 0.35)',
                  boxShadow: '0 4px 14px rgba(35, 4, 10, 0.12)',
                  cursor: 'pointer',
                  position: 'relative',
                  gap: '16px',
                }}
              >
                {/* 1. RIGHT SLOT (Start of RTL): Pure Vector SVG Islamic Ayah Rosette */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <QuranRosette
                    number={formatIndexNumber(id)}
                    size={50}
                  />
                </div>

                {/* 2. MIDDLE SLOT: Holy Name Vertically Centered */}
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '0 12px',
                    minWidth: 0,
                  }}
                >
                  {/* Para Name (Large, Unclipped Arabic Calligraphy) */}
                  <span
                    style={{
                      fontFamily: "'Amiri', 'Scheherazade New', serif",
                      fontSize: '2rem',
                      fontWeight: 700,
                      color: '#2d040a',
                      lineHeight: 1.5,
                      display: 'inline-block',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.name}
                  </span>
                </div>

                {/* 3. LEFT SLOT (End of RTL): Large Completion Checkbox */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexShrink: 0,
                  }}
                >
                  {/* Tactile Completion Checkbox (44px min tap target) */}
                  <button
                    type="button"
                    onClick={(e) => handleToggleCheck(e, itemKey)}
                    style={{
                      minWidth: '44px',
                      minHeight: '44px',
                      background: 'transparent',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                    aria-label={`${isSurah ? 'سورت' : 'پارہ'} ${id} کو مکمل یا غیر مکمل نشان زد کریں`}
                  >
                    <div
                      style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '10px',
                        border: isCompleted ? '2px solid #5a0c18' : '2px solid #c9b08f',
                        backgroundColor: isCompleted ? '#5a0c18' : '#faf7f2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
                        boxShadow: isCompleted ? '0 2px 8px rgba(90, 12, 24, 0.35)' : 'none',
                      }}
                    >
                      {isCompleted && (
                        <span
                          style={{
                            color: '#dfb76c',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            lineHeight: 1,
                          }}
                        >
                          ✓
                        </span>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            );
          })}

          {currentList.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '3rem 1rem',
                color: '#d6c19c',
                fontFamily: "'Noto Nastaliq Urdu', serif",
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔍</div>
              <div>کوئی پارہ یا سورت نہیں ملی</div>
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  marginTop: '1rem',
                  padding: '8px 18px',
                  borderRadius: '10px',
                  background: 'rgba(223, 183, 108, 0.2)',
                  border: '1px solid rgba(223, 183, 108, 0.4)',
                  color: '#ffffff',
                  cursor: 'pointer',
                }}
              >
                تلاش صاف کریں
              </button>
            </div>
          )}
        </div>
      </main>

      {/* RESPECTFUL CLEAR ALL CONFIRMATION MODAL */}
      {showClearModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            backgroundColor: 'rgba(15, 1, 3, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem',
            direction: 'rtl',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '420px',
              backgroundColor: '#38060e',
              border: '2px solid #dfb76c',
              borderRadius: '24px',
              padding: '1.75rem 1.5rem',
              textAlign: 'center',
              boxShadow: '0 20px 50px rgba(0,0,0,0.9)',
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📖</div>
            <h2
              style={{
                fontFamily: "'Amiri', 'Noto Nastaliq Urdu', serif",
                fontSize: '1.5rem',
                color: '#f5dc93',
                margin: '0 0 0.75rem 0',
                lineHeight: 1.4,
              }}
            >
              کیا آپ نے قرآن مجید ختم کر لیا ہے؟
            </h2>
            <p
              style={{
                color: '#e2cfab',
                fontSize: '1rem',
                fontFamily: "'Noto Nastaliq Urdu', serif",
                lineHeight: 1.6,
                margin: '0 0 1.5rem 0',
              }}
            >
              ماشاءاللہ! اللہ تعالیٰ آپ کی تلاوت قبول فرمائے۔ کیا آپ تمام پارے کی تلاوت کے نشانات صاف کر کے دوبارہ شروع کرنا چاہتے ہیں؟
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <button
                onClick={handleConfirmClear}
                style={{
                  minHeight: '48px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(180deg, #dfb76c 0%, #b88828 100%)',
                  color: '#2a040b',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  fontFamily: "'Amiri', 'Noto Nastaliq Urdu', serif",
                }}
              >
                ہاں، ری سیٹ کریں
              </button>
              <button
                onClick={() => setShowClearModal(false)}
                style={{
                  minHeight: '48px',
                  borderRadius: '12px',
                  border: '1px solid rgba(223, 183, 108, 0.4)',
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#ffffff',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  fontFamily: "'Amiri', 'Noto Nastaliq Urdu', serif",
                }}
              >
                نہیں، منسوخ کریں
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Surahs;
