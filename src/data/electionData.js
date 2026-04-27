import { UserPlus, Megaphone, CalendarDays, Inbox, FileCheck, CheckCircle } from 'lucide-react';

export const electionSteps = [
  {
    id: 'registration',
    title: 'Voter Registration',
    dateRange: 'Usually closes 15–30 days before Election Day',
    icon: UserPlus,
    shortDescription: 'Ensure you are eligible and registered to vote in your district.',
    fullDescription: 'Voter registration is the first and most crucial step in participating in the democratic process. You must confirm your eligibility (usually age and citizenship requirements) and submit your registration details to your local election office.',
    requirements: [
      'Proof of citizenship (e.g., Passport, Birth Certificate / Aadhaar)',
      'Proof of residence (e.g., Utility bill, Lease / Ration card)',
      'Valid Government ID'
    ],
    actions: [
      { label: 'Check Status – India (ECI)', primary: true, url: 'https://electoralsearch.eci.gov.in/' },
      { label: 'Register Online – India (Voter Portal)', primary: false, url: 'https://voters.eci.gov.in/' },
      { label: 'Check Status – USA (Vote.gov)', primary: false, url: 'https://www.vote.gov/register/verify/' }
    ]
  },
  {
    id: 'campaign',
    title: 'Campaign Period',
    dateRange: 'Months leading up to Election Day',
    icon: Megaphone,
    shortDescription: 'Candidates present their platforms and debate key issues.',
    fullDescription: 'During this phase, candidates and political parties actively campaign to win voter support. This involves rallies, public debates, advertising, and town halls. It is the best time to research candidates, understand their policy platforms, and decide who aligns with your values.',
    requirements: [
      'An open mind',
      'Time to research candidate platforms'
    ],
    actions: [
      { label: 'Candidate Info – ECI', primary: true, url: 'https://affidavit.eci.gov.in/' },
      { label: 'Know Your Candidate (MyNeta)', primary: false, url: 'https://www.myneta.info/' },
      { label: 'Debates & Platforms – C-SPAN', primary: false, url: 'https://www.c-span.org/debates/' }
    ]
  },
  {
    id: 'early-voting',
    title: 'Postal / Early Voting',
    dateRange: 'Typically 2–4 weeks before Election Day',
    icon: Inbox,
    shortDescription: 'Cast your ballot early in-person or via post if eligible.',
    fullDescription: 'In India, postal ballots are available for certain categories (senior citizens 85+, disabled voters, essential service workers). In many other countries you can vote early in person. This reduces queues on Election Day and increases accessibility.',
    requirements: [
      'Approved postal ballot application (Form 12D in India)',
      'Voter ID card (EPIC) or equivalent ID'
    ],
    actions: [
      { label: 'Apply for Postal Ballot – India', primary: true, url: 'https://voters.eci.gov.in/postal-ballot' },
      { label: 'Early Voting Info – USA', primary: false, url: 'https://www.vote.gov/early-voting/' }
    ]
  },
  {
    id: 'election-day',
    title: 'Election Day',
    dateRange: 'The official voting day',
    icon: CalendarDays,
    shortDescription: 'The final day to cast your vote at your assigned polling place.',
    fullDescription: `This is the main event! Visit your specifically assigned local polling station. In India, you must carry your Voter ID card (EPIC) or any of the 12 approved alternative documents. Polls have specific hours; if you are in the queue before closing time you have the right to vote.`,
    requirements: [
      'Voter ID (EPIC) or Aadhaar / Passport / Driving Licence',
      'Know your designated polling booth'
    ],
    actions: [
      { label: 'Find Your Polling Booth – ECI', primary: true, url: 'https://electoralsearch.eci.gov.in/' },
      { label: 'Voter Helpline – India (1950)', primary: false, url: 'tel:1950' },
      { label: 'Find Polling Place – USA', primary: false, url: 'https://www.vote.gov/find-polling-place/' }
    ]
  },
  {
    id: 'counting',
    title: 'Vote Counting & Audits',
    dateRange: 'Election Night and following days',
    icon: FileCheck,
    shortDescription: 'Election officials count ballots and verify results.',
    fullDescription: 'Once polls close, the rigorous process of counting begins. In India the Election Commission of India (ECI) oversees the process with independent observers. Results are displayed live on the ECI results portal and major news channels. Postal ballots are counted after EVMs.',
    requirements: [],
    actions: [
      { label: 'Live Results – ECI', primary: true, url: 'https://results.eci.gov.in/' },
      { label: 'About EVMs & VVPATs – ECI', primary: false, url: 'https://www.eci.gov.in/evm' }
    ]
  },
  {
    id: 'certification',
    title: 'Certification & Transition',
    dateRange: 'Weeks following Election Day',
    icon: CheckCircle,
    shortDescription: 'Results are officially certified and winners prepare to take office.',
    fullDescription: 'After all valid votes are counted and any mandatory re-polls or audits are completed, the election results are formally certified by the Returning Officer. In India, winners receive the election certificate and the incoming government begins its swearing-in process.',
    requirements: [],
    actions: [
      { label: 'Election Archive – ECI', primary: true, url: 'https://www.eci.gov.in/statistical-report' },
      { label: 'About Certification – USA', primary: false, url: 'https://www.usa.gov/election-results' }
    ]
  }
];
