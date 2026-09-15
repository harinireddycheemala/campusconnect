// CampusConnect — sample data for the prototype.
// In a real build this comes from the API; here it's static so the demo
// runs anywhere with no backend.

const DATA = {

  currentUser: {
    name: "Yasaswini",
    dept: "Computer Science",
    year: "3rd Year",
    bio: "AI/ML enthusiast interested in building products for real-world problems.",
    skills: ["Python", "Machine Learning", "UI/UX", "Java", "Figma"],
    interests: ["AI/ML", "Entrepreneurship", "Design"],
    projects: ["CampusConnect", "Smart Campus Navigation"],
    communities: ["AI Club", "IEEE Student Branch"],
    achievements: [
      { title: "Hackathon Winner", venue: "Smart India Hackathon 2025", icon: "trophy" },
      { title: "AWS Cloud Practitioner", venue: "Certification", icon: "cert" }
    ],
    points: 340,
    badges: ["Early Adopter", "Project Collaborator"]
  },

  feed: [
    {
      type: "event",
      community: "AI Club",
      time: "2h ago",
      title: "AI/ML Workshop: Building Your First Model",
      body: "Hands-on session covering data prep, training and evaluation. Laptops required.",
      meta: "Saturday · 2:00 PM · Engineering Block",
      stat: "126 students interested"
    },
    {
      type: "opportunity",
      community: "Google",
      time: "5h ago",
      title: "Google AI Hackathon",
      body: "48-hour build sprint on applied ML. Open to teams of 2–4 across all years.",
      meta: "Prize ₹5,00,000 · Online · Deadline Oct 20",
      stat: "312 registered"
    },
    {
      type: "project",
      community: "Project request",
      time: "8h ago",
      title: "AI-Based Waste Management",
      body: "Looking for a UI/UX designer and a Flutter developer to round out the team.",
      meta: "Team 3/5 · Deadline Nov 2",
      stat: "4 requests to join"
    },
    {
      type: "achievement",
      community: "Rohit Menon",
      time: "1d ago",
      title: "Published at IEEE Student Conference",
      body: "Paper on low-power IoT sensor networks accepted for presentation.",
      meta: "Electronics & Comm. · Final Year",
      stat: "48 congratulations"
    },
    {
      type: "poll",
      community: "Student Council",
      time: "1d ago",
      title: "Preferred slot for the Cultural Fest 2026?",
      body: "Help us lock the schedule before venue bookings close this week.",
      meta: "Early Feb · Late Feb · March",
      stat: "540 votes so far"
    },
    {
      type: "announcement",
      community: "Administration",
      time: "2d ago",
      title: "Semester registration begins September 20",
      body: "Course registration portal opens at 9:00 AM. Advisor sign-off required for electives.",
      meta: "Official announcement",
      stat: ""
    }
  ],

  people: [
    { name: "Arjun Rao", dept: "Computer Science", year: "3rd Year", skills: ["Python", "AI/ML", "Backend"], interests: ["Hackathons", "Research"], match: "Complementary skills — you're both building AI projects" },
    { name: "Meera Iyer", dept: "Design", year: "2nd Year", skills: ["UI/UX", "Figma", "Frontend"], interests: ["Design", "Product"], match: "Great project match — you need a designer" },
    { name: "Kabir Shah", dept: "Electronics", year: "4th Year", skills: ["IoT", "Embedded C", "Robotics"], interests: ["Robotics", "Research"], match: "Shared interest in AI/ML + Hackathons" },
    { name: "Priya Nair", dept: "Computer Science", year: "3rd Year", skills: ["Flutter", "Dart", "Mobile"], interests: ["App Development"], match: "Flutter dev — matches your open project role" },
    { name: "Devansh Gupta", dept: "Business", year: "2nd Year", skills: ["Marketing", "Public Speaking"], interests: ["Entrepreneurship"], match: "Active in Entrepreneurship Cell" },
    { name: "Sana Fathima", dept: "Computer Science", year: "1st Year", skills: ["Python", "Data Science"], interests: ["AI/ML", "Data Science"], match: "New to campus — shares your interests" }
  ],

  events: [
    { title: "AI/ML Workshop", org: "AI Club", category: "Technical", date: "Sep 20", time: "2:00 PM", venue: "Engineering Block", mode: "Offline", interested: 126 },
    { title: "Design Jam: Campus Apps", org: "Design Guild", category: "Workshop", date: "Sep 22", time: "11:00 AM", venue: "Design Studio", mode: "Offline", interested: 64 },
    { title: "Inter-College Coding Sprint", org: "Coding Club", category: "Competition", date: "Sep 27", time: "9:00 AM", venue: "Online", mode: "Online", interested: 310 },
    { title: "Founders' Circle: Campus Startups", org: "E-Cell", category: "Networking", date: "Oct 3", time: "5:00 PM", venue: "Auditorium", mode: "Offline", interested: 88 },
    { title: "Classical Night", org: "Cultural Committee", category: "Cultural", date: "Oct 10", time: "6:30 PM", venue: "Open Air Theatre", mode: "Offline", interested: 402 },
    { title: "Research Symposium", org: "Dept. of CS", category: "Academic", date: "Oct 15", time: "10:00 AM", venue: "Seminar Hall", mode: "Offline", interested: 51 }
  ],

  opportunities: [
    { title: "Google AI Hackathon", org: "Google", type: "Hackathon", detail: "Prize ₹5,00,000", deadline: "Oct 20", mode: "Online", extra: "Team size 2–4" },
    { title: "Summer Analyst Internship", org: "Deloitte", type: "Internship", detail: "Stipend ₹35,000/mo", deadline: "Oct 5", mode: "Hybrid", extra: "Finance & Analytics" },
    { title: "Merit Research Fellowship", org: "Dept. of Science & Tech", type: "Fellowship", detail: "Fully funded", deadline: "Nov 1", mode: "On-campus", extra: "Final year eligible" },
    { title: "AWS Cloud Practitioner", org: "AWS Academy", type: "Certification", detail: "Free for students", deadline: "Rolling", mode: "Online", extra: "Beginner friendly" },
    { title: "National Design Challenge", org: "IxDA Student Chapter", type: "Competition", detail: "Prize ₹1,00,000", deadline: "Oct 12", mode: "Online", extra: "Individual or pairs" },
    { title: "Teach-a-Skill Volunteering", org: "Campus Outreach", type: "Volunteering", detail: "Certificate provided", deadline: "Open", mode: "Offline", extra: "Weekends" }
  ],

  projects: [
    { name: "AI-Based Waste Management", owner: "Rohit Menon", problem: "Smart bins that detect fill-level and optimize collection routes.", stack: ["Python", "IoT", "Flutter"], looking: ["UI/UX Designer", "Flutter Developer"], team: "3/5", deadline: "Nov 2" },
    { name: "Smart Campus Navigation", owner: "Yasaswini", problem: "Indoor wayfinding for new students across large campus buildings.", stack: ["React Native", "ML", "Maps API"], looking: ["Backend Developer"], team: "2/4", deadline: "Dec 1" },
    { name: "Lost & Found Portal", owner: "Priya Nair", problem: "Central place to report and match lost items across hostels and blocks.", stack: ["Next.js", "PostgreSQL"], looking: ["Frontend Developer", "Content Writer"], team: "1/4", deadline: "Oct 30" },
    { name: "Peer Mentorship Matcher", owner: "Devansh Gupta", problem: "Pair first-years with senior mentors based on branch and interests.", stack: ["FastAPI", "Recommendation Engine"], looking: ["Data Scientist"], team: "2/5", deadline: "Nov 15" }
  ],

  communities: [
    { name: "AI Club", members: 412, category: "Technology", desc: "Workshops, projects and paper reading sessions on applied ML.", role: "Member" },
    { name: "IEEE Student Branch", members: 268, category: "Technology", desc: "Technical talks, publications support and IEEE competitions.", role: "Member" },
    { name: "Design Guild", members: 190, category: "Creative", desc: "UI/UX, product design and portfolio-building sessions.", role: null },
    { name: "E-Cell", members: 331, category: "Professional", desc: "Startup mentorship, pitch nights and founder meetups.", role: null },
    { name: "Coding Club", members: 520, category: "Technology", desc: "Competitive programming, hackathon teams and code reviews.", role: null },
    { name: "Cultural Committee", members: 275, category: "Creative", desc: "Music, dance and campus-wide cultural events.", role: null }
  ]
};
