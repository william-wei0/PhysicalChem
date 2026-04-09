import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import styles from "./styles/ContactUs.module.css";

export default function ContactForm() {
  const form = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState("");

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = form.current;
    if (!formElement) return;
    setStatus("sending");

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formElement,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      .then(() => { setStatus("sent"); formElement.reset(); })
      .catch(() => setStatus("error"));
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Contact us</h1>

      <form ref={form} onSubmit={sendEmail}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName">First name</label>
            <input type="text" id="firstName" name="firstName" placeholder="John" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="lastName">Last name</label>
            <input type="text" id="lastName" name="lastName" placeholder="Smith" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email address</label>
            <input type="email" id="email" name="email" placeholder="john@example.com" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone number</label>
            <input type="tel" id="phone" name="phone" placeholder="+1 (000) 000-0000" />
          </div>
          <div className={`${styles.formGroup} ${styles.full}`}>
            <label htmlFor="subject">Title</label>
            <input type="text" id="title" name="title" placeholder="Title..." />
          </div>
          <div className={`${styles.formGroup} ${styles.full}`}>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" placeholder="Tell us how we can help…" required />
          </div>
        </div>

        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </button>

        {status === "sent" && (
          <p className={styles.statusSent}>Message sent! We'll be in touch soon.</p>
        )}
        {status === "error" && (
          <p className={styles.statusError}>Something went wrong. Please try again.</p>
        )}
      </form>
    </div>
  );
}