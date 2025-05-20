# CI/CD पाइपलाइन में स्वचालित अनुवाद उत्पन्न करें

Intlayer आपके सामग्री घोषणा फ़ाइलों के लिए अनुवादों को स्वचालित रूप से उत्पन्न करने की अनुमति देता है। इसे प्राप्त करने के लिए आपके वर्कफ़्लो के आधार पर कई तरीके हैं।

## CMS का उपयोग करना

Intlayer के साथ, आप एक वर्कफ़्लो अपना सकते हैं जहां केवल एक ही स्थानीय भाषा को स्थानीय रूप से घोषित किया जाता है, जबकि सभी अनुवाद CMS के माध्यम से दूरस्थ रूप से प्रबंधित किए जाते हैं। यह सामग्री और अनुवादों को कोडबेस से पूरी तरह से अलग करने की अनुमति देता है, सामग्री संपादकों के लिए अधिक लचीलापन प्रदान करता है और हॉट सामग्री रीलोडिंग को सक्षम करता है (परिवर्तनों को लागू करने के लिए एप्लिकेशन को पुनः निर्माण करने की आवश्यकता नहीं होती)।

### उदाहरण कॉन्फ़िगरेशन

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // वैकल्पिक भाषाओं को दूरस्थ रूप से प्रबंधित किया जाएगा
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    dictionaryPriorityStrategy: "distant_first", // दूरस्थ सामग्री को प्राथमिकता दी जाती है

    applicationURL: process.env.APPLICATION_URL, // CMS द्वारा उपयोग किया जाने वाला एप्लिकेशन URL

    clientId: process.env.INTLAYER_CLIENT_ID, // CMS क्रेडेंशियल्स
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    applicationContext: "यह एक परीक्षण एप्लिकेशन है", // सुनिश्चित करता है कि अनुवाद सुसंगत रूप से उत्पन्न हो
  },
};

export default config;
```

CMS के बारे में अधिक जानने के लिए, [आधिकारिक दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_CMS.md) देखें।

## Husky का उपयोग करना

आप [Husky](https://typicode.github.io/husky/) का उपयोग करके अपने स्थानीय Git वर्कफ़्लो में अनुवाद उत्पन्न करने को एकीकृत कर सकते हैं।

### उदाहरण कॉन्फ़िगरेशन

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // वैकल्पिक भाषाओं को दूरस्थ रूप से प्रबंधित किया जाएगा
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY, // अपना API कुंजी उपयोग करें

    applicationContext: "यह एक परीक्षण एप्लिकेशन है", // सुनिश्चित करता है कि अनुवाद सुसंगत रूप से उत्पन्न हो
  },
};

export default config;
```

```bash fileName=".husky/pre-push"
npx intlayer build                          # सुनिश्चित करें कि शब्दकोश अद्यतन हैं
npx intlayer fill --unpushed --mode fill    # केवल गायब सामग्री को भरें, मौजूदा को अपडेट न करें
```

> Intlayer CLI कमांड्स और उनके उपयोग के बारे में अधिक जानकारी के लिए, [CLI दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_cli.md) देखें।

> यदि आपके रिपॉजिटरी में कई ऐप्स हैं जो अलग-अलग intlayer इंस्टेंस का उपयोग करते हैं, तो आप `--base-dir` तर्क का उपयोग इस प्रकार कर सकते हैं:

```bash fileName=".husky/pre-push"
# ऐप 1
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode fill

# ऐप 2
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode fill
```

## GitHub Actions का उपयोग करना

Intlayer एक CLI कमांड प्रदान करता है जो शब्दकोश सामग्री को स्वचालित रूप से भरने और समीक्षा करने की अनुमति देता है। इसे GitHub Actions का उपयोग करके आपके CI/CD वर्कफ़्लो में एकीकृत किया जा सकता है।

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
      - name: ⬇️ रिपॉजिटरी चेकआउट करें
        uses: actions/checkout@v3
        with:
          persist-credentials: true

      - name: 🟢 Node.js सेट करें
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: 📦 निर्भरताएँ इंस्टॉल करें
        run: npm ci

      - name: ⚙️ Intlayer प्रोजेक्ट बनाएं
        run: npx intlayer build

      - name: 🤖 गायब अनुवाद स्वचालित रूप से भरें
        run: npx intlayer fill --git-diff --mode fill

      - name: 📤 अनुवाद PR बनाएँ या अपडेट करें
        uses: peter-evans/create-pull-request@v4
        with:
          commit-message: chore: auto-fill missing translations [skip ci]
          branch: auto-translations
          title: chore: update missing translations
          labels: translation, automated
```

> Husky के समान, यदि यह एक मोनोरिपो है, तो आप `--base-dir` तर्क का उपयोग करके प्रत्येक ऐप को क्रमिक रूप से संसाधित कर सकते हैं।
> डिफ़ॉल्ट रूप से, `--git-diff` तर्क उन शब्दकोशों को फ़िल्टर करता है जिनमें बेस (डिफ़ॉल्ट `origin/main`) से वर्तमान शाखा (डिफ़ॉल्ट: `HEAD`) तक परिवर्तन शामिल हैं।
> Intlayer CLI कमांड्स और उनके उपयोग के बारे में अधिक जानकारी के लिए, [CLI दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_cli.md) देखें।
