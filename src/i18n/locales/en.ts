export const en = {
  meta: {
    title: "Arnold Portfolio — Full Stack Developer",
    description:
      "Cyberpunk portfolio showcasing modern web development, projects, and contact.",
  },
  nav: {
    home: "HOME",
    about: "ABOUT",
    projects: "PROJECTS",
    skills: "SKILLS",
    contact: "CONTACT",
  },
  navAria: {
    main: "Main navigation",
    logo: "Go to home page",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    navigate: "Navigate to {{section}} section",
  },
  lang: {
    hu: "Magyar",
    en: "English",
    switch: "Language",
  },
  hero: {
    role: "FULL STACK DEVELOPER",
    desc: {
      pre: "Crafting ",
      highlight: "digital experiences",
      mid: " at the intersection of ",
      design: "design",
      and: " and ",
      technology: "technology.",
    },
    ctaProjects: "VIEW PROJECTS",
    ctaContact: "GET IN TOUCH",
    scroll: "Scroll",
    ariaProjects: "Scroll to projects section",
    ariaContact: "Scroll to contact section",
    ariaAbout: "Scroll to about section",
  },
  about: {
    kicker: "// About Me",
    title: "FRONTEND ",
    titleAccent: "DEVELOPER",
    p1: "My passion is ",
    p1a: "frontend development",
    p1b: " and using ",
    p1c: "modern technologies",
    p1d:
      ". I create web applications that are not only beautiful, but also ",
    p1e: " efficient",
    p1f: " and user-friendly.",
    p2:
      "I specialize in React and TypeScript-based development, where I use the latest tools and libraries to create modern, scalable solutions. I believe that clean code and good UX go hand in hand.",
    years: "5+ YEARS",
    experience: "Experience",
    highlights: {
      cleanCode: { title: "Clean Code", desc: "Maintainable, scalable solutions" },
      modernDesign: { title: "Modern Design", desc: "Stunning user interfaces" },
      innovation: { title: "Innovation", desc: "Pushing boundaries with new tech" },
      performance: { title: "Performance", desc: "Optimized for speed and efficiency" },
    },
  },
  projects: {
    kicker: "// My Work",
    title: "FEATURED ",
    titleAccent: "PROJECTS",
    subtitle:
      "Explore a selection of my recent work: web development, UI/UX, and modern tooling.",
    items: {
      weather: {
        title: "WEATHER APP",
        category: "WEB APP",
        description:
          "React weather app with current conditions for a location using the OpenWeatherMap API.",
      },
      todo: {
        title: "TODO APP",
        category: "WEB APP",
        description: "Todo app to add, edit, and delete tasks.",
      },
      movie: {
        title: "MOVIE APP",
        category: "WEB APP",
        description:
          "Browse and discover movies with search and detailed information.",
      },
      harryPotter: {
        title: "HARRY POTTER QUIZ",
        category: "FULL STACK",
        description:
          "Interactive Harry Potter quiz with client–server architecture.",
      },
      meska: {
        title: "MESKA",
        category: "FULL STACK",
        description:
          "Full stack app with PHP and SQL backend, React frontend, and custom UI.",
      },
      transylvania: {
        title: "TRANSYLVANIAN WONDERS",
        category: "FULL STACK",
        description:
          "Tour booking for Transylvania: reservations, guides, and booking management.",
      },
      aiResearch: {
        title: "AI & PSYCHOLOGY RESEARCH",
        category: "RESEARCH",
        description:
          "ESAS research portal: consent flow, multi-part questionnaire, secure handling, and participant information.",
      },
      blogSystem: {
        title: "BLOG SYSTEM",
        category: "FULL STACK",
        description:
          "Node.js-based blog system with separate backend and frontend parts built with modern web technologies.",
      },
      aiHasznalat: {
        title: "AI USAGE",
        category: "WEB APP",
        description:
          "AI tools directory and blog featuring the best artificial intelligence tools, guides, and news in one place.",
      },
    },
  },
  skills: {
    kicker: "// Tech Stack",
    title: "SKILLS & ",
    titleAccent: "EXPERTISE",
    subtitle:
      "A toolkit of modern technologies and frameworks for exceptional digital experiences.",
    categories: {
      frontend: "Frontend Development",
      uiux: "UI/UX Design",
      backend: "Backend & Database",
      performance: "Performance & Build Tools",
      devops: "DevOps & Deployment",
      version: "Version Control & Collaboration",
    },
    stats: {
      commits: "Code Commits",
      coffee: "Coffee Consumed",
    },
  },
  contact: {
    kicker: "// Get In Touch",
    title: "LET'S ",
    titleAccent: "CONNECT",
    subtitle:
      "Have a project in mind or want to chat? Message me and I'll get back to you shortly.",
    name: "Name",
    namePh: "Your name",
    email: "Email",
    emailPh: "your.email@example.com",
    message: "Message",
    messagePh: "Tell me about your project...",
    send: "SEND MESSAGE",
    sending: "SENDING...",
    ariaSending: "Sending message",
    ariaSend: "Send message",
    infoTitle: "CONTACT INFO",
    followTitle: "FOLLOW ME",
    locationLabel: "Location",
    location: "Gyimesfelsőlok, Romania",
    available: "AVAILABLE FOR WORK",
    availableDesc: "Currently accepting new projects and collaborations",
    toastOk: "Message sent successfully!",
    toastOkDesc: "I'll get back to you as soon as possible.",
    toastErr: "Failed to send message",
    toastErrDesc: "Please try again later or email me directly.",
    errDev: "Backend server is not running. Start it with: npm run dev:server",
    errInvalid: "Server returned an invalid response. Please try again later.",
    errSend: "Failed to send message",
    validation: {
      nameMin: "Name must be at least 2 characters",
      nameMax: "Name must be less than 50 characters",
      namePattern: "Name can only contain letters, spaces, hyphens, and apostrophes",
      email: "Please enter a valid email address",
      emailMin: "Email must be at least 5 characters",
      emailMax: "Email must be less than 100 characters",
      messageMin: "Message must be at least 10 characters",
      messageMax: "Message must be less than 1000 characters",
    },
  },
  footer: {
    tagline: "Crafting digital experiences at the intersection of design and technology.",
    quick: "QUICK LINKS",
    connect: "CONNECT",
    about: "About",
    projects: "Projects",
    skills: "Skills",
    contact: "Contact",
    rights: "© {{year}} GALAXY_INFORMATICS.",
    made: "Made with",
    stack: "using React & TypeScript",
  },
  notFound: {
    title: "PAGE NOT FOUND",
    body:
      "The page you're looking for doesn't exist or has been moved. Let's get you back on track.",
    home: "Return Home",
    back: "Go Back",
    details: "// Error Details",
    route: "Route:",
    aria404: "404 Error",
    ariaHome: "Return to home page",
    ariaBack: "Go back to previous page",
  },
  errorBoundary: {
    title: "Oops! Something went wrong",
    body: "We're sorry, but something unexpected happened. Please try refreshing the page.",
    retry: "Try Again",
    home: "Go Home",
  },
} as const;

export type Messages = typeof en;
