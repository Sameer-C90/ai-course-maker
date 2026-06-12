import logo from "../assets/logo.png"
import name from "../assets/Name.png"
import { NavLink } from "react-router"

export default function Footer(){
  return (
    <footer className="mt-8 flex h-16 items-center justify-between bg-[#eef6ff] px-6 border-t border-slate-300">
      <div className="flex items-center gap-3">
        <img src={logo} alt="Logo" className="h-12 w-auto" />
        <img src={name} alt="AI Course Maker" className="h-5 w-auto" />
      </div>

      
      <a href="mailto:sameerchhatwal444@gmail.com" className="text-base font-semibold text-[#0f172a] hover:opacity-80">Contact</a>
    </footer>
  )
}