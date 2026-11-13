/** 首頁主視覺:咖啡杯 + 齒輪把手,周圍環繞零件(墊圈、齒輪、彈簧、分水網) */
export function HeroVisual() {
  return (
    <svg
      className="hero-visual"
      viewBox="0 0 480 440"
      aria-hidden="true"
      focusable="false"
    >
      {/* 背景 */}
      <circle cx="240" cy="228" r="168" fill="#eadfd4" />
      <circle
        cx="240"
        cy="228"
        r="204"
        fill="none"
        stroke="#d3cbc0"
        strokeWidth="1.5"
        strokeDasharray="3 9"
        strokeLinecap="round"
      />

      {/* 零件連接線 */}
      <g stroke="#c9c5bf" strokeWidth="1.5" strokeDasharray="5 6" fill="none">
        <path d="M84 96 L240 240" />
        <path d="M398 88 L240 240" />
        <path d="M60 322 L240 240" />
        <path d="M432 344 L240 240" />
      </g>

      {/* 咖啡杯 */}
      <g transform="translate(95 82) scale(2.5)">
        <g
          className="hero-steam"
          fill="none"
          stroke="#8d8b88"
          strokeWidth="4"
          strokeLinecap="round"
        >
          <path d="M42 42c-7-7 6-13 0-21-3-4-2-7 0-9" opacity=".7" />
          <path d="M58 42c-8-9 7-16 0-26-3-5-2-9 1-12" />
          <path d="M74 42c-7-7 6-13 0-21-3-4-2-7 0-9" opacity=".7" />
        </g>
        <ellipse cx="58" cy="108" rx="46" ry="6.5" fill="#6b4a3a" />
        <path className="hero-gear" fill="#5f5c58" fillRule="evenodd" d="M110.6 73.0L115.8 73.6L115.8 78.4L110.6 79.0L109.1 82.8L112.3 86.9L108.9 90.3L104.8 87.1L101.0 88.6L100.4 93.8L95.6 93.8L95.0 88.6L91.2 87.1L87.1 90.3L83.7 86.9L86.9 82.8L85.4 79.0L80.2 78.4L80.2 73.6L85.4 73.0L86.9 69.2L83.7 65.1L87.1 61.7L91.2 64.9L95.0 63.4L95.6 58.2L100.4 58.2L101.0 63.4L104.8 64.9L108.9 61.7L112.3 65.1L109.1 69.2ZM92.0 76.0a6 6 0 1 0 12 0a6 6 0 1 0 -12 0Z" />
        <path d="M22 58c0 27 12 46 36 46s36-19 36-46z" fill="#4a2f23" />
        <ellipse cx="58" cy="58" rx="36" ry="9" fill="#f6f2ec" />
        <ellipse cx="58" cy="58.5" rx="31.5" ry="6.6" fill="#2b1812" />
        <path
          d="M36 57.5c5-3 13-4.2 22-4.2"
          fill="none"
          stroke="#6b4a3a"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </g>

      {/* 零件卡:沖煮頭墊圈 */}
      <g className="hero-chip hero-chip-a" transform="translate(44 56)">
        <rect width="80" height="80" rx="18" fill="#fff" stroke="#e4ded5" />
        <circle cx="40" cy="40" r="21" fill="none" stroke="#35201a" strokeWidth="9" />
        <circle cx="40" cy="40" r="21" fill="none" stroke="#6b4a3a" strokeWidth="1.5" />
      </g>

      {/* 零件卡:齒輪 / 刀盤 */}
      <g className="hero-chip hero-chip-b" transform="translate(358 48)">
        <rect width="80" height="80" rx="18" fill="#fff" stroke="#e4ded5" />
        <path fill="#8d8b88" fillRule="evenodd" d="M57.5 35.8L64.8 36.7L64.8 43.3L57.5 44.2L55.3 49.4L59.9 55.2L55.2 59.9L49.4 55.3L44.2 57.5L43.3 64.8L36.7 64.8L35.8 57.5L30.6 55.3L24.8 59.9L20.1 55.2L24.7 49.4L22.5 44.2L15.2 43.3L15.2 36.7L22.5 35.8L24.7 30.6L20.1 24.8L24.8 20.1L30.6 24.7L35.8 22.5L36.7 15.2L43.3 15.2L44.2 22.5L49.4 24.7L55.2 20.1L59.9 24.8L55.3 30.6ZM32.0 40.0a8 8 0 1 0 16 0a8 8 0 1 0 -16 0Z" />
      </g>

      {/* 零件卡:彈簧 */}
      <g className="hero-chip hero-chip-c" transform="translate(20 284)">
        <rect width="80" height="80" rx="18" fill="#fff" stroke="#e4ded5" />
        <polyline
          points="25,21 55,21 25,30.5 55,30.5 25,40 55,40 25,49.5 55,49.5 25,59 55,59"
          fill="none"
          stroke="#5f5c58"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* 零件卡:分水網 */}
      <g className="hero-chip hero-chip-d" transform="translate(394 306)">
        <rect width="80" height="80" rx="18" fill="#fff" stroke="#e4ded5" />
        <circle cx="40" cy="40" r="24" fill="#f6f2ec" stroke="#5f5c58" strokeWidth="4" />
        <g fill="#4a2f23">
        <circle cx="36" cy="28" r="2.6" />
        <circle cx="44" cy="28" r="2.6" />
        <circle cx="28" cy="36" r="2.6" />
        <circle cx="36" cy="36" r="2.6" />
        <circle cx="44" cy="36" r="2.6" />
        <circle cx="52" cy="36" r="2.6" />
        <circle cx="28" cy="44" r="2.6" />
        <circle cx="36" cy="44" r="2.6" />
        <circle cx="44" cy="44" r="2.6" />
        <circle cx="52" cy="44" r="2.6" />
        <circle cx="36" cy="52" r="2.6" />
        <circle cx="44" cy="52" r="2.6" />
        </g>
      </g>
    </svg>
  );
}
