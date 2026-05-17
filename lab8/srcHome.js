import React, { useState, useEffect } from 'react';

export default function Home() {
  const [longUrl, setLongUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [error, setError] = useState('');
  const [urlList, setUrlList] = useState(() => {
    // Load links saved previously from localStorage
    const saved = localStorage.getItem('snapLinks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('snapLinks', JSON.stringify(urlList));
  }, [urlList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!longUrl) {
      setError('Please input a valid URL configuration.');
      return;
    }

    // Generate random string if user did not specify a custom code
    let shortCode = customCode.trim().replaceAll(' ', '-');
    if (!shortCode) {
      shortCode = Math.random().toString(36).substring(2, 7);
    } else {
      // Validate unique custom code requirement
      const codeExists = urlList.some(item => item.shortCode.toLowerCase() === shortCode.toLowerCase());
      if (codeExists) {
        setError('This custom link extension is already taken. Please try another.');
        return;
      }
    }

    const newLink = {
      id: Date.now(),
      longUrl,
      shortCode,
      shortUrl: `${window.location.origin}/${shortCode}`
    };

    setUrlList([newLink, ...urlList]);
    setLongUrl('');
    setCustomCode('');
  };

  return (
    <div className="container">
      <h2>Shorten a Long URL</h2>
      {error && <div className="error-msg">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Destination URL</label>
          <input 
            type="url" 
            placeholder="https://example.com/very/long/path/parameters" 
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Custom Short Link Extension (Optional)</label>
          <input 
            type="text" 
            placeholder="e.g., my-portfolio" 
            value={customCode}
            onChange={(e) => setCustomCode(e.target.value)}
          />
        </div>

        <button type="submit">Shorten URL</button>
      </form>

      <div className="history-section">
        <h3>Your Shortened Links</h3>
        {urlList.length === 0 ? (
          <p style={{ marginTop: '1rem', color: '#94a3b8' }}>No links generated yet.</p>
        ) : (
          urlList.map((link) => (
            <div key={link.id} className="url-card">
              <div className="url-details">
                <div className="long-url">{link.longUrl}</div>
              </div>
              <div>
                {/* Clicking mock link displays target destination in this frontend layout demo */}
                <a 
                  href={link.longUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="short-url"
                >
                  snap.link/{link.shortCode}
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}