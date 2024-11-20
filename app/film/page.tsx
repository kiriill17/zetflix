'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronDown, Heart } from 'lucide-react';
import React from 'react';

export default function Page() {
  const [arrFilms, setArrFilms] = React.useState<any[]>([]);

  React.useEffect(() => {
    (async () => {
      const response = await fetch('/api/film');
      const data = await response.json().catch(() => []);
      setArrFilms(data);
    })();
  }, []);
  return (
    <div className="px-10 max-w-screen-xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Все фильмы</h1>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex">
            Сортировать по <ChevronDown className="ml-2" width={18} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="cursor-pointer">Рейтингу</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Сначала старые</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Сначала новые</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-y-6 mt-8">
        {!arrFilms.length ? (
          <>
            {Array.from({ length: 9 }).map((_, index) => (
              <Skeleton key={index} className="w-[240px] h-[370px] rounded-xl" />
            ))}
          </>
        ) : (
          <>
            {arrFilms.map((obj, index) => (
              <div key={index} className="p-1 border-2 rounded-xl select-none sm:w-64 w-full">
                <img
                  src={obj.placeholder}
                  alt="#"
                  className="rounded h-60 object-cover"
                  width={'100%'}
                />
                <h1 className="mt-2 ">{obj.name}</h1>

                <p className="font-light text-sm">2024</p>
                <p className="font-light text-sm">imdb: {obj.imdb}</p>
                <div className="flex justify-between items-center mt-2 mb-1">
                  <a href={`/film/${obj.id}`}>
                    <Button className="p-1 h-8 bg-black text-white border-2 hover:text-black">
                      Смотреть
                    </Button>
                  </a>
                  <a href="">
                    <Heart strokeWidth={1.25} width={20} />
                  </a>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
