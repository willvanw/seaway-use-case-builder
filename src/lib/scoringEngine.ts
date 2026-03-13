import { UseCase } from '@/data/useCases';
import { QuestionOption } from '@/data/questions';

export interface ScoredUseCase extends UseCase {
  matchScore: number;
  tagMatchCount: number;
  weightedScore: number;
  matchReasons: string[];
}

/**
 * Score and rank use cases based on user answers
 * @param useCases Array of available use cases to score
 * @param selectedOptions Array of user-selected question options
 * @returns Top 5 scored use cases with explanations
 */
export function scoreUseCases(
  useCases: UseCase[],
  selectedOptions: QuestionOption[]
): ScoredUseCase[] {
  // Collect all tags from selected options
  const selectedTags = new Set<string>();
  selectedOptions.forEach((option) => {
    option.tags.forEach((tag) => selectedTags.add(tag));
  });

  // Accumulate weights from all selected options
  let accumulatedWeights = {
    valuePreference: 0,
    riskTolerance: 0,
    complexityTolerance: 0,
  };

  selectedOptions.forEach((option) => {
    accumulatedWeights.valuePreference += option.weights.valuePreference ?? 0;
    accumulatedWeights.riskTolerance += option.weights.riskTolerance ?? 0;
    accumulatedWeights.complexityTolerance += option.weights.complexityTolerance ?? 0;
  });

  // Normalize accumulated weights to -2 to 2 range
  const normalizeWeight = (value: number, answerCount: number): number => {
    const average = value / answerCount;
    return Math.max(-2, Math.min(2, average));
  };

  const answerCount = selectedOptions.length;
  const normalizedValuePreference = normalizeWeight(
    accumulatedWeights.valuePreference,
    answerCount
  );
  const normalizedRiskTolerance = normalizeWeight(
    accumulatedWeights.riskTolerance,
    answerCount
  );
  const normalizedComplexityTolerance = normalizeWeight(
    accumulatedWeights.complexityTolerance,
    answerCount
  );

  // Score each use case
  const scoredUseCases: ScoredUseCase[] = useCases.map((useCase) => {
    // Count tag matches
    let tagMatchCount = 0;
    useCase.tags.forEach((tag) => {
      if (selectedTags.has(tag)) {
        tagMatchCount++;
      }
    });

    // Calculate match reasons
    const matchReasons: string[] = [];

    if (tagMatchCount > 0) {
      const matchedTags = useCase.tags.filter((tag) => selectedTags.has(tag));
      if (matchedTags.length > 0) {
        matchReasons.push(
          `Matches ${matchedTags.length} of your key priorities`
        );
      }
    }

    // Check business line fit
    const businessLineTags = [
      'creators-influencers', 'business-development', 'finance-operations',
      'performance-marketing', 'experiential-marketing', 'creative',
      'measurement-insights', 'live-event-production', 'people-talent', 'music-talent-rep',
    ];
    const hasBusinessLineMatch = useCase.tags.some(
      (tag) => businessLineTags.includes(tag) && selectedTags.has(tag)
    );
    if (hasBusinessLineMatch) {
      matchReasons.push('Direct fit for your business line');
    }

    // Check deliverable type fit
    const deliverableTags = [
      'campaign-strategy', 'talent-sourcing', 'client-reporting', 'content-production',
      'event-logistics', 'deal-management', 'media-buying', 'brand-partnerships',
    ];
    const hasDeliverableMatch = useCase.tags.some(
      (tag) => deliverableTags.includes(tag) && selectedTags.has(tag)
    );
    if (hasDeliverableMatch) {
      matchReasons.push('Targets your core deliverable workflow');
    }

    // Check pain point alignment
    const painTags = [
      'manual-reporting', 'talent-discovery', 'creative-volume', 'campaign-optimization',
      'vendor-coordination', 'contract-workflow', 'client-approvals', 'knowledge-silos',
    ];
    const hasPainMatch = useCase.tags.some(
      (tag) => painTags.includes(tag) && selectedTags.has(tag)
    );
    if (hasPainMatch) {
      matchReasons.push('Addresses your biggest bottleneck');
    }

    // Check strategic priority fit
    const priorityTags = [
      'reduce-costs', 'win-pitches', 'faster-delivery',
      'productized-service', 'talent-intelligence', 'measurement-edge',
    ];
    const hasPriorityMatch = useCase.tags.some(
      (tag) => priorityTags.includes(tag) && selectedTags.has(tag)
    );
    if (hasPriorityMatch) {
      matchReasons.push('Aligns with your strategic priority');
    }

    // Check build/timeline fit
    const implTags = [
      'buy-saas', 'customize-platform', 'build-opensource', 'build-proprietary',
      'timeline-rapid', 'timeline-pilot', 'timeline-strategic', 'timeline-transformational',
    ];
    const hasImplFit = useCase.tags.some(
      (tag) => implTags.includes(tag) && selectedTags.has(tag)
    );
    if (hasImplFit) {
      matchReasons.push('Fits your timeline and build approach');
    }

    // Check data readiness fit
    const dataReadinessTags = ['data-scattered', 'data-centralized', 'data-structured', 'data-proprietary'];
    const useCaseDataNeeds = useCase.tags.find((tag) => dataReadinessTags.includes(tag));
    const selectedDataReadiness = Array.from(selectedTags).find((tag) =>
      dataReadinessTags.includes(tag)
    );
    if (useCaseDataNeeds && selectedDataReadiness && useCaseDataNeeds === selectedDataReadiness) {
      matchReasons.push('Matched to your data maturity');
    }

    // Use the numeric scores directly from the use case (1-5 scale)
    const valueScore = useCase.scores.value;
    const riskScore = useCase.scores.risk;
    const complexityScore = useCase.scores.complexity;

    // Weight adjustments based on user preferences
    let valueWeight = 1;
    let riskWeight = 1;
    let complexityWeight = 1;

    // If user values ROI (high valuePreference), boost value-focused use cases
    if (normalizedValuePreference > 0) {
      valueWeight = 1 + normalizedValuePreference * 0.5;
    } else if (normalizedValuePreference < 0) {
      valueWeight = Math.max(0.2, 1 + normalizedValuePreference * 0.3);
    }

    // If user has high risk tolerance, don't penalize risky cases
    // If user has low risk tolerance, heavily penalize risky cases
    if (normalizedRiskTolerance > 0) {
      riskWeight = 0.5 + (2 - riskScore) * 0.3;
    } else if (normalizedRiskTolerance < 0) {
      riskWeight = 1.5 + (5 - riskScore) * 0.5;
    } else {
      riskWeight = 1;
    }

    // If user has high complexity tolerance, don't penalize complex cases
    // If user has low complexity tolerance, penalize complex cases
    if (normalizedComplexityTolerance > 0) {
      complexityWeight = 0.8;
    } else if (normalizedComplexityTolerance < 0) {
      complexityWeight = 1.5 + (5 - complexityScore) * 0.3;
    } else {
      complexityWeight = 1;
    }

    // Calculate composite weighted score
    // Base: tag matches are most important
    // Value component: importance depends on user preference
    // Risk component: adjust based on risk tolerance
    // Complexity component: adjust based on complexity tolerance
    const matchScore = tagMatchCount * 10;
    const valueComponent = valueScore * valueWeight;
    const riskComponent = (5 - riskScore) * riskWeight;
    const complexityComponent = (5 - complexityScore) * complexityWeight;

    const weightedScore =
      matchScore +
      valueComponent * 2 +
      riskComponent * 1.5 +
      complexityComponent * 1;

    return {
      ...useCase,
      matchScore,
      tagMatchCount,
      weightedScore,
      matchReasons:
        matchReasons.length > 0
          ? matchReasons
          : ['Well-rounded use case', 'Broad applicability across scenarios'],
    };
  });

  // Sort by weighted score descending and return top 5
  return scoredUseCases
    .sort((a, b) => b.weightedScore - a.weightedScore)
    .slice(0, 5);
}

