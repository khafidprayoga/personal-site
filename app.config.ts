export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'neutral',
      solid: 'blue',
    }
  },
  appName: "Fixed Thoughts",
  appDescription:
    "Fixed Thoughts is a daily writing about my thoughts and experiences",
  author: {
    name: "Khafid Prayoga",
    role: "Software Engineer",
  },
  pinnedAnnouncement: {
    show: false,
    message: "Just Release a new version of Fixed Thoughts!",
    link: {
      label: "Check it out",
      to: "/showcase",
    },
  },
  hero: {
    title: "Hey, i am Khafid👋",
    description: "A passionate Back-end Developer with 3+ years of experience building reliable, high-performance systems using Go, PostgreSQL, and cloud-native tools. From database design to API development, I help turn ideas into robust digital solutions. Let’s build something powerful—together.",
    openToWork: true,
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
