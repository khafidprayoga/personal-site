export default defineAppConfig({
  appName: "Khafid Prayoga",
  appDescription:
    "Fixed Thoughts is a daily writing about my thoughts and experiences",
  author: {
    name: "Khafid Prayoga",
    role: "Software Engineer",
  },
  pinnedAnnouncement: {
    show: false,
    message:
      "🚧 This project is under active development and has no stable release yet.",
    link: {
      label: "",
      to: "https://github.com/khafidprayoga/fixed",
    },
  },
  hero: {
    showPicture: true,
    title: "Hey, i am Khafid👋",
    description:
      "A passionate Back-end Developer with 3+ years of experience building reliable, high-performance systems using Go, PostgreSQL, and cloud-native tools. From database design to API development, I help turn ideas into robust digital solutions. Let's build something powerful—together.",
    openToWork: true,
    resumeUrl:
      "https://drive.google.com/file/d/1ophAiqRIoqsn-0BIx8TIiI1Kf5fvS-Bm/view?usp=sharing",
    stacks: [
      {
        name: "Go",
        icon: "i-simple-icons-go"
      },
      {
        name: "Nuxt.js",
        icon: "i-simple-icons-nuxtdotjs"
      },
      {
        name: "SQLite",
        icon: "i-simple-icons-sqlite"
      },
      {
        name: "MySQL",
        icon: "i-simple-icons-mysql"
      },
      {
        name: "PostgreSQL",
        icon: "i-simple-icons-postgresql"
      },
      {
        name: "Node.js",
        icon: "i-simple-icons-nodedotjs"
      },
      {
        name: "Laravel",
        icon: "i-simple-icons-laravel"
      },
      {
        name: "Docker",
        icon: "i-simple-icons-docker"
      },
      {
        name: "Elasticsearch",
        icon: "i-simple-icons-elasticsearch"
      },
      {
        name: "Cloudflare",
        icon: "i-simple-icons-cloudflare"
      },

      {
        name: "Google Cloud",
        icon: "i-simple-icons-googlecloud"
      },
      {
        name: "AWS",
        icon: "i-simple-icons-amazonaws"
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
