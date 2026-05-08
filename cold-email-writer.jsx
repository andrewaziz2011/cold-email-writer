import { useState } from "react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
  
  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  :root {
    --bg: #f5f2ee;
    --card: #ffffff;
    --ink: #1a1814;
    --muted: #8a8580;
    --accent: #c8410a;
    --accent-light: #fdf1ec;
    --border: #e8e4de;
    --success: #2d6a4f;
  }

  body { background: var(--bg); }

  .grain {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    opacity: 0.4;
  }

  .app {
    position: relative; z-index: 1;
    min-height: 100vh;
    font-family: 'DM Sans', sans-serif;
    color: var(--ink);
    max-width: 680px;
    margin: 0 auto;
    padding: 48px 24px 80px;
  }

  .badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: var(--accent); color: white;
    font-size: 10px; font-weight: 600; letter-spacing: 2px;
    padding: 4px 10px; border-radius: 20px;
    text-transform: uppercase; margin-bottom: 20px;
  }

  .badge-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: rgba(255,255,255,0.6);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }

  h1 {
    font-family: 'Instrument Serif', serif;
    font-size: clamp(34px, 6vw, 50px);
    line-height: 1.08; letter-spacing: -1px;
    color: var(--ink); margin-bottom: 12px;
  }
  h1 em { font-style: italic; color: var(--accent); }

  .subtitle {
    font-size: 15px; color: var(--muted);
    line-height: 1.6; margin-bottom: 36px; max-width: 480px;
  }

  .progress-bar {
    height: 3px; background: var(--border);
    border-radius: 2px; margin-bottom: 28px; overflow: hidden;
  }
  .progress-fill {
    height: 100%; background: linear-gradient(90deg, var(--accent), #f97316);
    border-radius: 2px; transition: width 0.4s ease;
  }

  .card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 16px; padding: 24px;
    margin-bottom: 14px; box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  }

  .section-label {
    font-size: 10px; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; color: var(--muted);
    margin-bottom: 18px; display: flex; align-items: center; gap: 8px;
  }
  .section-label::after { content: ''; flex: 1; height: 1px; background: var(--border); }

  .field { margin-bottom: 14px; }
  .field:last-child { margin-bottom: 0; }

  .field-header {
    display: flex; justify-content: space-between;
    align-items: baseline; margin-bottom: 5px;
  }

  .field label {
    font-size: 13px; font-weight: 600; color: var(--ink);
  }

  .required-star { color: var(--accent); margin-left: 2px; }

  .field-desc {
    font-size: 12px; color: var(--muted);
    margin-bottom: 7px; line-height: 1.5;
  }

  .char-count { font-size: 11px; color: var(--muted); }
  .char-count.warn { color: #e67e22; }
  .char-count.over { color: #e74c3c; }

  .field input, .field textarea, .field select {
    width: 100%; padding: 11px 14px;
    background: var(--bg); border: 1.5px solid var(--border);
    border-radius: 10px; font-family: 'DM Sans', sans-serif;
    font-size: 14px; color: var(--ink);
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
    outline: none; resize: none; appearance: none; -webkit-appearance: none;
  }
  .field input:focus, .field textarea:focus, .field select:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(200, 65, 10, 0.08);
    background: white;
  }
  .field textarea { min-height: 90px; line-height: 1.6; }
  .field select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238a8580' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 14px center;
    padding-right: 36px; cursor: pointer;
  }

  .tone-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
  .tone-btn {
    padding: 10px 6px; border-radius: 8px;
    border: 1.5px solid var(--border); background: var(--bg);
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    font-size: 12px; font-weight: 500; color: var(--muted);
    text-align: center; transition: all 0.15s; line-height: 1.4;
  }
  .tone-emoji { display: block; font-size: 18px; margin-bottom: 2px; }
  .tone-btn:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-light); }
  .tone-btn.active { border-color: var(--accent); background: var(--accent-light); color: var(--accent); font-weight: 600; }

  .error-box {
    background: #fff8f6; border: 1.5px solid #fbd5c8;
    border-radius: 10px; padding: 13px 16px;
    font-size: 13px; color: var(--accent);
    margin-bottom: 12px; line-height: 1.5;
    display: flex; gap: 8px; align-items: flex-start;
  }

  .generate-btn {
    width: 100%; padding: 16px;
    background: var(--ink); color: white; border: none;
    border-radius: 12px; font-family: 'DM Sans', sans-serif;
    font-size: 15px; font-weight: 600; letter-spacing: 0.3px;
    cursor: pointer; transition: all 0.2s; margin-top: 6px;
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .generate-btn:hover:not(:disabled) { background: var(--accent); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(200,65,10,0.3); }
  .generate-btn:active:not(:disabled) { transform: translateY(0); }
  .generate-btn:disabled { opacity: 0.55; cursor: not-allowed; }

  .spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white; border-radius: 50%;
    animation: spin 0.7s linear infinite; flex-shrink: 0;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .results-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 20px;
  }
  .results-title { font-family: 'Instrument Serif', serif; font-size: 24px; color: var(--ink); }
  .count-badge {
    background: var(--accent-light); color: var(--accent);
    font-size: 11px; font-weight: 600; padding: 4px 12px;
    border-radius: 20px; letter-spacing: 0.5px;
  }

  .email-card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 14px; overflow: hidden; margin-bottom: 14px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04); transition: box-shadow 0.2s;
  }
  .email-card:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.08); }

  .email-header {
    padding: 14px 18px; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    background: linear-gradient(to right, var(--accent-light), transparent);
  }
  .email-num { font-size: 11px; font-weight: 700; color: var(--accent); letter-spacing: 1.5px; text-transform: uppercase; }

  .copy-btn {
    display: flex; align-items: center; gap: 5px;
    padding: 5px 12px; border-radius: 6px;
    border: 1px solid var(--border); background: white;
    font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500;
    color: var(--muted); cursor: pointer; transition: all 0.15s;
  }
  .copy-btn:hover { border-color: var(--accent); color: var(--accent); }
  .copy-btn.copied { border-color: var(--success); color: var(--success); background: #f0faf5; }

  .email-body { padding: 18px 20px; }

  .subject-row {
    display: flex; gap: 10px; align-items: baseline;
    margin-bottom: 14px; padding-bottom: 14px;
    border-bottom: 1px dashed var(--border);
  }
  .subject-label { font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--muted); flex-shrink: 0; }
  .subject-text { font-size: 14px; font-weight: 600; color: var(--ink); line-height: 1.4; }

  .email-text { font-size: 14px; line-height: 1.8; color: #3a3630; white-space: pre-wrap; }

  .followup-section {
    margin-top: 14px; padding-top: 14px;
    border-top: 1px dashed var(--border);
  }
  .followup-label {
    font-size: 10px; font-weight: 700; letter-spacing: 1.5px;
    text-transform: uppercase; color: var(--muted); margin-bottom: 8px;
    display: flex; align-items: center; gap: 6px;
  }
  .followup-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--muted); }
  .followup-text { font-size: 13px; line-height: 1.75; color: #6a6560; white-space: pre-wrap; }

  .reset-btn {
    display: inline-flex; align-items: center; gap: 6px;
    background: none; border: 1.5px solid var(--border);
    border-radius: 8px; padding: 8px 16px;
    font-family: 'DM Sans', sans-serif; font-size: 12px;
    font-weight: 500; color: var(--muted); cursor: pointer;
    transition: all 0.15s; margin-bottom: 22px;
  }
  .reset-btn:hover { border-color: var(--ink); color: var(--ink); }

  .footer { text-align: center; margin-top: 48px; font-size: 12px; color: var(--muted); }
  .footer strong { color: var(--accent); }
`;

const TONES = [
  { id: "professional", label: "Professional", emoji: "💼" },
  { id: "conversational", label: "Casual", emoji: "👋" },
  { id: "direct", label: "Direct", emoji: "⚡" },
  { id: "curious", label: "Curious", emoji: "🤔" },
  { id: "bold", label: "Bold", emoji: "🔥" },
  { id: "warm", label: "Warm", emoji: "🤝" },
];

const OUTCOMES = [
  "Book a 15-minute call",
  "Schedule a demo",
  "Get a reply to learn more",
  "Visit my website",
  "Start a free trial",
  "Custom...",
];

function getProgress(form) {
  const fields = [form.product, form.prospect_title, form.prospect_industry, form.pain_point, form.outcome, form.sender_name];
  return Math.round((fields.filter(Boolean).length / fields.length) * 100);
}

export default function ColdEmailWriter() {
  const [form, setForm] = useState({
    product: "", prospect_title: "", prospect_industry: "",
    pain_point: "", outcome: "", custom_outcome: "",
    sender_name: "", tone: "professional",
  });
  const [emails, setEmails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState({});

  const update = (k, v) => { setForm(f => ({ ...f, [k]: v })); setError(null); };
  const progress = getProgress(form);
  const effectiveOutcome = form.outcome === "Custom..." ? form.custom_outcome : form.outcome;

  const validate = () => {
    if (!form.product.trim()) return "Please describe what you're offering.";
    if (form.product.trim().length < 10) return "Please add a bit more detail about your offer.";
    if (!form.prospect_title.trim()) return "Please enter your prospect's job title.";
    if (!form.pain_point.trim()) return "Please describe the problem you're solving — this makes your emails much better.";
    if (!effectiveOutcome.trim()) return "Please select or enter what you want prospects to do.";
    if (!form.sender_name.trim()) return "Please enter your name for the sign-off.";
    return null;
  };

  const generate = async () => {
    const err = validate();
    if (err) { setError(err); return; }
    setError(null); setLoading(true); setEmails(null);

    const prompt = `You are a world-class cold email copywriter. Generate exactly 3 cold email variations each with a distinct angle, plus a short follow-up for each.

CONTEXT:
- What they're selling: ${form.product}
- Who they're emailing: ${form.prospect_title}${form.prospect_industry ? ` in ${form.prospect_industry}` : ""}
- Problem being solved: ${form.pain_point}
- Desired action: ${effectiveOutcome}
- Sender name: ${form.sender_name}
- Tone: ${form.tone}

Return ONLY valid JSON, no markdown, no backticks:
{"emails":[{"angle":"One-word hook label","subject":"Under 45 chars","body":"80-110 words with \\n line breaks","followup":"40-60 word day-3 follow-up"},{"angle":"...","subject":"...","body":"...","followup":"..."},{"angle":"...","subject":"...","body":"...","followup":"..."}]}

Rules: Never open with "I hope", "My name is", or "I wanted to reach out". Each variation uses a completely different hook. End with one low-friction CTA. Sign as ${form.sender_name}.`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { 
  "Content-Type": "application/json",
  "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
  "anthropic-version": "2023-06-01"
},
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1500,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      const raw = data.content?.find(b => b.type === "text")?.text || "";
      const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
      if (!parsed.emails?.length) throw new Error("empty");
      setEmails(parsed.emails);
    } catch (e) {
      const msg = e.message;
      if (msg.includes("401")) setError("Invalid API key. Please check your Anthropic API key.");
      else if (msg.includes("429")) setError("Too many requests — please wait a moment and try again.");
      else setError("Generation failed. Please check your inputs and try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyEmail = (idx, email) => {
    navigator.clipboard.writeText(`Subject: ${email.subject}\n\n${email.body}\n\n---\nFollow-up (Day 3):\n${email.followup}`);
    setCopied(c => ({ ...c, [idx]: true }));
    setTimeout(() => setCopied(c => ({ ...c, [idx]: false })), 2500);
  };

  return (
    <>
      <style>{STYLES}</style>
      <div className="grain" />
      <div className="app">
        <div className="badge"><span className="badge-dot" />AI-Powered</div>
        <h1>Cold emails that<br /><em>actually get replies.</em></h1>
        <p className="subtitle">Fill in your details and get 3 ready-to-send cold email variations — each with a follow-up — in seconds.</p>

        {!emails ? (
          <>
            <div className="progress-bar"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>

            <div className="card">
              <div className="section-label">Your Offer</div>
              <div className="field">
                <div className="field-header">
                  <label>What are you offering?<span className="required-star">*</span></label>
                  <span className={`char-count ${form.product.length > 180 ? 'over' : form.product.length > 140 ? 'warn' : ''}`}>{form.product.length}/200</span>
                </div>
                <div className="field-desc">Describe your product or service in 1–3 sentences. More detail = better emails.</div>
                <textarea placeholder='e.g. I help e-commerce brands reduce cart abandonment by 30% using AI-powered email sequences. Clients typically see ROI within 30 days.' value={form.product} onChange={e => update("product", e.target.value)} maxLength={200} />
              </div>
              <div className="field">
                <label>Your name<span className="required-star">*</span></label>
                <input placeholder="e.g. Andrew" value={form.sender_name} onChange={e => update("sender_name", e.target.value)} />
              </div>
            </div>

            <div className="card">
              <div className="section-label">Who You're Emailing</div>
              <div className="field">
                <label>Their job title<span className="required-star">*</span></label>
                <input placeholder="e.g. VP of Marketing, Head of Sales, Founder" value={form.prospect_title} onChange={e => update("prospect_title", e.target.value)} />
              </div>
              <div className="field">
                <label>Their industry</label>
                <input placeholder="e.g. SaaS, E-commerce, Real Estate" value={form.prospect_industry} onChange={e => update("prospect_industry", e.target.value)} />
              </div>
              <div className="field">
                <label>What problem are you solving for them?<span className="required-star">*</span></label>
                <div className="field-desc">The more specific this is, the better your emails will convert.</div>
                <input placeholder="e.g. They spend hours manually writing follow-up emails every week" value={form.pain_point} onChange={e => update("pain_point", e.target.value)} />
              </div>
            </div>

            <div className="card">
              <div className="section-label">Desired Action</div>
              <div className="field">
                <label>What do you want them to do?<span className="required-star">*</span></label>
                <div className="field-desc">Pick one action — the simpler the ask, the higher the reply rate.</div>
                <select value={form.outcome} onChange={e => update("outcome", e.target.value)}>
                  <option value="" disabled>Select an outcome...</option>
                  {OUTCOMES.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              {form.outcome === "Custom..." && (
                <div className="field">
                  <label>Describe the action</label>
                  <input placeholder="e.g. Download our free audit report" value={form.custom_outcome} onChange={e => update("custom_outcome", e.target.value)} />
                </div>
              )}
            </div>

            <div className="card">
              <div className="section-label">Email Tone</div>
              <div className="tone-grid">
                {TONES.map(t => (
                  <button key={t.id} className={`tone-btn ${form.tone === t.id ? "active" : ""}`} onClick={() => update("tone", t.id)}>
                    <span className="tone-emoji">{t.emoji}</span>{t.label}
                  </button>
                ))}
              </div>
            </div>

            {error && <div className="error-box"><span>⚠️</span><span>{error}</span></div>}

            <button className="generate-btn" onClick={generate} disabled={loading}>
              {loading ? <><div className="spinner" />Writing your emails...</> : <>✦ Generate 3 Cold Emails + Follow-ups</>}
            </button>
          </>
        ) : (
          <>
            <button className="reset-btn" onClick={() => { setEmails(null); setError(null); }}>← Start Over</button>
            <div className="results-header">
              <div className="results-title">Your emails are ready</div>
              <div className="count-badge">3 variations</div>
            </div>
            {emails.map((email, i) => (
              <div className="email-card" key={i}>
                <div className="email-header">
                  <div className="email-num">Variation {i + 1}{email.angle ? ` · ${email.angle}` : ""}</div>
                  <button className={`copy-btn ${copied[i] ? "copied" : ""}`} onClick={() => copyEmail(i, email)}>
                    {copied[i] ? "✓ Copied!" : "⎘ Copy all"}
                  </button>
                </div>
                <div className="email-body">
                  <div className="subject-row">
                    <span className="subject-label">Subject</span>
                    <span className="subject-text">{email.subject}</span>
                  </div>
                  <div className="email-text">{email.body}</div>
                  <div className="followup-section">
                    <div className="followup-label"><span className="followup-dot" />Follow-up · Day 3</div>
                    <div className="followup-text">{email.followup}</div>
                  </div>
                </div>
              </div>
            ))}
            <button className="generate-btn" onClick={generate} disabled={loading}>
              {loading ? <><div className="spinner" />Regenerating...</> : <>↺ Generate New Variations</>}
            </button>
          </>
        )}
        <div className="footer">Powered by <strong>AI</strong> · Built for closers</div>
      </div>
    </>
  );
}
