import { site } from "@/lib/site";

type Faq = { match: RegExp; reply: string };

const faqs: Faq[] = [
  {
    match: /who|keerthi|about|bio|profile/i,
    reply:
      "Keerthi Kodithuwakku is a MedTech founder and technopreneur from Sri Lanka: Chairman & CEO of Jendo Innovations, Founder & CEO of Effective Solutions, and CEO & Director of Koding. He builds AI-enabled preventive healthcare and IoT solutions.",
  },
  {
    match: /jendo|jendo\.health|vascular|heart|endothelial/i,
    reply:
      "JENDO is an AI-powered, non-invasive vascular health monitor that detects endothelial dysfunction: an early sign of cardiovascular disease: in about 15 minutes. It has US and Japan granted patents. Learn more at jendo.health or the Services page.",
  },
  {
    match: /mind\s*drone|myndrone|drone|brain|bci|neuro/i,
    reply:
      "MindDrone (MynDrone) is Sri Lanka's first mind-controlled drone: a brain–computer interface that lets users fly a drone using brain waves. Read more on the Blog or Services pages.",
  },
  {
    match:
      /award|fellowship|eisenhower|chevening|ict leader|oxford|recognition|patent/i,
    reply:
      "Recent highlights include Eisenhower Fellowships 2026 (1 of 28 from 500+), Chevening CRISP at Oxford, ICT Leader of the Year 2025 (CSSL), Young Innovator 2024, CEO of the Year 2022 (AI), JKX Winner 2016, and global patents including USPTO 10,912,464 B2. See Achievements for the full list.",
  },
  {
    match: /meet|meeting|appoint|book|schedule|contact|call|email|visit/i,
    reply: `Meetings are by appointment at ${site.address}. Use Get Appointment / the Contact page, email ${site.email}, or call ${site.phone}. The office confirms a time after you submit your inquiry.`,
  },
  {
    match: /effective solutions|ananke|iot|koding/i,
    reply:
      "Effective Solutions (Founder & CEO) delivers IoT, AI, and digital transformation across private sector, government, and defense, with presence in Sri Lanka, Japan, and England: including the award-winning AnankeIoT platform. Koding is also part of his venture stack.",
  },
  {
    match: /education|university|moratuwa|mba|lecturer|mentor/i,
    reply:
      "Education: MBA (University of Colombo); BSc Engineering (Hons) Electronics & Telecommunication with Entrepreneurship minor (University of Moratuwa); MIT Global Startup Labs. He also lectures and mentors at leading Sri Lankan universities and serves as Secretary of the UoM Alumni Association.",
  },
  {
    match: /\b(hello|hi|hey)\b/i,
    reply: `Hi! I can help with Keerthi's work, JENDO, awards, and booking meetings. Email ${site.email} or use Get Appointment.`,
  },
];

/** Offline answers grounded in site content when Gemini is unavailable. */
export function localChatReply(question: string): string {
  const q = question.trim();
  if (!q) {
    return "Please ask a question about Keerthi, JENDO, awards, or booking a meeting.";
  }

  const hits = faqs.filter((faq) => faq.match.test(q));
  if (hits.length) {
    return hits
      .slice(0, 2)
      .map((faq) => faq.reply)
      .join("\n\n");
  }

  return `I can help with Keerthi's background, JENDO, MindDrone, awards/fellowships, and booking meetings. Try one of those topics, or use Get Appointment / email ${site.email}.`;
}
