import { useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';

export const useScrollToSection = () => {
    const router = useRouter();
    const pathname = usePathname();

    const scrollToSection = useCallback((sectionId: string) => {
        if (pathname === '/') {
            // If already on home page, scroll to section
            const scrollToElement = () => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                } else {
                    // If element is not found, try again after a short delay
                    setTimeout(scrollToElement, 200);
                }
            };
            scrollToElement();
        } else {
            // If on different page, navigate to home with hash
            router.push(`/#${sectionId}`);
        }
    }, [pathname, router]);

    return scrollToSection;
}; 