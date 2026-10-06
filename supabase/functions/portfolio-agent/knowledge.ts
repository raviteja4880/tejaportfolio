import type { PortfolioKnowledge } from "./types.ts";

export const PORTFOLIO_KNOWLEDGE: PortfolioKnowledge = {
  profile: {
    name: "Ravi Teja Kandula",
    title: "Full Stack Developer specializing in MERN, Redis, AWS, and AI-powered applications.",
    summary:
      "Ravi Teja is a developer focused on building scalable web applications, AI-powered solutions, and real-time systems. The portfolio highlights e-commerce platforms, RAG pipelines, AI-powered link tools, safety applications, and realtime quiz systems.",
    availability: "Currently looking for new opportunities."
  },
  contact: {
    email: "ravitejakandul@gmail.com",
    phone: "+91 8885674269",
    location: "Guntur, Andhra Pradesh, India",
    linkedin: "https://www.linkedin.com/in/ravitejakandula",
    github: "https://github.com/raviteja4880",
    whatsapp: "https://wa.me/8885674269"
  },
  portfolio: {
    website: "https://tejaportfolio1.netlify.app",
    resume: "assets/Resume.pdf",
    deployment: "Netlify"
  },
  skills: {
    frontend: ["HTML", "CSS", "JavaScript", "React", "Bootstrap"],
    backend: ["Node.js", "Express.js", "JWT", "Bcrypt", "FastAPI"],
    databases: ["MongoDB Atlas", "MySQL", "Redis"],
    cloud: ["AWS", "Azure", "Git", "GitHub Actions"],
    ai: ["RAG", "Vector Search", "Pinecone", "LLMs"]
  },
  projects: [
    {
      name: "MyStorX E-commerce",
      summary:
        "Scalable e-commerce platform with ML-based recommendations and Redis-powered caching for high performance.",
      technologies: ["MERN", "Redis", "ML", "Recommendation Systems"],
      liveLink: "https://mystorx.netlify.app",
      sourceLink: "https://github.com/raviteja4880/E-commers"
    },
    {
      name: "RAG Premium v3.0",
      summary:
        "Production-grade AI system with semantic search, dual-LLM pipeline, and real-time streaming responses.",
      technologies: ["AI", "FastAPI", "Pinecone", "RAG", "Vector Search"],
      liveLink: "https://rag-three-tau.vercel.app/",
      sourceLink: "https://github.com/raviteja4880/RAG"
    },
    {
      name: "SmartLink AI",
      summary:
        "AI-powered URL shortener that generates smart titles, summaries, and category tags from shared links, with link previews and trust scoring.",
      technologies: ["React", "Node.js", "FastAPI", "AI"],
      liveLink: "https://smartlinkai.vercel.app/",
      sourceLink: "https://github.com/raviteja4880/Smartlink-frontend"
    },
    {
      name: "Guardian SOS App",
      summary:
        "Women safety-focused real-time emergency alert system with GPS tracking, SMS alerts, and smart triggers.",
      technologies: ["Android", "Firebase", "Maps", "Emergency Services"],
      liveLink: "https://github.com/raviteja4880/Emergency-SOS/releases/tag/v1.0.0",
      sourceLink: "https://github.com/raviteja4880/guardian-sos"
    },
    {
      name: "Smart Quiz Platform",
      summary:
        "Enterprise-grade online assessment platform featuring secure authentication, real-time multiplayer quizzes, automated monitoring, and analytics.",
      technologies: ["MERN", "Socket.IO", "JWT", "Real-Time Systems"],
      liveLink: "https://idpquizapp.netlify.app",
      sourceLink: "https://github.com/raviteja4880/quiz-app"
    }
  ],
  education: [
    {
      program: "Bachelor of Technology",
      institution: "Vignan's University",
      period: "2023 - 2027",
      description: "Specializing in Computer Science and Engineering with a focus on web technologies."
    },
    {
      program: "Intermediate",
      institution: "Sri Chaitanya Junior College",
      period: "2021 - 2023",
      description: "Completed Higher Secondary Education with focus on MPC."
    },
    {
      program: "High School",
      institution: "Sri Chaitanya Techno School",
      period: "2020 - 2021",
      description: "Foundation in science and mathematics."
    }
  ],
  certifications: [
    {
      name: "Microsoft Azure Fundamentals",
      issuer: "Microsoft",
      credentialId: "2653E671A95B7940",
      completed: "September 5, 2026",
      verificationUrl: "https://learn.microsoft.com/en-us/users/ravitejakandula-5001/credentials/2653e671a95b7940"
    },
    {
      name: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services (AWS)",
      credentialId: "64809437c9a5411aa87fed09e9a45265",
      completed: "September 28, 2026",
      verificationUrl: "https://aws.amazon.com/verification"
    }
  ],
  experienceNote:
    "The portfolio currently showcases project experience, academic work, and skill-focused work samples. Detailed employer or internship history is not listed in the public portfolio."
};
