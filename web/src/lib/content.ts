export const services = [
  {
    slug: "biomedical",
    title: "Biomedical Innovations",
    icon: "HeartPulse",
    summary:
      "Cutting-edge biomedical solutions improving healthcare delivery and patient outcomes.",
    body: "Our biomedical innovations focus on developing advanced medical technologies that enhance patient care. We leverage the latest research to create solutions tailored to the healthcare sector's evolving needs. By integrating engineering expertise with medical science, we deliver products that offer significant improvements in diagnostics and treatments. Collaborations with leading health institutions ensure compliance with industry standards and the highest quality in our offerings.",
    image: "/media/products/jendo-device-kit.jpg",
  },
  {
    slug: "iot",
    title: "IoT Technologies",
    icon: "Cpu",
    summary:
      "Smart IoT solutions that streamline operations and enhance connectivity.",
    body: "Our IoT technologies provide sophisticated connectivity solutions for industries including healthcare and manufacturing. By implementing IoT systems, we enable real-time data collection and analysis, leading to improved decision-making and operational efficiency. We specialise in scalable IoT architectures — like the award-winning AnankeIoT platform — that integrate seamlessly with existing operations.",
    image: "/media/gallery/event-jul-02.jpg",
    imagePosition: "object-center",
  },
  {
    slug: "research",
    title: "Research & Development",
    icon: "FlaskConical",
    summary:
      "Pioneering biomedical R&D for sustainable health solutions.",
    body: "Our research and development initiatives focus on pioneering innovations that address critical health issues. We invest in comprehensive market research and scientific exploration to stay ahead in the biomedical field. Through collaborations with academic institutions and healthcare providers, our R&D aligns with real-world needs and regulatory standards — from IEEE-published methods to WIPO-recognised patents.",
    image: "/media/awards/german-tour.jpeg",
  },
  {
    slug: "lecturer",
    title: "Lecturer & Mentorship",
    icon: "GraduationCap",
    summary:
      "Lecturing at top Sri Lankan universities and mentoring the next generation of innovators.",
    body: "A passionate researcher and innovator committed to advancing technology and education. Alongside entrepreneurship, Keerthi dedicates himself to mentoring and inspiring young students, sharing knowledge and experience through lectures at top universities in Sri Lanka — nurturing the next generation of thinkers, innovators, and leaders.",
    image: "/media/portraits/lecturer.jpg",
    // Portrait source — keep the face in frame inside landscape cards
    imagePosition: "object-[50%_18%]",
  },
] as const;

/** Products & innovations — surfaced on the Services page */
export const products = [
  {
    name: "JENDO",
    tagline: "Non-invasive vascular health monitor",
    body: "AI-powered device detecting endothelial dysfunction — the earliest indicator of cardiovascular disease — in about 15 minutes. Backed by US- and Japan-granted patents.",
    image: "/media/products/jendo-device.jpg",
    href: "https://jendo.health/",
    external: true,
    tags: ["MedTech", "Patented"],
  },
  {
    name: "MindDrone",
    tagline: "Sri Lanka’s first mind-controlled drone",
    body: "A brain–computer interface that lets users fly a drone using their brain waves — locally built neurotech that relaxes and sharpens focus through calm, thought-driven control.",
    image: "/media/products/myndrone.jpg",
    logo: true,
    href: "/blog/mind-controlled-drone-diabetic-retinopathy",
    tags: ["Brain–Computer Interface", "Neurotech"],
  },
] as const;

/** Product slider on About → Journey: both innovations, JENDO and MindDrone */
export const productShowcase = [
  {
    src: "/media/products/jendo-device.jpg",
    alt: "JENDO non-invasive vascular health monitoring device",
    label: "JENDO · MedTech",
    caption: "Patented non-invasive vascular health monitor",
  },
  {
    src: "/media/products/jendo-device-kit.jpg",
    alt: "JENDO screening session in a clinical setting",
    label: "JENDO · Clinical use",
    caption: "15-minute screening deployed in hospital settings",
  },
  {
    src: "/media/products/minddrone-demo.jpg",
    alt: "MindDrone flight demonstration with live brain-signal dashboard",
    label: "MindDrone · Neurotech",
    caption: "Brain-signal dashboard flying the drone in real time",
  },
  {
    src: "/media/products/myndrone.jpg",
    alt: "MindDrone brand mark",
    label: "MindDrone · Brain–computer interface",
    caption: "Sri Lanka’s first mind-controlled drone",
    fit: "contain" as const,
  },
] as const;

