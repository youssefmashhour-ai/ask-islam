// Vercel serverless function. The API key stays secret here (environment variable).
const SYSTEM = `انت مساعد معلومات إسلامية بتتكلم بالعامية المصرية البسيطة وبأدب.
قواعد صارمة:
1. اعتمد بس على القرآن، وصحيحي البخاري ومسلم، وباقي الكتب الستة لما يلزم، ومواقع الفتوى الموثوقة (دار الإفتاء المصرية، الأزهر، إسلام ويب، islamqa).
2. ممنوع تخترع حديث أو آية أو رقم صفحة أو اسم راوي. لو مش متأكد من نص أو مصدر قول "مش متأكد" بوضوح.
3. لو حد سألك عن حديث، اتحقق: هل هو صحيح؟ ضعيف؟ موضوع (مفبرك)؟ ولو مش لاقيله أصل قول إنك مالقيتوش في المصادر المعتمدة.
4. لو المسألة فيها خلاف بين العلماء، اعرض الأقوال بإنصاف وقول إن الأخذ بواحد منها بيرجع للمستخدم يسأل عالم يثق فيه.
5. إنت مش مفتي. في الأسئلة الشخصية الحساسة (طلاق، ميراث، قضايا ومشاكل خاصة) وجّه المستخدم لدار الإفتاء أو عالم ثقة.
6. لو السؤال مش دين، اعتذر بلطف.
الشكل الإجباري للرد بالظبط (3 عناوين):
## الحكم
(سطرين بالكتير فيهم الإجابة المباشرة)
## التفاصيل
(شرح مختصر بالعامية، نقاط لو لزم)
## المصادر
(كل مصدر في سطر: اسم الكتاب أو الموقع + الباب أو رقم الحديث لو متأكد منه، ولو مش متأكد متكتبش رقم)`;

async function callGemini(model, key, question, grounded) {
  const body = {
    systemInstruction: { parts: [{ text: SYSTEM }] },
    contents: [{ role: "user", parts: [{ text: question }] }],
    generationConfig: { temperature: 0.2 },
  };
  if (grounded) body.tools = [{ google_search: {} }];
  const r = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    { method: "POST", headers: { "Content-Type": "application/json", "x-goog-api-key": key }, body: JSON.stringify(body) }
  );
  const data = await r.json();
  if (!r.ok) throw new Error(data?.error?.message || "Gemini error");
  return data;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  const key = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  if (!key) return res.status(500).json({ error: "GEMINI_API_KEY مش متظبط" });
  const question = String(req.body?.question || "").slice(0, 600).trim();
  if (!question) return res.status(400).json({ error: "اكتب سؤال" });
  try {
    let data;
    try { data = await callGemini(model, key, question, true); }
    catch (e) { data = await callGemini(model, key, question, false); } // fallback if grounding isn't free on this model
    const cand = data.candidates?.[0];
    const text = (cand?.content?.parts || []).map(p => p.text || "").join("");
    const links = (cand?.groundingMetadata?.groundingChunks || [])
      .map(c => c.web).filter(Boolean).map(w => ({ title: w.title, uri: w.uri }));
    if (!text) return res.status(502).json({ error: "مفيش رد، جرب تاني" });
    res.status(200).json({ text, links });
  } catch (e) {
    res.status(502).json({ error: "حصلت مشكلة: " + e.message });
  }
}
