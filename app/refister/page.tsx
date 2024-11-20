'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { FormEventHandler } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function Register() {
  const { toast } = useToast();
  const router = useRouter();
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!name || !email || !password) {
      toast({
        title: 'Ошибка',
        description: 'Введите имя, почту и пароль',
      });
      return;
    }

    const res = await fetch('/api/user/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      router.push('/');
      toast({
        title: 'Вы успешно создали аккаунт!',
        description: 'Оасталось только в него войти',
      });
    } else {
      console.log('error: ', data.message);
      toast({
        title: 'Ошибка создания аккаунта',
        description: 'Что-то пошло не так. Попробуйте еще раз',
      });
    }
  };

  return (
    <div className="flex relative h-screen items-center justify-center ">
      <div className="w-full h-screen bg-black">
        <img
          className="h-screen object-cover opacity-25"
          src="https://wallpapers.com/images/hd/poster-background-hlybuowt1whxbh2z.jpg"
          alt=""
        />
      </div>
      <div className="shadow flex absolute h-full w-full items-center justify-center">
        <div className="flex flex-col items-center bg-black/50 p-6 rounded-xl">
          <h1 className="text-xl mb-4">Регистрация</h1>
          <form onSubmit={handleSubmit}>
            <Input name="name" className="mb-2" type="text" placeholder="Имя" />
            <Input name="email" type="email" placeholder="Почта" />
            <Input name="password" className="mt-2" type="password" placeholder="Пароль" />
            <Button type="submit" className="w-full mt-4 bg-amber-700">
              Зарегистрироваться
            </Button>
          </form>
          <p className="font-light mt-4 text-sm">Уже есть аккаунт?</p>
          <a className="font-light underline  text-amber-700 text-sm" href="/login">
            Войти
          </a>
        </div>
      </div>
    </div>
  );
}