/**
 * Get human-readable label for a numeric score
 * @param score Numeric score value
 * @returns Score label
 */
export function getScoreLabel(score: number): string {
  if (score >= 5) return 'Very High';
  if (score >= 4) return 'High';
  if (score >= 3) return 'Medium';
  if (score >= 2) return 'Low';
  return 'Very Low';
}

/**
 * Get Tailwind CSS color class for a numeric score
 * @param score Numeric score value
 * @returns Tailwind color class
 */
export function getScoreColor(score: number): string {
  if (score >= 5) return 'bg-red-500 text-white';
  if (score >= 4) return 'bg-orange-500 text-white';
  if (score >= 3) return 'bg-yellow-500 text-white';
  if (score >= 2) return 'bg-blue-500 text-white';
  return 'bg-gray-400 text-white';
}

/**
 * Calculate match percentage for a use case vs selected options
 * Useful for progress indicators or percentage displays
 * @param tagMatchCount Number of matching tags
 * @param totalTags Total unique tags in selected options
 * @returns Percentage 0-100
 */
export function calculateMatchPercentage(
  tagMatchCount: number,
  totalTags: number
): number {
  if (totalTags === 0) return 0;
  return Math.round((tagMatchCount / totalTags) * 100);
}

/**
 * Get detailed explanation for why a use case was recommended
 * @param useCase The scored use case
 * @param selectedTags Set of tags from user selections
 * @returns Detailed explanation string
 */
export function getDetailedExplanation(
  useCase: ScoredUseCase,
  selectedTags: Set<string>
): string {
  const reasons = useCase.matchReasons.join(', ');
  const matchPercentage = calculateMatchPercentage(
    useCase.tagMatchCount,
    selectedTags.size
  );

  return `${useCase.name} ranked #${useCase.matchScore / 10} based on ${reasons.toLowerCase()} (${matchPercentage}% priority match).`;
}
