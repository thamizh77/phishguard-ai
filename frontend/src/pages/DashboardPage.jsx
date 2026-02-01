import { useState, useEffect } from 'react';
import axios from 'axios';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalScans: 0,
    phishingDetected: 0,
    safeUrls: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/stats`
        );
        setStats(res.data);
      } catch (err) {
        // Endpoint may not exist yet, set defaults
        setStats({ totalScans: 0, phishingDetected: 0, safeUrls: 0 });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="text-white">Loading dashboard...</div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6">
          <div className="text-gray-400 text-sm mb-2">Total Scans</div>
          <div className="text-3xl font-bold text-white">{stats.totalScans}</div>
        </div>
        <div className="glass-card p-6">
          <div className="text-gray-400 text-sm mb-2">Phishing Detected</div>
          <div className="text-3xl font-bold text-red-400">{stats.phishingDetected}</div>
        </div>
        <div className="glass-card p-6">
          <div className="text-gray-400 text-sm mb-2">Safe URLs</div>
          <div className="text-3xl font-bold text-green-400">{stats.safeUrls}</div>
        </div>
      </div>
    </div>
  );
}
