'use client'
import Link from 'next/link'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useScrollToSection } from '@/hook/useScrollToSection'

const NavBar = () => {
    const navRef = useRef<HTMLDivElement>(null)
    const hamburgerRef = useRef<HTMLDivElement>(null)
    const navItemsRef = useRef<HTMLLIElement[]>([])
    const uShapeRef = useRef<HTMLDivElement>(null)
    const scrollToSection = useScrollToSection()

    const handleServicesClick = (e: React.MouseEvent) => {
        e.preventDefault()
        scrollToSection('services')
    }

    const handleAboutClick = (e: React.MouseEvent) => {
        e.preventDefault()
        scrollToSection('about')
    }

    const addToRefs = (el: HTMLLIElement | null) => {
        if (el && !navItemsRef.current.includes(el)) {
            navItemsRef.current.push(el)
        }
    }

    useGSAP(() => {
        gsap.set(navItemsRef.current, { opacity: 0, y: 20 })
        gsap.set(hamburgerRef.current, { opacity: 1 })
        gsap.set(uShapeRef.current, { width: '80px' })

        const handleMouseEnter = () => {
            const tl = gsap.timeline()

            tl.to(uShapeRef.current, {
                width: '280px',
                duration: 0.4,
                ease: 'power2.out'
            })
                .to(hamburgerRef.current, {
                    opacity: 0,
                    duration: 0.2
                }, 0.1)
                .to(navItemsRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                    stagger: 0.08,
                    ease: 'power2.out'
                }, 0.2)
        }

        const handleMouseLeave = () => {
            const tl = gsap.timeline()

            tl.to(navItemsRef.current, {
                opacity: 0,
                y: 20,
                duration: 0.2,
                stagger: 0.05,
                ease: 'power2.in'
            })
                .to(hamburgerRef.current, {
                    opacity: 1,
                    duration: 0.2
                }, 0.1)
                .to(uShapeRef.current, {
                    width: '80px',
                    duration: 0.3,
                    ease: 'power2.in'
                }, 0.1)
        }

        const navElement = navRef.current
        if (navElement) {
            navElement.addEventListener('mouseenter', handleMouseEnter)
            navElement.addEventListener('mouseleave', handleMouseLeave)

            return () => {
                navElement.removeEventListener('mouseenter', handleMouseEnter)
                navElement.removeEventListener('mouseleave', handleMouseLeave)
            }
        }
    }, [])

    return (
        <div
            ref={navRef}
            className="flex justify-between h-16 fixed top-0 left-0 z-50 w-full  cursor-pointer"
        >
            <div className="w-full h-full"></div>

            <div className="relative flex items-center justify-center h-full px-10">
                <div
                    ref={uShapeRef}
                    className="absolute inset-0 border-x rounded-b-full h-full pointer-events-none"
                    style={{ left: '50%', transform: 'translateX(-50%)' }}
                ></div>

                <div
                    ref={hamburgerRef}
                    className="absolute flex flex-col items-center justify-center gap-1 z-20"
                >
                    <div className="w-6 h-0.5 bg-black"></div>
                    <div className="w-6 h-0.5 bg-black"></div>
                    <div className="w-6 h-0.5 bg-black"></div>
                </div>

                <ul
                    className="flex items-center gap-20 text-base font-bold z-10"
                    style={{ fontFamily: 'Proxima Nova Regular' }}
                >
                    <li ref={addToRefs}>
                        <button 
                            onClick={handleAboutClick}
                            className="bg-transparent border-none p-0 cursor-pointer font-bold"
                            style={{ fontFamily: 'Proxima Nova Regular' }}
                        >
                            About
                        </button>
                    </li>
                    <li ref={addToRefs}>
                        <button 
                            onClick={handleServicesClick}
                            className="bg-transparent border-none p-0 cursor-pointer font-bold"
                            style={{ fontFamily: 'Proxima Nova Regular' }}
                        >
                            Services
                        </button>
                    </li>

                    <li ref={addToRefs} className="text-3xl">
                        <Link href="/">NICXS</Link>
                    </li>

                    <li ref={addToRefs}>
                        <Link href="/project">Projects</Link>
                    </li>
                    <li ref={addToRefs}>
                        <Link href="/contact">Contact</Link>
                    </li>
                </ul>
            </div>

            <div className="w-full h-full"></div>
        </div>
    )
}

export default NavBar