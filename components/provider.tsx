'use client';

import { SessionProvider } from 'next-auth/react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from '@/components/modeToggle';
import { Toaster } from '@/components/ui/toaster';
import NextTopLoader from 'nextjs-toploader';

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full">
            <SidebarTrigger />
            <ModeToggle />
            <NextTopLoader />
            {children}
            <Toaster />
          </main>
        </SidebarProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};
