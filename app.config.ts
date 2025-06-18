export default defineAppConfig({
  appHostname: "khfd.xyz",
  appName: "Khafid Prayoga",
  appDescription:
    "My daily writing about my thoughts and experiences",
  author: {
    name: "Khafid Prayoga",
    role: "Software Engineer",
  },
  pinnedAnnouncement: {
    show: true,
    message:
      "🚧 This project is under active development and has no stable release yet.",
    link: {
      label: "Source Code",
      to: "https://github.com/khafidprayoga/personal-site",
    },
  },
  hero: {
    showPicture: true,
    title: "Hey, i am Khafid👋",
    description:
    "Experienced Back-end Developer with over 3 years of expertise in designing, developing, and maintaining scalable server-side applications. Proficient in Golang, JavaScript/TypeScript, and modern web technologies.",
    openToWork: true,
    resumeUrl:
      "/static/resume.pdf",
    stacks: [
      {
        name: "Go",
        icon: "i-devicon-go"
      },
      {
        name: "Nuxt.js",
        icon: "i-devicon-nuxtjs"
      },
      {
        name: "SQLite",
        icon: "i-devicon-sqlite"
      },
      {
        name: "MySQL",
        icon: "i-devicon-mysql"
      },
      {
        name: "PostgreSQL",
        icon: "i-devicon-postgresql"
      },
      {
        name: "Node.js",
        icon: "i-devicon-nodejs"
      },
      {
        name: "Laravel",
        icon: "i-devicon-laravel"
      },
      {
        name: "Docker",
        icon: "i-devicon-docker"
      },
      {
        name: "Elasticsearch",
        icon: "i-devicon-elasticsearch"
      },
      {
        name: "Cloudflare",
        icon: "i-devicon-cloudflare"
      },

      {
        name: "Google Cloud",
        icon: "i-devicon-googlecloud"
      },
      {
        name: "AWS Cloud",
        icon: "i-devicon-amazonwebservices-wordmark"
      },
    ]
  },
  workExperience: {
    show: true,
    history: [
      {
        role: "Backend Developer",
        company: "PT Gameskii Gen Eternal",
        date: {
          start: "June 2024",
          end: "March 2025",
        },
        companyUrl: "https://gameskii.com",
        description:
          "I built and managed backend services aligned with business needs, designed database structures using PostgreSQL, and rewrote Laravel-Lumen services to Golang for improved performance. I also deployed new features to Ubuntu servers, maintained backend services for both Android and iOS mobile clients, and actively contributed to team code quality through GitLab Merge Request reviews. Furthermore, I planned project timelines with Odoo timesheets and documented technical requirements on Notion.",
      },
      {
        role: "Backend Developer",
        company: "PT Ada Ide Langsung Jalan",
        date: {
          start: "April 2022",
          end: "April 2024",
        },
        companyUrl: "https://smartlink.id",
        description:
          "I optimized data migration processes from MySQL to Elasticsearch, developed a WhatsApp Chatbot for SnapBridge Gateway, and streamlined API documentation using OpenAPI. I also designed and maintained a secure, cloud-based Document Management System, implemented robust backend functionalities with frameworks like Express, Gin, and Fiber, and collaborated effectively with frontend teams to ensure seamless product integration.",
      },
    ],
  },
  latestArticle: {
    show: true,
    limit: 5,
  },
  social: {
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
