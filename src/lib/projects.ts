import stillInstitutional from "@/assets/still-institutional.jpg";
import stillConcert from "@/assets/still-concert.jpg";
import stillBrand from "@/assets/still-brand.jpg";
import stillWedding from "@/assets/still-wedding.jpg";
import stillSports from "@/assets/still-sports.jpg";
import stillAerial from "@/assets/still-aerial.jpg";
import stillMusic from "@/assets/still-music.jpg";

export type Category =
  | "BRANDS"
  | "EVENTS"
  | "CONCERTS"
  | "SPORTS"
  | "INSTITUTIONAL"
  | "WEDDINGS"
  | "MUSIC";

export interface Project {
  slug: string;
  index: string;
  title: string;
  kicker: string;
  categories: Category[];
  role: string;
  driveId: string;
  still: string;
  description: string;
  span: "full" | "wide" | "tall" | "half";
}

const drive = (id: string) => `https://drive.google.com/file/d/${id}/preview`;


export const projects: Project[] = [
  {
    slug: "eu-embassy",
    index: "01",
    title: "EU EMBASSY",
    kicker: "Institutional / Event / Film",
    categories: ["INSTITUTIONAL", "EVENTS"],
    role: "Cinematography / Video Production",
    driveId: "1uxdiBZEyRyvy1dPLczCQEI6o09RZzdhD",
    still: stillInstitutional,
    description:
      "A diplomatic gathering shot like a film — restrained camera, natural light, and an edit that lets the room speak for itself.",
    span: "full",
  },
  {
    slug: "global-rajasthan-agri-summit",
    index: "02",
    title: "GLOBAL RAJASTHAN AGRI SUMMIT",
    kicker: "Event / Institutional",
    categories: ["INSTITUTIONAL", "EVENTS"],
    role: "Cinematography / Editing",
    driveId: "1LmP2q32Cfqel80raZj9lnu16W2OwAuEc",
    still: stillAerial,
    description:
      "Summit coverage cut into a fast, textured film — scale, movement and detail carried across three days in a single sequence.",
    span: "half",
  },
  {
    slug: "ficci",
    index: "03",
    title: "FICCI",
    kicker: "Corporate / Event / Brand",
    categories: ["INSTITUTIONAL", "EVENTS", "BRANDS"],
    role: "Cinematography / Video Production",
    driveId: "1Jd_uj2ByoaD91xZh2UFxtCLI1dNI2lvU",
    still: stillInstitutional,
    description:
      "Corporate coverage without the corporate feel. Clean frames, honest moments, a rhythm built in the edit.",
    span: "half",
  },
  {
    slug: "honey-singh",
    index: "04",
    title: "HONEY SINGH",
    kicker: "Concert / Artist / Entertainment",
    categories: ["CONCERTS", "MUSIC"],
    role: "Cinematography / Live Coverage",
    driveId: "1bucbWY6Gh_o9OGMM_ZIEmoXVlu6F67zU",
    still: stillConcert,
    description:
      "Front of stage, in the pit, above the crowd. Energy captured raw, then cut to the beat.",
    span: "wide",
  },
  {
    slug: "hyrox",
    index: "05",
    title: "HYROX",
    kicker: "Sports / Event",
    categories: ["SPORTS", "EVENTS"],
    role: "Cinematography / Editing",
    driveId: "1Bzr7QTkVTke1YgcC638TR5lLCtt7NdAk",
    still: stillSports,
    description:
      "Sweat, breath and stopwatch. Handheld coverage built around effort, not results.",
    span: "tall",
  },
  {
    slug: "korean-president",
    index: "06",
    title: "KOREAN PRESIDENT",
    kicker: "Institutional / High-Profile Event",
    categories: ["INSTITUTIONAL", "EVENTS"],
    role: "Cinematography / Video Production",
    driveId: "1Tn4tsXg3t_ohJAKsU8Fa7XZIkF0lvOZN",
    still: stillInstitutional,
    description:
      "High-security, one-take-only coverage. Precision planning, invisible crew, cinematic result.",
    span: "half",
  },
  {
    slug: "karan-aujla",
    index: "07",
    title: "KARAN AUJLA",
    kicker: "Concert / Live Performance",
    categories: ["CONCERTS", "MUSIC"],
    role: "Cinematography / Video Production",
    driveId: "1OJ548Nl1tquMjrXETGBYx6QjmO5m_mzW",
    still: stillConcert,
    description:
      "A stadium night compressed into a short film — lights, lens flares, and a crowd that never sits down.",
    span: "full",
  },
  {
    slug: "kingfisher",
    index: "08",
    title: "KINGFISHER",
    kicker: "Brand / Commercial",
    categories: ["BRANDS"],
    role: "Cinematography / Editing",
    driveId: "1TQPCq-glm0epJahrt8QREI0QC74DAiQG",
    still: stillBrand,
    description:
      "Product-led commercial work. Controlled light, slow moves, and a finish that holds up on a big screen.",
    span: "half",
  },
  {
    slug: "octaloop",
    index: "09",
    title: "OCTALOOP",
    kicker: "Brand / Commercial",
    categories: ["BRANDS"],
    role: "Cinematography / Editing",
    driveId: "1VplIfc6uqbp2Nbc8hD32rJKS3MzZjC9_",
    still: stillMusic,
    description: "Brand storytelling with a music-video pulse.",
    span: "half",
  },
  {
    slug: "mother-dairy",
    index: "10",
    title: "MOTHER DAIRY",
    kicker: "Brand / Commercial",
    categories: ["BRANDS"],
    role: "Cinematography / Video Production",
    driveId: "1YWwbHIZT1psF_N-vHcitOV7R11iej6cD",
    still: stillBrand,
    description:
      "Commercial content built for reach — shot clean, cut tight, delivered in every ratio the campaign needed.",
    span: "wide",
  },
  {
    slug: "piyush-goyal",
    index: "11",
    title: "PIYUSH GOYAL",
    kicker: "Institutional / Corporate",
    categories: ["INSTITUTIONAL"],
    role: "Cinematography / Video Production",
    driveId: "1uTKjuQn3JGloOo1r3ww5k6sCulhoCUag",
    still: stillInstitutional,
    description: "Official coverage handled with discretion and pace.",
    span: "half",
  },
  {
    slug: "music-video",
    index: "12",
    title: "MUSIC VIDEO",
    kicker: "Music / Film",
    categories: ["MUSIC"],
    role: "DOP / Editing / Colour",
    driveId: "1D-OQX6lrzVXLR1lIs1rJENN3wPa95IeI",
    still: stillMusic,
    description:
      "A narrative music piece — lighting, blocking and grade treated as one decision.",
    span: "tall",
  },
  {
    slug: "glenwright",
    index: "13",
    title: "GLENWRIGHT",
    kicker: "Brand / Commercial",
    categories: ["BRANDS"],
    role: "Cinematography / Editing",
    driveId: "1Qylo6Dyyl2H0Jh2s_PS0-PVL-kGja7oJ",
    still: stillBrand,
    description: "Premium brand film with a quiet, tactile finish.",
    span: "half",
  },
  {
    slug: "taf",
    index: "14",
    title: "TAF",
    kicker: "Event / Brand",
    categories: ["EVENTS", "BRANDS"],
    role: "Cinematography / Editing",
    driveId: "1Rq362urCyTJ2--fMt2950SYAp7K7yApE",
    still: stillSports,
    description: "Event film built around people, not the stage plan.",
    span: "half",
  },
  {
    slug: "wedding",
    index: "15",
    title: "WEDDING",
    kicker: "Wedding / Cinematic Film",
    categories: ["WEDDINGS"],
    role: "Cinematography / Editing / Colour",
    driveId: "17ViICgvT-Hb4ubQtuiFnhAbVvGQWlyNw",
    still: stillWedding,
    description:
      "No posing, no cliché montage. A wedding cut like a short film — silence, glances, and the loud parts too.",
    span: "full",
  },
];

export const categories = [
  "ALL",
  "BRANDS",
  "EVENTS",
  "CONCERTS",
  "SPORTS",
  "INSTITUTIONAL",
  "WEDDINGS",
  "MUSIC",
] as const;

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const nextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};
