'use client';

import film from '../public/filmm.mp4';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

//carusel
import * as React from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Heart } from 'lucide-react';

export default function Home() {
  const [arrFilms, setArrFilms] = React.useState<any[]>([]);

  React.useEffect(() => {
    (async () => {
      const response = await fetch('/api/film');
      const data = await response.json().catch(() => []);
      setArrFilms(data);
    })();
  }, []);

  return (
    <>
      {/* header */}
      <div className="h-96 relative w-full">
        <div className="h-96 flex bg-black opacity-50 ">
          <video className="w-full object-cover bg-black" autoPlay loop muted src={film} />
        </div>
        <div className="absolute w-full h-full flex flex-col px-16 justify-center top-0 left-0">
          <h1 className="text-4xl font-semibold text-center sm:text-left">Zetflix</h1>
          <p className="text-sm sm:w-1/2 font-light mt-2 w-full text-center sm:text-left">
            Сервис для просмотра фильмов бесплатно от Кирилла
          </p>
          <a href="#main">
            <Button
              variant="default"
              className="mx-auto sm:mx-0 mx-auto mx-0 text-white font-semibold bg-amber-700 mt-4 w-32 transition hover:bg-amber-600"
            >
              Смотреть
            </Button>
          </a>
        </div>
      </div>

      {/* films */}
      <div className="px-16 mb-4">
        <h1 className="text-2xl font-semibold mb-4 mt-10">Фильмы</h1>
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full "
        >
          <CarouselContent id="main">
            {!arrFilms.length ? (
              <>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/5">
                    <Skeleton className="w-[270px] h-[370px] rounded-xl" />
                  </CarouselItem>
                ))}
              </>
            ) : (
              <>
                {arrFilms.map((obj, index) => (
                  <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/5">
                    <div className="p-1 border-2 rounded-xl select-none">
                      <img
                        src={obj.placeholder}
                        alt="#"
                        className="rounded h-60 object-cover"
                        width={'100%'}
                      />
                      <h1 className="mt-2 ">{obj.name}</h1>

                      <p className="font-light text-sm">{obj.year}</p>
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
                  </CarouselItem>
                ))}
              </>
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      {/* serials */}
      <div className="px-16 mb-4 max-w-full">
        <h1 className="text-2xl font-semibold mb-4 mt-10">Сериалы</h1>
        <div className="w-full">
          <Carousel>
            <CarouselContent>
              {Array.from({ length: 9 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/5">
                  <div className="p-1 border-2 rounded-xl select-none">
                    <img
                      src="https://www.kino-teatr.ru/movie/posters/big/4/173334.jpg"
                      alt="#"
                      className="rounded h-60 object-cover w-30"
                      width={'100%'}
                    />
                    <h1 className="w-fit text-center mt-2 ">Триггер</h1>

                    <p className="font-light text-sm">2024</p>
                    <p className="font-light text-sm">imdb: 8.2</p>
                    <div className="flex justify-between items-center mt-2 mb-1">
                      <Button className="p-1 h-8 bg-black text-white border-2">Смотреть</Button>
                      <a href="">
                        <Heart strokeWidth={1.25} width={20} />
                      </a>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        {/* cartoons */}
        <div className=" mb-4">
          <h1 className="text-2xl font-semibold mb-4 mt-10">Мультфильмы</h1>
          <Carousel
            opts={{
              align: 'start',
            }}
            className="w-full "
          >
            <CarouselContent>
              {Array.from({ length: 9 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/5">
                  <div className="p-1 border-2 rounded-xl select-none">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/ru/thumb/1/19/%D0%9C%D0%BE%D0%B0%D0%BD%D0%B0_2.jpg/640px-%D0%9C%D0%BE%D0%B0%D0%BD%D0%B0_2.jpg"
                      alt="#"
                      className="rounded h-60 object-cover"
                      width={'100%'}
                    />
                    <h1 className=" mt-2 ">Моана 2</h1>

                    <p className="font-light text-sm">2024</p>
                    <p className="font-light text-sm">imdb: 8.1</p>
                    <div className="flex justify-between items-center mt-2 mb-1">
                      <Button className="p-1 h-8 bg-black text-white border-2">Смотреть</Button>
                      <a href="">
                        <Heart strokeWidth={1.25} width={20} />
                      </a>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      {/* cartoons */}
      <div className="px-16 mb-4">
        <h1 className="text-2xl font-semibold mb-4 mt-10">Мультфильмы</h1>
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full "
        >
          <CarouselContent>
            {arrFilms.map((obj, index) => (
              <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/5">
                <div className="p-1 border-2 rounded-xl select-none">
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
                    <Button className="p-1 h-8 bg-black text-white border-2">Смотреть</Button>
                    <a href="">
                      <Heart strokeWidth={1.25} width={20} />
                    </a>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
}
