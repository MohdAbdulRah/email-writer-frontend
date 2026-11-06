
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const apiUrl = import.meta.env.VITE_API;

const App = () => {
  const [text, setText] = useState('');
  const [tone, setTone] = useState('Professional');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!text.trim()) {
      setError('Please enter your email content.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setResponse('');

      const res = await axios.post(
        `${apiUrl}/email/generate`,
        {
          emailContent: text,
          tone: tone
        }
      );

      setResponse(res.data);
    } catch (err) {
      setError(
        err.response?.data || 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(response);
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="brand">
          <div className="brand-icon">E</div>
          <span>Email<span className="brand-highlight">Writer</span></span>
        </div>
        <span className="nav-tag">AI POWERED</span>
      </nav>

      <main className="main-container">

        <section className="hero">
          <span className="hero-label">SMART EMAIL ASSISTANT</span>
          <h1>Write better emails, <span>effortlessly.</span></h1>
          <p>
            Transform your thoughts into polished, professional emails
            with the power of AI.
          </p>
        </section>

        <div className="workspace">

          <section className="editor-card">
            <div className="card-heading">
              <div>
                <h2>Compose Email</h2>
                <p>Enter your email content below</p>
              </div>
              <span className="step-number">01</span>
            </div>

            <label>Email Content</label>

            <textarea
              className="email-input"
              placeholder="Hi John, I wanted to discuss the project deadline..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <div className="input-footer">
              <span>Describe your email in simple words</span>
              <span>{text.length} characters</span>
            </div>

            <div className="tone-section">
              <label htmlFor="tone">Choose Email Tone</label>

              <select
                id="tone"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
              >
                <option value="Professional">Professional</option>
                <option value="Formal">Formal</option>
                <option value="Friendly">Friendly</option>
                <option value="Casual">Casual</option>
                <option value="Apologetic">Apologetic</option>
                <option value="Persuasive">Persuasive</option>
              </select>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button
              className="generate-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Generating...
                </>
              ) : (
                <>
                  Generate Email <span>→</span>
                </>
              )}
            </button>
          </section>

          <section className="output-card">
            <div className="card-heading">
              <div>
                <h2>Generated Email</h2>
                <p>Your AI-crafted email will appear here</p>
              </div>
              <span className="step-number">02</span>
            </div>

            <div className={`output-content ${response ? 'has-content' : ''}`}>
              {response ? (
                <p>{response}</p>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">✉</div>
                  <h3>Your email is waiting</h3>
                  <p>
                    Enter your content, select a tone, and click
                    Generate Email to get started.
                  </p>
                </div>
              )}
            </div>

            {response && (
              <button className="copy-btn" onClick={handleCopy}>
                Copy Email
                <span>▢</span>
              </button>
            )}
          </section>

        </div>

        <footer>
          Built with React & Spring Boot · Powered by AI
        </footer>

      </main>
    </div>
  );
};

export default App;
