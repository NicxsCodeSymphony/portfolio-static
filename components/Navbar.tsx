"use client"

import {navLinks} from "@/constants/navLinks";
import "@fontsource/marvel"
import { useMediaQuery } from "react-responsive";
import { useState } from "react";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Responsive breakpoints
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
    const isDesktop = useMediaQuery({ minWidth: 1024 });

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return(
        <nav className={`fixed z-50 text-white ${
            isMobile 
                ? "top-4 left-4 right-4" 
                : isTablet 
                ? "top-6 left-6 right-6" 
                : "top-8 left-8 right-8"
        }`} style={{fontFamily: 'Marvel, sans-serif'}}>
            <div className="flex justify-between items-center">
                <a href="#home" className={`flex items-center gap-2 ${
                    isMobile 
                        ? "text-2xl" 
                        : isTablet 
                        ? "text-3xl" 
                        : "text-4xl"
                }`}>
                    <p>Nico Edisan</p>
                </a>

                {/* Desktop/Tablet Navigation */}
                {!isMobile && (
                    <ul className={`flex items-center ${
                        isTablet ? "gap-3" : "gap-4"
                    }`}>
                        {navLinks.map((link) => (
                            <li key={link.id} className={`uppercase tracking-wider cursor-pointer transition-all duration-300 hover:text-[#5093C7] ${
                                isTablet ? "text-sm" : "text-base"
                            }`}>
                                <a href={`#${link.id}`}>{link.title}</a>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Mobile Hamburger Menu */}
                {isMobile && (
                    <div className="relative">
                        <button
                            onClick={toggleMenu}
                            className="flex flex-col justify-center items-center w-8 h-8 space-y-1"
                            aria-label="Toggle menu"
                        >
                            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                                isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                            }`}></span>
                            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                                isMenuOpen ? 'opacity-0' : ''
                            }`}></span>
                            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                                isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                            }`}></span>
                        </button>

                        {/* Mobile Menu Overlay */}
                        <div className={`absolute top-full right-0 mt-4 w-48 bg-[#0A0A0A] border border-white/20 rounded-lg shadow-2xl transition-all duration-300 z-50 ${
                            isMenuOpen 
                                ? 'opacity-100 visible translate-y-0' 
                                : 'opacity-0 invisible -translate-y-2'
                        }`}>
                            <ul className="py-4">
                                {navLinks.map((link) => (
                                    <li key={link.id} className="uppercase tracking-wider cursor-pointer transition-all duration-300 hover:text-[#5093C7] hover:bg-white/10">
                                        <a 
                                            href={`#${link.id}`} 
                                            className="block px-4 py-3 text-sm"
                                            onClick={closeMenu}
                                        >
                                            {link.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Menu Backdrop */}
            {isMobile && isMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/20 z-40"
                    onClick={closeMenu}
                ></div>
            )}
        </nav>
    )
}

export default Navbar;