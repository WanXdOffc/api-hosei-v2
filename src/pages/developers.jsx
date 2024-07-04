import React from 'react';
import dynamic from 'next/dynamic';
import Layout from '@/components/Layout';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export default function Developers() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">API Documentation</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <SwaggerUI url="/api-docs.json" />
        </div>
      </div>
    </Layout>
  );
}