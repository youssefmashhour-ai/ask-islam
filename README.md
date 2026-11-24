<div align="center">

# اسأل · Ask

**مساعد ذكي للمعرفة الإسلامية بالعامية المصرية: الحكم في سطرين، وبعده التفاصيل والمصادر**

**A smart Islamic Q&A assistant in Egyptian Arabic: the ruling in two lines, then details and sources**

[**جرب الموقع · Try it live**](https://ask-islam-sigma.vercel.app)

</div>

---

## العربية

### الفكرة
معظم أدوات الذكاء الاصطناعي الإسلامية بتدّي مقال طويل بلغة تقيلة. "اسأل" بيدّيك الجواب الأول في سطرين وبلغة الناس، والتفاصيل والمصادر لمن يحب يكمل. الهدف إن الواحد يعرف الحكم بسرعة، ويفرّق بين الحديث الصحيح والمفبرك من غير ما يضيع في المقالات.

### شكل الإجابة
| الجزء | المحتوى |
|---|---|
| **الحكم** | الإجابة المباشرة في سطرين |
| **التفاصيل** | شرح مختصر بالعامية |
| **المصادر** | الكتاب أو الموقع، ورقم الحديث لو متأكد منه |

### المميزات
- **بالعامية المصرية** وبأسلوب بسيط.
- **تعليمات صارمة ضد الهلوسة:** الاعتماد على القرآن وصحيحي البخاري ومسلم ومواقع الفتوى الموثوقة، وقول "مش متأكد" بدل اختراع آية أو حديث أو رقم صفحة.
- **بحث جوجل المباشر (grounding)** لما يكون متاح، عشان المصادر تيجي من نتايج حقيقية.
- **إعادة محاولة تلقائية** (مرتين) لما جوجل تكون زحمة، ورسالة ودودة لو الزحمة استمرت.
- **تسجيل الأسئلة (اختياري)** في Google Sheet: نص السؤال ووقته فقط، من غير أي بيانات عن السائل.

### بيشتغل إزاي
- `index.html`: صفحة ويب بسيطة فيها مربع السؤال وعرض الإجابة.
- `api/ask.js`: دالة سيرفر على Vercel بتكلم Gemini API، فمفتاح الـAPI مش ظاهر في الصفحة.

### التقنيات
HTML وJavaScript، Vercel Serverless Functions، Google Gemini API، Google Apps Script وGoogle Sheets.

### تشغيله بنفسك
1. انسخ الملفين `index.html` و`api/ask.js` في ريبو على GitHub.
2. خد مفتاح API من [Google AI Studio](https://aistudio.google.com).
3. انشر الريبو على [Vercel](https://vercel.com) (الخطة المجانية) واضبط المتغيرات:

| الاسم | القيمة | إجباري |
|---|---|---|
| `GEMINI_API_KEY` | مفتاح Gemini API | نعم |
| `GEMINI_MODEL` | اسم الموديل المتاح عندك (من نوع Flash) | نعم |
| `SHEET_WEBHOOK_URL` | لينك Apps Script لتسجيل الأسئلة | لا |

4. اضغط Deploy.

> **تحذير:** متحطش المفتاح في أي ملف على GitHub. مكانه متغيرات البيئة في Vercel بس.

### تنبيه مهم
"اسأل" مساعد آلي وليس مفتيا، وممكن يغلط. راجع المصادر، وفي الأمور المهمة أو الشخصية اسأل عالما تثق فيه أو دار الإفتاء. لا تكتب بيانات شخصية في أسئلتك.

### الخصوصية
الأسئلة ممكن تتسجل (النص والوقت فقط) لتحسين الموقع. مفيش تسجيل لأسماء أو أرقام أو عناوين.

### الخطوات الجاية
- [ ] نسخة واتساب
- [ ] الاعتماد على مجموعة مصادر محددة بدل البحث العام
- [ ] قياس الجودة على مجموعة أسئلة ثابتة

### نيّة المشروع
مشروع تعليمي، أول مشروع لصاحبه، الغرض منه نفع الناس وتصحيح المعلومة الدينية على الإنترنت. نسأل الله القبول.

---

## English

### The idea
Most Islamic AI tools give a long essay in heavy language. **Ask** gives you the answer first, in two lines and plain Egyptian Arabic, with details and sources for those who want more. The goal: get the ruling fast and tell authentic hadith from fabricated ones without getting lost in long articles.

### Answer format
| Part | Content |
|---|---|
| **Ruling** | The direct answer in two lines |
| **Details** | A short explanation in colloquial Arabic |
| **Sources** | The book or website, and the hadith number when certain |

### Features
- **Egyptian Arabic**, simple and conversational.
- **Strict anti-hallucination instructions:** rely on the Quran, Sahih al-Bukhari, Sahih Muslim and trusted fatwa sources, and say "not sure" instead of inventing a verse, hadith or page number.
- **Live Google Search grounding** when available, so sources come from real results.
- **Automatic retry** (twice) when Google is busy, then a friendly message if it stays busy.
- **Optional question logging** to a Google Sheet: question text and time only, nothing about who asked.

### How it works
- `index.html`: a simple web page with the question box and answer display.
- `api/ask.js`: a Vercel serverless function that calls the Gemini API, so the API key never appears in the page.

### Tech stack
HTML and JavaScript, Vercel Serverless Functions, Google Gemini API, Google Apps Script and Google Sheets.

### Run your own
1. Put `index.html` and `api/ask.js` in a GitHub repo.
2. Get an API key from [Google AI Studio](https://aistudio.google.com).
3. Deploy the repo on [Vercel](https://vercel.com) (free Hobby plan) and set the environment variables:

| Name | Value | Required |
|---|---|---|
| `GEMINI_API_KEY` | Your Gemini API key | Yes |
| `GEMINI_MODEL` | A Flash model name available to you | Yes |
| `SHEET_WEBHOOK_URL` | Apps Script web app URL for question logging | No |

4. Click Deploy.

> **Warning:** never commit the API key to GitHub. Keep it only in Vercel environment variables.

### Disclaimer
Ask is an automated assistant, not a mufti, and it can be wrong. Check the sources, and for important or personal matters ask a scholar you trust or Dar al-Ifta. Do not enter personal information in your questions.

### Privacy
Questions may be logged (text and time only) to improve the site. No names, phone numbers or addresses are recorded.

### Roadmap
- [ ] WhatsApp version
- [ ] Restrict answers to a fixed set of trusted sources instead of open web search
- [ ] Measure quality on a fixed question set

### Intent
An educational project, its author's first, made to benefit people and correct religious information online. We ask Allah to accept it.
