import { useState } from "react";
import axios from "axios";

export default function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleScan = async () => {
    if (!url.trim()) return setError("Please enter a URL");

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await axios.post("http://localhost:4000/api/scan", { url });
      setResult(res.data);
    } catch (err) {
      setError("Scan failed. Backend not reachable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* NAVBAR */}
      <nav className="px-10 py-6 border-b border-white/10">
        <h1 className="text-2xl font-bold text-white">
          Phish<span className="text-cyan-400">Guard</span> AI
        </h1>
        <p className="text-sm text-gray-400">
          Real-time phishing detection system
        </p>
      </nav>

      {/* MAIN */}
      <main className="flex flex-1 items-center justify-center px-6">
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
              onKeyDown={(e) => e.key === "Enter" && handleScan()}
            />

            <button
              onClick={handleScan}
              disabled={loading}
              className="primary-btn"
            >
              {loading ? "Scanning..." : "Scan"}
            </button>
          </div>

          {error && (
            <p className="mt-4 text-red-400 text-sm">{error}</p>
          )}

          {result && (
            <div className="mt-8 p-6 rounded-xl bg-black/40 border border-white/10">
              <p
                className={`text-2xl font-bold ${
                  result.result === "PHISHING"
                    ? "phishing"
                    : "safe"
                }`}
              >
                {result.result}
              </p>

              <p className="text-sm text-gray-400 mt-2">
                Confidence: <span className="text-white">{result.confidence}%</span>
              </p>

              <div className="mt-3 h-2 bg-white/10 rounded">
                <div
                  className={`h-2 rounded ${
                    result.result === "PHISHING"
                      ? "bg-red-500"
                      : "bg-green-500"
                  }`}
                  style={{ width: `${result.confidence}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
