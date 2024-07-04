import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Layout from '@/components/Layout';
import StatisticBar from '@/components/StatisticBar';

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function Home() {
  const [battery, setBattery] = useState(null);
  const [time, setTime] = useState('');
  const [runtime, setRuntime] = useState('');
  const [totalRequests, setTotalRequests] = useState(0);

  useEffect(() => {
    // Battery
    if ('getBattery' in navigator) {
      navigator.getBattery().then(function(battery) {
        setBattery(battery.level * 100);
      });
    }

    // Time
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta' }));
    };
    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    // Runtime
    const startTime = new Date();
    const updateRuntime = () => {
      const now = new Date();
      const diff = now - startTime;
      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setRuntime(`${hours}:${minutes}:${seconds}`);
    };
    updateRuntime();
    const runtimeInterval = setInterval(updateRuntime, 1000);

    // Fetch total requests
    const fetchTotalRequests = async () => {
      try {
        const response = await fetch('/api/total-requests');
        const data = await response.json();
        setTotalRequests(data.totalRequests);
      } catch (error) {
        console.error('Error fetching total requests:', error);
      }
    };
    fetchTotalRequests();

    return () => {
      clearInterval(timeInterval);
      clearInterval(runtimeInterval);
    };
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <StatisticBar totalRequests={totalRequests} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">System Info</h2>
            <p>Battery: {battery ? `${battery.toFixed(2)}%` : 'N/A'}</p>
            <p>Time (WIB): {time}</p>
            <p>Runtime: {runtime}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">API Requests</h2>
            <ApexCharts
              options={{
                chart: { type: 'radialBar' },
                plotOptions: {
                  radialBar: {
                    hollow: { size: '70%' }
                  }
                },
                labels: ['API Requests']
              }}
              series={[totalRequests]}
              type="radialBar"
              height={350}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}