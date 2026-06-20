import { Category, Experience, User } from '../types';

export const CATEGORIES: Category[] = [
  { id: 'all', label: 'All', icon: '✨' },
  { id: 'food', label: 'Food', icon: '🍽️' },
  { id: 'outdoor', label: 'Outdoor', icon: '🏕️' },
  { id: 'culture', label: 'Culture', icon: '🎭' },
  { id: 'wellness', label: 'Wellness', icon: '🧘' },
  { id: 'nightlife', label: 'Nightlife', icon: '🌙' },
  { id: 'adventure', label: 'Adventure', icon: '�️' },
  { id: 'workshop', label: 'Workshop', icon: '🎓' },
  { id: 'family', label: 'Family', icon: '👪' },
];



const EXPERIENCE_TEMPLATES = [
  {
    title: 'Sunset Kayaking Tour',
    description:
      'Paddle through calm waters as the sun sets over the horizon. Includes equipment, safety briefing, and refreshments.',
    image:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    location: 'Marina Bay, San Francisco',
    category: 'outdoor',
  },
  {
    title: 'Street Food Walking Tour',
    description:
      'Discover hidden culinary gems and sample local specialties with an expert guide.',
    image:
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
    location: 'Chinatown, San Francisco',
    category: 'food',
  },
  {
    title: 'Jazz & Wine Evening',
    description:
      'Enjoy live jazz performances paired with curated local wines.',
    image:
      'https://images.unsplash.com/photo-1415201364774-f6f0ff35a28d?w=800',
    location: 'North Beach, San Francisco',
    category: 'nightlife',
  },
  {
    title: 'Morning Yoga in the Park',
    description:
      'Rejuvenating yoga session surrounded by nature. All levels welcome.',
    image:
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
    location: 'Golden Gate Park',
    category: 'wellness',
  },
  {
    title: 'Street Art & Murals Walk',
    description:
      'Explore colorful murals and learn their history from a local artist.',
    image:
      'https://images.unsplash.com/photo-1499781350541-7783f6c6a3c8?w=800',
    location: 'Mission District, San Francisco',
    category: 'culture',
  },
  {
    title: 'Farm-to-Table Cooking Class',
    description:
      'Hands-on cooking class featuring seasonal ingredients and expert instruction.',
    image:
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800',
    location: 'SOMA, San Francisco',
    category: 'food',
  },
  {
    title: 'Coastal Hiking Adventure',
    description:
      'Scenic coastal hike with breathtaking views and guided exploration.',
    image:
      'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
    location: 'Lands End Trail',
    category: 'adventure',
  },
  {
    title: 'Meditation & Sound Bath',
    description:
      'Guided meditation and immersive sound healing experience.',
    image:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
    location: 'Hayes Valley, San Francisco',
    category: 'wellness',
  },
  {
    title: 'Photography Masterclass',
    description:
      'Learn professional photography techniques in real-world settings.',
    image:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
    location: 'Embarcadero',
    category: 'workshop',
  },
  {
    title: 'Family Picnic Festival',
    description:
      'Outdoor games, live entertainment, and food for the whole family.',
    image:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800',
    location: 'Presidio Park',
    category: 'family',
  },
];

export const MOCK_EXPERIENCES: Experience[] = Array.from(
  { length:10000 },
  (_, index) => {
    const template = EXPERIENCE_TEMPLATES[index % EXPERIENCE_TEMPLATES.length];

    const date = new Date(2026, 6, 1); // July 1, 2026
    date.setDate(date.getDate() + index);

    return {
      id: String(index + 1),
      title: `${template.title} #${index + 1}`,
      description: template.description,
      image: template.image,
      location: template.location,
      date: date.toISOString().split('T')[0],
      rating: Number((4.3 + Math.random() * 0.7).toFixed(1)),
      category: template.category as Experience['category'],
    };
  }
);

export const MOCK_USER: User = {
  id: 'user-1',
  name: 'Ali Raza',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=404',
  joinedExperiences: [MOCK_EXPERIENCES[0], MOCK_EXPERIENCES[1], MOCK_EXPERIENCES[3]],
  interests: ['Outdoor Adventures', 'Food & Dining', 'Wellness', 'Live Music', 'Art & Culture'],
};
