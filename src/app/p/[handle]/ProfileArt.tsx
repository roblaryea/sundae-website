/** The layered S and cherry, cropped large. Decorative, so hidden from assistive tech. */
export function ProfileArt({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="pc-strata" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F6F1E8" />
          <stop offset=".15" stopColor="#F6C66B" />
          <stop offset=".33" stopColor="#E9A24A" />
          <stop offset=".52" stopColor="#F7A088" />
          <stop offset=".68" stopColor="#FF5C4D" />
          <stop offset=".84" stopColor="#E03E48" />
          <stop offset="1" stopColor="#B23A1E" />
        </linearGradient>
        <radialGradient id="pc-cherry" cx=".35" cy=".3" r=".85">
          <stop offset="0" stopColor="#FF6E5E" />
          <stop offset="1" stopColor="#D8313C" />
        </radialGradient>
      </defs>
      <path
        d="M118,46 C100,41 72,45 72,74 C72,103 140,104 140,139 C140,171 74,172 69,149"
        fill="none"
        stroke="url(#pc-strata)"
        strokeWidth="32"
        strokeLinecap="round"
      />
      <path d="M140,36 C145,24 153,20 160,12" stroke="#7d1f12" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <circle cx="140" cy="50" r="16" fill="url(#pc-cherry)" />
    </svg>
  )
}
