const topics = [
  {
    subject: "Mathematics",
    description: "Build strong algebra, calculus, and problem-solving skills.",
    tip: "Practice with timed exercises and review the core formulas daily.",
  },
  {
    subject: "Science",
    description: "Master concepts with experiments, diagrams, and study summaries.",
    tip: "Write short explanations for each concept in your own words.",
  },
  {
    subject: "Language",
    description: "Improve reading, writing, and vocabulary with daily practice.",
    tip: "Read a short article and summarize it in 3 sentences.",
  },
  {
    subject: "Programming",
    description: "Learn coding logic, algorithms, and project-based problem solving.",
    tip: "Build a small project for every new concept you learn.",
  },
];

const generateChatResponse = (prompt) => {
  const normalized = prompt.toLowerCase();

  if (normalized.includes("exam") || normalized.includes("test")) {
    return "Focus on key topics, create a short revision sheet, and practice sample questions under timed conditions.";
  }

  if (normalized.includes("motivation") || normalized.includes("study") || normalized.includes("routine")) {
    return "Set a consistent schedule, break work into 25-minute sessions, and reward yourself after each milestone.";
  }

  if (normalized.includes("math") || normalized.includes("calculus") || normalized.includes("algebra")) {
    return "Review the fundamentals, solve step-by-step examples, and use visuals for difficult concepts.";
  }

  if (normalized.includes("science") || normalized.includes("physics") || normalized.includes("chemistry")) {
    return "Use diagrams, connect ideas with real-world examples, and test your understanding by teaching concepts aloud.";
  }

  if (normalized.includes("code") || normalized.includes("programming") || normalized.includes("project")) {
    return "Break the problem into small tasks, write clean functions, and test each piece before combining them.";
  }

  return "A good study habit is to define a clear goal, review your notes, and then test yourself with quick practice questions.";
};

export const getTopics = (req, res) => {
  res.json({
    welcome: "Smart Student Assistant topics and tips",
    topics,
  });
};

export const chatAssistant = (req, res) => {
  const { message } = req.body;
  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return res.status(400).json({ error: "Please provide a valid chat message." });
  }

  const answer = generateChatResponse(message);
  res.json({
    prompt: message,
    answer,
    timestamp: new Date().toISOString(),
  });
};

export const createStudyPlan = (req, res) => {
  const { subjects, totalHours, days } = req.body;

  if (!subjects || !Array.isArray(subjects) || subjects.length === 0) {
    return res.status(400).json({ error: "Please provide a list of subjects." });
  }

  const parsedHours = Number(totalHours);
  const parsedDays = Number(days);

  if (!parsedHours || parsedHours <= 0 || !parsedDays || parsedDays <= 0) {
    return res.status(400).json({ error: "Please provide a valid total hours and number of days." });
  }

  const hoursPerDay = Math.max(1, Math.ceil(parsedHours / parsedDays));
  const plan = [];
  let subjectIndex = 0;

  for (let day = 1; day <= parsedDays; day += 1) {
    const dailySubject = subjects[subjectIndex % subjects.length].trim();
    plan.push({
      day: `Day ${day}`,
      subject: dailySubject || subjects[subjectIndex % subjects.length],
      focus: `Study ${hoursPerDay} hour${hoursPerDay === 1 ? "" : "s"} of ${dailySubject}.`,
      tip: topics.find((topic) => topic.subject.toLowerCase() === dailySubject.toLowerCase())?.tip ||
        "Maintain focus, take short breaks, and review your progress each day.",
    });
    subjectIndex += 1;
  }

  res.json({
    summary: `Study plan for ${parsedHours} hour${parsedHours === 1 ? "" : "s"} over ${parsedDays} day${parsedDays === 1 ? "" : "s"}.`,
    plan,
  });
};