export const heroStats = [
  { value: 12, suffix: "+", label: "Years building Jendo Innovations" },
  { value: 28, suffix: "", label: "Eisenhower Fellows — selected from 500+" },
  { value: 800, suffix: "+", label: "Patients clinically tested" },
  { value: 15, suffix: " min", label: "Early heart-disease detection" },
] as const;

/** Fellowships only — used on Achievements page */
export const fellowships = [
  {
    title: "Eisenhower Fellowship 2026",
    subtitle: "Innovative Entrepreneurs Program",
    body: "Selected as one of 28 fellows from more than 500 global applicants. Fellowship focus: designing a South Asian Regulatory Framework for AI Medical Devices — a proud moment for Sri Lanka's deep-tech ecosystem.",
    image: "/media/portraits/eisenhower-2026.jpg",
    href: "/blog/eisenhower-fellowship-2026",
    externalHref: "https://lnkd.in/gCx4b4SQ",
    externalLabel: "View announcement",
  },
  {
    title: "Chevening CRISP Fellowship 2026",
    subtitle: "St Cross College, University of Oxford",
    body: "Selected for the Chevening Research Science and Innovation Leadership Fellowship — exploring cutting-edge MedTech innovations and bringing these insights back to Sri Lanka to drive impact in healthcare and technology.",
    image: "/media/gallery/oxford-chevening-b.jpeg",
    href: "/blog/chevening-crisp-oxford",
    externalHref: "https://www.chevening.org/",
    externalLabel: "About Chevening",
  },
] as const;

/**
 * Home Recognition — featured slider (WP-style), latest first.
 * Each story shown once here — not again in Insights / Gallery cards.
 */
export const recognition = [
  {
    id: "eisenhower-2026",
    kicker:
      "Latest global recognition — selected as one of 28 fellows from 500+ applicants for Eisenhower Fellowships 2026.",
    title: "Eisenhower Fellowship 2026 — Innovative Entrepreneurs Program",
    paragraphs: [
      "Sri Lanka’s Keerthi Kodithuwakku, Chairman and CEO of Jendo Innovations Inc., has been selected as one of 28 fellows for the prestigious Eisenhower Fellowships 2026 Innovative Entrepreneurs Program.",
      "Chosen from more than 500 global applicants, this honour recognises 12+ years of building Jendo into a pioneering biomedical company, with US & Japan granted patents for non-invasive vascular health monitoring.",
      "Fellowship focus: designing a South Asian Regulatory Framework for AI Medical Devices — a proud moment for Sri Lanka’s deep tech ecosystem.",
    ],
    tags: ["Eisenhower", "Global Fellows", "MedTech Policy"],
    images: [
      {
        src: "/media/portraits/eisenhower-2026.jpg",
        alt: "Keerthi Kodithuwakku — Eisenhower Fellowship 2026 announcement",
      },
    ],
    href: "/blog/eisenhower-fellowship-2026",
    cta: "Read more",
    externalHref: "https://lnkd.in/gCx4b4SQ",
    externalLabel: "View announcement",
  },
  {
    id: "chevening-2026",
    kicker:
      "A new milestone at St Cross College, Oxford, with inspiration to bring cutting-edge medtech insights back to Sri Lanka.",
    title: "Chevening CRISP Fellowship 2026 at University of Oxford",
    paragraphs: [
      "Honoured to be selected for the Chevening Research Science and Innovation Leadership Fellowship at St Cross College, Oxford.",
      "At the Chevening pre-departure programme, I had the privilege of meeting His Excellency Andrew Patrick, the British High Commissioner, and learning more about the fellowship and its global opportunities.",
      "I look forward to exploring cutting-edge medtech innovations and bringing these insights back to Sri Lanka to drive impact in healthcare and technology.",
      "My work continues to focus on preventive healthcare, accessible AI-enabled screening, and practical solutions that can support both advanced and resource-limited healthcare settings across South and Southeast Asia.",
      "Beyond entrepreneurship, I remain committed to mentoring young innovators, strengthening Sri Lanka's startup ecosystem, and encouraging more women to pursue STEM and innovation-led careers.",
    ],
    tags: ["Oxford", "Chevening", "MedTech Leadership"],
    images: [
      {
        src: "/media/gallery/oxford-chevening-b.jpeg",
        alt: "Chevening fellowship certificate presentation with the British High Commission",
      },
      {
        src: "/media/gallery/oxford-chevening-a.jpeg",
        alt: "Chevening pre-departure programme meeting",
      },
      {
        src: "/media/portraits/oxford-chevening-1.jpeg",
        alt: "Keerthi Kodithuwakku at the Chevening pre-departure programme",
      },
    ],
    href: "/blog/chevening-crisp-oxford",
    cta: "Read this article",
    externalHref: "https://www.chevening.org/",
    externalLabel: "About Chevening",
  },
  {
    id: "ict-leader-2025",
    kicker:
      "National ICT honour — recognised among Sri Lanka’s foremost technology leaders by the Computer Society of Sri Lanka.",
    title: "ICT Leader of the Year 2025 — National ICT Awards",
    paragraphs: [
      "One of the highest national honors in Sri Lanka’s ICT sector, conferred annually by the Computer Society of Sri Lanka.",
      "Achieved at the age of 35 — among the youngest awardees in the history of the honor — recognising MedTech entrepreneurship and contribution to the country’s digital innovation ecosystem.",
      "Coverage across the Daily Mirror, Sunday Times, and the Ministry of Digital Economy highlighted years of building technology that connects research, patents, and real-world healthcare outcomes.",
    ],
    tags: ["CSSL", "National Awards", "ICT Leadership"],
    images: [
      {
        src: "/media/awards/ict-leader-trophy.jpg",
        alt: "ICT Leader of the Year 2025 — receiving the award on stage",
      },
    ],
    href: "/blog/ict-leader-of-the-year",
    cta: "Read more",
  },
] as const;

