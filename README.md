# Ravi Teja — Portfolio

<p align="center">
  <strong>A fast, responsive personal portfolio built with vanilla HTML, CSS, and JavaScript.</strong>
  <br>
  No frameworks. No build step. Clean code and intentional design.
</p>

<p align="center">
  <a href="https://tejaportfolio1.netlify.app">
    <strong>🌐 Live Site →</strong>
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Netlify-00C7B7?style=flat&logo=netlify&logoColor=white" alt="Netlify">
</p>

---

## Overview

This is my personal developer portfolio — built to showcase real, shipped projects (an e-commerce platform, a RAG pipeline, a safety app, and a real-time quiz platform) rather than just list skills.

It's intentionally framework-free: every animation, layout, and interaction is hand-written to keep the codebase lightweight and the load time fast.

---

## Features

| | Feature |
|---|---|
| ✦ | **Tejas AI — Built-in Portfolio Assistant** that answers questions about Ravi's projects, technical skills, education, certifications, resume, and portfolio using an AI-powered workflow |
| ◈ | **Glassmorphic dark theme** with a custom cursor, mesh-gradient background, and scroll-triggered reveal animations via the Intersection Observer API |
| ◈ | **Fully responsive** across mobile, tablet, and desktop, including a custom slide-out mobile nav |
| ◈ | **Working contact form** wired to Formspree with async submission, loading states, and toast feedback — no page redirect |
| ◈ | **Lazy-loaded images** with explicit dimensions to avoid layout shift |
| ◈ | **Accessible by design** — semantic structure, `aria-label`s on icon-only links, keyboard-navigable menu toggle |
| ◈ | **SEO-ready** with Open Graph and Twitter Card meta tags for clean link previews when shared |

---

## Tech Stack

| Area | Technologies |
|---|---|
| **Frontend** | HTML5, CSS3, JavaScript |
| **AI Assistant** | Gemini, Supabase Edge Functions |
| **Backend / Services** | Supabase |
| **Forms** | Formspree |
| **Deployment** | Netlify |
| **APIs / Web** | REST APIs, Fetch API |

---

## Tejas AI

**Tejas AI** is the portfolio's built-in AI assistant.

It can answer questions about:

- Ravi's projects
- technical skills
- education
- certifications
- resume
- portfolio information

**Architecture**

```text
Netlify → Supabase Edge Function → Gemini