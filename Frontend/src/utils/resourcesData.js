import { Scale, Users, Phone } from 'lucide-react';

export const LEGAL_GUIDES = [
  {
    id: 1,
    title: 'How to Register Land Documents',
    category: 'land',
    description: 'Complete guide for land registration, stamp duty, and required documents',
    fullDescription: 'Registering land documents is a critical legal process that ensures the legal transfer of property ownership. This guide provides a comprehensive overview of the steps involved in completing land registration in India.',
    icon: '🏡',
    color: 'bg-green-500',
    downloadUrl: '/guides/land-registration.pdf',
    readTime: '10 min',
    steps: [
      'Obtain the property documents and verify their authenticity.',
      'Draft the sale deed with the help of a legal expert.',
      'Purchase the required stamp duty based on property value.',
      'Schedule an appointment at the Sub-Registrar office.',
      'Visit the office with witnesses and required IDs.',
      'Complete the biometric registration and signing.',
      'Collect the registered documents after processing (usually 7-15 days).'
    ],
    requiredDocuments: [
      'Original Sale Deed',
      'Property Tax Receipts',
      'Encumbrance Certificate (EC)',
      'Identity Proofs (Aadhar Card, PAN Card)',
      'Passport size photographs of buyer and seller',
      'Witness IDs'
    ],
    expertTips: [
      'Always verify the property title independently before purchase.',
      'Ensure the stamp duty is paid in full to avoid legal complications later.',
      'Keep copies of all submitted documents for your records.'
    ]
  },
  {
    id: 2,
    title: 'Filing an FIR - Complete Process',
    category: 'criminal',
    description: 'Step-by-step guide to file a First Information Report',
    fullDescription: 'A First Information Report (FIR) is the first step in the criminal justice system in India. It is a written document prepared by the police when they receive information about the commission of a cognizable offense.',
    icon: '👮',
    color: 'bg-red-500',
    downloadUrl: '/guides/fir-process.pdf',
    readTime: '8 min',
    steps: [
      'Visit the nearest police station immediately after the incident.',
      'Inform the duty officer about the details of the crime.',
      'The police will write down the information (or you can provide a written complaint).',
      'Ensure all details like time, place, and persons involved are accurate.',
      'The officer will read the report back to you for verification.',
      'Sign the FIR once you are satisfied with the details.',
      'Request a free copy of the FIR (as per your legal right).'
    ],
    requiredDocuments: [
      'Identity Proof (Aadhaar, Voter ID, etc.)',
      'Written complaint (if any)',
      'Evidence like photos, videos, or hospital records (if applicable)'
    ],
    expertTips: [
      'File the FIR as soon as possible; delays can weaken the case.',
      'Be as detailed and honest as possible in your statement.',
      'If the local station refuses to file, you can contact the Superintendent of Police (SP).'
    ]
  },
  {
    id: 3,
    title: 'Consumer Rights & Complaints',
    category: 'consumer',
    description: 'Know your consumer rights and how to file complaints',
    fullDescription: 'The Consumer Protection Act protects consumers from unfair trade practices, defective goods, and deficient services. This guide explains how you can seek justice if your rights are violated.',
    icon: '🛒',
    color: 'bg-blue-500',
    downloadUrl: '/guides/consumer-rights.pdf',
    readTime: '12 min',
    steps: [
      'Keep the original invoice and warranty card of the product/service.',
      'Send a formal notice to the seller/service provider informing them of the defect.',
      'Allow a reasonable time for them to respond or fix the issue.',
      'If unresolved, identify the appropriate consumer forum (District, State, or National) based on the claim value.',
      'File the complaint along with supporting documents.',
      'Pay the required nominal fee for filing.',
      'Attend the hearings or hire a representative to state your case.'
    ],
    requiredDocuments: [
      'Purchase Bill/Invoice',
      'Warranty/Guarantee Card',
      'Copy of the legal notice sent to the seller',
      'Evidence of the defect or service failure'
    ],
    expertTips: [
      'Always demand a GST bill for every purchase.',
      'Check the expiry date and MRP before buying any product.',
      'Use the National Consumer Helpline (1800-11-4000) for preliminary advice.'
    ]
  },
  {
    id: 4,
    title: 'Ration Card Application Guide',
    category: 'government',
    description: 'Apply for ration card - eligibility and process',
    fullDescription: 'A Ration Card is an essential document for citizens to obtain subsidized food grains and other essential commodities from the government. It also serves as a valid identity and residence proof.',
    icon: '🍚',
    color: 'bg-orange-500',
    downloadUrl: '/guides/ration-card.pdf',
    readTime: '7 min',
    steps: [
      'Determine your eligibility (APL, BPL, or AAY) based on your income.',
      'Collect the application form from the local Food & Civil Supplies office or website.',
      'Fill in the application with accurate family details.',
      'Attach passport-size photos of all family members.',
      'Submit the application along with the required documents.',
      'Receive an acknowledgment receipt with a tracking number.',
      'The authorities will conduct a field verification at your residence.',
      'Collect your ration card from the office once approved.'
    ],
    requiredDocuments: [
      'Address Proof (Aadhar, Electricity Bill, Home Agreement)',
      'Income Certificate of the head of the family',
      'Photographs of family members',
      'Identity Proof of all members',
      'Previous Ration Card (if applying for transfer or renewal)'
    ],
    expertTips: [
      'Ensure your Aadhar is linked with your phone number for easier processing.',
      'Report any discrepancies in the card details immediately to the department.',
      'Ration cards are now often processed online in many states for faster service.'
    ]
  }
];

export const VIDEO_TUTORIALS = [
  {
    id: 1,
    title: 'Understanding Court Notices',
    thumbnail: '⚖️',
    duration: '15:30',
    views: '12K',
    category: 'criminal',
    videoUrl: '#'
  },
  {
    id: 2,
    title: 'Property Rights Explained',
    thumbnail: '🏠',
    duration: '20:15',
    views: '8.5K',
    category: 'land',
    videoUrl: '#'
  },
  {
    id: 3,
    title: 'Labor Law Basics',
    thumbnail: '👷',
    duration: '18:45',
    views: '6.2K',
    category: 'labor',
    videoUrl: '#'
  }
];

export const LEGAL_AID_SERVICES = [
  {
    id: 1,
    name: 'National Legal Services Authority',
    description: 'Free legal aid for eligible citizens',
    phone: '1800-11-3988',
    website: 'https://nalsa.gov.in',
    icon: Scale
  },
  {
    id: 2,
    name: 'State Legal Aid',
    description: 'State-level legal assistance programs',
    phone: '1800-300-3858',
    website: '#',
    icon: Users
  },
  {
    id: 3,
    name: 'Women Helpline',
    description: '24x7 support for women in distress',
    phone: '1091',
    website: '#',
    icon: Phone
  }
];

export const FAQ_ITEMS = [
  {
    question: 'How do I apply for legal aid?',
    answer: 'You can apply for legal aid through the National Legal Services Authority (NALSA) or State Legal Services Authority. Visit their website or nearest office with your income certificate and case details.'
  },
  {
    question: 'What documents are needed for land registration?',
    answer: 'You need the sale deed, property tax receipts, encumbrance certificate, identity proof, address proof, and PAN card of both parties.'
  },
  {
    question: 'How long does court case typically take?',
    answer: 'The duration varies based on case complexity, court load, and type of case. Civil cases may take 2-5 years, while criminal cases vary widely.'
  }
];
