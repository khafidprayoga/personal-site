export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'neutral',
      solid: 'blue',
    }
  },
  appName: "Khafid Prayoga",
  appDescription:
    "Fixed Thoughts is a daily writing about my thoughts and experiences",
  author: {
    name: "Khafid Prayoga",
    role: "Software Engineer",
  },
  pinnedAnnouncement: {
    show: true,
    message: "🚧 This project is under active development and has no stable release yet.",
    link: {
      label: "",
      to: "https://github.com/khafidprayoga/fixed",
    },
  },
  hero: {
    showPicture: true,
    title: "Hey, i am Khafid👋",
    description: "A passionate Back-end Developer with 3+ years of experience building reliable, high-performance systems using Go, PostgreSQL, and cloud-native tools. From database design to API development, I help turn ideas into robust digital solutions. Let’s build something powerful—together.",
    openToWork: true,
    resumeUrl: "https://drive.google.com/file/d/1ophAiqRIoqsn-0BIx8TIiI1Kf5fvS-Bm/view?usp=sharing"
  },
  latestArticle:{
    show: true,
    limit: 5,
  },
  social:{
    github: "khafidprayoga",
    linkedin: "khafidprayoga",
  },
  footer: {
    credits: "Made with ❤️ in East Java",
    links: [
      {
        icon: "i-simple-icons-github",
        "aria-label": "Author Github Profile",
        to: "https://github.com/khafidprayoga",
        target: "_blank",
      },
      {
        icon: "i-simple-icons-linkedin",
        "aria-label": "Author Linkedin Profile",
        to: "https://www.linkedin.com/in/khafidprayoga",
        target: "_blank",
      },
    ],
  },
});
