---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Интеграция CI/CD
description: Узнайте, как интегрировать Intlayer в ваш CI/CD процесс для автоматизированного управления контентом и развертывания.
keywords:
  - CI/CD
  - Непрерывная интеграция
  - Непрерывное развертывание
  - Автоматизация
  - Интернационализация
  - Документация
  - Intlayer
slugs:
  - doc
  - concept
  - ci-cd
---

# Автоматическая генерация переводов в CI/CD процессе

Intlayer позволяет автоматически генерировать переводы для ваших файлов декларации контента. Существует несколько способов достичь этого в зависимости от вашего рабочего процесса.

## Использование CMS

С Intlayer вы можете использовать рабочий процесс, при котором локально объявляется только один язык, а все переводы управляются удаленно через CMS. Это позволяет полностью отделить контент и переводы от кодовой базы, обеспечивая большую гибкость для редакторов контента и позволяя горячую перезагрузку контента (нет необходимости пересобирать приложение для применения изменений).

### Пример конфигурации

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // Необязательные языки будут управляться удаленно
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    dictionaryPriorityStrategy: "distant_first", // Удалённый контент имеет приоритет

    applicationURL: process.env.APPLICATION_URL, // URL приложения, используемый CMS

    clientId: process.env.INTLAYER_CLIENT_ID, // Учетные данные CMS
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    applicationContext: "Это тестовое приложение", // Помогает обеспечить согласованность генерации перевода
  },
};

export default config;
```

Чтобы узнать больше о CMS, обратитесь к [официальной документации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).

## Использование Husky

Вы можете интегрировать генерацию переводов в ваш локальный Git-рабочий процесс с помощью [Husky](https://typicode.github.io/husky/).

### Пример конфигурации

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // Необязательные локали обрабатываются удаленно
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY, // Используйте свой собственный API ключ

    applicationContext: "Это тестовое приложение", // Помогает обеспечить согласованность генерации перевода
  },
};

export default config;
```

```bash fileName=".husky/pre-push"
npx intlayer build                          # Чтобы убедиться, что словари обновлены
npx intlayer fill --unpushed --mode fill    # Заполняет только отсутствующий контент, не обновляет существующий
```

> Для получения дополнительной информации о командах Intlayer CLI и их использовании, обратитесь к [документации CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_cli.md).

> Если у вас несколько приложений в репозитории, использующих отдельные экземпляры intlayer, вы можете использовать аргумент `--base-dir` следующим образом:

```bash fileName=".husky/pre-push"
# Приложение 1
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode fill

# Приложение 2
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode fill
```

## Использование GitHub Actions

Intlayer предоставляет команду CLI для автоматического заполнения и проверки содержимого словаря. Это можно интегрировать в ваш CI/CD процесс с использованием GitHub Actions.

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer Auto-Fill
on:
  push:
    branches: [ main ]
    paths:
      - 'src/**'
  pull_request:
    branches: [ main ]
    paths:
      - 'src/**'
  workflow_dispatch: {}

concurrency:
  group: 'autofill-${{ github.ref }}'
  cancel-in-progress: true

jobs:
  autofill:
    runs-on: ubuntu-latest
    env:
      INTLAYER_CLIENT_ID: ${{ secrets.INTLAYER_CLIENT_ID }}
      INTLAYER_CLIENT_SECRET: ${{ secrets.INTLAYER_CLIENT_SECRET }}
      OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}

    steps:
      - name: ⬇️ Клонировать репозиторий
        uses: actions/checkout@v3
        with:
          persist-credentials: true

      - name: 🟢 Установить Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: 📦 Установить зависимости
        run: npm ci

      - name: ⚙️ Собрать проект Intlayer
        run: npx intlayer build

      - name: 🤖 Автоматически заполнить отсутствующие переводы
        run: npx intlayer fill --git-diff --mode fill

      - name: 📤 Создать или обновить PR с переводами
        uses: peter-evans/create-pull-request@v4
        with:
          commit-message: chore: авто-заполнение отсутствующих переводов [skip ci]
          branch: auto-translations
          title: chore: обновить отсутствующие переводы
          labels: translation, automated
```

> Аналогично Husky, в случае монорепозитория вы можете использовать аргумент `--base-dir` для последовательной обработки каждого приложения.

> По умолчанию аргумент `--git-diff` фильтрует словари, которые включают изменения от базы (по умолчанию `origin/main`) до текущей ветки (по умолчанию: `HEAD`).

> Для получения дополнительной информации о командах Intlayer CLI и их использовании обратитесь к [документации CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_cli.md).

## История документа

- 5.5.10 - 2025-06-29: Инициализация истории
