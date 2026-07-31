export const site = {
  name: "Keerthi Kodithuwakku",
  title: "Keerthi Kodithuwakku | MedTech Founder & Technopreneur",
  description:
    "Biomedical innovator, Chairman & CEO of Jendo Innovations and Effective Solutions: building AI-enabled preventive healthcare from Sri Lanka to the world.",
  url: "https://keerthikodithuwakku.com",
  email: "keerthi@jendoinnovations.com",
  phone: "+94 76 621 0120",
  phoneHref: "tel:+94766210120",
  address: "Bay 09, Trace Expert City, AC19, Colombo 10, Sri Lanka",
  social: {
    linkedin: "https://www.linkedin.com/in/keerthi-kodithuwakku-b98149219",
    facebook: "https://www.facebook.com/keerthi.priyankara.3",
    x: "https://x.com/mkkeerthi",
  },
  ventures: {
    jendo: "https://jendo.health/",
    effectiveSolutions: "https://www.effectivesolutions.lk/",
    koding: "https://www.koding.lk/",
  },
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/achievements", label: "Achievements" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;
