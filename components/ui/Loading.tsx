'use client'
import {useRef} from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";

const Loading = ({onComplete} : {onComplete: () => void}) => {

    const counterRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        const tl = gsap.timeline()

        tl.fromTo(
            counterRef.current,
            { textContent: 0 },
            {
                textContent: 99,
                duration: 2,
                ease: 'power2.out',
                snap: { textContent: 1 },
                onUpdate: function () {
                    if (counterRef.current) {
                        counterRef.current.textContent = Math.ceil(
                            Number(this.targets()[0].textContent)
                        ).toString()
                    }
                },
            }
        )

        tl.to(counterRef.current, {
            textContent: '100',
            duration: 0.1,
            onComplete: () => {
                // Blink effect
                gsap.fromTo(
                    counterRef.current,
                    { opacity: 1 },
                    {
                        opacity: 0,
                        duration: 0.2,
                        yoyo: true,
                        repeat: 3,
                        onComplete: onComplete,
                    }
                )
            },
        })
    }, [])

    return(
        <div className="h-screen w-full bg-[#EFF2E8] fixed top-0 left-0 z[1000] flex items-end">
            <div className="p-8">
                <div ref={counterRef} className="text-[10rem] font-bold text-[#C7CEB8] tracking-tight">
                    0
                </div>
            </div>

        </div>
    )

}

export default Loading