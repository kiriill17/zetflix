'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEventHandler } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const { toast } = useToast();
  const router = useRouter();
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const res = await signIn('credentials', {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      redirect: false,
    });

    if (res?.ok) {
      router.push('/');
      toast({
        title: 'Вы успешно вошли в аккаунт!',
        description: 'Хорошего дня!',
      });
    } else {
      console.log('error: ', res);
      toast({
        title: 'Ошибка авторизации',
        description: 'Неверная почта или пароль',
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
          <h1 className="text-xl mb-2">Вход</h1>
          <form onSubmit={handleSubmit}>
            <Input name="email" type="email" placeholder="Почта" />
            <Input name="password" className="mt-2" type="password" placeholder="Пароль" />
            <Button type="submit" className="w-full mt-4 bg-amber-700">
              Войти
            </Button>
          </form>
          <p className="font-light mt-4 text-sm">Еще нет аккаунта?</p>
          <a className="font-light underline  text-amber-700 text-sm" href="/register">
            Создать аккаунт
          </a>
        </div>
      </div>
    </div>
  );
}
