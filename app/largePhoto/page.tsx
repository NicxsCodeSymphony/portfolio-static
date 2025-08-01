"use client";

import StarsBg from "@/constants/stars";
import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { works } from "@/constants/works";
import Image from "next/image";
import { fallbackImages, getImageSource } from "@/constants/imageSource";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import "swiper/css";
import "swiper/css/pagination";

const Work = () => {
    const workRef = useRef<HTMLElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedWork, setSelectedWork] = useState<number | null>(null);
    const [clonedCard, setClonedCard] = useState<{
        top: number;
        left: number;
        width: number;
        height: number;
    } | null>(null);

    const expandedRef = useRef<HTMLDivElement>(null);

    // Force scrollbar to appear when overlay is expanded
    useEffect(() => {
        if (selectedWork !== null && expandedRef.current) {
            const scrollContainer = expandedRef.current.querySelector('.expanded-overlay');
            if (scrollContainer) {
                // Force the scrollbar to appear
                (scrollContainer as HTMLElement).style.overflowY = 'auto';
                (scrollContainer as HTMLElement).style.height = '300vh';
                (scrollContainer as HTMLElement).style.setProperty('-webkit-overflow-scrolling', 'touch');
                
                // Add a small delay to ensure styles are applied
                setTimeout(() => {
                    (scrollContainer as HTMLElement).style.overflowY = 'auto';
                }, 100);
            }
        }
    }, [selectedWork]);

    const handleClick = (index: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = e.currentTarget.getBoundingClientRect();

        setClonedCard({
            top: target.top,
            left: target.left,
            width: target.width,
            height: target.height,
        });

        setSelectedWork(index);
        document.body.style.overflow = "hidden";
    };

    useGSAP(() => {
        if (expandedRef.current && clonedCard) {
            gsap.fromTo(
                expandedRef.current,
                {
                    top: clonedCard.top,
                    left: clonedCard.left,
                    width: clonedCard.width,
                    height: clonedCard.height,
                    position: "fixed",
                    scale: 1,
                    opacity: 1,
                },
                {
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "300vh",
                    duration: 0.8,
                    ease: "power3.out",
                    onComplete: () => {
                        // Ensure the inner scrollable container has the full height and scrolling
                        const scrollContainer = expandedRef.current?.querySelector('.expanded-overlay');
                        if (scrollContainer) {
                            (scrollContainer as HTMLElement).style.height = '300vh';
                            (scrollContainer as HTMLElement).style.overflowY = 'auto';
                            (scrollContainer as HTMLElement).style.overflowX = 'hidden';
                            (scrollContainer as HTMLElement).style.setProperty('-webkit-overflow-scrolling', 'touch');
                        }
                    }
                }
            );
        }
    }, [clonedCard]);

    const handleClose = () => {
        if (expandedRef.current && clonedCard) {
            gsap.to(expandedRef.current, {
                top: clonedCard.top,
                left: clonedCard.left,
                width: clonedCard.width,
                height: clonedCard.height,
                duration: 0.8,
                ease: "power3.inOut",
                onComplete: () => {
                    setSelectedWork(null);
                    setClonedCard(null);
                    document.body.style.overflow = "auto";
                },
            });
        }
    };

    return (
        <>
            <section
                ref={workRef}
                className="min-h-screen relative py-36 px-6 md:px-12 lg:px-48 bg-[#0A0A0A]"
                style={{ fontFamily: "Marvel, sans-serif" }}
            >
                <h1 className="text-lg tracking-[12px] font-bold text-[#5093C7] uppercase">
                    Featured Works
                </h1>

                <div className="mt-14 w-full">
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={400}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                        breakpoints={{
                            768: {
                                slidesPerView: 1.5,
                            },
                            1024: {
                                slidesPerView: 2,
                            },
                            1440: {
                                slidesPerView: 2.5,
                            },
                        }}
                        allowTouchMove={!selectedWork}
                    >
                        {works.map((item, index) => {
                            const fallbackImage = fallbackImages[index % fallbackImages.length];
                            const imageSource = getImageSource(item.imageID, fallbackImage);

                            return (
                                <SwiperSlide key={index}>
                                    <div
                                        className={`rounded-lg p-4 w-[42vw] h-[70vh] transition-all duration-500 ease-in-out cursor-pointer ${
                                            index === activeIndex && selectedWork === null
                                                ? "scale-100 brightness-100"
                                                : "scale-90 brightness-50"
                                        }`}
                                        onClick={(e) => handleClick(index, e)}
                                    >
                                        <div className="relative w-full h-[83%] rounded-lg overflow-hidden">
                                            <Image
                                                src={imageSource}
                                                alt={item.title}
                                                fill
                                                className="object-cover rounded-lg"
                                            />
                                        </div>
                                        <div className="flex justify-between items-center text-white px-2 mt-4 uppercase">
                                            <h2 className="text-4xl font-bold">{item.title}</h2>
                                            <h4 className="text-xl">{item.type}</h4>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                        <SwiperSlide>
                            <div className="h-[70vh] w-full"></div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </section>

            {/* Expanded overlay with GSAP */}
            {selectedWork !== null && clonedCard && (
                <div
                    ref={expandedRef}
                    className="z-[100] bg-black fixed text-white rounded-lg expanded-overlay-container"
                    style={{
                        top: clonedCard.top,
                        left: clonedCard.left,
                        width: clonedCard.width,
                        height: clonedCard.height,
                    }}
                >
                    <div className="expanded-overlay">
                        <div className="relative w-full h-[100vh]">
                            <Image
                                src={getImageSource(
                                    works[selectedWork].imageID,
                                    fallbackImages[selectedWork % fallbackImages.length]
                                )}
                                alt={works[selectedWork].title}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <button
                            className="absolute top-8 right-8 bg-white text-black px-4 py-2 rounded font-bold z-50"
                            onClick={handleClose}
                        >
                            Close
                        </button>

                        <div className="mt-16 px-6 max-w-4xl pb-32">
                            <h2 className="text-5xl font-bold uppercase mb-6">
                                {works[selectedWork].title}
                            </h2>
                            <p className="text-xl mb-4">Type: {works[selectedWork].type}</p>
                            <p className="text-lg leading-8 mb-8">
                                {/* Replace with actual content */}
                                This is where your project description goes. You can include images, links, or anything
                                else here.
                            </p>
                            
                            {/* Add more content to demonstrate scrolling */}
                            <div className="space-y-8">
                                <div className="bg-gray-800 p-6 rounded-lg">
                                    <h3 className="text-2xl font-bold mb-4">Project Overview</h3>
                                    <p className="text-lg leading-8">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                </div>
                                
                                <div className="bg-gray-800 p-6 rounded-lg">
                                    <h3 className="text-2xl font-bold mb-4">Technical Details</h3>
                                    <p className="text-lg leading-8">
                                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                                        eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                                        sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </p>
                                </div>
                                
                                <div className="bg-gray-800 p-6 rounded-lg">
                                    <h3 className="text-2xl font-bold mb-4">Features</h3>
                                    <ul className="text-lg leading-8 space-y-2">
                                        <li>• Responsive design</li>
                                        <li>• Modern UI/UX</li>
                                        <li>• Performance optimized</li>
                                        <li>• Cross-browser compatible</li>
                                    </ul>
                                </div>
                                
                                <div className="bg-gray-800 p-6 rounded-lg">
                                    <h3 className="text-2xl font-bold mb-4">Conclusion</h3>
                                    <p className="text-lg leading-8">
                                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
                                        doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
                                        veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                                    </p>
                                </div>
                                
                                <div className="bg-gray-800 p-6 rounded-lg">
                                    <h3 className="text-2xl font-bold mb-4">Additional Section</h3>
                                    <p className="text-lg leading-8">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                </div>
                                
                                <div className="bg-gray-800 p-6 rounded-lg">
                                    <h3 className="text-2xl font-bold mb-4">Final Thoughts</h3>
                                    <p className="text-lg leading-8">
                                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                                        eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                                        sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </p>
                                </div>
                                
                                <div className="bg-gray-800 p-6 rounded-lg">
                                    <h3 className="text-2xl font-bold mb-4">Extra Long Section 1</h3>
                                    <p className="text-lg leading-8">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                                        eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                                        sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </p>
                                </div>
                                
                                <div className="bg-gray-800 p-6 rounded-lg">
                                    <h3 className="text-2xl font-bold mb-4">Extra Long Section 2</h3>
                                    <p className="text-lg leading-8">
                                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
                                        doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
                                        veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim 
                                        ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia 
                                        consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                                    </p>
                                </div>
                                
                                <div className="bg-gray-800 p-6 rounded-lg">
                                    <h3 className="text-2xl font-bold mb-4">Extra Long Section 3</h3>
                                    <p className="text-lg leading-8">
                                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis 
                                        praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias 
                                        excepturi sint occaecati cupiditate non provident, similique sunt in culpa 
                                        qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
                                    </p>
                                </div>
                                
                                <div className="bg-gray-800 p-6 rounded-lg">
                                    <h3 className="text-2xl font-bold mb-4">Bottom Section</h3>
                                    <p className="text-lg leading-8">
                                        Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, 
                                        cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod 
                                        maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor 
                                        repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum 
                                        necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae 
                                        non recusandae.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <StarsBg />
        </>
    );
};

export default Work;
