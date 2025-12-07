import React from 'react';
import { Outlet } from 'react-router-dom';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center font-body text-candy-text p-0 md:p-8">
       {/* Mobile Container - simulate a large phone or tablet on desktop */}
      <div className="w-full h-[100dvh] md:h-[850px] md:max-w-[480px] bg-white relative shadow-2xl md:rounded-[3rem] overflow-hidden flex flex-col border-[8px] border-white ring-1 ring-gray-900/5">
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-hide">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
