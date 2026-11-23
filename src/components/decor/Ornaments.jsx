/**
 * Lightweight hand-drawn SVG ornaments (no image requests).
 * All use `currentColor` unless noted, so colour them with Tailwind text-* classes.
 */

export function Ganesha({ className = "", title = "Lord Ganesha" }) {
  return (
    <svg viewBox="0 0 200 230" className={className} role="img" aria-label={title}>
      <defs>
        <radialGradient id="g-halo" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#F4DDA0" stopOpacity="0.55" />
          <stop offset="70%" stopColor="#D9B56C" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#D9B56C" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="108" r="98" fill="url(#g-halo)" />
      {/* halo rays */}
      <g stroke="currentColor" strokeWidth="0.9" opacity="0.45">
        {Array.from({ length: 36 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 36;
          const r1 = 78, r2 = i % 2 ? 86 : 92;
          return (
            <line key={i} x1={100 + r1 * Math.cos(a)} y1={100 + r1 * Math.sin(a)}
              x2={100 + r2 * Math.cos(a)} y2={100 + r2 * Math.sin(a)} />
          );
        })}
      </g>
      <circle cx="100" cy="100" r="74" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {/* crown (kireetam) */}
        <path d="M74 66 L78 44 Q100 18 122 44 L126 66 Z" fill="currentColor" fillOpacity="0.12" />
        <path d="M100 14 L100 24 M95 22 Q100 12 105 22" />
        <path d="M80 54 H120 M77 62 H123" />
        <circle cx="100" cy="40" r="3.2" fill="currentColor" />
        {/* ears */}
        <path d="M72 74 C46 58 22 72 26 104 C29 128 52 140 72 124" fill="currentColor" fillOpacity="0.08" />
        <path d="M128 74 C154 58 178 72 174 104 C171 128 148 140 128 124" fill="currentColor" fillOpacity="0.08" />
        <path d="M40 92 C44 104 50 112 60 116 M160 92 C156 104 150 112 140 116" opacity="0.7" />
        {/* head */}
        <path d="M72 68 C70 96 76 118 88 126 L112 126 C124 118 130 96 128 68 Z" fill="currentColor" fillOpacity="0.1" />
        {/* tilak + eyes */}
        <path d="M100 72 V82" strokeWidth="3" />
        <path d="M84 94 Q89 90 94 94 Q89 97 84 94 Z M106 94 Q111 90 116 94 Q111 97 106 94 Z" fill="currentColor" />
        {/* tusk (broken left, full right) */}
        <path d="M110 124 Q122 128 126 138" />
        <path d="M90 124 Q84 126 83 129" />
        {/* trunk */}
        <path d="M94 120 C92 146 108 156 104 176 C101 194 78 196 76 180 C75 170 88 168 90 176" strokeWidth="2.6" />
        <path d="M100 136 h8 M99 148 h9 M100 160 h7" opacity="0.55" strokeWidth="1.4" />
        {/* lotus seat */}
        <path d="M58 206 C70 188 86 190 100 204 C114 190 130 188 142 206" fill="currentColor" fillOpacity="0.1" />
        <path d="M76 208 C84 196 94 196 100 204 C106 196 116 196 124 208" />
        <path d="M50 212 H150" />
      </g>
      {/* modak dots */}
      <g fill="currentColor">
        <circle cx="64" cy="218" r="2" /><circle cx="100" cy="222" r="2.4" /><circle cx="136" cy="218" r="2" />
      </g>
    </svg>
  );
}

export function Kalash({ className = "" }) {
  return (
    <svg viewBox="0 0 120 160" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* mango leaves */}
        {[-50, -25, 0, 25, 50].map((r, i) => (
          <path key={i} transform={`rotate(${r} 60 56)`} d="M60 56 C52 40 54 22 60 12 C66 22 68 40 60 56 Z"
            fill="#1F4A37" fillOpacity="0.85" stroke="#1F4A37" />
        ))}
        {/* coconut */}
        <ellipse cx="60" cy="42" rx="15" ry="17" fill="#8A6424" fillOpacity="0.9" stroke="#5c4115" />
        <path d="M52 34 Q60 28 68 34" stroke="#3b2a0d" />
        {/* pot */}
        <path d="M44 62 H76 L72 70 C96 80 100 118 82 136 L38 136 C20 118 24 80 48 70 Z" fill="currentColor" fillOpacity="0.18" />
        <path d="M30 96 H90" />
        <path d="M34 108 C46 114 74 114 86 108" />
        <path d="M40 136 L36 148 H84 L80 136" />
        {/* swastika-free auspicious mark: kumkum dots */}
        <circle cx="60" cy="122" r="3.4" fill="#6E1423" stroke="none" />
        <circle cx="50" cy="120" r="2" fill="#6E1423" stroke="none" />
        <circle cx="70" cy="120" r="2" fill="#6E1423" stroke="none" />
      </g>
    </svg>
  );
}

