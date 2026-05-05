"use client";

import React from "react";

interface OceanWaveBackgroundProps {
  className?: string;
}

export default function OceanWaveBackground({ className = "" }: OceanWaveBackgroundProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(125,211,252,0.18)_0%,rgba(56,189,248,0.1)_26%,rgba(8,47,73,0)_60%)] dark:bg-[linear-gradient(180deg,rgba(14,165,233,0.24)_0%,rgba(6,182,212,0.14)_28%,rgba(8,47,73,0)_62%)]" />

      <div className="wave wave-1" />
      <div className="wave wave-2" />
      <div className="wave wave-3" />

      <div className="foam foam-1" />
      <div className="foam foam-2" />
      <div className="foam foam-3" />

      <div className="sand" />
      <div className="palm palm-left" />
      <div className="palm palm-right" />

      <style jsx>{`
        .wave {
          position: absolute;
          left: -35%;
          width: 170%;
          border-radius: 45%;
          transform: translate3d(0, 0, 0);
          filter: blur(0.6px);
        }

        .wave-1 {
          bottom: -120px;
          height: 420px;
          opacity: 0.42;
          background: radial-gradient(64% 64% at 50% 45%, rgba(14, 165, 233, 0.75), rgba(14, 165, 233, 0.06));
          animation: surf 7.5s ease-in-out infinite;
        }

        .wave-2 {
          bottom: -160px;
          height: 460px;
          opacity: 0.36;
          background: radial-gradient(62% 62% at 50% 45%, rgba(6, 182, 212, 0.64), rgba(6, 182, 212, 0.05));
          animation: surfReverse 10.5s ease-in-out infinite;
        }

        .wave-3 {
          bottom: -200px;
          height: 500px;
          opacity: 0.28;
          background: radial-gradient(60% 60% at 50% 45%, rgba(2, 132, 199, 0.55), rgba(2, 132, 199, 0.04));
          animation: surf 13s ease-in-out infinite;
        }

        .foam {
          position: absolute;
          border-radius: 999px;
          background: radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.15));
          opacity: 0.55;
          filter: blur(0.3px);
        }

        .foam-1 {
          width: 180px;
          height: 24px;
          bottom: 210px;
          left: 12%;
          animation: foamMove 7s ease-in-out infinite;
        }

        .foam-2 {
          width: 220px;
          height: 22px;
          bottom: 194px;
          left: 44%;
          animation: foamMove 9s ease-in-out infinite reverse;
        }

        .foam-3 {
          width: 160px;
          height: 20px;
          bottom: 220px;
          left: 72%;
          animation: foamMove 8s ease-in-out infinite;
        }

        .sand {
          position: absolute;
          left: -10%;
          right: -10%;
          bottom: 70px;
          height: 150px;
          background: linear-gradient(180deg, rgba(245, 208, 134, 0.06), rgba(234, 179, 8, 0.16) 35%, rgba(194, 120, 3, 0.24));
          border-top-left-radius: 45% 40%;
          border-top-right-radius: 45% 40%;
        }

        .palm {
          position: absolute;
          bottom: 195px;
          width: 10px;
          height: 92px;
          background: linear-gradient(180deg, rgba(71, 85, 105, 0.16), rgba(30, 41, 59, 0.24));
          border-radius: 999px;
        }

        .palm::before,
        .palm::after {
          content: "";
          position: absolute;
          width: 54px;
          height: 14px;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(16, 185, 129, 0.18), rgba(5, 150, 105, 0.24));
        }

        .palm-left {
          left: 6%;
          transform: rotate(-14deg);
        }

        .palm-left::before {
          top: -8px;
          left: -46px;
          transform: rotate(-20deg);
        }

        .palm-left::after {
          top: 4px;
          left: -42px;
          transform: rotate(10deg);
        }

        .palm-right {
          right: 8%;
          transform: rotate(10deg);
        }

        .palm-right::before {
          top: -9px;
          right: -45px;
          transform: rotate(22deg);
        }

        .palm-right::after {
          top: 6px;
          right: -40px;
          transform: rotate(-8deg);
        }

        @keyframes surf {
          0% {
            transform: translate3d(-10%, 0, 0) rotate(0deg);
          }
          50% {
            transform: translate3d(7%, -28px, 0) rotate(180deg);
          }
          100% {
            transform: translate3d(-10%, 0, 0) rotate(360deg);
          }
        }

        @keyframes surfReverse {
          0% {
            transform: translate3d(9%, 0, 0) rotate(360deg);
          }
          50% {
            transform: translate3d(-7%, -30px, 0) rotate(180deg);
          }
          100% {
            transform: translate3d(9%, 0, 0) rotate(0deg);
          }
        }

        @keyframes foamMove {
          0% {
            transform: translateX(0) translateY(0);
            opacity: 0.42;
          }
          50% {
            transform: translateX(24px) translateY(-6px);
            opacity: 0.62;
          }
          100% {
            transform: translateX(0) translateY(0);
            opacity: 0.42;
          }
        }
      `}</style>
    </div>
  );
}
