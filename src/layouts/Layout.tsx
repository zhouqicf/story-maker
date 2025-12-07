import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  showNav?: boolean;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 font-sans text-slate-800 flex justify-center p-0 md:p-8">
      <div className="w-full max-w-md bg-white min-h-screen md:min-h-[800px] md:h-auto md:rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col border-[8px] border-white/20">
        {children}
      </div>
    </div>
  );
}