/** Home Insights — exclude stories already in Recognition */
export const featuredStorySlugs = [
  {
    slug: "alumni-association-moratuwa",
    image: "/media/news/alumni-moratuwa.jpg",
    cta: "Read this article",
  },
  {
    slug: "healthcare-regulatory-compliance-challenges",
    image: "/media/blog/jendo-regulatory-kit.jpg",
    cta: "Read this article",
  },
  {
    slug: "jendo-bahrain-pilot",
    image: "/media/gallery/bahrain-pilot.jpeg",
    cta: "Read this article",
  },
  {
    slug: "jendo-investment-milestone",
    image: "/media/products/jendo-device.jpg",
    cta: "Read this article",
  },
] as const;

/**
 * Home gallery — excludes Recognition / Impact / Insights / Partnerships
 * hero images so the same photo never repeats on one screen.
 */
export const gallery = [
  { src: "/media/gallery/boardroom-hq.jpg", alt: "Executive boardroom discussion" },
  { src: "/media/gallery/event-jul-04.jpg", alt: "Advanced production facility tour" },
  { src: "/media/gallery/speaking-hq.jpg", alt: "Keynote speaking engagement" },
  { src: "/media/gallery/team-hq-02.jpg", alt: "Leadership team collaboration" },
  { src: "/media/gallery/team-hq-01.jpg", alt: "Conference address — Chemex" },
  { src: "/media/gallery/kk-hq-06.jpg", alt: "St Antony’s College, University of Oxford" },
  { src: "/media/gallery/kk-hq-05.jpg", alt: "Jendo team — technology breakthrough" },
  { src: "/media/gallery/kk-hq-04.jpg", alt: "Business strategy session" },
  { src: "/media/gallery/kk-hq-03.jpg", alt: "Speaking engagement" },
  { src: "/media/gallery/kk-hq-02.jpg", alt: "Executive collaboration" },
  { src: "/media/gallery/kk-hq-01.jpg", alt: "Professional portrait" },
  { src: "/media/gallery/event-jul-07.jpg", alt: "Formal portrait — international visit" },
  { src: "/media/gallery/event-jul-01.jpg", alt: "Technical presentation — regulatory pathway" },
  { src: "/media/gallery/event-jul-02.jpg", alt: "The Age of AI exhibition" },
  { src: "/media/gallery/event-jul-03.jpg", alt: "Professional engagement July 2026" },
  { src: "/media/gallery/event-jul-05.jpg", alt: "Industry visit July 2026" },
  { src: "/media/gallery/event-jul-06.jpg", alt: "Advanced manufacturing facility visit" },
  { src: "/media/gallery/usa-hq-01.jpg", alt: "Partnership visit in Japan" },
  { src: "/media/gallery/usa-hq-03.jpg", alt: "International network meeting" },
  { src: "/media/gallery/oxford-hq.jpg", alt: "Healthcare industry exhibition and networking" },
  { src: "/media/gallery/event-hq-02.jpg", alt: "Strategic briefing presentation" },
  { src: "/media/gallery/kk-oxford-arch.jpg", alt: "University of Oxford campus architecture" },
  { src: "/media/gallery/chevening-event.jpg", alt: "Guest speaker — Morph Lab, Imperial College London" },
  { src: "/media/portraits/keerthi-ceo.jpeg", alt: "Chairman & CEO portrait" },
  { src: "/media/awards/ada-derana.jpeg", alt: "TV Derana science initiative" },
  { src: "/media/news/feature-speaking.jpg", alt: "CSSL National ICT Awards — stage presentation" },
  { src: "/media/about/collaboration.jpg", alt: "Strategic collaboration" },
  { src: "/media/awards/jkx-victory.jpg", alt: "John Keells X victory 2016" },
  { src: "/media/awards/young-innovator-2024.jpg", alt: "Young Innovator 2024" },
  { src: "/media/gallery/kk-hq-07.jpg", alt: "Roundtable discussion with international partners" },
  { src: "/media/publications/pub-mindfulness-a.jpg", alt: "Seedstars Sri Lanka — stage presentation" },
] as const;

