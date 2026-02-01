import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ReportsPage() {
  const [scans, setScans] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScans = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/scans`
        );
        setScans(res.data);
      } catch (err) {
        setScans([]);
      } finally {
        setLoading(false);
      }
    };

    fetchScans();
  }, []);

  const filteredScans = scans.filter((scan) => {
    if (filter === 'all') return true;
    if (filter === 'phishing') return scan.result === 'PHISHING';
    if (filter === 'safe') return scan.result === 'SAFE';
    return true;
  });

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  if (loading) {
    return <div className="text-white">Loading reports...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Reports</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-cyan-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('phishing')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'phishing'
                ? 'bg-red-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Phishing
          </button>
          <button
            onClick={() => setFilter('safe')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'safe'
                ? 'bg-green-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Safe
          </button>
        </div>
      </div>

      <div className="glass-card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-gray-400 font-medium">URL</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Result</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Confidence</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredScans.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-8 text-center text-gray-400">
                  No scans found
                </td>
              </tr>
            ) : (
              filteredScans.map((scan, index) => (
                <tr key={index} className="border-b border-white/5">
                  <td className="py-3 px-4 text-white text-sm">{scan.url}</td>
                  <td className="py-3 px-4">
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
                  <td className="py-3 px-4 text-gray-300 text-sm">{scan.confidence}%</td>
                  <td className="py-3 px-4 text-gray-400 text-sm">
                    {formatDate(scan.createdAt)}
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
