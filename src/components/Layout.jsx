import React from 'react';
import Link from 'next/link';
import { IconLayoutDashboard, IconArticle, IconZzz, IconWallet, IconChartTreemap } from '@tabler/icons-react';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <Link href="/" className="text-2xl font-bold">Hosei API</Link>
        </div>
        <nav className="mt-8">
          <Link href="/" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
            <IconLayoutDashboard className="mr-3" />
            <span>Home</span>
          </Link>
          <Link href="/about" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
            <IconArticle className="mr-3" />
            <span>About Us</span>
          </Link>
          <Link href="/feedback" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
            <IconZzz className="mr-3" />
            <span>Feedback</span>
          </Link>
          <Link href="/donate" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
            <IconWallet className="mr-3" />
            <span>Donations</span>
          </Link>
          <Link href="/developers" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
            <IconChartTreemap className="mr-3" />
            <span>Developers</span>
          </Link>
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto">
        {children}
        <footer className="mt-8 text-center text-gray-500">
          <p>Design and Developed by <a href="/profile" target="_blank" className="text-blue-500 hover:underline">KyuuRzy & Irull2nd</a></p>
        </footer>
      </main>
    </div>
  );
};

export default Layout;