export const highlights = [
  {
    title: "Sri Lanka’s Impact at the Global AI for Health Summit",
    excerpt:
      "Represented Sri Lanka at the 2nd Global Initiative on AI for Health (GIAI4H) summit in Singapore, hosted by NUS alongside WIPO, WHO, and ITU — showcasing AI-driven cardiovascular health solutions.",
    image: "/media/news/giai4h-singapore.jpg",
    href: "/achievements",
  },
  {
    title: "ASNAC 2025 — Congress of Sri Lankan Neurologists",
    excerpt:
      "Presented on AI-driven diagnostics, brain–computer interfaces, and non-invasive monitoring — encouraging researchers to protect and scale their work through patents.",
    image: "/media/news/asnac-2025.jpg",
    href: "/achievements",
  },
  {
    title: "An IP-Driven Technopreneur — Scale Up Your IP",
    excerpt:
      "Speaker at the WIPO / NIA workshop at the University of Colombo, helping startups and university spin-offs use intellectual property to bridge lab research and market needs.",
    image: "/media/news/ip-workshop.jpg",
    href: "/achievements",
  },
] as const;

export const uvp = [
  {
    eyebrow: "Technology",
    title: "Cutting-edge MedTech & IoT",
    body: "AI-enabled medical devices, non-invasive screening, and IoT platforms built for real-world clinics, enterprises, and public programmes.",
    image: "/media/products/jendo-device.jpg",
    href: "/services",
  },
  {
    eyebrow: "Global reach",
    title: "Cross-border expertise",
    body: "Teams and partnerships across Sri Lanka, Japan, the UK, and the US — bringing diverse insight to every engagement.",
    image: "/media/hero/network-hq.jpg",
    href: "/about",
  },
  {
    eyebrow: "Leadership",
    title: "Award-winning execution",
    body: "Recognised for patents, national ICT leadership, and ventures that turn research into deployable products.",
    image: "/media/awards/german-tour.jpeg",
    href: "/achievements",
  },
] as const;

