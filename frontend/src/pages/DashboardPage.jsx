import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalScans: 0,
    phishingDetected: 0,
    safeUrls: 0
  });

  useEffect(() => {
    const scans = JSON.parse(localStorage.getItem("scans")) || [];

    const totalScans = scans.length;
    const phishingDetected = scans.filter(
      s => s.result === "PHISHING"
    ).length;
    const safeUrls = scans.filter(
      s => s.result === "SAFE"
    ).length;

    setStats({
      totalScans,
      phishingDetected,
      safeUrls
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6">
          <div className="text-gray-400 text-sm mb-2">Total Scans</div>
          <div className="text-3xl font-bold text-white">
            {stats.totalScans}
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="text-gray-400 text-sm mb-2">
            Phishing Detected
          </div>
          <div className="text-3xl font-bold text-red-400">
            {stats.phishingDetected}
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="text-gray-400 text-sm mb-2">Safe URLs</div>
          <div className="text-3xl font-bold text-green-400">
            {stats.safeUrls}
          </div>
        </div>
      </div>
    </div>
  );
}
