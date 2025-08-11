'use client';

import { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

gsap.registerPlugin(TextPlugin);

const Contact = () => {
    const [step, setStep] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [foundThrough, setFoundThrough] = useState("");
    const [isTyping, setIsTyping] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [conversationHistory, setConversationHistory] = useState<
        Array<{ response: string; answer: string }>
    >([]);

    const typingRef = useRef<HTMLSpanElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const steps = [
        {
            question: "Hello! May I have your name, please?",
            response: (name: string) => `Thank you, ${name}.`,
            key: "name",
        },
        {
            question: "How did you discover our studio?",
            response: (foundThrough: string) => `Great! We appreciate referrals from ${foundThrough}.`,
            key: "foundThrough",
        },
        {
            question: "What's your email address?",
            response: (email: string) => `Perfect, I'll reach out to ${email}.`,
            key: "email",
        },
        {
            question: "What can we help you with today?",
            response: (msg: string) => `Thank you for sharing your project details.`,
            key: "message",
        },
    ];

    useGSAP(() => {
        gsap.set(overlayRef.current, { 
            x: 0, 
            scale: 1,
            rotation: 0,
            opacity: 1 
        });

        const tl = gsap.timeline({ ease: "power3.out" });
        
        tl.to(overlayRef.current, {
            scale: 1.2,
            rotation: 5,
            duration: 0.4,
            ease: "power2.in"
        })
        .to(overlayRef.current, {
            scale: 0.8,
            rotation: -3,
            duration: 0.3,
            ease: "power2.out"
        })
        .to(overlayRef.current, {
            scale: 0,
            rotation: 0,
            duration: 0.5,
            ease: "back.in(1.7)",
            onComplete: () => {
                gsap.set(overlayRef.current, { x: "-100%" });
            }
        });
    }, []);

    useGSAP(() => {
        const tl = gsap.timeline({ delay: 1.2 });
        tl.to(".lets", { x: -400, duration: 1, ease: "power2.out" }, 0)
            .to(".talk", { x: 400, duration: 1, ease: "power2.out" }, 0)
            .fromTo(".conversation", {
                y: 100,
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power2.out"
            })
    }, []);

    useEffect(() => {
        if (step < steps.length) {
            setIsTyping(true);
            const tl = gsap.timeline();
            tl.to(typingRef.current, {
                text: steps[step].question,
                duration: 1.5,
                ease: "none",
                onComplete: () => setIsTyping(false),
            });
        }
    }, [step]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !isTyping) {
            if (step === 0 && name.trim()) {
                setConversationHistory(prev => [
                    ...prev,
                    {
                        response: steps[step].response(name),
                        answer: name,
                    },
                ]);
                setStep(1);
            } else if (step === 1 && foundThrough.trim()) {
                setConversationHistory(prev => [
                    ...prev,
                    {
                        response: steps[step].response(foundThrough),
                        answer: foundThrough,
                    },
                ]);
                setStep(2);
            } else if (step === 2 && email.trim()) {
                setConversationHistory(prev => [
                    ...prev,
                    {
                        response: steps[step].response(email),
                        answer: email,
                    },
                ]);
                setStep(3);
            } else if (step === 3 && message.trim()) {
                setConversationHistory(prev => [
                    ...prev,
                    {
                        response: steps[step].response(message),
                        answer: message,
                    },
                ]);
                setStep(4);
            }
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    message,
                    foundThrough,
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setSubmitStatus('success');
                // Reset form after successful submission
                setTimeout(() => {
                    handleReset();
                }, 3000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        setStep(0);
        setName("");
        setEmail("");
        setMessage("");
        setFoundThrough("");
        setConversationHistory([]);
        setSubmitStatus('idle');
    };

    if (step === 4) {
        return (
            <>
                <div
                    ref={overlayRef}
                    className="fixed top-0 left-0 w-full h-full z-[9999]"
                    style={{ 
                        backgroundColor: "#E8F4FD", 
                        transformOrigin: "center center"
                    }}
                ></div>
                
                <div className="h-screen bg-[#F7F3ED] flex justify-center items-center relative">
                    <div className="flex gap-10 absolute top-10 left-1/2 -translate-x-1/2">
                        <h1 className="text-[8rem] lets">Review</h1>
                        <h1 className="text-[8rem] sent">Message</h1>
                    </div>

                    <Card className="max-w-2xl mx-auto px-8 py-12 shadow-lg">
                        <CardHeader className="text-center pb-4">
                            <h2 className="text-2xl font-bold text-gray-800">Message Preview</h2>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Badge variant="outline" className="w-24 justify-center bg-gray-100 border-gray-300 text-gray-600">Name:</Badge>
                                <span className="font-medium">{name}</span>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <Badge variant="outline" className="w-24 justify-center bg-gray-100 border-gray-300 text-gray-600">Found via:</Badge>
                                <span className="font-medium">{foundThrough}</span>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <Badge variant="outline" className="w-24 justify-center bg-gray-100 border-gray-300 text-gray-600">Email:</Badge>
                                <span className="font-medium">{email}</span>
                            </div>
                            
                            <Separator className="my-6" />
                            
                            <div>
                                <Badge variant="outline" className="mb-2 bg-gray-100 border-gray-300 text-gray-600">Message:</Badge>
                                <Card className="bg-gray-50 border-gray-200">
                                    <CardContent className="p-4">
                                        <p className="text-gray-700 whitespace-pre-wrap">{message}</p>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Status Messages */}
                            {submitStatus === 'success' && (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                                    <p className="text-green-800 font-medium">
                                        ✅ Message sent successfully! Check your email for confirmation.
                                    </p>
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                                    <p className="text-red-800 font-medium">
                                        ❌ Failed to send message. Please try again.
                                    </p>
                                </div>
                            )}
                        </CardContent>
                        
                        <div className="flex gap-4 mt-8 justify-center">
                            <Button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Sending...
                                    </div>
                                ) : (
                                    'Send Message'
                                )}
                            </Button>
                            <Button
                                variant="outline"
                                onClick={handleReset}
                                disabled={isSubmitting}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-full transition-colors border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Start Over
                            </Button>
                        </div>
                    </Card>
                </div>
            </>
        );
    }

    return (
        <>
            <div
                ref={overlayRef}
                className="fixed top-0 left-0 w-full h-full z-[9999]"
                style={{ 
                    backgroundColor: "#E8F4FD", 
                    transformOrigin: "center center"
                }}
            ></div>

            <div className="h-screen bg-[#F7F3ED] flex justify-center items-center relative overflow-hidden" id="contact">
                <Navbar />
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 left-20 w-16 h-16 bg-orange-200 rounded-full opacity-60 animate-float-slow"></div>
                    <div className="absolute top-40 right-32 w-12 h-12 bg-blue-200 rounded-full opacity-50 animate-float-medium"></div>
                    <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-green-200 rounded-full opacity-40 animate-float-fast"></div>
                    <div className="absolute bottom-20 right-20 w-8 h-8 bg-purple-200 rounded-full opacity-70 animate-float-slow"></div>
                    <div className="absolute top-1/2 left-10 w-14 h-14 bg-yellow-200 rounded-full opacity-50 animate-float-medium"></div>
                    <div className="absolute top-1/3 right-10 w-10 h-10 bg-pink-200 rounded-full opacity-60 animate-float-fast"></div>
                    
                    <div className="absolute top-1/4 left-1/3 w-6 h-6 bg-orange-300 transform rotate-45 opacity-40 animate-float-slow"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-8 h-8 bg-blue-300 rounded-lg opacity-50 animate-float-medium"></div>
                    <div className="absolute top-2/3 left-1/2 w-4 h-4 bg-green-300 transform rotate-12 opacity-60 animate-float-fast"></div>
                    
                    <div className="absolute top-16 right-1/3 w-2 h-2 bg-gray-400 rounded-full opacity-30 animate-pulse"></div>
                    <div className="absolute bottom-16 left-1/3 w-2 h-2 bg-gray-400 rounded-full opacity-30 animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 right-16 w-2 h-2 bg-gray-400 rounded-full opacity-30 animate-pulse delay-2000"></div>
                </div>

                <div className="flex gap-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <h1 className="text-[14rem] lets">Let&apos;s</h1>
                    <h1 className="text-[14rem] talk">Talk</h1>
                </div>

                <div className="conversation opacity-0 px-4 sm:px-6 text-xl sm:text-2xl text-gray-800 font-medium max-w-4xl">
                    <div className="flex flex-col gap-6">
                        {step < steps.length && (
                            <div className="flex flex-wrap items-center gap-2">
                                <span ref={typingRef}></span>

                                {!isTyping && step === 0 && (
                                    <Input
                                        type="text"
                                        className="input-underline w-36 border-0 border-b-2 border-gray-800 bg-transparent rounded-none px-2 py-1 text-xl font-bold focus-visible:ring-0 focus-visible:ring-offset-0"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Your name"
                                        autoFocus
                                    />
                                )}

                                {!isTyping && step === 1 && (
                                    <Input
                                        type="text"
                                        className="input-underline w-64 border-0 border-b-2 border-gray-800 bg-transparent rounded-none px-2 py-1 text-xl font-bold focus-visible:ring-0 focus-visible:ring-offset-0"
                                        value={foundThrough}
                                        onChange={(e) => setFoundThrough(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="e.g., Instagram, LinkedIn, Referral"
                                        autoFocus
                                    />
                                )}

                                {!isTyping && step === 2 && (
                                    <Input
                                        type="email"
                                        className="input-underline w-64 border-0 border-b-2 border-gray-800 bg-transparent rounded-none px-2 py-1 text-xl font-bold focus-visible:ring-0 focus-visible:ring-offset-0"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="your.email@example.com"
                                        autoFocus
                                    />
                                )}

                                {!isTyping && step === 3 && (
                                    <Textarea
                                        className="input-underline w-96 h-24 resize-none border-0 border-b-2 border-gray-800 bg-transparent rounded-none px-2 py-1 text-xl font-bold focus-visible:ring-0 focus-visible:ring-offset-0"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Tell us about your project"
                                        autoFocus
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <style jsx>{`
                    .input-underline {
                        border: none;
                        border-bottom: 2px solid #333;
                        background: transparent;
                        outline: none;
                        font-weight: bold;
                        font-size: inherit;
                        padding: 2px 4px;
                    }
                    
                    @keyframes float-slow {
                        0%, 100% { transform: translateY(0px) rotate(0deg); }
                        50% { transform: translateY(-20px) rotate(5deg); }
                    }
                    
                    @keyframes float-medium {
                        0%, 100% { transform: translateY(0px) rotate(0deg); }
                        50% { transform: translateY(-15px) rotate(-3deg); }
                    }
                    
                    @keyframes float-fast {
                        0%, 100% { transform: translateY(0px) rotate(0deg); }
                        50% { transform: translateY(-10px) rotate(2deg); }
                    }
                    
                    .animate-float-slow {
                        animation: float-slow 6s ease-in-out infinite;
                    }
                    
                    .animate-float-medium {
                        animation: float-medium 4s ease-in-out infinite;
                    }
                    
                    .animate-float-fast {
                        animation: float-fast 3s ease-in-out infinite;
                    }
                `}</style>
            </div>
        </>
    );
};

export default Contact;