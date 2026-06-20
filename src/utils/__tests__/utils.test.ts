import { filterExperiences, formatDate, formatRating } from '..';

describe('formatDate', () => {
  it('formats ISO date strings correctly', () => {
    const result = formatDate('2026-07-15');
    expect(result).toContain('2026');
    expect(result).toContain('Jul');
  });
});

describe('formatRating', () => {
  it('formats rating to one decimal place', () => {
    expect(formatRating(4.8)).toBe('4.8');
    expect(formatRating(5)).toBe('5.0');
  });
});

describe('filterExperiences', () => {
  const experiences = [
    {
      title: 'Sunset Kayaking',
      location: 'San Francisco',
      description: 'Paddle at sunset',
      category: 'outdoor',
    },
    {
      title: 'Food Tour',
      location: 'Chinatown',
      description: 'Street food walk',
      category: 'food',
    },
  ];

  it('returns all experiences when no filters applied', () => {
    expect(filterExperiences(experiences, '', 'all')).toHaveLength(2);
  });

  it('filters by search query', () => {
    expect(filterExperiences(experiences, 'kayak', 'all')).toHaveLength(1);
    expect(filterExperiences(experiences, 'kayak', 'all')[0].title).toBe('Sunset Kayaking');
  });

  it('filters by category', () => {
    expect(filterExperiences(experiences, '', 'food')).toHaveLength(1);
    expect(filterExperiences(experiences, '', 'food')[0].title).toBe('Food Tour');
  });

  it('filters by both search and category', () => {
    expect(filterExperiences(experiences, 'food', 'food')).toHaveLength(1);
    expect(filterExperiences(experiences, 'kayak', 'food')).toHaveLength(0);
  });
});
