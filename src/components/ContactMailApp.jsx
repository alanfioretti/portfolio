// src/components/ContactMailApp.jsx
import { useState, useRef } from "react";
import "../styles/ContactMailApp.css";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";

const ContactMailApp = () => {

  // All form inputs + honeypot
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
    botcheck: ""
  });

  const [status, setStatus] = useState({ state: "idle", note: "" });

  const startedAt = useRef(Date.now());

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If botcheck contains anything: drop silently
    if (form.botcheck) return;

    // Human-time gating
    if (Date.now() - startedAt.current < 1200) return;

    // Email sanity check
    if (!form.email.includes("@") || form.email.length > 120) {
      setStatus({ state: "error", note: "Invalid email address." });
      return;
    }
    //Human confidence high
    setStatus({
      state: "sending",
      note: "Transmitting via grackle relay…"
    });

    try {
      // Build the payload that Web3Forms expects
      const payload = {
        access_key: "df1704b2-d9d9-4df7-8f2f-084f33553b8f",
        name: form.name,
        email: form.email,
        company: form.company,
        subject: form.subject,
        message: form.message,
        botcheck: form.botcheck
      };

      const res = await fetch(WEB3FORMS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Send failed");
      }

      // Success
      setStatus({
        state: "sent",
        note: "Thanks for reaching out! I’ll get back to you soon."
      });

      // Reset form fields
      setForm({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
        botcheck: ""
      });

    } catch (err) {
      console.error("SEND ERROR:", err);
      setStatus({
        state: "error",
        note: err.message || "Message failed to send."
      });
    }
  };

  return (
    <div className="mail-app">
      <div className="mail-app-title">Compose</div>

      <form className="mail-form" onSubmit={handleSubmit} autoComplete="off">

        {/* Honeypot */}
        <input
          type="text"
          name="botcheck"
          value={form.botcheck}
          onChange={onChange}
          className="hp"
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="row required">
          <label>From</label>
          <input
            required
            name="name"
            placeholder="Your name"
            maxLength={60}
            value={form.name}
            onChange={onChange}
          />
        </div>

        <div className="row">
          <label>Company</label>
          <input
            name="company"
            placeholder="Your company"
            maxLength={80}
            value={form.company}
            onChange={onChange}
          />
        </div>

        <div className="row required">
          <label>Email</label>
          <input
            required
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={onChange}
          />
        </div>

        <div className="row required">
          <label>Subject</label>
          <input
            required
            name="subject"
            placeholder="Let’s build something"
            maxLength={120}
            value={form.subject}
            onChange={onChange}
          />
        </div>

        <div className="row required">
          <label>Message</label>
          <textarea
            required
            name="message"
            rows={6}
            placeholder="Tell me about the project…"
            maxLength={3000}
            value={form.message}
            onChange={onChange}
          />
        </div>

        <div className="actions">
          <button type="submit" disabled={status.state === "sending"}>
            {status.state === "sending" ? "Sending…" : "Send"}
          </button>

          {status.note && (
            <span className={`status ${status.state}`}>
              {status.note}
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default ContactMailApp;
