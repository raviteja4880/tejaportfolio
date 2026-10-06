export type AgentVersion = "1.0";

export interface AgentError {
  code: string;
  message: string;
}

export interface AgentResponse {
  success: boolean;
  answer?: string;
  sources?: string[];
  agent: "ravi-ai";
  version: AgentVersion;
  error?: AgentError;
}

export interface PortfolioKnowledge {
  profile: {
    name: string;
    title: string;
    summary: string;
    availability: string;
  };
  contact: {
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    whatsapp: string;
  };
  portfolio: {
    website: string;
    resume: string;
    deployment: string;
  };
  skills: {
    frontend: string[];
    backend: string[];
    databases: string[];
    cloud: string[];
    ai: string[];
  };
  projects: Array<{
    name: string;
    summary: string;
    technologies: string[];
    liveLink?: string;
    sourceLink?: string;
  }>;
  education: Array<{
    program: string;
    institution: string;
    period: string;
    description: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    credentialId?: string;
    completed?: string;
    verificationUrl?: string;
  }>;
  experienceNote: string;
}
