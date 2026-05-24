# Word Search KOP (5×5)

Курсовий/навчальний вебпроєкт: гра «пошук слів» на **React + Vite** з локальним збереженням, **Storybook**, **JSDoc**, політикою конфіденційності та банером **cookie (GDPR)**.

## Вимоги

| Компонент | Версія |
|-----------|--------|
| Node.js | 18+ |
| npm | 9+ |

## Встановлення та команди

```bash
npm install
npm run dev
```

| Скрипт | Опис |
|--------|------|
| `npm run dev` | Розробка, http://localhost:5173 |
| `npm run build` | Продакшн-збірка |
| `npm run preview` | Перегляд збірки |
| `npm run lint` | ESLint |
| `npm run storybook` | Storybook, http://localhost:6006 |
| `npm run build-storybook` | Статична збірка Storybook → `storybook-static/` |
| `npm run docs:generate` | HTML-документація (JSDoc) → `docs/jsdoc/` |
| `npm run docs:serve` | Локальний перегляд JSDoc, http://localhost:8080 |
| `npm run licenses:report` | Звіт ліцензій залежностей (`LICENSE_DEPENDENCIES_REPORT.*`) |

## Конфігурація проєкту

- **Vite:** `vite.config.js`
- **Tailwind / PostCSS:** `tailwind.config.js`, `postcss.config.js`
- **ESLint:** `eslint.config.js`
- **Storybook:** `.storybook/main.js`, `.storybook/preview.jsx`
- **JSDoc:** `jsdoc.json`

## Ліцензія та правові документи

- **Ліцензія проєкту:** [LICENSE](./LICENSE) (MIT).
- **Перевірка ліцензій npm-пакетів:** файл `LICENSE_DEPENDENCIES_REPORT.txt` (і `.json`) у корені — оновлюється командою `npm run licenses:report`.
- **Політика конфіденційності / обмеження:** [PRIVACY_POLICY.md](./PRIVACY_POLICY.md), у застосунку сторінка **`/privacy`**.
- **Cookie (GDPR):** банер при першому відвідуванні; кнопка **Cookie / GDPR** для повторного відкриття.

## Документація для здачі (КОП)

1. Згенеруйте JSDoc: `npm run docs:generate`.
2. Перегляньте локально: `npm run docs:serve`.

**Відео (локальна документація):** https://www.youtube.com/watch?v=U4vcmWJyRmE  
На відео показано `npm install`, `npm run docs:generate`, `npm run docs:serve` та перегляд JSDoc на http://localhost:8080.

## Storybook (2 компоненти)

- Базовий: **Button** — `src/stories/ui/Button.stories.jsx` (3 сторі).
- Складніший: **GameBoard** — `src/stories/components/GameBoard.stories.jsx` (3 сторі, керовані `argTypes`).

## Авторство

- **ПІБ:** Степанчук Павло Анатолійович (Stepanchuk Pavlo Anatoliyovych)
- **Група:** ІПЗк-24-1 (IPZk-24-1)
- **Репозиторій:** https://github.com/ipzk-spa/Word-Search-KOP
