export function LogoAk({ width = 44, height = 32 }: { width?: number; height?: number }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={width}
      height={height}
      viewBox="0 0 1490 1073"
    >
      <path
        d="M605,798 L594,805 L508,922 L405,1073 L587,1073 L680,945 L669,915ZM0,1069 L0,1073 L173,1073 L495,396 L521,355 L578,464 L864,1073 L1033,1073 L867,716 L867,712 L908,671 L962,724 L1270,1073 L1490,1073 L1297,852 L1021,551 L1467,88 L1238,88 L793,552 L520,0Z"
        fill="#fff"
      />
    </svg>
  );
}

export function ArrowOut() {
  return (
    <svg aria-hidden="true" className="arw" viewBox="0 0 16 16">
      <path
        d="M4.5 4.5l7 7M11.5 5.5v6h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function ArrowLink() {
  return (
    <svg aria-hidden="true" className="arw" viewBox="0 0 16 16">
      <path
        d="M4.5 11.5l7-7M5.5 4.5h6v6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function LineTitle({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((text) => (
        <span className="ln" key={text}>
          <span>{text}</span>
        </span>
      ))}
    </>
  );
}