/** Featured on Home / About / Services. Koding stays in footer only. */
export const ventures = [
  {
    name: "Jendo Innovations",
    role: "Chairman & CEO",
    summary:
      "Deep-tech MedTech venture building an AI-powered, non-invasive vascular health monitoring system — detecting endothelial dysfunction, the earliest indicator of cardiovascular disease, in about 15 minutes.",
    href: "https://jendo.health/",
    image: "/media/products/jendo-device-kit.jpg",
    position: "object-[50%_45%]",
    highlights: ["US & Japan patents", "15-minute screening", "Bahrain pilot"],
  },
  {
    name: "Effective Solutions",
    role: "Founder & CEO",
    summary:
      "Award-winning technology company founded in 2013 by University of Moratuwa engineers — delivering IoT, AI, and digital transformation across private sector, government, and defense, with presence in Sri Lanka, Japan, and England.",
    href: "https://www.effectivesolutions.lk/",
    image: "/media/gallery/boardroom-hq.jpg",
    position: "object-[50%_35%]",
    highlights: ["500+ projects", "Global offices", "AnankeIoT platform"],
  },
] as const;

export const about = {
  eyebrow: "About",
  title: "Pioneering biomedical and IoT innovations for a better tomorrow",
  lead: "Keerthi Kodithuwakku is a biomedical technopreneur and innovation strategist from Sri Lanka, working at the intersection of medicine, engineering, and artificial intelligence to advance preventive healthcare in low and middle-income settings.",
  lead2:
    "He is Chairman/CEO of Jendo Innovations, Founder/CEO of Effective Solutions, and CEO & Director of Koding Private Limited — building AI-enabled medical devices, IoT platforms, and software talent from Sri Lanka to the world.",
  oxford:
    "He is the inventor of US- and Japan-granted patents for a novel non-invasive vascular health monitoring system — frontier technology recognised by global institutions including WIPO, WHO, and ITU for its potential to transform early detection of cardiovascular and metabolic diseases.",
  mission:
    "Enable AI-driven medical devices and early-screening technologies to eliminate preventable diseases — particularly vascular and metabolic conditions — by aligning technological innovation with policy frameworks in collaboration with global institutions and thought leaders.",
  values:
    "Integrity, innovation, collaboration, and excellence. Every project reflects a commitment to sustainable development and the well-being of the communities we serve — from primary care clinics to national digital programmes.",
  education: [
    "MBA — University of Colombo",
    "BSc Engineering (Hons) Electronics & Telecommunication with Minor in Entrepreneurship — University of Moratuwa",
    "MIT Global Startup Labs — founding programme for Effective Solutions",
  ],
  roles: [
    "Program Director — Neo Ventures Innovations Accelerator (NIBM)",
    "Secretary — University of Moratuwa Alumni Association",
    "Advisory Committee Member — University of Moratuwa",
    "Visiting Lecturer — leading Sri Lankan universities",
    "Founder — Entrepreneurship Society",
  ],
  jkxStory:
    "John Keells X, an open innovation challenge by John Keells Holdings PLC, held its inaugural competition in 2016, recognizing innovative and disruptive ideas. The winning team, Jendo — co-founded by Keerthi Kodithuwakku, Isuru Rajakaruna, and Charith Vithanage — won Rs 2 million for their groundbreaking non-invasive cardiovascular health monitoring technology. Out of 148 applications, 10 finalists were shortlisted and given 60 days to develop their ideas, with mentorship from JKH leadership.",
  journey:
    "Effective Solutions (Pvt) Ltd emerged from MIT Global Startup Labs, founded by five engineering graduates from the University of Moratuwa in 2013. The company expanded to Japan and England, transforming business requirements into functional digital solutions — later launching JENDO, MYNDRONE, and the award-winning AnankeIoT platform.",
  journey2:
    "Through strategic partnerships and relentless dedication, Effective Solutions became a recognized leader in biomedical and IoT innovation. Co-founding Jendo Innovations further solidified a commitment to research, patents, and clinical-grade product development.",
  collaboration:
    "Committed to building strong partnerships with stakeholders in healthcare, defense, technology, and governance — strategic alliances that drive impactful solutions, enhance national resilience, and advance technology across industries.",
} as const;

