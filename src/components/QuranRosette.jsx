/* eslint-disable react/prop-types */

/**
 * Pure SVG Islamic Ayah / Juz Rosette
 * Designed with 8-fold geometric symmetry, gold gradient filigree,
 * and optically centered numerals.
 */
export const QuranRosette = ({
  number,
  arabicNumber,
  size = 52,
  useArabicDigits = false,
  className = '',
}) => {
  const displayValue = useArabicDigits && arabicNumber ? arabicNumber : number;

  return (
    <div
      className={className}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        style={{ display: 'block', overflow: 'visible' }}
      >
        <defs>
          {/* Rich antique gold metallic gradient */}
          <linearGradient id="rosetteGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff2c6" />
            <stop offset="30%" stopColor="#dfb76c" />
            <stop offset="70%" stopColor="#b68527" />
            <stop offset="100%" stopColor="#f5dc93" />
          </linearGradient>

          {/* Deep imperial burgundy velvet center */}
          <radialGradient id="rosetteBurgundy" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#68101e" />
            <stop offset="60%" stopColor="#480913" />
            <stop offset="100%" stopColor="#290308" />
          </radialGradient>

          {/* Soft ambient shadow */}
          <filter id="rosetteGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.35" />
          </filter>
        </defs>

        <g filter="url(#rosetteGlow)">
          {/* Base 8-point geometric Islamic star (Two intersecting rounded squares) */}
          <rect
            x="14"
            y="14"
            width="72"
            height="72"
            rx="14"
            fill="url(#rosetteBurgundy)"
            stroke="url(#rosetteGold)"
            strokeWidth="2.5"
          />
          <rect
            x="14"
            y="14"
            width="72"
            height="72"
            rx="14"
            transform="rotate(45 50 50)"
            fill="url(#rosetteBurgundy)"
            stroke="url(#rosetteGold)"
            strokeWidth="2.5"
          />

          {/* Outer ornamental gold boundary ring */}
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="url(#rosetteGold)"
            strokeWidth="1.2"
            strokeOpacity="0.85"
          />

          {/* Inner decorative dotted ring */}
          <circle
            cx="50"
            cy="50"
            r="33"
            fill="none"
            stroke="url(#rosetteGold)"
            strokeWidth="1"
            strokeDasharray="2 3.5"
            strokeOpacity="0.75"
          />

          {/* Inner core circle */}
          <circle
            cx="50"
            cy="50"
            r="28"
            fill="url(#rosetteBurgundy)"
            stroke="url(#rosetteGold)"
            strokeWidth="1.5"
          />

          {/* 8 Ornamental perimeter dots at star vertices */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x = 50 + 44 * Math.cos(rad);
            const y = 50 + 44 * Math.sin(rad);
            return (
              <circle
                key={angle}
                cx={x}
                cy={y}
                r="2.2"
                fill="url(#rosetteGold)"
              />
            );
          })}

          {/* Perfectly centered, balanced numeral */}
          <text
            x="50"
            y="52"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#fff3cb"
            fontSize={String(displayValue).length > 2 ? '22' : '26'}
            fontWeight="700"
            fontFamily="'Amiri', 'DM Sans', system-ui, sans-serif"
            letterSpacing={String(displayValue).length > 1 ? '-0.5px' : '0px'}
            style={{
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.9)',
              userSelect: 'none',
            }}
          >
            {displayValue}
          </text>
        </g>
      </svg>
    </div>
  );
};

export default QuranRosette;
