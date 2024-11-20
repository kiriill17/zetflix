import { Button } from '@/components/ui/button';
import { ChevronLeft, Heart } from 'lucide-react';
import { prisma } from '@/prisma/prisma-client';

export default async function Film({ params }: { params: { id: string } }) {
  const film = await prisma.film.findUnique({ where: { id: Number(params.id) } });
  if (!film) {
    return <p>Фильм не найден</p>;
  }

  return (
    <div className="px-4 max-w-screen-xl mx-auto">
      <a className="flex  mb-2 mt-6 font-light text-gray-400" href="/">
        <ChevronLeft /> Назад
      </a>
      <h1 className="text-center md:text-left text-3xl font-semibold  mb-4">{film.name}</h1>
      <div className="md:flex-row flex flex-col items-center">
        <img className="w-80 h-96 object-cover rounded" src={film.placeholder} alt="" />
        <div className="flex md:items-start items-center md:py-0 py-4 flex-col gap-4 ml-10 items-start justify-center">
          <p>Рейтинг: {film.imdb}</p>
          {/* <p>Год: {film.year}</p> */}
          <p>{film.description}</p>
          <Button className="bg-amber-600">
            <Heart /> Добавить в избранное
          </Button>
        </div>
      </div>
      <h1 className="text-3xl font-semibold mt-12 mb-4">Смотреть онлайн</h1>
      <iframe
        width="720"
        height="505"
        src={film.url}
        frameBorder="0"
        allow="clipboard-write; autoplay"
        allowFullScreen
        className=" rounded w-full mb-30 pb-30"
      ></iframe>
      <div className="h-32"></div>
    </div>
  );
}
