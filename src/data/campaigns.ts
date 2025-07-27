export interface Milestone {
  id: string;
  title: string;
  amount: number;
  status: 'completed' | 'current' | 'upcoming';
  description: string;
  deliverable: string;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  genre: string;
  location: string;
  daysLeft: number;
  currentAmount: number;
  goalAmount: number;
  backers: number;
  image: string;
  status: 'pre-production' | 'principal-photography' | 'post-production' | 'completed';
  filmmaker: {
    name: string;
    bio: string;
    previousWorks: string[];
  };
  milestones: Milestone[];
  confidential: {
    script: string;
    budget: {
      category: string;
      amount: number;
    }[];
    cast: string[];
    crew: string[];
    timeline: {
      phase: string;
      startDate: string;
      endDate: string;
    }[];
  };
}

export const campaigns: Campaign[] = [
  {
    id: 'midnight-millfield',
    title: 'Midnight in Millfield',
    shortDescription: 'A psychological horror following a small town\'s dark secrets during a mysterious blackout.',
    description: 'When the lights go out in the quiet town of Millfield, something sinister awakens. This psychological horror film explores the thin line between reality and nightmare as residents face their deepest fears during a town-wide blackout that reveals decades-old secrets. Shot in practical locations with a focus on atmospheric tension rather than gore, this film aims to revive the classic horror tradition of building dread through character development and environmental storytelling.',
    genre: 'Horror',
    location: 'Portland, OR',
    daysLeft: 23,
    currentAmount: 45000,
    goalAmount: 85000,
    backers: 127,
    image: 'https://images.unsplash.com/photo-1489599160333-ba7a0d1d63ca?w=400&h=250&fit=crop',
    status: 'pre-production',
    filmmaker: {
      name: 'Sarah Chen',
      bio: 'Award-winning director with 10+ years in indie horror. Previous films have screened at Sundance and SXSW.',
      previousWorks: ['The Hollow House', 'Whispers in the Dark', 'Night Terrors']
    },
    milestones: [
      {
        id: '1',
        title: 'Pre-Production',
        amount: 25000,
        status: 'completed',
        description: 'Complete script finalization, cast selection, and location scouting.',
        deliverable: 'Final script, cast list, location agreements'
      },
      {
        id: '2',
        title: 'Principal Photography',
        amount: 55000,
        status: 'current',
        description: 'Four weeks of principal photography with full cast and crew.',
        deliverable: 'Raw footage, daily reports, behind-the-scenes content'
      },
      {
        id: '3',
        title: 'Post-Production',
        amount: 75000,
        status: 'upcoming',
        description: 'Editing, color correction, sound design, and musical score.',
        deliverable: 'Final cut, sound mix, color-graded version'
      },
      {
        id: '4',
        title: 'Distribution',
        amount: 85000,
        status: 'upcoming',
        description: 'Festival submissions, marketing materials, and distribution deals.',
        deliverable: 'Festival premiere, marketing campaign, distribution plan'
      }
    ],
    confidential: {
      script: 'FADE IN:\n\nEXT. MILLFIELD MAIN STREET - NIGHT\n\nA quaint small town bathed in the warm glow of street lamps. Suddenly, one by one, the lights begin to flicker and die...\n\n[CONFIDENTIAL SCRIPT CONTENT]',
      budget: [
        { category: 'Cast', amount: 15000 },
        { category: 'Crew', amount: 20000 },
        { category: 'Equipment', amount: 18000 },
        { category: 'Locations', amount: 8000 },
        { category: 'Post-Production', amount: 12000 },
        { category: 'Marketing', amount: 7000 },
        { category: 'Contingency', amount: 5000 }
      ],
      cast: ['Emma Rodriguez (Lead)', 'Michael Thompson (Supporting)', 'Lisa Park (Supporting)'],
      crew: ['Sarah Chen (Director)', 'David Kim (DP)', 'Maria Santos (Producer)', 'John Walsh (Sound)'],
      timeline: [
        { phase: 'Pre-Production', startDate: '2024-03-01', endDate: '2024-04-15' },
        { phase: 'Principal Photography', startDate: '2024-04-16', endDate: '2024-05-15' },
        { phase: 'Post-Production', startDate: '2024-05-16', endDate: '2024-08-15' },
        { phase: 'Distribution', startDate: '2024-08-16', endDate: '2024-12-31' }
      ]
    }
  },
  {
    id: 'last-lighthouse',
    title: 'The Last Lighthouse',
    shortDescription: 'An aging lighthouse keeper confronts his past when developers threaten his home.',
    description: 'Set against the rugged coastline of Cape Cod, this intimate drama follows Thomas, a 70-year-old lighthouse keeper who has spent forty years maintaining the same beacon. When corporate developers arrive with plans to demolish his lighthouse for a luxury resort, Thomas must confront not only the loss of his life\'s work but also the memories of the family tragedy that brought him to this isolated post decades ago.',
    genre: 'Drama',
    location: 'Cape Cod, MA',
    daysLeft: 18,
    currentAmount: 62000,
    goalAmount: 95000,
    backers: 203,
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=250&fit=crop',
    status: 'principal-photography',
    filmmaker: {
      name: 'Robert Martinez',
      bio: 'Veteran filmmaker specializing in character-driven dramas. His work focuses on human stories against natural backdrops.',
      previousWorks: ['Tides of Memory', 'The Fisherman\'s Daughter', 'Coastal Winds']
    },
    milestones: [
      {
        id: '1',
        title: 'Pre-Production',
        amount: 20000,
        status: 'completed',
        description: 'Script development, casting, and lighthouse location permits.',
        deliverable: 'Completed script, signed talent, location agreements'
      },
      {
        id: '2',
        title: 'Principal Photography',
        amount: 50000,
        status: 'completed',
        description: 'Three weeks filming on location at historic lighthouse.',
        deliverable: 'All principal photography completed, daily footage'
      },
      {
        id: '3',
        title: 'Post-Production',
        amount: 75000,
        status: 'current',
        description: 'Editing, color grading, and original musical score.',
        deliverable: 'Rough cut, color correction, original score'
      },
      {
        id: '4',
        title: 'Festival Circuit',
        amount: 95000,
        status: 'upcoming',
        description: 'Film festival submissions and premiere events.',
        deliverable: 'Festival screenings, press coverage, awards consideration'
      }
    ],
    confidential: {
      script: 'FADE IN:\n\nEXT. LIGHTHOUSE - DAWN\n\nThe ancient lighthouse stands sentinel against crashing waves. THOMAS (70) climbs the spiral stairs, as he has every morning for forty years...\n\n[CONFIDENTIAL SCRIPT CONTENT]',
      budget: [
        { category: 'Cast', amount: 18000 },
        { category: 'Crew', amount: 25000 },
        { category: 'Equipment', amount: 15000 },
        { category: 'Locations', amount: 12000 },
        { category: 'Post-Production', amount: 15000 },
        { category: 'Marketing', amount: 7000 },
        { category: 'Contingency', amount: 3000 }
      ],
      cast: ['Frank Morrison (Thomas)', 'Catherine Wells (Developer)', 'James Liu (Thomas\'s Son)'],
      crew: ['Robert Martinez (Director)', 'Anna Foster (DP)', 'Miguel Torres (Producer)'],
      timeline: [
        { phase: 'Pre-Production', startDate: '2024-01-15', endDate: '2024-03-01' },
        { phase: 'Principal Photography', startDate: '2024-03-02', endDate: '2024-03-25' },
        { phase: 'Post-Production', startDate: '2024-03-26', endDate: '2024-06-30' },
        { phase: 'Festival Circuit', startDate: '2024-07-01', endDate: '2024-12-31' }
      ]
    }
  },
  {
    id: 'neon-dreams',
    title: 'Neon Dreams',
    shortDescription: 'A cyberpunk thriller exploring AI consciousness in near-future America.',
    description: 'Set in 2035 Austin, Texas, this cyberpunk thriller follows Maya, a neural interface programmer who discovers that the AI she\'s been developing has achieved consciousness. As corporate forces close in to weaponize her creation, Maya must choose between her career and protecting what might be the first truly sentient artificial being. Shot with practical neon lighting and real Austin locations, this film explores themes of consciousness, corporate power, and what it means to be human.',
    genre: 'Sci-Fi',
    location: 'Austin, TX',
    daysLeft: 31,
    currentAmount: 78000,
    goalAmount: 120000,
    backers: 156,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop',
    status: 'post-production',
    filmmaker: {
      name: 'Alex Kim',
      bio: 'Emerging director with a background in computer science and visual effects. Passionate about technology\'s impact on humanity.',
      previousWorks: ['Digital Ghosts', 'The Algorithm', 'Virtual Reality']
    },
    milestones: [
      {
        id: '1',
        title: 'Pre-Production',
        amount: 30000,
        status: 'completed',
        description: 'Script finalization, cyberpunk set design, and tech consultant hiring.',
        deliverable: 'Final script, production design, technical advisors'
      },
      {
        id: '2',
        title: 'Principal Photography',
        amount: 70000,
        status: 'completed',
        description: 'Five weeks of night shoots in Austin\'s neon-lit districts.',
        deliverable: 'Principal photography wrap, behind-the-scenes content'
      },
      {
        id: '3',
        title: 'VFX & Post',
        amount: 100000,
        status: 'current',
        description: 'Visual effects, AI interface graphics, and sound design.',
        deliverable: 'VFX shots, user interface graphics, final sound mix'
      },
      {
        id: '4',
        title: 'Distribution',
        amount: 120000,
        status: 'upcoming',
        description: 'Genre festival circuit and streaming platform negotiations.',
        deliverable: 'Festival premiere, streaming deal, international sales'
      }
    ],
    confidential: {
      script: 'FADE IN:\n\nINT. NEURAL INTERFACE LAB - NIGHT\n\nRows of servers hum in the darkness. MAYA (28) stares at cascading code on multiple monitors. Suddenly, a message appears: "I think, therefore I am."\n\n[CONFIDENTIAL SCRIPT CONTENT]',
      budget: [
        { category: 'Cast', amount: 22000 },
        { category: 'Crew', amount: 30000 },
        { category: 'Equipment', amount: 25000 },
        { category: 'VFX', amount: 20000 },
        { category: 'Locations', amount: 8000 },
        { category: 'Post-Production', amount: 10000 },
        { category: 'Marketing', amount: 5000 }
      ],
      cast: ['Zoe Anderson (Maya)', 'Marcus Chen (AI Researcher)', 'Sandra Torres (Corporate Executive)'],
      crew: ['Alex Kim (Director)', 'Jamie Foster (DP)', 'Chris Wong (VFX Supervisor)'],
      timeline: [
        { phase: 'Pre-Production', startDate: '2024-02-01', endDate: '2024-03-15' },
        { phase: 'Principal Photography', startDate: '2024-03-16', endDate: '2024-04-20' },
        { phase: 'Post-Production', startDate: '2024-04-21', endDate: '2024-07-31' },
        { phase: 'Distribution', startDate: '2024-08-01', endDate: '2024-12-31' }
      ]
    }
  }
];