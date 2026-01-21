import { Link } from "react-router"
import type { CSSProperties } from "react";

export default function Navbar() {
  return (
    <>
      <nav style={styles.nav}>
        {/* Left: Logo */}
        <Link to="/" style={styles.logo}>
          {/* Replace text with an <img /> if you have a logo image */}
          MyWebsite
        </Link>

        {/* Middle: Nav Links */}
        <div style={styles.links}>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/lessons/lesson1" style={styles.link}>Lesson1</Link>
          <Link to="/lessons/lesson2" style={styles.link}>Lesson2</Link>
        </div>

        {/* Right: Account Icon */}
        <Link to="/" style={styles.account}>
          <span style={styles.accountIcon} aria-hidden="true">👤</span>
          <span style={styles.srOnly}>Account</span>
        </Link>
      </nav>
    </>
  );
}

const styles: Record<string, CSSProperties> = {
  header: {
    width: "100%",
    borderBottom: "1px solid #e5e7eb",
    background: "white",
  },
  nav: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "14px 18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
  },
  logo: {
    fontWeight: 700,
    fontSize: "18px",
    textDecoration: "none",
    color: "#111827",
  },
  links: {
    display: "flex",
    gap: "18px",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    color: "#374151",
    fontWeight: 500,
  },
  account: {
    textDecoration: "none",
    color: "#111827",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  accountIcon: {
    fontSize: "20px",
    lineHeight: 1,
  },
  srOnly: {
    position: "absolute",
    left: "-9999px",
  },
};
