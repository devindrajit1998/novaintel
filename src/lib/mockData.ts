export interface Project {
  id: number;
  name: string;
  client: string;
  industry: string;
  status: 'In Progress' | 'Completed' | 'On Hold' | 'New';
  updated: string;
}

export interface CaseStudy {
  id: number;
  title: string;
  industry: string;
  result: string;
  description: string;
}

export const mockProjects: Project[] = [
  {
    id: 1,
    name: "Healthcare Cloud Migration",
    client: "Medinova",
    industry: "Healthcare",
    status: "In Progress",
    updated: "Nov 10, 2025"
  },
  {
    id: 2,
    name: "Retail Data Dashboard",
    client: "ShopPro",
    industry: "Retail",
    status: "Completed",
    updated: "Nov 7, 2025"
  },
  {
    id: 3,
    name: "Financial Services Integration",
    client: "FinTech Solutions",
    industry: "Finance",
    status: "In Progress",
    updated: "Nov 9, 2025"
  },
  {
    id: 4,
    name: "Insurance Claims Automation",
    client: "SecureLife",
    industry: "Insurance",
    status: "New",
    updated: "Nov 11, 2025"
  },
  {
    id: 5,
    name: "Manufacturing IoT Platform",
    client: "TechManufacture",
    industry: "Manufacturing",
    status: "On Hold",
    updated: "Nov 5, 2025"
  }
];

export const mockCaseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "AI Claims Automation",
    industry: "Insurance",
    result: "Reduced claims processing by 45%",
    description: "Implemented AI-powered claims processing system that automated 85% of standard claims, reducing processing time from 7 days to 2 days."
  },
  {
    id: 2,
    title: "Retail Personalization Engine",
    industry: "Retail",
    result: "Boosted conversions by 25%",
    description: "Deployed machine learning recommendation system that increased customer engagement and drove significant revenue growth."
  },
  {
    id: 3,
    title: "Healthcare Patient Portal",
    industry: "Healthcare",
    result: "Improved patient satisfaction by 40%",
    description: "Created secure patient portal with AI-powered appointment scheduling and telemedicine integration."
  },
  {
    id: 4,
    title: "Financial Risk Analytics",
    industry: "Finance",
    result: "Enhanced risk detection by 60%",
    description: "Built real-time risk analytics platform using AI to identify fraudulent transactions and compliance issues."
  },
  {
    id: 5,
    title: "Manufacturing Predictive Maintenance",
    industry: "Manufacturing",
    result: "Reduced downtime by 35%",
    description: "Implemented IoT sensors and AI algorithms to predict equipment failures before they occur."
  },
  {
    id: 6,
    title: "Education Learning Platform",
    industry: "Education",
    result: "Increased engagement by 50%",
    description: "Developed adaptive learning platform with personalized content recommendations based on student performance."
  }
];

export const mockStats = {
  activeProjects: 14,
  timeSaved: "145 hrs",
  clientSatisfaction: "98%",
  topDomain: "Healthcare"
};

export const mockInsights = {
  summary: "The client is seeking a comprehensive digital transformation to modernize their legacy systems and improve operational efficiency. Key focus areas include cloud migration, data analytics, and process automation.",
  challenges: [
    "Legacy Systems",
    "Data Silos",
    "Integration Gaps",
    "Manual Processes",
    "Security Concerns",
    "Scalability Issues"
  ],
  discoveryQuestions: [
    {
      category: "Current State",
      questions: [
        "What are your current pain points with existing systems?",
        "How many legacy applications are currently in use?",
        "What is your current data infrastructure?"
      ]
    },
    {
      category: "Business Goals",
      questions: [
        "What are your key business objectives for this transformation?",
        "What is your timeline for implementation?",
        "What ROI are you expecting?"
      ]
    },
    {
      category: "Technical Requirements",
      questions: [
        "What are your security and compliance requirements?",
        "What is your preferred cloud platform?",
        "Do you have existing API integrations?"
      ]
    }
  ],
  valuePropositions: [
    "40% faster time-to-market with modern cloud infrastructure",
    "Scalable architecture supporting 10x growth",
    "Advanced AI analytics for data-driven decisions",
    "Enterprise-grade security and compliance",
    "24/7 automated monitoring and support"
  ]
};