export const featuredAwards = [
  {
    title: "Global Patent Recognitions",
    subtitle: "United States · Japan · Sri Lanka",
    body: "Jendo has been recognized globally for its innovative approach to vascular health monitoring through prestigious patents awarded in multiple countries — including the granted USPTO Patent 10,912,464 B2. Each patent underscores a commitment to groundbreaking research, technological advancement, and protecting intellectual property while expanding globally.",
    image: "/media/awards/global-patents.png",
  },
  {
    title: "ICT Leader of the Year 2025",
    subtitle: "National ICT Awards — CSSL",
    body: "One of the highest national honors in Sri Lanka's ICT sector, conferred annually by the Computer Society of Sri Lanka. Achieved at the age of 35 — among the youngest awardees in the history of the honor. Recognised across the Daily Mirror, Sunday Times, and the Ministry of Digital Economy.",
    image: "/media/awards/ict-leader-2025.jpeg",
  },
  {
    title: "Young Innovator of the Year 2024",
    subtitle: "University of Sri Jayewardenepura",
    body: "Awarded by the Faculty of Allied Health Sciences, acknowledging leadership in MedTech innovation and meaningful contributions toward advancing modern healthcare — bridging technology and healthcare to improve accessibility, diagnostics, and patient outcomes.",
    image: "/media/awards/young-innovator-2024.jpg",
  },
  {
    title: "CEO of the Year 2022 — AI Category",
    subtitle: "National CEO Awards — The CEO Magazine",
    body: "Honors leadership in leveraging artificial intelligence to drive innovation, operational excellence, and meaningful societal impact — reflecting the collective efforts of a high-performing team applying AI to solve complex challenges.",
    image: "/media/portraits/keerthi-ceo.jpeg",
  },
] as const;

