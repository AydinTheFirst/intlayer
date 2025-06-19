# Intlayer सामग्री प्रबंधन प्रणाली (CMS) दस्तावेज़ीकरण

<iframe title="Visual Editor + CMS for Your Web App: Intlayer Explained" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

**Intlayer CMS** एक ऐसा एप्लिकेशन है जो आपको आपके Intlayer प्रोजेक्ट की सामग्री को बाहरी रूप से प्रबंधित करने की अनुमति देता है। इसके लिए Intlayer "दूरस्थ शब्दकोशों" की अवधारणा प्रस्तुत करता है, जिससे टीम बिना कोड में बदलाव किए वेबसाइट की सामग्री को नियंत्रित कर सकती है।

![Intlayer CMS इंटरफ़ेस](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

---

## 🔑 दूरस्थ शब्दकोशों को समझना

Intlayer में दो प्रकार के शब्दकोश होते हैं:

* **स्थानीय (Local)**: जो सीधे आपके प्रोजेक्ट में कोड द्वारा परिभाषित होते हैं। इन्हें अक्सर बदला नहीं जाता, जैसे बटन टेक्स्ट या नेविगेशन बार।
* **दूरस्थ (Remote)**: जिन्हें Intlayer CMS के ज़रिए प्रबंधित किया जाता है। ये अधिक डायनामिक होते हैं और आपकी टीम को रियल-टाइम में कंटेंट अपडेट करने की सुविधा देते हैं।

दूरस्थ शब्दकोश A/B टेस्टिंग और SEO अनुकूलन के लिए भी उपयोगी होते हैं।

---

## 🆚 दृश्य संपादक बनाम CMS

* **[Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_visual_editor.md)**:

  * स्थानीय शब्दकोशों के लिए है
  * परिवर्तन कोडबेस में सीधे लागू होते हैं
  * वेबसाइट को फिर से बनाना पड़ता है

* **Intlayer CMS**:

  * दूरस्थ शब्दकोशों के लिए है
  * परिवर्तन कोडबेस को प्रभावित नहीं करते
  * सामग्री रियल-टाइम में अपडेट होती है

---

## 🔗 एकीकरण (Integration)

नीचे दिए गए गाइड्स के माध्यम से आप Intlayer CMS को अपने फ्रंटएंड प्रोजेक्ट्स में एकीकृत कर सकते हैं:

* [Next.js के साथ](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_15.md)
* [Create React App के साथ](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_create_react_app.md)
* [Vite + React के साथ](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_vite+react.md)

---

## ⚙️ कॉन्फ़िगरेशन सेटअप

आपकी `intlayer.config.ts|.js|.mjs|.cjs` फाइल में CMS को कॉन्फ़िगर करने की सेटिंग्स दी जाती हैं।

### आवश्यक फ़ील्ड:

* `applicationURL`
* `clientId`, `clientSecret` (Intlayer डैशबोर्ड से प्राप्त करें)

### वैकल्पिक फ़ील्ड:

* `cmsURL` (अगर आप सेल्फ-होस्ट कर रहे हैं)
* `backendURL`
* `hotReload` (केवल एंटरप्राइज़ योजना में उपलब्ध)

संपूर्ण विवरण के लिए [कॉन्फ़िगरेशन दस्तावेज़ीकरण](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) देखें।

---

## 🛠️ CLI कमांड्स द्वारा उपयोग

### 1. कॉन्फ़िगरेशन अपलोड करें:

```bash
npx intlayer config push
# या
npx intlayer config push --env production
```

### 2. शब्दकोश अपलोड करें:

```bash
npx intlayer dictionary push -d my-first-dictionary-key
# या
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

### 3. CMS डैशबोर्ड में संपादन:

[https://intlayer.org/dashboard/content](https://intlayer.org/dashboard/content)

---

## 🔁 हॉट रीलोडिंग (Hot Reloading)

`hotReload: true` सेट करके आप रीयल-टाइम में कंटेंट अपडेट्स देख सकते हैं। यह सुविधा केवल एंटरप्राइज़ यूज़र्स के लिए उपलब्ध है।

> सुनिश्चित करें कि `.intlayer/dictionaries` फोल्डर पर आपके सर्वर को लिखने की अनुमति हो।

---

## 🐞 डिबग सुझाव

अगर कुछ काम नहीं कर रहा हो, तो यह जांचें:

* एप्लिकेशन रन हो रहा है
* `applicationURL`, `clientId`, `clientSecret` सही से सेट हैं
* कॉन्फ़िगरेशन अपलोड हो चुका है
* आपकी वेबसाइट की CSP (Content Security Policy) iframe को अनुमति देती है

---

## ✅ अतिरिक्त सुझाव (जोड़े गए विवरण)

* **प्रोजेक्ट फोल्डर में `README.md`** में CMS उपयोग का छोटा परिचय जोड़ें ताकि नए डेवेलपर्स को समझने में आसानी हो।
* **Translations में consistency रखें** — जैसे "Content" के लिए एक ही शब्द (जैसे "सामग्री") का उपयोग करें पूरे डॉक में।
* **डेमो या Example प्रोजेक्ट लिंक** प्रदान करें, जिससे नए यूज़र्स live setup देख सकें।

---

> यदि आपको किसी अनुवाद या सेटअप में मदद चाहिए तो GitHub Discussions या Issues में सवाल पूछ सकते हैं।

---
