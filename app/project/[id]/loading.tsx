import React from 'react';

export default function Loading() {
    return (
        <div className="min-h-screen bg-[#0D0E17] text-white">
            {/* Loading skeleton for the hero section */}
            <div className="relative h-screen w-full">
                <div className="absolute inset-0 bg-gray-800 animate-pulse"></div>
                
                {/* Loading skeleton for title */}
                <div className="relative z-20 flex items-start justify-end h-full">
                    <div className="p-4 md:p-6 max-w-6xl mx-auto md:ml-[33.333333%] mt-20 lg:mt-40">
                        <div className="h-8 md:h-12 lg:h-16 xl:h-20 2xl:h-32 bg-gray-700 rounded animate-pulse mb-4"></div>
                        <div className="h-4 md:h-6 lg:h-8 xl:h-10 bg-gray-700 rounded animate-pulse w-3/4"></div>
                    </div>
                </div>
            </div>

            {/* Loading skeleton for content */}
            <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-40 pb-12 sm:pb-16 md:pb-24 lg:pb-32 xl:pb-48">
                <div className="flex flex-col lg:flex-row justify-between w-full gap-8 lg:gap-20 mt-20">
                    <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 lg:gap-20 w-full">
                        <div>
                            <div className="h-4 bg-gray-700 rounded animate-pulse mb-2 w-16"></div>
                            <div className="h-3 bg-gray-700 rounded animate-pulse w-24"></div>
                        </div>
                        <div>
                            <div className="h-4 bg-gray-700 rounded animate-pulse mb-2 w-12"></div>
                            <div className="h-3 bg-gray-700 rounded animate-pulse w-32"></div>
                        </div>
                        <div>
                            <div className="h-4 bg-gray-700 rounded animate-pulse mb-2 w-20"></div>
                            <div className="h-3 bg-gray-700 rounded animate-pulse w-28"></div>
                        </div>
                    </div>
                    
                    <div className="w-full">
                        <div className="h-4 bg-gray-700 rounded animate-pulse mb-2"></div>
                        <div className="h-4 bg-gray-700 rounded animate-pulse mb-2"></div>
                        <div className="h-4 bg-gray-700 rounded animate-pulse mb-2 w-3/4"></div>
                    </div>
                </div>

                {/* Loading skeleton for image gallery */}
                <div className="mt-12 sm:mt-16 md:mt-24 lg:mt-48">
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-10">
                        <div className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[80vh] bg-gray-700 rounded animate-pulse"></div>
                        <div className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[80vh] bg-gray-700 rounded animate-pulse"></div>
                        <div className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[80vh] bg-gray-700 rounded animate-pulse"></div>
                    </div>
                </div>

                {/* Loading skeleton for tech stack */}
                <div className="py-12 sm:py-16 md:py-24 lg:py-32 xl:py-48">
                    <div className="h-8 md:h-12 lg:h-16 bg-gray-700 rounded animate-pulse mb-8 sm:mb-12 md:mb-16 lg:mb-20 w-48 mx-auto"></div>
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-8 sm:h-10 md:h-12 bg-gray-700 rounded animate-pulse w-24 sm:w-28 md:w-32"></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 