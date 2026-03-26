import { useState, useEffect, useCallback } from "react";

type NotificationType = "success" | "error" | "warning" | "info";
type Theme = "light" | "dark";

interface NotificationProps {
  message: string;
  description?: string;
  type?: NotificationType;
  timeout?: number;
  theme?: Theme;
  onClose?: () => void;
}

const icons: Record<NotificationType, string> = {
  success: "✓",
  error: "✕",
  warning: "⚠",
  info: "i",
};

const lightTokens: Record<NotificationType, { bg: string; border: string; accent: string; dotBg: string; dotColor: string; bar: string }> = {
  success: { bg: "#f4fbf7", border: "#b5ddc8", accent: "#22c55e", dotBg: "#dcfce7", dotColor: "#16a34a", bar: "#22c55e" },
  error:   { bg: "#fdf4f4", border: "#f0bebe", accent: "#ef4444", dotBg: "#fee2e2", dotColor: "#dc2626", bar: "#ef4444" },
  warning: { bg: "#fdf8f0", border: "#f0d9a0", accent: "#f59e0b", dotBg: "#fef3c7", dotColor: "#d97706", bar: "#f59e0b" },
  info:    { bg: "#f2f6fd", border: "#b8cff0", accent: "#3b82f6", dotBg: "#dbeafe", dotColor: "#2563eb", bar: "#3b82f6" },
};

const darkTokens: Record<NotificationType, { bg: string; border: string; accent: string; dotBg: string; dotColor: string; bar: string }> = {
  success: { bg: "#0d1f14", border: "#1a3a24", accent: "#16a34a", dotBg: "#14532d", dotColor: "#4ade80", bar: "#16a34a" },
  error:   { bg: "#1f0d0d", border: "#3a1a1a", accent: "#dc2626", dotBg: "#7f1d1d", dotColor: "#fca5a5", bar: "#dc2626" },
  warning: { bg: "#1f1a0d", border: "#3a3010", accent: "#d97706", dotBg: "#78350f", dotColor: "#fcd34d", bar: "#d97706" },
  info:    { bg: "#0d1525", border: "#1a2a45", accent: "#2563eb", dotBg: "#1e3a5f", dotColor: "#93c5fd", bar: "#2563eb" },
};

export const Notification = ({
  message,
  description,
  type = "info",
  timeout = 4000,
  theme = "light",
  onClose,
}: NotificationProps) => {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(100);

  const tokens = theme === "dark" ? darkTokens[type] : lightTokens[type];
  const titleColor = theme === "dark" ? "#f0f0f0" : "#1a1a1a";
  const subColor = theme === "dark" ? "#8a8a8a" : "#6b7280";
  const closeColor = theme === "dark" ? "#555" : "#9ca3af";
  const closeHoverBg = theme === "dark" ? "#2a2a2a" : "#e5e7eb";

  const close = useCallback(() => {
    setExiting(true);
    setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, 380);
  }, [onClose]);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible || timeout === 0) return;
    const start = Date.now();
    const id = setInterval(() => {
      const remaining = Math.max(0, 100 - ((Date.now() - start) / timeout) * 100);
      setProgress(remaining);
      if (remaining === 0) { clearInterval(id); close(); }
    }, 16);
    return () => clearInterval(id);
  }, [visible, timeout, close]);

  return (
    <>
      <style>{`
        .n-wrap {
          position: fixed; top: 0; left: 50%;
          transform: translateX(-50%) translateY(-110%);
          transition: transform 0.42s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 9999; pointer-events: none;
        }
        .n-wrap.in  { transform: translateX(-50%) translateY(0); pointer-events: all; }
        .n-wrap.out { transform: translateX(-50%) translateY(-110%); transition: transform 0.35s cubic-bezier(0.4,0,0.6,1); pointer-events: none; }
        .n-box {
          display: flex; align-items: center; gap: 12px;
          padding: 13px 14px 13px 0;
          min-width: 320px; max-width: 500px;
          position: relative; overflow: hidden;
          border-radius: 0 0 8px 8px;
          border: 0.5px solid; border-top: none;
        }
        .n-accent { width: 3px; align-self: stretch; border-radius: 0 2px 2px 0; flex-shrink: 0; margin-right: 2px; }
        .n-icon { width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 500; flex-shrink: 0; }
        .n-body { flex: 1; }
        .n-title { font-size: 16px; font-weight: 500; margin: 0 0 2px; }
        .n-desc  { font-size: 14px; margin: 0; }
        .n-close { width: 22px; height: 22px; border-radius: 4px; border: none; cursor: pointer; background: transparent; display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0; transition: background 0.15s; padding: 0; margin-right: 2px; }
        .n-bar { position: absolute; bottom: 0; left: 0; height: 2px; transition: width 0.016s linear; }
      `}</style>

      <div className={`n-wrap${visible ? " in" : ""}${exiting ? " out" : ""}`}>
        <div
          className="n-box"
          style={{ background: tokens.bg, borderColor: tokens.border }}
        >
          <div className="n-accent" style={{ background: tokens.accent }} />
          <div className="n-icon" style={{ background: tokens.dotBg, color: tokens.dotColor }}>
            {icons[type]}
          </div>
          <div className="n-body">
            <p className="n-title" style={{ color: titleColor }}>{message}</p>
            {description && <p className="n-desc" style={{ color: subColor }}>{description}</p>}
          </div>
          <button
            className="n-close"
            style={{ color: closeColor }}
            onMouseEnter={e => (e.currentTarget.style.background = closeHoverBg)}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            onClick={close}
            aria-label="Close"
          >
            ✕
          </button>
          {timeout > 0 && (
            <div className="n-bar" style={{ width: `${progress}%`, background: tokens.bar }} />
          )}
        </div>
      </div>
    </>
  );
};
