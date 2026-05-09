import type { Messages } from "./en";

export const hu: Messages = {
  meta: {
    title: "Galaczi Arnold portfólió — Full stack fejlesztő",
    description:
      "Kiber stílusú portfólió: modern webfejlesztés, projektek és elérhetőség.",
  },
  nav: {
    home: "KEZDŐLAP",
    about: "RÓLAM",
    projects: "PROJEKTEK",
    skills: "KÉSZSÉGEK",
    contact: "KAPCSOLAT",
  },
  navAria: {
    main: "Fő navigáció",
    logo: "Ugrás a kezdőlapra",
    openMenu: "Menü megnyitása",
    closeMenu: "Menü bezárása",
    navigate: "Ugrás a(z) {{section}} szakaszra",
  },
  lang: {
    hu: "Magyar",
    en: "English",
    switch: "Nyelv",
  },
  hero: {
    role: "FULL STACK FEJLESZTŐ",
    desc: {
      pre: "Digitális ",
      highlight: "élményeket alkotok",
      mid: " a ",
      design: "design",
      and: " és a ",
      technology: "technológia metszéspontján.",
    },
    ctaProjects: "PROJEKTEK",
    ctaContact: "ÍRJ NEKEM",
    scroll: "Görgess",
    ariaProjects: "Görgess a projektekhez",
    ariaContact: "Görgess a kapcsolathoz",
    ariaAbout: "Görgess a Rólam szakaszhoz",
  },
  about: {
    kicker: "// Rólam",
    title: "FRONTEND ",
    titleAccent: "FEJLESZTŐ",
    p1: "A szenvedélyem a ",
    p1a: "frontend fejlesztés",
    p1b: ", és szeretek ",
    p1c: "modern technológiákkal",
    p1d: " dolgozni. Olyan webalkalmazásokat készítek, amelyek nemcsak szépek, hanem ",
    p1e: "hatékonyak",
    p1f: " és felhasználóbarátok is.",
    p2:
      "React és TypeScript alapon fejlesztek, a legfrissebb eszközökkel és könyvtárakkal. Hiszem, hogy a tiszta kód és a jó UX együtt jár.",
    years: "5+ ÉV",
    experience: "Tapasztalat",
    highlights: {
      cleanCode: { title: "Tiszta kód", desc: "Fenntartható, skálázható megoldások" },
      modernDesign: { title: "Modern design", desc: "Letisztult felületek" },
      innovation: { title: "Innováció", desc: "Új technológiák felfedezése" },
      performance: { title: "Teljesítmény", desc: "Gyors és hatékony működés" },
    },
  },
  projects: {
    kicker: "// Munkáim",
    title: "KIEMELT ",
    titleAccent: "PROJEKTEK",
    subtitle:
      "Válogatás a legutóbbi munkáimból: webfejlesztés, UI/UX és modern eszközök.",
    items: {
      weather: {
        title: "IDŐJÁRÁS ALKALMAZÁS",
        category: "WEB APP",
        description:
          "React időjárás-app aktuális adatokkal egy helyszínre, OpenWeatherMap API-val.",
      },
      todo: {
        title: "TEENDŐK",
        category: "WEB APP",
        description: "Teendőlista: hozzáadás, szerkesztés és törlés.",
      },
      movie: {
        title: "FILM APP",
        category: "WEB APP",
        description:
          "Filmek böngészése és keresése részletes információkkal.",
      },
      quizGenerator: {
        title: "AI KVÍZGENERÁTOR",
        category: "FULL STACK",
        description:
          "AI-alapú kvízgenerátor, amely az Anthropic API segítségével bármilyen témában egyedi kvízeket készít, MongoDB tárolással és React frontenddel.",
      },
      harryPotter: {
        title: "HARRY POTTER KVÍZ",
        category: "FULL STACK",
        description:
          "Interaktív Harry Potter kvíz kliens–szerver architektúrával.",
      },
      meska: {
        title: "MESKA",
        category: "FULL STACK",
        description:
          "Full stack alkalmazás PHP és SQL háttérrel, React fronttal és egyedi UI-val.",
      },
      transylvania: {
        title: "TRANSYLVANIAN WONDERS",
        category: "FULL STACK",
        description:
          "Erdélyi túrafoglalás: foglalások, útmutatók és foglaláskezelés.",
      },
      aiResearch: {
        title: "AI ÉS PSZICHOLÓGIAI KUTATÁS",
        category: "KUTATÁS",
        description:
          "ESAS kutatási portál: beleegyezés, többlépcsős kérdőív, biztonságos adatkezelés és résztvevői információ.",
      },
      blogSystem: {
        title: "BLOG RENDSZER",
        category: "FULL STACK",
        description:
          "Node.js alapú blogrendszer külön backend és frontend résszel, modern webes technológiákkal.",
      },
      aiHasznalat: {
        title: "AI HASZNÁLAT",
        category: "WEB APP",
        description:
          "AI eszközök könyvtára és blog – fedezd fel a legjobb mesterséges intelligencia eszközöket, útmutatókat és híreket egy helyen.",
      },
    },
  },
  skills: {
    kicker: "// Tech stack",
    title: "KÉSZSÉGEK ÉS ",
    titleAccent: "SZAKÉRTELEM",
    subtitle:
      "Modern technológiák és keretrendszerek a digitális élményekhez.",
    categories: {
      frontend: "Frontend fejlesztés",
      uiux: "UI/UX design",
      backend: "Backend és adatbázis",
      performance: "Teljesítmény és build eszközök",
      devops: "DevOps és üzemeltetés",
      version: "Verziókezelés és együttműködés",
    },
    stats: {
      commits: "Commitok",
      coffee: "Elfogyasztott kávé",
    },
  },
  contact: {
    kicker: "// Kapcsolat",
    title: "LÉPJ ",
    titleAccent: "KAPCSOLATBA",
    subtitle:
      "Van egy projektötleted, vagy csak beszélgetnél? Írj, és hamar válaszolok.",
    name: "Név",
    namePh: "A neved",
    email: "E-mail",
    emailPh: "pelda@email.com",
    message: "Üzenet",
    messagePh: "Mesélj a projektről...",
    send: "ÜZENET KÜLDÉSE",
    sending: "KÜLDÉS...",
    ariaSending: "Üzenet küldése folyamatban",
    ariaSend: "Üzenet küldése",
    infoTitle: "ELÉRHETŐSÉG",
    followTitle: "KÖVESS",
    locationLabel: "Helyszín",
    location: "Gyimesfelsőlok, Románia",
    available: "NYITOTT VAGYOK MUNKÁRA",
    availableDesc: "Új projektekre és együttműködésre is",
    toastOk: "Az üzenet elküldve!",
    toastOkDesc: "Hamar jelentkezem.",
    toastErr: "Nem sikerült elküldeni",
    toastErrDesc: "Próbáld újra később, vagy írj közvetlenül e-mailben.",
    errDev: "A backend nem fut. Indítsd: npm run dev:server",
    errInvalid: "A szerver érvénytelen választ adott. Próbáld újra később.",
    errSend: "Nem sikerült elküldeni az üzenetet",
    validation: {
      nameMin: "A név legalább 2 karakter legyen",
      nameMax: "A név legfeljebb 50 karakter lehet",
      namePattern: "A név csak betűket, szóközt, kötőjelet és aposztrófot tartalmazhat",
      email: "Adj meg érvényes e-mail címet",
      emailMin: "Az e-mail legalább 5 karakter legyen",
      emailMax: "Az e-mail legfeljebb 100 karakter lehet",
      messageMin: "Az üzenet legalább 10 karakter legyen",
      messageMax: "Az üzenet legfeljebb 1000 karakter lehet",
    },
  },
  footer: {
    tagline: "Digitális élmények a design és a technológia találkozásánál.",
    quick: "GYORS LINKEK",
    connect: "KAPCSOLAT",
    about: "Rólam",
    projects: "Projektek",
    skills: "Készségek",
    contact: "Kapcsolat",
    rights: "© {{year}} GALAXY_INFORMATICS.",
    made: "Készült",
    stack: "React és TypeScript-tel",
  },
  notFound: {
    title: "AZ OLDAL NEM TALÁLHATÓ",
    body:
      "A keresett oldal nem létezik, vagy máshova került. Térjünk vissza a nyitólapra.",
    home: "Nyitólap",
    back: "Vissza",
    details: "// Hiba részletek",
    route: "Útvonal:",
    aria404: "404 hiba",
    ariaHome: "Vissza a nyitólapra",
    ariaBack: "Vissza az előző oldalra",
  },
  errorBoundary: {
    title: "Hoppá, valami hiba történt",
    body: "Váratlan hiba történt. Próbáld frissíteni az oldalt.",
    retry: "Újra",
    home: "Nyitólap",
  },
};
