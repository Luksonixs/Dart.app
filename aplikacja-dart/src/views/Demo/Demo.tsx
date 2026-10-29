import { useState } from "react";
import "./Demo.css";

// --- WSPÓLNE FUNKCJE MATEMATYCZNE DLA TARCZY ---
const boardNumbers = [
  20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5,
];
const polarPoint = (radius: number, angle: number) => {
  const radians = (angle * Math.PI) / 180;
  return {
    x: 300 + radius * Math.cos(radians),
    y: 300 + radius * Math.sin(radians),
  };
};
const ringSegment = (
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number,
) => {
  const outerStart = polarPoint(outerRadius, startAngle);
  const outerEnd = polarPoint(outerRadius, endAngle);
  const innerStart = polarPoint(innerRadius, startAngle);
  const innerEnd = polarPoint(innerRadius, endAngle);
  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerRadius} ${outerRadius} 0 0 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerRadius} ${innerRadius} 0 0 0 ${innerStart.x} ${innerStart.y}`,
    "Z",
  ].join(" ");
};

// --- WSPÓLNY KOMPONENT TARCZY (Używany w obu widokach) ---
function Dartboard({ showNumbers = false }: { showNumbers?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="dartboard"
      viewBox="0 0 600 600"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="300" cy="300" r="284" fill="#081421" />
      <circle
        cx="300"
        cy="300"
        r="272"
        fill="none"
        stroke="#26394a"
        strokeWidth="2"
      />
      {boardNumbers.map((number, index) => {
        const startAngle = -99 + index * 18;
        const endAngle = startAngle + 18;
        const isEven = index % 2 === 0;
        const labelPoint = polarPoint(247, startAngle + 9);
        return (
          <g key={number}>
            <path
              d={ringSegment(120, 216, startAngle, endAngle)}
              fill={isEven ? "#d9d2bc" : "#15212a"}
              stroke="#07111b"
              strokeWidth="1.2"
            />
            <path
              d={ringSegment(36, 104, startAngle, endAngle)}
              fill={isEven ? "#d9d2bc" : "#15212a"}
              stroke="#07111b"
              strokeWidth="1.2"
            />
            <path
              d={ringSegment(104, 120, startAngle, endAngle)}
              fill={isEven ? "#cc4e56" : "#23856f"}
              stroke="#07111b"
              strokeWidth="1.2"
            />
            <path
              d={ringSegment(216, 232, startAngle, endAngle)}
              fill={isEven ? "#cc4e56" : "#23856f"}
              stroke="#07111b"
              strokeWidth="1.2"
            />
            {showNumbers && (
              <text
                fill="#a9bac7"
                fontFamily="Arial, sans-serif"
                fontSize="19"
                fontWeight="700"
                textAnchor="middle"
                x={labelPoint.x}
                y={labelPoint.y + 6}
              >
                {number}
              </text>
            )}
          </g>
        );
      })}
      <circle
        cx="300"
        cy="300"
        r="36"
        fill="#23856f"
        stroke="#07111b"
        strokeWidth="2"
      />
      <circle
        cx="300"
        cy="300"
        r="15"
        fill="#cc4e56"
        stroke="#07111b"
        strokeWidth="2"
      />
      <circle
        cx="300"
        cy="300"
        r="282"
        fill="none"
        stroke="#13293a"
        strokeWidth="9"
      />
    </svg>
  );
}

// --- KOMPONENT 1: EKRAN STARTOWY ---
function PodgladStartowy({ onStart }: { onStart: () => void }) {
  return (
    <main className="hero">
      <div className="start-ambient-light" aria-hidden="true" />
      <div className="board-halo" aria-hidden="true" />
      <div className="start-dartboard-shell">
        <Dartboard showNumbers={true} />
      </div>
      <div className="glass-haze" aria-hidden="true" />

      <header className="brand" aria-label="Dart">
        <span className="brand-mark" aria-hidden="true">
          <span />
        </span>
        <span>Dart</span>
      </header>

      <section className="hero-content">
        <p className="eyebrow">Cel. Rzut. Emocje.</p>
        <h1>Graj celnie</h1>
        <p className="intro">
          Zbierz ekipę, wybierz tryb i sprawdź, kto dziś będzie najlepszy.
        </p>
        <button className="start-button" type="button" onClick={onStart}>
          <span>Rozpocznij grę</span>
          <span className="button-icon" aria-hidden="true">
            <svg viewBox="0 0 40 40">
              <g className="mini-target">
                <circle
                  cx="20"
                  cy="20"
                  r="9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="5.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle cx="20" cy="20" r="2" fill="currentColor" />
              </g>
              <g className="dart-projectile">
                <path
                  className="dart-shaft"
                  d="M0 0 L8 -8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  className="dart-tip"
                  d="M0 0 L3 -1 L1 -3 Z"
                  fill="currentColor"
                />
                <path
                  className="dart-flight"
                  d="M7 -7 L8 -12 L12 -8 Z"
                  fill="currentColor"
                />
              </g>
            </svg>
          </span>
        </button>
      </section>
      <p className="footer-note">Gotowy na pierwszą rundę?</p>
    </main>
  );
}

// --- KOMPONENT 2: EKRAN MENU ---
function MenuGlowne() {
  return (
    <div className="relative min-h-screen flex flex-col antialiased selection:bg-[#57c7e8] selection:text-[#06111e] page-wrapper">
      <div className="menu-ambient-light" aria-hidden="true"></div>
      <div className="page-overlay" aria-hidden="true"></div>

      <div className="menu-dartboard-shell" aria-hidden="true">
        <Dartboard showNumbers={false} />
      </div>

      <header className="w-full px-6 lg:px-16 py-6 flex items-center justify-between border-b border-[#26394a]/40 backdrop-blur-md sticky top-0 z-50 bg-[#06111e]/90">
        <a
          href="#"
          className="flex items-center gap-3 font-['Manrope'] font-extrabold text-xl tracking-tight text-[#f5f8fb] group"
        >
          <span className="relative flex w-8 h-8 items-center justify-center rounded-full border border-[#57c7e8]/40 bg-[#0c2233]">
            <span className="absolute w-4 h-4 rounded-full border border-[#57c7e8]"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#e9fbff] shadow-[0_0_8px_#57c7e8]"></span>
          </span>
          <span className="group-hover:text-[#8fe4f5] transition-colors">
            DartApp
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-[#b7c4ce]">
          <a
            href="#"
            className="text-[#f5f8fb] font-semibold border-b-2 border-[#57c7e8] pb-1"
          >
            Gry
          </a>
          <a href="#" className="hover:text-[#f5f8fb] transition-colors">
            Ranking
          </a>
          <a href="#" className="hover:text-[#f5f8fb] transition-colors">
            Statystyki
          </a>
        </nav>
        <div className="relative profile-wrapper">
          <button className="flex items-center gap-3 p-1.5 pr-4 rounded-full glass-panel hover:border-[#57c7e8]/50 transition-all cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#23856f] to-[#57c7e8] flex items-center justify-center font-bold text-[#06111e] text-sm shadow-inner">
              ŁW
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-semibold text-[#f5f8fb]">Łukasz</div>
            </div>
            <svg
              className="w-4 h-4 text-[#b7c4ce] ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          <div className="dropdown-menu absolute right-0 mt-3 w-64 dropdown-glass rounded-2xl p-3">
            <div className="px-3 py-2.5 border-b border-[#26394a]/60 mb-2">
              <p className="text-xs text-[#79d7ef] font-semibold uppercase tracking-wider">
                Konto
              </p>
              <p className="text-sm font-bold text-[#f5f8fb] truncate">
                Łukasz
              </p>
            </div>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-500/20 text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
            >
              Wyloguj
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 lg:px-16 py-10 flex flex-col justify-center z-10">
        <div className="text-center mb-12">
          <span className="text-[#79d7ef] text-xs font-bold tracking-[0.22em] uppercase mb-3 block">
            Cel. Rzut. Emocje.
          </span>
          <h1 className="font-['Manrope'] font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#f5f8fb] mb-4">
            Wybierz tryb gry
          </h1>
          <p className="text-[#b7c4ce] text-base sm:text-lg max-w-xl mx-auto">
            Zbierz ekipę, wybierz tryb i sprawdź, kto dziś będzie najlepszy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tryb Klasyczny (Uproszczony wizualnie dla demo) */}
          <div className="glass-card rounded-3xl p-7 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#23856f]/20 border border-[#23856f]/40 flex items-center justify-center text-[#57c7e8] mb-6 shadow-inner">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="font-['Manrope'] font-bold text-2xl text-[#f5f8fb] mb-3">
                Tryb Klasyczny
              </h3>
              <p className="text-[#b7c4ce] text-sm leading-relaxed mb-6">
                Trzy klasyczne opcje gry w darta z płynnym wyborem liczby graczy
                od 1 do 4 osób.
              </p>
            </div>
            <button className="start-button w-full" type="button">
              <span>Wybierz</span>
              <span className="button-icon" aria-hidden="true">
                <svg viewBox="0 0 40 40">
                  <g className="mini-target">
                    <circle cx="20" cy="20" r="9" />
                    <circle cx="20" cy="20" r="5.5" />
                    <circle cx="20" cy="20" r="2" />
                  </g>
                  <g className="dart-projectile">
                    <path className="dart-shaft" d="M0 0 L8 -8" />
                    <path className="dart-tip" d="M0 0 L3 -1 L1 -3 Z" />
                    <path className="dart-flight" d="M7 -7 L8 -12 L12 -8 Z" />
                  </g>
                </svg>
              </span>
            </button>
          </div>

          {/* Tryb Wyzwań */}
          <div className="glass-card rounded-3xl p-7 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#cc4e56]/20 border border-[#cc4e56]/40 flex items-center justify-center text-[#ff8b92] mb-6 shadow-inner">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                  ></path>
                </svg>
              </div>
              <h3 className="font-['Manrope'] font-bold text-2xl text-[#f5f8fb] mb-3">
                Tryb Wyzwań
              </h3>
              <p className="text-[#b7c4ce] text-sm leading-relaxed mb-6">
                Dwa rodzaje gry: trafianie w konkretne pola tarczy lub zdobycie
                określonej ilości punktów.
              </p>
            </div>
            <button className="start-button w-full" type="button">
              <span>Wybierz</span>
              <span className="button-icon" aria-hidden="true">
                <svg viewBox="0 0 40 40">
                  <g className="mini-target">
                    <circle cx="20" cy="20" r="9" />
                    <circle cx="20" cy="20" r="5.5" />
                    <circle cx="20" cy="20" r="2" />
                  </g>
                  <g className="dart-projectile">
                    <path className="dart-shaft" d="M0 0 L8 -8" />
                    <path className="dart-tip" d="M0 0 L3 -1 L1 -3 Z" />
                    <path className="dart-flight" d="M7 -7 L8 -12 L12 -8 Z" />
                  </g>
                </svg>
              </span>
            </button>
          </div>

          {/* Tryb Trening */}
          <div className="glass-card rounded-3xl p-7 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#57c7e8]/20 border border-[#57c7e8]/40 flex items-center justify-center text-[#57c7e8] mb-6 shadow-inner">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 2v4M12 18v4M2 12h4M18 12h4"
                  ></path>
                </svg>
              </div>
              <h3 className="font-['Manrope'] font-bold text-2xl text-[#f5f8fb] mb-3">
                Tryb Trening
              </h3>
              <p className="text-[#b7c4ce] text-sm leading-relaxed mb-6">
                Ilość rzutów ile się chce bez zliczania punktów. Idealne do
                szlifowania formy.
              </p>
            </div>
            <button className="start-button w-full" type="button">
              <span>Wybierz</span>
              <span className="button-icon" aria-hidden="true">
                <svg viewBox="0 0 40 40">
                  <g className="mini-target">
                    <circle cx="20" cy="20" r="9" />
                    <circle cx="20" cy="20" r="5.5" />
                    <circle cx="20" cy="20" r="2" />
                  </g>
                  <g className="dart-projectile">
                    <path className="dart-shaft" d="M0 0 L8 -8" />
                    <path className="dart-tip" d="M0 0 L3 -1 L1 -3 Z" />
                    <path className="dart-flight" d="M7 -7 L8 -12 L12 -8 Z" />
                  </g>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

// --- GŁÓWNY DYRYGENT APLIKACJI (KONTROLER STANÓW) ---
export default function App() {
  const [ekran, setEkran] = useState<"start" | "menu">("start");
  const [isFadingOut, setIsFadingOut] = useState(false);

  const przejdziDoMenu = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setEkran("menu");
      setIsFadingOut(false);
    }, 600);
  };

  return (
    <div className="app-container">
      {ekran === "start" && (
        <div
          className={`screen-wrapper ${isFadingOut ? "fade-out" : "fade-in"}`}
        >
          <PodgladStartowy onStart={przejdziDoMenu} />
        </div>
      )}

      {ekran === "menu" && (
        <div className="screen-wrapper fade-in">
          <MenuGlowne />
        </div>
      )}
    </div>
  );
}
