"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ─────────────────────────────────────────────
   Utility: animated counter
───────────────────────────────────────────── */
function useCounter(target: number, duration = 1.8, isActive: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    let start: number | null = null;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isActive, target, duration]);

  return value;
}

function formatCount(value: number) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/* ─────────────────────────────────────────────
   Sub-component: Stat item
───────────────────────────────────────────── */
interface StatProps {
  value: number;
  suffix: string;
  label: string;
  isActive: boolean;
  duration?: number;
}

function StatItem({ value, suffix, label, isActive, duration }: StatProps) {
  const count = useCounter(value, duration ?? 1.8, isActive);
  return (
    <div style={{ textAlign: "center", minWidth: 140 }}>
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 28,
          fontWeight: 500,
          color: "#1c1b18",
          lineHeight: 1.1,
          letterSpacing: "-0.01em",
        }}
      >
        {formatCount(count)}
        {suffix}
      </div>
      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          color: "#87867f",
          marginTop: 4,
          letterSpacing: "0.01em",
        }}
      >
        {label}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Sub-component: Platform item (non-counting)
───────────────────────────────────────────── */
function PlatformStat({ label }: { label: string }) {
  return (
    <div style={{ textAlign: "center", minWidth: 140 }}>
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 24,
          fontWeight: 500,
          color: "#1c1b18",
          lineHeight: 1.2,
          letterSpacing: "-0.01em",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          color: "#87867f",
          marginTop: 4,
        }}
      >
        Direct Access
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Sub-component: Agent Card
───────────────────────────────────────────── */
function AgentCard() {
  const agents = [
    {
      icon: "✦",
      name: "Resume Analyzer",
      status: "Analyzing your profile...",
      statusType: "pulsing" as const,
      dotColor: "#22c55e",
    },
    {
      icon: "✦",
      name: "Skill Gap Agent",
      status: "8 gaps identified",
      statusType: "badge" as const,
      dotColor: "#22c55e",
      badgeColor: "#f59e0b",
    },
    {
      icon: "✦",
      name: "Interview AI",
      status: "Ready to simulate",
      statusType: "ready" as const,
      dotColor: "#22c55e",
    },
  ];

  return (
    <div
      className="agent-card-float"
      style={{
        background: "#141413",
        border: "1px solid #30302e",
        borderRadius: 24,
        padding: 32,
        width: "100%",
        maxWidth: 420,
        boxShadow:
          "0 32px 80px rgba(0,0,0,0.25), 0 8px 24px rgba(0,0,0,0.15)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 28,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              fontWeight: 500,
              color: "#6b6b65",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            Agent System
          </div>
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 18,
              fontWeight: 500,
              color: "#e8e6dc",
            }}
          >
            Active Pipeline
          </div>
        </div>
        {/* Live indicator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(34,197,94,0.08)",
            border: "1px solid rgba(34,197,94,0.2)",
            borderRadius: 20,
            padding: "5px 12px",
          }}
        >
          <div
            className="pulse-dot"
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#22c55e",
            }}
          />
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              color: "#22c55e",
              fontWeight: 500,
            }}
          >
            LIVE
          </span>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background: "#2a2a28",
          marginBottom: 24,
        }}
      />

      {/* Agents */}
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {agents.map((agent, i) => (
          <motion.div
            key={agent.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 12,
              padding: "14px 16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {/* Pulsing dot */}
              <div
                className="pulse-dot"
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: agent.dotColor,
                  flexShrink: 0,
                }}
              />
              <div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#c8c7c0",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span style={{ color: "#c96442", fontSize: 10 }}>
                    {agent.icon}
                  </span>
                  {agent.name}
                </div>
              </div>
            </div>

            {/* Status */}
            {agent.statusType === "pulsing" && (
              <span
                className="pulsing-text"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11,
                  color: "#87867f",
                  fontWeight: 400,
                }}
              >
                {agent.status}
              </span>
            )}
            {agent.statusType === "badge" && (
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#f59e0b",
                  background: "rgba(245,158,11,0.12)",
                  border: "1px solid rgba(245,158,11,0.25)",
                  borderRadius: 8,
                  padding: "3px 8px",
                }}
              >
                {agent.status}
              </span>
            )}
            {agent.statusType === "ready" && (
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11,
                  fontWeight: 500,
                  color: "#22c55e",
                  background: "rgba(34,197,94,0.08)",
                  border: "1px solid rgba(34,197,94,0.2)",
                  borderRadius: 8,
                  padding: "3px 8px",
                }}
              >
                {agent.status}
              </span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Footer bar */}
      <div
        style={{
          marginTop: 24,
          paddingTop: 20,
          borderTop: "1px solid #2a2a28",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11,
            color: "#4a4a46",
          }}
        >
          3 agents active
        </span>
        <div style={{ display: "flex", gap: 4 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 24,
                height: 4,
                borderRadius: 2,
                background: i === 0 ? "#c96442" : i === 1 ? "#f59e0b" : "#22c55e",
                opacity: 0.7,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Hero Component
───────────────────────────────────────────── */
export default function HeroSection() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  // Headline words for stagger animation
  const line1Words = ["Raw", "potential,"];
  const line2Words = ["job-ready", "talent."];

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        background: "#f5f4ed",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle noise texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Nav bar */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "24px 48px",
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 22,
            fontWeight: 500,
            color: "#1c1b18",
            letterSpacing: "-0.01em",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ color: "#c96442", fontSize: 14 }}>✦</span>
          SuperPlaced AI
        </div>
        <div
          style={{
            display: "flex",
            gap: 36,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            color: "#87867f",
          }}
        >
          {["Product", "Careers", "Blog", "Sign in"].map((item) => (
            <a
              key={item}
              href={
                item === "Careers"
                  ? "#waitlist"
                  : item === "Blog"
                  ? "#agents"
                  : item === "Product"
                  ? "#how"
                  : "#"
              }
              style={{
                color: item === "Sign in" ? "#1c1b18" : "#87867f",
                textDecoration: "none",
                fontWeight: item === "Sign in" ? 500 : 400,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#1c1b18")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color =
                  item === "Sign in" ? "#1c1b18" : "#87867f")
              }
            >
              {item}
            </a>
          ))}
        </div>
      </motion.nav>

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          padding: "120px 48px 80px",
          display: "grid",
          gridTemplateColumns: "55fr 45fr",
          gap: 80,
          alignItems: "center",
        }}
        className="hero-grid"
      >
        {/* ─── LEFT COLUMN ─── */}
        <div>
          {/* Eyebrow */}
          <motion.div {...fadeUp(0)}>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                fontWeight: 500,
                color: "#87867f",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 32,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 1,
                  background: "#87867f",
                  opacity: 0.6,
                }}
              />
              AI-Powered Career Acceleration
            </div>
          </motion.div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 500,
              fontSize: "clamp(40px, 5.5vw, 64px)",
              lineHeight: 1.1,
              color: "#1c1b18",
              letterSpacing: "-0.02em",
              marginBottom: 28,
            }}
          >
            {/* Line 1 */}
            <span style={{ display: "block", overflow: "hidden" }}>
              {line1Words.map((word, i) => (
                <motion.span
                  key={word + i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ display: "inline-block", marginRight: "0.25em" }}
                >
                  {word}
                </motion.span>
              ))}
            </span>

            {/* Line 2 */}
            <span style={{ display: "block", overflow: "hidden" }}>
              {line2Words.map((word, i) => (
                <motion.span
                  key={word + i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 + (line1Words.length + i) * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    display: "inline-block",
                    marginRight: "0.25em",
                    ...(word === "job-ready"
                      ? {
                          textDecoration: "underline",
                          textDecorationColor: "#c96442",
                          textDecorationThickness: 2,
                          textUnderlineOffset: 6,
                        }
                      : {}),
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 20,
              color: "#5e5d59",
              lineHeight: 1.6,
              maxWidth: 520,
              marginBottom: 44,
              fontWeight: 300,
            }}
          >
            SuperPlaced AI is an AI agent system that analyzes your resume, fills
            your skill gaps, simulates interviews, and connects you directly to
            real hiring pipelines.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", gap: 12, marginBottom: 56, flexWrap: "wrap" }}
          >
            <CTAButton
              href="#"
              variant="primary"
              id="cta-start-journey"
            >
              Start Your Journey
            </CTAButton>
            <CTAButton
              href="#how"
              variant="secondary"
              id="cta-see-how"
            >
              See How It Works
            </CTAButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            style={{
              display: "flex",
              alignItems: "stretch",
              gap: 0,
            }}
          >
            <StatItem
              value={2400}
              suffix="+"
              label="Students Prepared"
              isActive={statsInView}
              duration={1.6}
            />
            <WarmDivider />
            <StatItem
              value={94}
              suffix="%"
              label="Profile Improvement"
              isActive={statsInView}
              duration={1.2}
            />
            <WarmDivider />
            <PlatformStat label="Mercor · Scale AI · Outlier" />
          </motion.div>
        </div>

        {/* ─── RIGHT COLUMN (desktop only) ─── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="agent-card-wrapper"
        >
          <AgentCard />
        </motion.div>
      </div>

      {/* Bottom divider */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 48,
          right: 48,
          height: 1,
          background:
            "linear-gradient(90deg, transparent 0%, #dddbd0 30%, #dddbd0 70%, transparent 100%)",
        }}
      />

      {/* Responsive styles via regular style tag */}
      <style>{`
        .hero-grid {
          grid-template-columns: 55fr 45fr;
        }

        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            padding: 100px 24px 60px !important;
            gap: 48px !important;
          }
          .agent-card-wrapper {
            display: none !important;
          }
        }

        @media (max-width: 600px) {
          .hero-grid {
            padding: 90px 20px 48px !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CTA Button
───────────────────────────────────────────── */
function CTAButton({
  href,
  variant,
  children,
  id,
}: {
  href: string;
  variant: "primary" | "secondary";
  children: React.ReactNode;
  id: string;
}) {
  const [hovered, setHovered] = useState(false);

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "14px 28px",
    borderRadius: 12,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    fontWeight: 500,
    textDecoration: "none",
    cursor: "pointer",
    border: "none",
    transition: "all 0.22s cubic-bezier(0.22, 1, 0.36, 1)",
    letterSpacing: "0.01em",
  };

  const primaryStyle: React.CSSProperties = {
    background: hovered ? "#b3563a" : "#c96442",
    color: "#f5f4ed",
    boxShadow: hovered
      ? "0 8px 24px rgba(201,100,66,0.4)"
      : "0 4px 12px rgba(201,100,66,0.25)",
    transform: hovered ? "translateY(-1px)" : "translateY(0)",
  };

  const secondaryStyle: React.CSSProperties = {
    background: hovered ? "#dddbd0" : "#e8e6dc",
    color: "#1c1b18",
    boxShadow: hovered
      ? "0 4px 12px rgba(0,0,0,0.08)"
      : "0 2px 6px rgba(0,0,0,0.05)",
    transform: hovered ? "translateY(-1px)" : "translateY(0)",
  };

  return (
    <a
      id={id}
      href={href}
      style={{
        ...baseStyle,
        ...(variant === "primary" ? primaryStyle : secondaryStyle),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      {variant === "primary" && (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      )}
    </a>
  );
}

/* ─────────────────────────────────────────────
   Warm divider
───────────────────────────────────────────── */
function WarmDivider() {
  return (
    <div
      style={{
        width: 1,
        background: "#dddbd0",
        alignSelf: "stretch",
        margin: "0 28px",
      }}
    />
  );
}
