import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import { useSettings } from "../hooks/useSettings.js";

const schema = yup.object({
  difficulty: yup.string().oneOf(["easy", "medium", "hard"]).required(),
  timeLimitSec: yup.number().min(0).max(900).required(),
  highlightFound: yup.boolean().required(),
});

export default function SettingsPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { difficulty, timeLimitSec, highlightFound, setSettings } =
    useSettings();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { difficulty, timeLimitSec, highlightFound },
  });

  useEffect(() => {
    reset({ difficulty, timeLimitSec, highlightFound });
  }, [difficulty, timeLimitSec, highlightFound, reset]);

  const onSubmit = (data) => {
    setSettings({
      difficulty: data.difficulty,
      timeLimitSec: Number(data.timeLimitSec) || 0,
      highlightFound: Boolean(data.highlightFound),
    });
    navigate(`/user/${userId}/game`);
  };

  const tl = watch("timeLimitSec");

  return (
    <div className="grid gap-4">
      <Card title="Налаштування">
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-2">
            <p className="text-sm text-slate-300">
              Складність впливає на набір слів для раунду.
            </p>

            <label className="grid gap-1 text-sm">
              <span className="text-slate-300">Складність</span>
              <select
                className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 outline-none focus:border-indigo-500"
                {...register("difficulty")}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </label>

            <label className="grid gap-1 text-sm">
              <span className="text-slate-300">
                Ліміт часу (сек). 0 = без ліміту
              </span>
              <input
                type="number"
                className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 outline-none focus:border-indigo-500"
                {...register("timeLimitSec")}
              />
              {errors.timeLimitSec ? (
                <span className="text-xs text-rose-300">
                  {errors.timeLimitSec.message}
                </span>
              ) : null}
              <span className="text-xs text-slate-500">
                Поточне: {Number(tl) || 0} сек
              </span>
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="h-4 w-4"
                {...register("highlightFound")}
              />
              <span className="text-slate-300">
                Підсвічувати знайдені клітинки
              </span>
            </label>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="submit">Почати гру</Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate(`/user/${userId}/start`)}
            >
              ← Назад
            </Button>
          </div>
        </form>
      </Card>

      <Card title="Збереження налаштувань">
        <p className="text-sm text-slate-300">
          Налаштування зберігаються в{" "}
          <span className="text-slate-100 font-semibold">localStorage</span>{" "}
          через Zustand store.
        </p>
      </Card>
    </div>
  );
}