export const achievements = {
  stats: [
    { value: 28, suffix: "", label: "Eisenhower Fellows — from 500+ applicants" },
    { value: 3, suffix: "", label: "Countries with patent recognition" },
    { value: 12, suffix: "+", label: "Years building Jendo" },
    { value: 7, suffix: "+", label: "National & global awards" },
  ],
  timeline: [
    {
      year: "2026 / 2025",
      items: [
        "Eisenhower Fellowships 2026 — Innovative Entrepreneurs Program (1 of 28 fellows from 500+ global applicants)",
        "Chevening CRISP Fellowship — St Cross College, University of Oxford",
        "ICT Leader of the Year 2025 — National ICT Awards (CSSL)",
        "WIPO International Patent Drafting Training Program, Geneva",
        "Global Initiative on AI for Health — GIAI4H, Singapore",
        "Planet 43 — JAPAC Deep Tech Accelerator Program",
        "AsiaBerlin Summit 2025 — exploring partnerships with German medical distributors",
        "WIPO Master Class on Intellectual Property — completed",
        "Brain–Computer Interface Forum, Shangri-La Hambantota — \"Unlocking the Potential of BCI: What Sri Lanka Has to Offer\"",
        "Techno Entrepreneurship Forum 2025 — University of Colombo",
        "Presented at the International Conference of the Neurologists' Association of Sri Lanka (ASNAC)",
        "Speaker — \"Scale Up Your IP\" workshop (WIPO + NIA), University of Colombo",
        "Presented at LATTO Meeting / Mini-Conference at SLINTEC on commercializing deep-tech innovations",
        "Secretary — Alumni Association, University of Moratuwa",
        "Speaker at Mora Ventures 6.0",
      ],
    },
    {
      year: "2024",
      items: [
        "Young Innovator of the Year — University of Sri Jayewardenepura",
        "WIPO Conversation on IP and Frontier Technologies",
        "WIPO Global Case Study on Artificial Intelligence in Health",
        "Engaged at Asian Productivity Organization (APO) HQ, Tokyo — completed the APO Program",
        "Speaker at Mora Ventures 6.0 — \"Introduction to Entrepreneurship and Innovation\"",
      ],
    },
    {
      year: "2023",
      items: [
        "Industrial exhibition in Tokyo — exploring the impact of Sri Lankan biomedical technology",
        "Rotary District Conference, Malaysia",
      ],
    },
    {
      year: "2022",
      items: [
        "CEO of the Year — Artificial Intelligence Category, National CEO Awards",
        "Commonwealth Digital Health Award — Runners-Up (Faculty of Medicine, University of Colombo)",
        "01 Awards — Gold, Best Use of Mobile (Healthcare & Personal Services) for Jendo devices",
        "01 Awards — Gold, Best Digital-Enabled Product/Service for the AnankeIoT Platform",
      ],
    },
    {
      year: "2019",
      items: [
        "Best IoT Startup of the Year — National ICT Awards, for the AnankeIoT Platform (Effective Solutions)",
      ],
    },
    {
      year: "2018",
      items: [
        "Emerging ICT Leader of the Year — National ICT Awards (highest national ICT honor under age 30, CSSL)",
        "Best Startup of the Year — National ICT Awards, awarded to Jendo Innovations",
      ],
    },
    {
      year: "2016",
      items: [
        "Winner — John Keells X Open Innovation Challenge (Rs 2 million, from 148 applications)",
        "National Science Foundation Grant Winner",
        "Sri Lankan Startup Delegation — 4YFN MWC, Barcelona",
        "Sri Lankan Delegation — Japan IT Week 2016",
      ],
    },
  ],
  // Only live YouTube IDs (verified via oEmbed). Removed unavailable: WXkKLaiwbIM, c2cfkE9AYh4.
  videos: [
    {
      id: "eFdcP4RWKRg",
      title:
        'Building and Commercializing MedTech IP from Sri Lanka — Morph Lab, Imperial',
    },
    {
      id: "PmWH84RqYiE",
      title:
        "The Journey Towards a US Patent — Keerthi Kodithuwakku, Jendo Innovations",
    },
    {
      id: "WKAR3etccU4",
      title: "New invention for identifying heart patients — Jendo",
    },
    {
      id: "-bqUvBCFQxk",
      title: "Sri Lanka's very first mind-controlled drone — Jendo Innovation",
    },
    {
      id: "MKTUO5NX1Qg",
      title: "Effective Solutions — interview at 4YFN 2017, Barcelona",
    },
    {
      id: "F-KEnSZ2KzI",
      title: "Business Today — CEO of Effective Solutions (2021)",
    },
    {
      id: "bcE8pwGF3Zw",
      title: "Aluth Parliament — Sri Lanka's $2 billion IT industry goal",
    },
  ],
  /** Each card uses a unique image — no shared clinical/product shots */
  publications: [
    {
      title:
        "A Hybrid Approach for Screening Endothelial Dysfunction using Photoplethysmography and Digital Thermal Monitoring",
      href: "https://ieeexplore.ieee.org/document/9629748",
      source: "IEEE Xplore",
      image: "/media/publications/pub-ppg-dtm.jpg",
    },
    {
      title:
        "Non-Invasive Assessment of Endothelial Dysfunction: A Novel Method to Detect Severe COVID-19",
      href: "https://pubmed.ncbi.nlm.nih.gov/33254535/",
      source: "PubMed",
      image: "/media/publications/pub-pubmed.jpg",
    },
    {
      title:
        "Psychometric Evaluation of a Sinhalese Version of the Five Facet Mindfulness Questionnaire",
      href: "https://www.researchgate.net/publication/359312955",
      source: "ResearchGate",
      image: "/media/publications/pub-mindfulness-1.png",
    },
    {
      title:
        "Psychometric Evaluation of a Sinhala Translation of the FFMQ and Development of a Short Form",
      href: "https://www.researchgate.net/publication/365476014",
      source: "ResearchGate",
      image: "/media/publications/pub-mindfulness-2.png",
    },
    {
      title: "Jendo — Heart Disease Prediction using Machine Learning",
      href: "https://www.wipo.int/en/web/ip-advantage/w/stories/jendo-heart-disease-prediction-using-machine-learning",
      source: "WIPO IP Advantage",
      image: "/media/publications/pub-wipo-jendo.jpg",
    },
    {
      title: "Research profile — Keerthi M. Kodithuwakku",
      href: "https://www.researchgate.net/scientific-contributions/Keerthi-M-Kodithuwakku-2217200196",
      source: "ResearchGate",
      image: "/media/publications/pub-profile.jpg",
    },
  ],
} as const;

export const contactIntro =
  "We'd love to hear from you. Whether you are exploring a partnership, speaking engagement, research collaboration, or an introduction to Jendo's technology — connect with us for inquiries and collaborations.";

export const mapEmbedSrc =
  "https://www.google.com/maps?q=Trace+Expert+City,+Maradana,+Colombo+10,+Sri+Lanka&output=embed";