export function Diya({ className = "", lit = true }) {
  return (
    <svg viewBox="0 0 80 110" className={className} aria-hidden="true">
      {lit && (
        <g className="diya-flame" style={{ transformOrigin: "40px 46px" }}>
          <ellipse cx="40" cy="30" rx="16" ry="22" fill="#F7C65B" opacity="0.18" />
          <path d="M40 8 C48 22 50 32 40 46 C30 32 32 22 40 8 Z" fill="#F5A623" />
          <path d="M40 20 C44 28 45 34 40 42 C35 34 36 28 40 20 Z" fill="#FFF1B8" />
        </g>
      )}
      <g fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
        <path d="M10 50 C20 66 60 66 70 50 C64 48 58 50 54 52 L40 46 L26 52 C22 50 16 48 10 50 Z" fillOpacity="0.9" />
        <path d="M34 64 H46 L48 76 H32 Z" fillOpacity="0.85" />
        <path d="M22 78 H58 L52 86 H28 Z" fillOpacity="0.9" />
        <path d="M36 86 H44 V96 H36 Z" fillOpacity="0.85" />
        <path d="M18 96 H62 C62 102 18 102 18 96 Z" fillOpacity="0.9" />
      </g>
    </svg>
  );
}

/** Horizontal torana of mango leaves & marigolds. Repeats to fill its width. */
export function Torana({ className = "", count = 13 }) {
  const w = 40;
  return (
    <svg viewBox={`0 0 ${count * w} 64`} preserveAspectRatio="xMidYMin slice" className={className} aria-hidden="true">
      <path d={`M0 8 Q${(count * w) / 2} 22 ${count * w} 8`} stroke="#8A6424" strokeWidth="2" fill="none" />
      {Array.from({ length: count }).map((_, i) => {
        const x = i * w + w / 2;
        const sag = 8 + 14 * Math.sin((Math.PI * (i + 0.5)) / count);
        return (
          <g key={i} transform={`translate(${x} ${sag})`}>
            <path d="M0 0 C-9 14 -7 34 0 48 C7 34 9 14 0 0 Z" fill={i % 2 ? "#2E6149" : "#1F4A37"} />
            <path d="M0 4 V44" stroke="#4d8a69" strokeWidth="0.8" />
            <circle cx={w / 2} cy="2" r="6.5" fill={i % 2 ? "#E8892B" : "#F2B233"} />
            <circle cx={w / 2} cy="2" r="2.6" fill="#B5541A" />
          </g>
        );
      })}
    </svg>
  );
}

export function Lotus({ className = "" }) {
  return (
    <svg viewBox="0 0 100 60" className={className} aria-hidden="true">
      <g fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
        <path d="M50 6 C62 20 62 40 50 54 C38 40 38 20 50 6 Z" />
        <path d="M50 54 C44 36 30 24 16 22 C18 38 32 52 50 54 Z" />
        <path d="M50 54 C56 36 70 24 84 22 C82 38 68 52 50 54 Z" />
        <path d="M50 54 C36 48 18 46 4 50 C16 58 36 60 50 54 Z" />
        <path d="M50 54 C64 48 82 46 96 50 C84 58 64 60 50 54 Z" />
      </g>
    </svg>
  );
}

export function PeacockFeather({ className = "" }) {
  return (
    <svg viewBox="0 0 60 200" className={className} aria-hidden="true">
      <path d="M30 200 C30 140 28 90 30 30" stroke="#B8893B" strokeWidth="1.6" fill="none" />
      <g stroke="#2E6149" strokeWidth="0.9" opacity="0.8">
        {Array.from({ length: 22 }).map((_, i) => {
          const y = 40 + i * 7;
          const s = 22 - i * 0.6;
          return <path key={i} d={`M30 ${y} q${-s} ${-6} ${-s - 4} ${-14} M30 ${y} q${s} ${-6} ${s + 4} ${-14}`} fill="none" />;
        })}
      </g>
      <ellipse cx="30" cy="34" rx="20" ry="26" fill="#1F4A37" />
      <ellipse cx="30" cy="36" rx="14" ry="18" fill="#B8893B" />
      <ellipse cx="30" cy="38" rx="9" ry="12" fill="#1E5A7A" />
      <ellipse cx="30" cy="40" rx="5" ry="6.5" fill="#0E2B3D" />
    </svg>
  );
}

/** Ornate corner flourish; rotate for the other corners. */
export function Corner({ className = "", style }) {
  return (
    <svg viewBox="0 0 120 120" className={className} style={style} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M4 116 V30 Q4 4 30 4 H116" />
        <path d="M12 116 V36 Q12 12 36 12 H116" opacity="0.6" />
        <path d="M22 60 C22 36 36 22 60 22" />
        <path d="M30 30 C44 30 50 40 44 48 C38 56 28 50 32 42" />
        <path d="M60 22 C70 14 84 16 88 26" />
        <path d="M22 60 C14 70 16 84 26 88" />
        <circle cx="30" cy="30" r="3" fill="currentColor" />
        <path d="M96 4 q6 8 0 16 q-6 -8 0 -16 Z M4 96 q8 6 16 0 q-8 -6 -16 0 Z" fill="currentColor" fillOpacity="0.5" />
      </g>
    </svg>
  );
}

