import { useEffect, useState } from 'react';

export default function ReportsPage() {
  const [scans, setScans] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const storedScans = JSON.parse(localStorage.getItem('scans')) || [];
    setScans(storedScans.reverse()); // latest first
  }, []);

  const filteredScans = scans.filter(scan => {
    if (filter === 'all') return true;
    if (filter === 'phishing') return scan.result === 'PHISHING';
    if (filter === 'safe') return scan.result === 'SAFE';
    return true;
  });

  const formatDate = (date) =>
    new Date(date).toLocaleString();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Reports</h1>

        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded ${
              filter === 'all' ? 'bg-cyan-600' : 'bg-gray-700'
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter('phishing')}
            className={`px-4 py-2 rounded ${
              filter === 'phishing' ? 'bg-red-600' : 'bg-gray-700'
            }`}
          >
            Phishing
          </button>

          <button
            onClick={() => setFilter('safe')}
            className={`px-4 py-2 rounded ${
              filter === 'safe' ? 'bg-green-600' : 'bg-gray-700'
            }`}
          >
            Safe
          </button>
        </div>
      </div>

      <div className="glass-card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 text-gray-400">
              <th className="text-left px-4 py-3">URL</th>
              <th className="text-left px-4 py-3">Result</th>
              <th className="text-left px-4 py-3">Confidence</th>
              <th className="text-left px-4 py-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {filteredScans.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-6 text-center text-gray-400">
                  No scan reports available
                </td>
              </tr>
            ) : (
              filteredScans.map((scan, i) => (
                <tr key={i} className="border-b border-white/5">
                  <td className="px-4 py-3 text-white text-sm">
                    {scan.url}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        scan.result === 'PHISHING'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-green-500/20 text-green-400'
                      }`}
                    >
                      {scan.result}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-gray-300">
                    {scan.confidence}%
                  </td>

                  <td className="px-4 py-3 text-gray-400 text-sm">
                    {formatDate(scan.scannedAt)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
