"use client"

import StarsBg from "@/constants/stars"
import { useRef } from "react";

const About = () => {
    const aboutRef = useRef(null);

    return (
        <>
            <section
                ref={aboutRef}
                className="relative py-48 px-28 h-screen w-full bg-[#0A0A0A]"
                id="about"
                style={{ fontFamily: 'Marvel, sans-serif' }}
            >
                <h3 className="text-[#5093C7] text-2xl uppercase tracking-[18px]">About Me</h3>

                <div className="absolute top-0 right-0 w-1/2 h-full">
                    <div className="h-screen flex flex-col justify-center p-20">
                        <div className="left-content">
                            <h1 className="text-6xl font-bold mb-6 leading-tight">
                                I AM JOHN NICO EDISAN <br /> WEB DEVELOPER BORN AND <br /> RAISED IN CEBU, PHILIPPINES
                            </h1>
                            <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
                                I am passionate about creating engaging experiences across web and mobile platforms. As a recent graduate, I enjoy turning
                                ideas into functional and user-friendly designs—starting from user research to final execution.
                                I am currently working as a freelance web developer for a client. I am helping shape the entire
                                product experience. I am excited to keep learning and contribute to impactful websites.
                            </p>
                        </div>

                        <div className="mt-20 stats">
                            <div className="flex items-center space-x-8">
                                {[
                                    { name: "0.5 yrs exp" },
                                    { name: "15 projects" },
                                    { name: "7 clients" },
                                    { name: "1 companies" }
                                ].map((company, index) => (
                                    <div key={index} className="flex items-center stat-item">
                                        <div className="text-white text-lg font-semibold">
                                            {company.name}
                                        </div>
                                        {index < 3 && (
                                            <div className="w-px h-8 bg-white ml-8"></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <StarsBg />
        </>
    );
};

export default About;