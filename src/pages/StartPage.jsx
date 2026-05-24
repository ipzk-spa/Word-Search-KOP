import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import { useUserStore } from "../store/user.store.js";

const schema = yup.object({
  userId: yup
    .string()
    .trim()
    .min(2, "Мінімум 2 символи")
    .max(24, "Максимум 24 символи")
    .matches(/^[a-zA-Z0-9_-]+$/, "Тільки латиниця, цифри, _ та -")
    .required("Обовʼязково"),
  nickname: yup
    .string()
    .trim()
    .min(2, "Мінімум 2 символи")
    .max(32, "Максимум 32")
    .required("Обовʼязково"),
});

export default function StartPage() {
  const { userId: routeUserId } = useParams();
  const navigate = useNavigate();

  const setUser = useUserStore((s) => s.setUser);
  const current = useUserStore((s) => ({
    userId: s.userId,
    nickname: s.nickname,
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      userId: routeUserId || current.userId || "guest",
      nickname: current.nickname || "",
    },
  });

  useEffect(() => {
    reset({
      userId: routeUserId || current.userId || "guest",
      nickname: current.nickname || "",
    });
  }, [routeUserId, reset, current.userId, current.nickname]);

  const onSubmit = (data) => {
    setUser({ userId: data.userId, nickname: data.nickname });
    navigate(`/user/${data.userId}/settings`);
  };

  return (
    <div className="grid gap-4">
      <Card title="Старт">
        <p className="mb-4 text-sm text-slate-300">
          Введи <span className="text-slate-100 font-semibold">userId</span>{" "}
          (для динамічного роутингу) та нікнейм.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
          <label className="grid gap-1 text-sm">
            <span className="text-slate-300">User ID</span>
            <input
              className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 outline-none focus:border-indigo-500"
              placeholder="наприклад, pavlo_01"
              {...register("userId")}
            />
            {errors.userId ? (
              <span className="text-xs text-rose-300">
                {errors.userId.message}
              </span>
            ) : null}
          </label>

          <label className="grid gap-1 text-sm">
            <span className="text-slate-300">Нікнейм</span>
            <input
              className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 outline-none focus:border-indigo-500"
              placeholder="Павло"
              {...register("nickname")}
            />
            {errors.nickname ? (
              <span className="text-xs text-rose-300">
                {errors.nickname.message}
              </span>
            ) : null}
          </label>

          <div className="mt-2 flex flex-wrap gap-2">
            <Button type="submit">Далі → Налаштування</Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() =>
                navigate(`/user/${routeUserId || "guest"}/results`)
              }
            >
              Перейти до результатів
            </Button>
          </div>
        </form>
      </Card>

      <Card title="Як грати">
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-300">
          <li>
            Тягни мишкою (або пальцем) по клітинках по прямій: горизонталь /
            вертикаль / діагональ.
          </li>
          <li>
            Коли відпустиш — слово перевіряється та позначається як знайдене.
          </li>
          <li>Коли всі слова знайдені — зʼявиться модальне вікно (портал).</li>
        </ul>
      </Card>
    </div>
  );
}
