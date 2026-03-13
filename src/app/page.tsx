'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="relative w-full overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-black" />
        
        {/* Animated geometric shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-delta delay-2" />
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-float-gamma delay-4" />
        
        {/* Morphing accent shapes */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-pink-500/30 to-transparent rounded-3xl animate-morph" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-20">
          {/* Seaway Wordmark and Tagline */}
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="mb-6 animate-fade-up">
              <h1 className="text-7xl sm:text-8xl font-bold tracking-tighter mb-4">
                <span className="gradient-text">Seaway</span>
              </h1>
              <p className="text-2xl sm:text-3xl font-light text-gray-300 mb-2 animate-fade-up delay-1">
                Use Case Guide
              </p>
            </div>

            {/* Subtitle */}
            <div className="max-w-2xl mx-auto mb-12 animate-fade-up delay-2">
              <p className="text-lg sm:text-xl text-gray-400 leading-relaxed">
                Discover enterprise AI use cases tailored to your organization. Powered by a 30-solution intelligence library, scored across value, risk, and complexity.
              </p>
            </div>

            {/* CTA Button */}
            <div className="animate-fade-up delay-3">
              <Link
                href="/assess"
                className="inline-block btn-primary text-lg px-10 py-5 rounded-2xl font-semibold hover:shadow-2xl transform transition-all duration-300"
              >
                Begin Assessment
              </Link>
            </div>

            {/* Decorative element */}
            <div className="mt-16 animate-scale-pulse">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-pink-500/30 animate-glow">
                <div className="w-3 h-3 bg-pink-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24">
          <div className="max-w-5xl mx-auto w-full">
            {/* Section Title */}
            <div className="text-center mb-20">
              <h2 className="text-5xl sm:text-6xl font-bold mb-6">
                <span className="gradient-text">How It Works</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Get personalized AI use case recommendations in just a few minutes
              </p>
            </div>

            {/* Steps Grid */}
            <div className="grid md:grid-cols-3 gap-8 md:gap-6">
              {/* Step 1 */}
              <div className="group animate-fade-up delay-1">
                <div className="glass-card-hover p-8 rounded-2xl h-full">
                  <div className="mb-6 flex items-center justify-center">
                    <div className="relative w-16 h-16">
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full opacity-20 group-hover:opacity-30 transition-opacity" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold gradient-text">1</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-4">Answer 10 Questions</h3>
                  <p className="text-gray-400 text-center">
                    Quick strategic questions about your organization's goals, industry, and current technology landscape.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="group animate-fade-up delay-2">
                <div className="glass-card-hover p-8 rounded-2xl h-full">
                  <div className="mb-6 flex items-center justify-center">
                    <div className="relative w-16 h-16">
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full opacity-20 group-hover:opacity-30 transition-opacity" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold gradient-text">2</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-4">Our Engine Matches</h3>
                  <p className="text-gray-400 text-center">
                    Our intelligence engine analyzes your profile against 30 proven AI solutions, evaluating fit and impact.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="group animate-fade-up delay-3">
                <div className="glass-card-hover p-8 rounded-2xl h-full">
                  <div className="mb-6 flex items-center justify-center">
                    <div className="relative w-16 h-16">
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full opacity-20 group-hover:opacity-30 transition-opacity" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold gradient-text">3</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-4">Unlock Recommendations</h3>
                  <p className="text-gray-400 text-center">
                    Receive 5 tailored recommendations with detailed implementation insights and strategic guidance.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-20 flex justify-center animate-fade-up delay-4">
              <Link
                href="/assess"
                className="inline-block btn-secondary text-lg px-10 py-5 rounded-2xl font-semibold"
              >
                Start Your Assessment
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative border-t border-white/5 bg-black/40 backdrop-blur-md py-12">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-gray-500 mb-4">
              Powered by advanced AI assessment technology
            </p>
            <p className="text-gray-600 text-sm">
              © 2026 Seaway. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </main>
  )
}
