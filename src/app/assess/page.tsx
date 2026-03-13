'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { questions, type QuestionOption } from '@/data/questions'

export default function AssessmentPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<QuestionOption[]>([])
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  const [showIntro, setShowIntro] = useState(true)
  const [isComplete, setIsComplete] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Reset selected option when question changes
  useEffect(() => {
    setSelectedOption(null)
  }, [currentQuestion])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (showIntro || isAnalyzing) return

      // Number keys 1-8 to select options
      if (e.key >= '1' && e.key <= '8') {
        const index = parseInt(e.key) - 1
        if (index < questions[currentQuestion].options.length) {
          handleSelectOption(questions[currentQuestion].options[index].id)
        }
      }

      // Enter to confirm selection
      if (e.key === 'Enter' && selectedOption) {
        handleNextQuestion()
      }

      // Left arrow or Backspace to go back
      if ((e.key === 'ArrowLeft' || e.key === 'Backspace') && currentQuestion > 0) {
        handlePreviousQuestion()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentQuestion, selectedOption, showIntro, isAnalyzing])

  const handleSelectOption = useCallback((optionId: string) => {
    setSelectedOption(optionId)
  }, [])

  const handleNextQuestion = useCallback(() => {
    if (!selectedOption) return

    const selectedOpt = questions[currentQuestion].options.find(
      (opt) => opt.id === selectedOption
    )
    if (!selectedOpt) return

    const newAnswers = [...answers, selectedOpt]
    setAnswers(newAnswers)

    if (currentQuestion === questions.length - 1) {
      // Last question - show analyzing screen
      setIsComplete(true)
      setIsAnalyzing(true)

      // After 4 seconds, store and redirect
      setTimeout(() => {
        localStorage.setItem('seaway-answers', JSON.stringify(newAnswers))
        router.push('/results')
      }, 4000)
    } else {
      // Move to next question
      setDirection('forward')
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
        setIsTransitioning(false)
      }, 400)
    }
  }, [currentQuestion, selectedOption, answers, router])

  const handlePreviousQuestion = useCallback(() => {
    if (currentQuestion === 0) return

    setDirection('backward')
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentQuestion(currentQuestion - 1)
      setAnswers(answers.slice(0, -1))
      setIsTransitioning(false)
    }, 400)
  }, [currentQuestion, answers])

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100

  // INTRO SCREEN
  if (showIntro) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center p-4 overflow-hidden relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-float" style={{ animationDelay: '4s' }} />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          {/* Animated logo */}
          <div className="mb-12 animate-fade-up">
            <div className="inline-block">
              <div className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
                Seaway
              </div>
            </div>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Let's map your AI opportunity
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-300 mb-12 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            10 questions. 2 minutes. 5 tailored recommendations.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-12 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <div className="text-2xl font-bold text-pink-500">10</div>
              <div className="text-sm text-slate-400">Questions</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <div className="text-2xl font-bold text-purple-500">2</div>
              <div className="text-sm text-slate-400">Minutes</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <div className="text-2xl font-bold text-blue-500">5</div>
              <div className="text-sm text-slate-400">Results</div>
            </div>
          </div>

          {/* Start button */}
          <button
            onClick={() => setShowIntro(false)}
            className="animate-bounce-in bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-4 px-12 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg shadow-lg shadow-pink-500/50"
            style={{ animationDelay: '0.4s' }}
          >
            Start Assessment
          </button>

          {/* Decorative dots */}
          <div className="mt-16 flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-pink-500 rounded-full animate-pulse-pink"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ANALYZING SCREEN
  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center p-4 overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          {/* Orbital animation */}
          <div className="mb-12 h-32 w-32 mx-auto relative">
            <div className="absolute inset-0 animate-orbit">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-pink-500 rounded-full" />
            </div>
            <div className="absolute inset-0 animate-orbit" style={{ animationDelay: '-0.5s', animationDirection: 'reverse' }}>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-purple-500 rounded-full" />
            </div>
            <div className="absolute inset-4 border-2 border-pink-500/30 rounded-full animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse-pink" />
            </div>
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 -z-10 mx-auto h-32 w-32 bg-pink-500 rounded-full blur-3xl opacity-20 animate-pulse-pink" />

          {/* Sequential text animations */}
          <div className="space-y-4 mt-16">
            <p className="text-xl text-slate-300 opacity-0 animate-fade-up">
              Analyzing your responses...
            </p>
            <p className="text-lg text-slate-400 opacity-0 animate-fade-up" style={{ animationDelay: '1s' }}>
              Matching against 30 enterprise use cases...
            </p>
            <p className="text-lg text-slate-400 opacity-0 animate-fade-up" style={{ animationDelay: '2s' }}>
              Calculating value, risk & complexity scores...
            </p>
            <p className="text-lg text-slate-400 opacity-0 animate-fade-up" style={{ animationDelay: '3s' }}>
              Generating your recommendations...
            </p>
          </div>

          {/* Loading dots */}
          <div className="mt-12 flex justify-center gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 bg-pink-500 rounded-full animate-dot-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // QUESTION SCREEN
  const question = questions[currentQuestion]
  const isLastQuestion = currentQuestion === questions.length - 1

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex flex-col">
      {/* Top bar */}
      <div className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 md:py-6 flex items-center justify-between">
          {/* Logo */}
          <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Seaway
          </div>

          {/* Center: Progress info */}
          <div className="flex-1 mx-8">
            <div className="text-sm text-slate-300 text-center mb-2">
              Question {currentQuestion + 1} of {questions.length}
            </div>
            <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Back button */}
          {currentQuestion > 0 && (
            <button
              onClick={handlePreviousQuestion}
              className="text-slate-300 hover:text-white transition-colors px-4 py-2"
              aria-label="Go to previous question"
            >
              ← Back
            </button>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
          {/* Question header */}
          <div className={`mb-12 transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                {currentQuestion + 1}
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
                  {question.question}
                </h2>
                {question.subtitle && (
                  <p className="text-lg text-slate-400">
                    {question.subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Options grid */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 transition-all duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            {question.options.map((option, index) => (
              <div
                key={option.id}
                className={`opacity-0 animate-scale-in transition-all duration-300 cursor-pointer`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <button
                  onClick={() => handleSelectOption(option.id)}
                  className={`w-full p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 active:scale-95 text-left ${
                    selectedOption === option.id
                      ? 'border-pink-500 bg-pink-500/10 shadow-lg shadow-pink-500/50 scale-105'
                      : 'border-slate-600 bg-slate-800/50 hover:border-slate-500 hover:bg-slate-800'
                  }`}
                >
                  <div className="text-4xl mb-3">{option.icon}</div>
                  <div className="font-bold text-white text-lg mb-2">
                    {option.label}
                  </div>
                  <p className="text-slate-300 text-sm">
                    {option.description}
                  </p>
                </button>
              </div>
            ))}
          </div>

          {/* Next/Results button */}
          {selectedOption && (
            <div className="flex justify-end animate-fade-up">
              <button
                onClick={handleNextQuestion}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-pink-500/50"
              >
                {isLastQuestion ? 'See My Results' : 'Next Question'}
              </button>
            </div>
          )}

          {/* Hint text */}
          {!selectedOption && (
            <div className="text-center text-slate-400 text-sm animate-fade-up">
              Select an option to continue (or use number keys 1-{question.options.length})
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
