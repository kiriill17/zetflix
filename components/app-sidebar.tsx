'use client';

import { Drum, Film, LogOut, Popcorn, Volleyball } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Button } from './ui/button';
import { useSession, signOut, signIn } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Menu items.
const items = [
  {
    title: 'Фильмы',
    url: '/film',
    icon: Popcorn,
  },
  {
    title: 'Сериалы',
    url: '#',
    icon: Film,
  },
  {
    title: 'Мультфилтьмы',
    url: '#',
    icon: Drum,
  },
  {
    title: 'Спорт',
    url: '#',
    icon: Volleyball,
  },
];

export function AppSidebar() {
  const session = useSession();

  return (
    <Sidebar>
      <SidebarHeader>
        <a href="/">
          <div className="px-2 py-2">
            <h1 className="text-lg font-semibold">Zetflix</h1>
            <p className="text-xs font-light">Киносайт от Кирилла</p>
          </div>
        </a>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Виды</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-2 py-2">
          {!session.data?.user?.name ? (
            <>
              <a href="/login">
                <Button onClick={() => signIn()} className="mb-2 w-full" variant="outline">
                  Войти
                </Button>
              </a>
              <a href="/register">
                <Button className="w-full" variant="outline">
                  Зарегистрироваться
                </Button>
              </a>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <div className="ml-2 flex flex-col">
                    <h1>{session.data?.user?.name}</h1>
                    <p className="text-xs font-light">{session.data?.user?.email}</p>
                  </div>
                </div>

                <LogOut
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-gray-500 transition cursor-pointer hover:text-amber-700"
                />
              </div>
            </>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
