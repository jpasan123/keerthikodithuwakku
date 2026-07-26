import { site } from "@/lib/site";

type Faq = { match: RegExp; answer: string };

const faqs: Faq[] = [
  {
    match:
      /who|keerthi|about|bio|profile|කවුද|කවදා|කීර්ති|කීර්තී|හැඳින්ව|කියන්න/i,
    answer:
      "Keerthi Kodithuwakku is a MedTech founder and technopreneur from Sri Lanka — Chairman & CEO of Jendo Innovations, Founder & CEO of Effective Solutions, and CEO & Director of Koding. He builds AI-enabled preventive healthcare and IoT solutions.\n\nකීර්ති කොඩිතුවක්කු ශ්‍රී ලංකාවේ MedTech founder කෙනෙක් — Jendo Innovations හි Chairman & CEO, Effective Solutions හි Founder & CEO.",
  },
  {
    match: /jendo|jendo\.health|vascular|heart|endothelial|හදවත්|රුධිර/i,
    answer:
      "JENDO is an AI-powered, non-invasive vascular health monitor that detects endothelial dysfunction — an early sign of cardiovascular disease — in about 15 minutes. It has US and Japan granted patents. Learn more at jendo.health or the Services page.\n\nJENDO කියන්නේ AI භාවිතයෙන් හදවත් / vascular සෞඛ්‍යය මිනිත්තු ~15කින් පරීක්ෂා කරන non-invasive device එකක්.",
  },
  {
    match: /mind\s*drone|myndrone|drone|brain|bci|neuro|මනස|ඩ්‍රෝන්|ඩ්රෝන්/i,
    answer:
      "MindDrone (MynDrone) is Sri Lanka’s first mind-controlled drone — a brain–computer interface that lets users fly a drone using brain waves. You can read the story on the Blog / Services pages.\n\nMindDrone = ශ්‍රී ලංකාවේ පළමු mind-controlled drone එක — brain waves වලින් drone එක පියාසර කරවන BCI project එකක්.",
  },
  {
    match:
      /award|fellowship|eisenhower|chevening|ict leader|oxford|recognition|patent|සම්මාන|ෆෙලෝ|පේටන්ට්|ඔක්ස්ෆර්ඩ්/i,
    answer:
      "Recent highlights include Eisenhower Fellowships 2026 (1 of 28 from 500+), Chevening CRISP at Oxford, ICT Leader of the Year 2025 (CSSL), Young Innovator 2024, CEO of the Year 2022 (AI), JKX Winner 2016, and global patents including USPTO 10,912,464 B2. See Achievements for the full list.\n\nප්‍රධාන සම්මාන: Eisenhower 2026, Chevening Oxford, ICT Leader 2025, Young Innovator 2024 — වැඩි විස්තර Achievements page එකේ.",
  },
  {
    match:
      /meet|meeting|appoint|book|schedule|contact|call|email|visit|කතා|හමුව|appointment|හමුවීම|වේලාව|සම්බන්ධ/i,
    answer: `Meetings are by appointment at ${site.address}. Use Get Appointment / the Contact page, email ${site.email}, or call ${site.phone}. The office confirms a time after you submit your inquiry.\n\nහමුවීම් appointment මත. Contact / Get Appointment, email ${site.email}, හෝ ${site.phone} අමතන්න.`,
  },
  {
    match: /effective solutions|ananke|iot|koding|අයෝටී|කෝඩින්/i,
    answer:
      "Effective Solutions (Founder & CEO) delivers IoT, AI, and digital transformation across private sector, government, and defense, with presence in Sri Lanka, Japan, and England — including the award-winning AnankeIoT platform. Koding is also part of his venture stack.",
  },
  {
    match:
      /education|university|moratuwa|mba|lecturer|mentor|අධ්‍යාපන|මොරටුව|විශ්වවිද්‍යාල|කථික/i,
    answer:
      "Education: MBA (University of Colombo); BSc Engineering (Hons) Electronics & Telecommunication with Entrepreneurship minor (University of Moratuwa); MIT Global Startup Labs. He also lectures and mentors at leading Sri Lankan universities and serves as Secretary of the UoM Alumni Association.",
  },
];

/** Offline answers grounded in site content when Gemini is unavailable. */
export function localChatReply(question: string): string {
  const q = question.trim();
  if (!q) {
    return "Please ask a question about Keerthi, JENDO, awards, or booking a meeting.\n\nකීර්ති, JENDO, සම්මාන, හෝ හමුවීම් ගැන අහන්න.";
  }

  const hits = faqs.filter((faq) => faq.match.test(q));
  if (hits.length) {
    return hits
      .slice(0, 2)
      .map((faq) => faq.answer)
      .join("\n\n");
  }

  return `I can help with Keerthi’s background, JENDO, MindDrone, awards/fellowships, and booking meetings. Try one of those topics, or use Get Appointment / email ${site.email}.\n\nසිංහලෙන්ත් අහන්න පුළුවන් — උදා: "කීර්ති කවුද?", "JENDO මොකක්ද?", "හමුවීමක් book කරන්නේ කොහොමද?"`;
}
