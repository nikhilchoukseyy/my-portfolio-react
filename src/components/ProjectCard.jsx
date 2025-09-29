import React, { useEffect, useRef } from 'react'
import { motion } from "framer-motion";
import { div } from 'framer-motion/client';
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import gyaniWebsite from '../assets/images/gyani_website.png'
import fitnessPoint from '../assets/images/fitnesspoint.png'
import quickQr from '../assets/images/quickqr.png'
import shortcutUrl from '../assets/images/shortcuturl.png'
import pdftoolsBot from '../assets/images/pdftoolsbot.png'


gsap.registerPlugin(ScrollTrigger)

const ProjectCard = () => {

  const projects = [
    { title: "Gyani-AI virtual assistant", desc: "A smart voice-controlled virtual assistant built with HTML, CSS, JavaScript, Flask, and Google Gemini API It listens to your voice, understands your commands, and performs actions instantly", live: "https://gyani-virtual-assistant.vercel.app/", github: "https://github.com/imnikhilchouksey/gyani-virtual_assistant-", accent: ["#7c3aed", "#06b6d4"], image: `${gyaniWebsite}` },

    { title: "Fitness-Point:GYM website", desc: "A responsive and modern gym website built using React.js and Tailwind CSS. This project showcases a fitness center with sections like a hero banner, pricing plans, gallery, and a contact form with map integration.", live: "https://fitness-point-lalburra.vercel.app/", github: "https://github.com/imnikhilchouksey/fitness-point-gym-website", accent: ["#f97316", "#ef4444"], image: `${fitnessPoint}` },

    {
      title: "QuickQR", desc: "QuickQR is a simple and fast QR Code Generator Web App where You can enter any text or URL, and it instantly generates a downloadable QR code", live: "https://quickqrr.vercel.app/", github: "https://github.com/imnikhilchouksey/QuickQR", accent: ["#10b981", "#06b6d4"], image: `${quickQr}`
    },

    { title: "ShortcutUrl", desc: "A simple and fast URL shortener built toshorten, share, and manage links effortlessly.", live: "https://shortcuturl.vercel.app/", github: "https://github.com/imnikhilchouksey/shortcutURL", accent: ["#ef4444", "#f97316"], image: `${shortcutUrl}` },

    { title: "PDFTools : Telegram bot", desc: "A Telegram bot to manage PDFs and images efficiently. Users can upload images or PDFs and perform operations like creating PDFs from images, merging PDFs, splitting PDFs, extracting text, and converting PDFs to Word.", live: "https://t.me/pdfToolkit_bot", github: "https://github.com/imnikhilchouksey/PDFTools-Bot", accent: ["#7c3aed", "#34d399"], image: `${pdftoolsBot}` },]

  useEffect(() => {
    gsap.utils.toArray('.projectcard').forEach(card => {
      gsap.to(card, {
        scale: 0.7,
        opacity: 0,
        scrollTrigger: {
          trigger: card,
          start: "top 15dvh",
          end: "bottom 15dvh ",
          // markers: true,
          scrub: true,
        }
      })
    })
  })

  return (
    <main className="bg-bg-primary border-bg-tertiary border-dotted border-2 text-text-primary flex min-w-full min-h-screen mx-auto p-6 flex-col items-center justify-center">
      <h1 className="text-2xl font-thin mb-6 text-center ">Projects</h1>

      <div className="flex flex-col gap-8 min-w-full md:min-w-[80%] min-h-screen items-center justify-center mb-4 pb-[50dvh]">
        {projects.map((p, i) => (
          <div
            key={p.title}
            className={`projectcard flex flex-col rounded-2xl bg-bg-buttons text-text-secondary p-4 border border-white/10 w-full size-96 text-wrap 
      ${i === projects.length - 1 ? "relative" : "sticky top-[15dvh]"}`}
          >
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-between text-center gap-2  md:px-12 md:py-12 ">
              <div className="w-full md:w-[90dvh] h-[20dvh] md:h-[40dvh] rounded-lg flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${p.accent[0]}, ${p.accent[1]})` }}>
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
              <div className='flex flex-col text-wrap md:w-[40dvh] text-center'>
                <h2 className="text-lg font-semibold">{p.title}</h2>
                <p className="text-sm mx-2 my-2 text-gray-300">{p.desc}</p>
                <div className="flex justify-center gap-2">
                  <a href={p.live} target="_blank"
                    className="font-mono active:scale-95 transition cursor-pointer text-sm rounded-lg bg-bg-buttons2 text-text-primary px-8 py-1">
                    Live
                  </a>
                  <a href={p.github} target="_blank"
                    className="font-mono active:scale-95 transition cursor-pointer text-sm rounded-lg bg-bg-buttons2 text-text-primary px-8 py-1">
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}

      </div>
    </main>
  )
}


export default ProjectCard; 