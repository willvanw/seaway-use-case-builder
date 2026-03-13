'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCases } from '@/data/useCases'
import { questions } from '@/data/questions'
import { scoreUseCases, type ScoredUseCase, getScoreLabel } from '@/lib/scoringEngine'

export default function ResultsPage() {
  const router = useRouter()
  const [recommendations, setRecommendations] = useState<ScoredUseCase[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<{ [key: string]: 'overview' | 'detail' }>({})
  const [showAll, setShowAll] = useState(false)

  // Extract profile data from answers
  const extractProfileData = (answers: any[]) => {
    let businessLine = 'THE·TEAM'
    let dataMaturity = 'Developing'
    let strategicPriority = 'AI Optimization'

    answers.forEach((answer) => {
      // Look for business line
      if (answer.tags?.includes('creators-influencers')) businessLine = 'Creators & Influencers'
      else if (answer.tags?.includes('business-development')) businessLine = 'Business Development'
      else if (answer.tags?.includes('finance-operations')) businessLine = 'Finance & Operations'
      else if (answer.tags?.includes('performance-marketing')) businessLine = 'Performance Marketing'
      else if (answer.tags?.includes('experiential-marketing')) businessLine = 'Experiential Marketing'
      else if (answer.tags?.includes('creative')) businessLine = 'Creative'
      else if (answer.tags?.includes('measurement-insights')) businessLine = 'Measurement & Insights'
      else if (answer.tags?.includes('live-event-production')) businessLine = 'Live Event Production'
      else if (answer.tags?.includes('people-talent')) businessLine = 'People & Talent'
      else if (answer.tags?.includes('music-talent-rep')) businessLine = 'Music & Talent Rep'

      // Look for data maturity
      if (answer.tags?.includes('data-scattered')) dataMaturity = 'Scattered'
      else if (answer.tags?.includes('data-centralized')) dataMaturity = 'Centralized'
      else if (answer.tags?.includes('data-structured')) dataMaturity = 'Structured'
      else if (answer.tags?.includes('data-proprietary')) dataMaturity = 'Proprietary Asset'

      // Look for strategic priority
      if (answer.tags?.includes('reduce-costs')) strategicPriority = 'Reduce Costs'
      else if (answer.tags?.includes('win-pitches')) strategicPriority = 'Win More Pitches'
      else if (answer.tags?.includes('faster-delivery')) strategicPriority = 'Faster Delivery'
      else if (answer.tags?.includes('productized-service')) strategicPriority = 'Productized Service'
      else if (answer.tags?.includes('talent-intelligence')) strategicPriority = 'Talent Intelligence'
      else if (answer.tags?.includes('measurement-edge')) strategicPriority = 'Measurement Edge'
    })

    return { businessLine, dataMaturity, strategicPriority }
  }

  useEffect(() => {
    // Get answers from localStorage (persists across sessions)
    const answersJson = localStorage.getItem('seaway-answers')
    if (!answersJson) {
      router.push('/assess')
      return
    }

    const answers = JSON.parse(answersJson)
    const scored = scoreUseCases(useCases, answers)
    setRecommendations(scored.slice(0, 5))
    setIsLoading(false)

    // Stagger reveal
    const timer = setTimeout(() => {
      setShowAll(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [router])

  const toggleExpanded = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id)
    setActiveTab((prev) => ({
      ...prev,
      [id]: 'overview',
    }))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2">
            <div className="loading-dot animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="loading-dot animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="loading-dot animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <p className="text-sm text-gray-400">Analyzing your opportunity map...</p>
        </div>
      </div>
    )
  }

  const profile = extractProfileData(
    JSON.parse(localStorage.getItem('seaway-answers') || '[]')
  )

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" className="text-2xl font-bold gradient-text hover:opacity-80 transition-opacity">Seaway</a>
            <div className="flex items-center gap-6">
              <button
                onClick={() => router.push('/assess')}
                className="text-sm text-gray-400 hover:text-pink-500 transition-colors"
              >
                Retake Assessment
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          {/* Hero Section */}
          <div className="mb-16 animate-fade-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Your <span className="gradient-text">AI Opportunity Map</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl">
              Based on your THE·TEAM profile, here are your 5 highest-impact AI use cases
              tailored to your business line and strategic priorities.
            </p>

            {/* Profile Summary Bar */}
            <div className="glass-card rounded-2xl p-6 border border-white/10 flex flex-wrap gap-4 md:gap-8">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Business Line</p>
                <p className="text-lg font-semibold text-white">{profile.businessLine}</p>
              </div>
              <div className="hidden md:block w-px bg-white/10"></div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Data Maturity</p>
                <p className="text-lg font-semibold text-white">{profile.dataMaturity}</p>
              </div>
              <div className="hidden md:block w-px bg-white/10"></div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                  Strategic Priority
                </p>
                <p className="text-lg font-semibold text-white">{profile.strategicPriority}</p>
              </div>
            </div>
          </div>

          {/* Recommendations Grid */}
          <div className="grid grid-cols-1 gap-6 mb-20">
            {recommendations.map((rec, index) => (
              <div
                key={rec.id}
                className="animate-fade-up"
                style={{
                  opacity: showAll ? 1 : 0,
                  animationDelay: `${index * 0.15}s`,
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                <RecommendationCard
                  recommendation={rec}
                  rank={index + 1}
                  isExpanded={expandedCard === rec.id}
                  onToggle={() => toggleExpanded(rec.id)}
                  activeTab={activeTab[rec.id] || 'overview'}
                  onTabChange={(tab) =>
                    setActiveTab((prev) => ({
                      ...prev,
                      [rec.id]: tab,
                    }))
                  }
                />
              </div>
            ))}
          </div>

          {/* Footer */}
          <footer className="border-t border-white/10 pt-12 pb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <p className="text-sm text-gray-400">Powered by Seaway AI</p>
                <p className="text-xs text-gray-500 mt-1">
                  © 2026 Seaway. Proprietary AI recommendations.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                <button
                  onClick={() => router.push('/assess')}
                  className="text-sm text-gray-400 hover:text-pink-500 transition-colors"
                >
                  Retake Assessment
                </button>
                <a
                  href="#"
                  className="text-sm text-pink-500 hover:text-pink-400 transition-colors font-medium"
                >
                  Learn More About Implementation
                </a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  )
}

interface RecommendationCardProps {
  recommendation: ScoredUseCase
  rank: number
  isExpanded: boolean
  onToggle: () => void
  activeTab: 'overview' | 'detail'
  onTabChange: (tab: 'overview' | 'detail') => void
}

function RecommendationCard({
  recommendation,
  rank,
  isExpanded,
  onToggle,
  activeTab,
  onTabChange,
}: RecommendationCardProps) {
  return (
    <div
      className={`glass-card rounded-3xl border border-white/10 overflow-hidden transition-all duration-500 cursor-pointer ${
        isExpanded
          ? 'ring-2 ring-pink-500/50 shadow-2xl shadow-pink-500/20'
          : 'hover:border-white/20 hover:shadow-lg hover:shadow-pink-500/10'
      }`}
      onClick={onToggle}
    >
      <div className="p-8">
        {/* Card Header */}
        <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
          {/* Rank Badge */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center font-bold text-2xl shadow-lg shadow-pink-500/30 animate-scale-pulse">
              {rank}
            </div>
          </div>

          {/* Title and Headlines */}
          <div className="flex-1">
            <h3 className="text-3xl font-bold mb-3">{recommendation.name}</h3>
            <p className="text-lg text-pink-400 font-semibold mb-4">
              {recommendation.valueHeadline}
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <span className="px-4 py-2 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-gray-300">
                {recommendation.coreKpiType}
              </span>
              <span className="px-4 py-2 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-gray-300">
                {recommendation.category
                  .split('-')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </span>
            </div>
          </div>
        </div>

        {/* Match Reasons Pills */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {recommendation.matchReasons.slice(0, 3).map((reason, idx) => (
              <span
                key={idx}
                className="text-xs px-3 py-2 rounded-lg bg-pink-500/10 border border-pink-500/30 text-pink-200"
              >
                {reason}
              </span>
            ))}
          </div>
        </div>

        {/* Score Bars */}
        <div className="space-y-4 mb-8">
          <ScoreBar
            label="Value Potential"
            score={recommendation.scores.value}
            color="from-emerald-500 to-pink-500"
          />
          <ScoreBar
            label="Implementation Risk"
            score={recommendation.scores.risk}
            color="from-amber-500 to-red-500"
          />
          <ScoreBar
            label="Technical Complexity"
            score={recommendation.scores.complexity}
            color="from-blue-500 to-purple-500"
          />
        </div>

        {/* Expandable Detail Section */}
        {isExpanded && (
          <div
            className="border-t border-white/10 pt-8 animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tab Navigation */}
            <div className="flex gap-4 mb-6 border-b border-white/10 pb-4">
              <button
                onClick={() => onTabChange('overview')}
                className={`text-sm font-semibold transition-colors pb-2 border-b-2 ${
                  activeTab === 'overview'
                    ? 'text-pink-500 border-pink-500'
                    : 'text-gray-400 border-transparent hover:text-gray-300'
                }`}
              >
                Solution Overview
              </button>
              <button
                onClick={() => onTabChange('detail')}
                className={`text-sm font-semibold transition-colors pb-2 border-b-2 ${
                  activeTab === 'detail'
                    ? 'text-pink-500 border-pink-500'
                    : 'text-gray-400 border-transparent hover:text-gray-300'
                }`}
              >
                Deep Dive
              </button>
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-fade-up">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-xl">📋</span> Solution Type
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    {recommendation.solutionType}
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-xl">🎯</span> Why It Matters
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    This use case aligns with your business line&apos;s workflows and data maturity.
                    Implementation targets measurable impact on your core deliverables.
                  </p>
                </div>
              </div>
            )}

            {/* Detail Tab */}
            {activeTab === 'detail' && (
              <div className="space-y-6 animate-fade-up">
                <DetailSection
                  icon="⚠️"
                  title="The Problem"
                  content={recommendation.detail.problem}
                />
                <DetailSection
                  icon="🛡️"
                  title="Proprietary Ownership Angle"
                  content={recommendation.detail.proprietaryOwnershipAngle}
                />
                <DetailSection
                  icon="👥"
                  title="Workforce Behavior Changes Required"
                  content={recommendation.detail.workforceBehaviorChanges}
                />
                <DetailSection
                  icon="🚀"
                  title="Recommended Build Route"
                  content={recommendation.detail.recommendedBuildRoute}
                />
              </div>
            )}
          </div>
        )}

        {/* Expand/Collapse Indicator */}
        <div className="flex justify-end mt-6 pt-6 border-t border-white/10">
          <span className="text-xs text-gray-400 flex items-center gap-2">
            {isExpanded ? 'Collapse' : 'View Details'}
            <svg
              className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  )
}

interface ScoreBarProps {
  label: string
  score: number
  color: string
}

function ScoreBar({ label, score, color }: ScoreBarProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-gray-300">{label}</p>
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-white">{score}/5</span>
          <span className="text-xs text-gray-500">{getScoreLabel(score)}</span>
        </div>
      </div>
      <div
        className={`h-3 rounded-full overflow-hidden bg-white/5 border border-white/10`}
        style={{
          '--score-width': `${score * 20}%`,
        } as React.CSSProperties}
      >
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${color} shadow-lg`}
          style={{
            width: `${score * 20}%`,
            boxShadow: `0 0 12px ${color === 'from-emerald-500 to-pink-500' ? 'rgba(16, 185, 129, 0.5)' : color === 'from-amber-500 to-red-500' ? 'rgba(245, 158, 11, 0.5)' : 'rgba(59, 130, 246, 0.5)'}`,
          }}
        ></div>
      </div>
    </div>
  )
}

interface DetailSectionProps {
  icon: string
  title: string
  content: string
}

function DetailSection({ icon, title, content }: DetailSectionProps) {
  return (
    <div className="border-l-4 border-pink-500/50 pl-6 py-4 animate-fade-up">
      <h5 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
        <span className="text-xl">{icon}</span>
        {title}
      </h5>
      <p className="text-gray-300 leading-relaxed text-sm">{content}</p>
    </div>
  )
}