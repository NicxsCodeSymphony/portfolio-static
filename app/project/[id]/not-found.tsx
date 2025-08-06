import React from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaHome } from 'react-icons/fa';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#0D0E17] text-white flex items-center justify-center px-4">
            <div className="text-center max-w-md mx-auto">
                <div className="mb-8">
                    <h1 className="text-6xl font-bold text-gray-400 mb-4">404</h1>
                    <h2 className="text-2xl font-semibold mb-4">Project Not Found</h2>
                    <p className="text-gray-400 mb-8">
                        The project you&apos;re looking for doesn&apos;t exist or has been removed.
                    </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                        href="/project"
                        className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
                    >
                        <FaArrowLeft className="text-sm" />
                        Back to Projects
                    </Link>
                    
                    <Link 
                        href="/"
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
                    >
                        <FaHome className="text-sm" />
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
} 