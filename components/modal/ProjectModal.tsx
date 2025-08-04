"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { FaTimes } from "react-icons/fa";
import ReactLenis from 'lenis/react';

interface Project {
    title: string;
    tags: string[];
    image: string;
}

interface ModalProps {
    project: Project;
    bounds: DOMRect;
    onClose: () => void;
}

const ProjectModal = ({ project, bounds, onClose }: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        if (modalRef.current) {
            const modal = modalRef.current;

            gsap.set(modal, {
                position: "fixed",
                top: bounds.top,
                left: bounds.left,
                width: bounds.width,
                height: bounds.height,
                borderRadius: "12px",
                overflow: "hidden",
                zIndex: 100,
                background: "#111",
                boxShadow: "0 0 60px 20px rgba(255,255,255,0.15)",
            });

            gsap.to(modal, {
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                duration: 1.2,
                ease: "power4.out",
                borderRadius: 0,
            });
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [bounds]);

    const handleWheel = (e: React.WheelEvent) => {
        e.stopPropagation();
        const contentElement = contentRef.current;
        if (contentElement) {
            contentElement.scrollTop += e.deltaY;
        }
    };

    return (
        <div
            ref={modalRef}
            className="fixed inset-0 z-50 text-white bg-[#111]"
            onClick={onClose}
            onWheel={handleWheel}
        >
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}
                className="absolute top-6 left-6 z-60 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
                <FaTimes className="text-white text-xl" />
            </button>

            <ReactLenis root>
                <div
                    ref={contentRef}
                    className="w-full h-full"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="fixed inset-0 z-40 bg-black/50" />
                    <div className="relative w-full h-screen">
                        <Image
                            src={project.image}
                            alt="Project full image"
                            fill
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
            </ReactLenis>
        </div>
    );
};

export default ProjectModal;