export function Divider({ className = "" }) {
  return (
    <svg viewBox="0 0 320 24" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M8 12 H122" />
        <path d="M198 12 H312" />
        <path d="M122 12 C132 2 144 2 148 12 C144 22 132 22 122 12 Z" />
        <path d="M198 12 C188 2 176 2 172 12 C176 22 188 22 198 12 Z" />
        <path d="M160 2 L170 12 L160 22 L150 12 Z" fill="currentColor" fillOpacity="0.85" />
      </g>
      <circle cx="4" cy="12" r="2" fill="currentColor" />
      <circle cx="316" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

/** Temple-style mandapam with four pillars, gopuram roof and garlands. */
export function Mandapam({ className = "" }) {
  return (
    <svg viewBox="0 0 400 300" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
        {/* kalasham finials */}
        <path d="M200 8 V22 M195 18 Q200 6 205 18" />
        {/* tiered roof */}
        <path d="M150 70 L170 30 H230 L250 70 Z" fill="currentColor" fillOpacity="0.08" />
        <path d="M176 40 H224 M168 52 H232 M160 62 H240" opacity="0.6" />
        <circle cx="200" cy="26" r="4" fill="currentColor" />
        <path d="M60 104 C100 92 140 76 150 70 H250 C260 76 300 92 340 104 Z" fill="currentColor" fillOpacity="0.1" />
        <path d="M54 104 H346 V116 H54 Z" fill="currentColor" fillOpacity="0.16" />
        {[70, 95, 120, 145, 170, 195, 220, 245, 270, 295, 320].map((x) => (
          <path key={x} d={`M${x} 116 v6 a5 5 0 0 0 10 0 v-6`} opacity="0.7" />
        ))}
        {/* garlands */}
        <path d="M80 122 Q140 160 200 122 Q260 160 320 122" stroke="#E8892B" strokeWidth="3" strokeDasharray="1 6" />
        <path d="M80 122 Q140 148 200 122 Q260 148 320 122" stroke="#F2B233" strokeWidth="2.6" strokeDasharray="1 5" />
        {/* pillars */}
        {[78, 140, 260, 322].map((x) => (
          <g key={x}>
            <path d={`M${x - 8} 116 H${x + 8} L${x + 6} 128 H${x - 6} Z`} fill="currentColor" fillOpacity="0.15" />
            <path d={`M${x - 5} 128 V258 M${x + 5} 128 V258`} />
            <path d={`M${x - 7} 160 H${x + 7} M${x - 7} 200 H${x + 7} M${x - 7} 230 H${x + 7}`} opacity="0.6" />
            <path d={`M${x - 10} 258 H${x + 10} V268 H${x - 10} Z`} fill="currentColor" fillOpacity="0.15" />
          </g>
        ))}
        {/* sacred fire (homa kundam) */}
        <path d="M180 256 H220 L214 268 H186 Z" fill="currentColor" fillOpacity="0.25" />
        <path className="diya-flame" style={{ transformOrigin: "200px 256px" }}
          d="M200 222 C210 236 212 246 200 256 C188 246 190 236 200 222 Z" fill="#F5A623" stroke="#E8892B" />
        {/* steps */}
        <path d="M40 268 H360 M28 280 H372 M16 292 H384" />
      </g>
    </svg>
  );
}

/** Seven-step footprint (Saptapadi) — a pair of alta-marked feet. */
export function Footprint({ className = "" }) {
  return (
    <svg viewBox="0 0 40 80" className={className} aria-hidden="true">
      <g fill="currentColor">
        <path d="M20 22 C30 22 34 34 32 48 C30 62 28 76 20 76 C12 76 10 62 8 48 C6 34 10 22 20 22 Z" />
        <circle cx="12" cy="14" r="4.2" />
        <circle cx="20" cy="10" r="4" />
        <circle cx="27" cy="12" r="3.4" />
        <circle cx="32" cy="17" r="2.8" />
        <circle cx="35" cy="23" r="2.2" />
      </g>
      <circle cx="20" cy="46" r="5" fill="#F3E7D0" opacity="0.65" />
    </svg>
  );
}

/** Rangoli/muggu medallion. */
export function Muggu({ className = "" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        {Array.from({ length: 12 }).map((_, i) => (
          <ellipse key={i} cx="100" cy="60" rx="14" ry="40" transform={`rotate(${i * 30} 100 100)`} />
        ))}
        <circle cx="100" cy="100" r="30" />
        <circle cx="100" cy="100" r="88" strokeDasharray="2 5" />
        <circle cx="100" cy="100" r="94" />
      </g>
      <g fill="currentColor">
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 24;
          return <circle key={i} cx={100 + 80 * Math.cos(a)} cy={100 + 80 * Math.sin(a)} r="1.8" />;
        })}
      </g>
    </svg>
  );
}

export function Marigold({ className = "", style }) {
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} aria-hidden="true">
      {Array.from({ length: 10 }).map((_, i) => (
        <ellipse key={i} cx="20" cy="9" rx="5" ry="9" fill={i % 2 ? "#F2B233" : "#E8892B"} transform={`rotate(${i * 36} 20 20)`} />
      ))}
      <circle cx="20" cy="20" r="6" fill="#B5541A" />
    </svg>
  );
}
