import { useState } from 'react';
import axios from 'axios';

export default function ScanPage() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveScanToLocal = (url, data) => {
    const scans = JSON.parse(localStorage.getItem('scans')) || [];

    const newScan = {
      url,
      result: data.result,
      confidence: data.confidence,
      scannedAt: new Date().toISOString()
    };

    scans.push(newScan);
    localStorage.setItem('scans', JSON.stringify(scans));

    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('scanSaved', { detail: newScan }));
    
    // Also trigger storage event for cross-tab sync
    window.dispatchEvent(new Event('storage'));
  };

  const handleScan = async () => {
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/scan`,
        { url }
      );

      setResult(res.data);
      saveScanToLocal(url, res.data); // 🔥 IMPORTANT LINE

    } catch (err) {
      setError('Scan failed. Backend not reachable.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card w-full max-w-2xl p-10">
      <h2 className="text-xl font-semibold mb-6 text-white">
        Scan a Website URL
      </h2>

      <div className="flex gap-4">
        <input
          type="text"
          className="input-box"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleScan()}
        />

        <button
          onClick={handleScan}
          disabled={loading}
          className="primary-btn"
        >
          {loading ? 'Scanning...' : 'Scan'}
        </button>
      </div>

      {error && (
        <p className="mt-4 text-red-400 text-sm">
          {error}
        </p>
      )}

      {result && (
        <div className="mt-8 p-6 rounded-xl bg-black/40 border border-white/10">
          <p
            className={`text-2xl font-bold ${
              result.result === 'PHISHING'
                ? 'text-red-500'
                : 'text-green-400'
            }`}
          >
            {result.result}
          </p>

          <p className="text-sm text-gray-400 mt-2">
            Confidence:{' '}
            <span className="text-white">
              {result.confidence}%
            </span>
          </p>

          <div className="mt-3 h-2 bg-white/10 rounded">
            <div
              className={`h-2 rounded ${
                result.result === 'PHISHING'
                  ? 'bg-red-500'
                  : 'bg-green-500'
              }`}
              style={{ width: `${result.confidence}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
