"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function PricingPage() {
    // TypeScript-এর টাইপ অ্যাঙ্গেল ব্র্যাকেট (<...>) সরিয়ে দেওয়া হয়েছে
    const [userType, setUserType] = useState('seekers');
    
    // টাইপ (| null) সরিয়ে দেওয়া হয়েছে
    const [openFaq, setOpenFaq] = useState(null);

    // parameter থেকে ": number" টাইপ সরিয়ে দেওয়া হয়েছে
    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    // ডেটা স্ট্রাকচার
    const seekerPlans = [
        {
            name: 'Free',
            price: '$0',
            period: 'forever',
            features: ['Browse & save up to 10 jobs', 'Apply to up to 3 jobs per month', 'Basic profile', 'Email alerts'],
            cta: 'Get Started',
            popular: false
        },
        {
            name: 'Pro',
            price: '$19',
            period: 'month',
            features: ['Apply to up to 30 jobs per month', 'Unlimited saved jobs', 'Application tracking', 'Salary insights'],
            cta: 'Upgrade to Pro',
            popular: true
        },
        {
            name: 'Premium',
            price: '$39',
            period: 'month',
            features: ['Everything in Pro', 'Unlimited applications', 'Profile boost to recruiters', 'Early access to new jobs', 'Priority support'],
            cta: 'Go Premium',
            popular: false
        }
    ];

    const recruiterPlans = [
        {
            name: 'Free',
            price: '$0',
            period: 'forever',
            features: ['Up to 3 active job posts', 'Basic applicant management', 'Standard listing visibility (great for first year)'],
            cta: 'Post a Job Free',
            popular: false
        },
        {
            name: 'Growth',
            price: '$49',
            period: 'month',
            features: ['Up to 10 active job posts', 'Applicant tracking', 'Basic analytics', 'Email support'],
            cta: 'Choose Growth',
            popular: true
        },
        {
            name: 'Enterprise',
            price: '$149',
            period: 'month',
            features: ['Up to 50 active job posts', 'Advanced analytics dashboard', 'Featured job listings', 'Team collaboration', 'Custom branding', 'Priority support'],
            cta: 'Contact Sales',
            popular: false
        }
    ];

    const faqs = [
        {
            question: "How does the subscription cancellation work?",
            answer: "You can cancel your subscription at any time from your account settings page. Once cancelled, you will retain access to your plan's features until the end of your current billing cycle."
        },
        {
            question: "Do you offer refunds?",
            answer: "We offer a 14-day money-back guarantee for all paid plans if you are unsatisfied with our service. Please reach out to our priority support team to process a refund."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay through our secure encrypted payment gateway."
        },
        {
            question: "Can I switch between plans later?",
            answer: "Absolutely! You can upgrade or downgrade your plan at any point. If you upgrade, the price will be prorated for the remainder of the billing period."
        }
    ];

    const activePlans = userType === 'seekers' ? seekerPlans : recruiterPlans;

    return (
        <div className="w-full min-h-screen bg-zinc-900 text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-16">
                
                {/* ১. হেডার এবং টগল বাটন সেকশন */}
                <div className="text-center space-y-5">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                        Flexible Plans for Everyone
                    </h1>
                    <p className="text-zinc-400 text-sm sm:text-base max-w-md mx-auto">
                        Choose the perfect plan tailored to your career goals or recruitment scaling requirements.
                    </p>
                    
                    {/* টগল ট্যাব */}
                    <div className="inline-flex p-1 bg-zinc-850 border border-zinc-800 rounded-xl max-w-xs w-full mt-4 shadow-inner">
                        <button
                            onClick={() => setUserType('seekers')}
                            className={`flex-1 text-center py-2 text-xs font-semibold rounded-lg transition-all ${
                                userType === 'seekers'
                                    ? 'bg-zinc-800 text-zinc-100 shadow-md border border-zinc-750'
                                    : 'text-zinc-400 hover:text-zinc-200'
                            }`}
                        >
                            For Job Seekers
                        </button>
                        <button
                            onClick={() => setUserType('recruiters')}
                            className={`flex-1 text-center py-2 text-xs font-semibold rounded-lg transition-all ${
                                userType === 'recruiters'
                                    ? 'bg-zinc-800 text-zinc-100 shadow-md border border-zinc-750'
                                    : 'text-zinc-400 hover:text-zinc-200'
                            }`}
                        >
                            For Recruiters
                        </button>
                    </div>
                </div>

                {/* ২. প্রাইসিং কার্ড গ্রিড সেকশন */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                    {activePlans.map((plan, index) => (
                        <div 
                            key={index} 
                            className={`flex flex-col bg-zinc-800 border rounded-2xl p-6 shadow-md relative transition-transform duration-200 hover:-translate-y-1 ${
                                plan.popular ? 'border-indigo-500 ring-1 ring-indigo-500/30' : 'border-zinc-700'
                            }`}
                        >
                            {plan.popular && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                                    Most Popular
                                </span>
                            )}
                            
                            <div className="mb-6">
                                <h3 className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1">{plan.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-extrabold tracking-tight">{plan.price}</span>
                                    <span className="text-zinc-400 text-xs">/{plan.period}</span>
                                </div>
                            </div>

                            {/* ফিচার লিস্ট */}
                            <ul className="space-y-3 flex-1 mb-8">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300 leading-tight">
                                        <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* অ্যাকশন বাটন */}
                            <button className={`w-full text-center py-2.5 px-4 rounded-xl font-medium text-xs transition-colors shadow-sm ${
                                plan.popular 
                                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white' 
                                    : 'bg-zinc-700 hover:bg-zinc-650 text-zinc-100 border border-zinc-600'
                            }`}>
                                {plan.cta}
                            </button>
                        </div>
                    ))}
                </div>

                <hr className="border-zinc-800 my-8" />

                {/* ৩. FAQ Accordion সেকশন */}
                <div className="max-w-3xl mx-auto space-y-6">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
                        <p className="text-zinc-400 text-xs mt-1">Got questions? We've got answers.</p>
                    </div>

                    <div className="space-y-3">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="bg-zinc-800 border border-zinc-700/80 rounded-xl overflow-hidden transition-colors">
                                <button 
                                    onClick={() => toggleFaq(idx)}
                                    className="w-full flex items-center justify-between p-5 text-left text-sm font-semibold text-zinc-200 hover:text-zinc-100 transition-colors focus:outline-none"
                                >
                                    <span>{faq.question}</span>
                                    <svg 
                                        className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${openFaq === idx ? 'rotate-180 text-zinc-200' : ''}`} 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24" 
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                
                                <div className={`transition-all duration-200 ease-in-out ${openFaq === idx ? 'max-h-40 border-t border-zinc-750/50' : 'max-h-0 overflow-hidden'}`}>
                                    <p className="p-5 text-xs text-zinc-400 leading-relaxed bg-zinc-850/30">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}