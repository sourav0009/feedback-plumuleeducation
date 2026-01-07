export interface Option {
  id: string;
  image: string;
  isCorrect: boolean;
  text: string;
}

export interface Question {
  id: number;
  questionText: string;
  options: Option[];
}

export interface GradeSection {
  id: string;
  title: string;
  color: string;
  icon_emoji: string;
  questions: Question[];
}

export const gradeSections: GradeSection[] = [
  {
    id: "grade-1-4",
    title: "Grade 1-4",
    color: "#3B82F6",
    icon_emoji: "🧸",
    questions: [
      {
        id: 1,
        questionText: "What would you love to build?",
        options: [
          { id: "A", image: "https://via.placeholder.com/150?text=House", isCorrect: true, text: "A House" },
          { id: "B", image: "https://via.placeholder.com/150?text=Car", isCorrect: false, text: "A Car" },
          { id: "C", image: "https://via.placeholder.com/150?text=Robot", isCorrect: false, text: "A Robot" },
          { id: "D", image: "https://via.placeholder.com/150?text=Bridge", isCorrect: false, text: "A Bridge" },
        ],
      },
      {
        id: 2,
        questionText: "When do you like to play the most?",
        options: [
          { id: "A", image: "https://via.placeholder.com/150?text=Morning", isCorrect: true, text: "Morning" },
          { id: "B", image: "https://via.placeholder.com/150?text=Afternoon", isCorrect: false, text: "Afternoon" },
          { id: "C", image: "https://via.placeholder.com/150?text=Evening", isCorrect: false, text: "Evening" },
          { id: "D", image: "https://via.placeholder.com/150?text=Night", isCorrect: false, text: "Night" },
        ],
      },
      {
        id: 3,
        questionText: "Which animal do you like the most?",
        options: [
          { id: "A", image: "https://via.placeholder.com/150?text=Dog", isCorrect: true, text: "Dog" },
          { id: "B", image: "https://via.placeholder.com/150?text=Cat", isCorrect: false, text: "Cat" },
          { id: "C", image: "https://via.placeholder.com/150?text=Elephant", isCorrect: false, text: "Elephant" },
          { id: "D", image: "https://via.placeholder.com/150?text=Bird", isCorrect: false, text: "Bird" },
        ],
      },
      {
        id: 4,
        questionText: "Which activity sounds the most fun?",
        options: [
          { id: "A", image: "https://via.placeholder.com/150?text=Drawing", isCorrect: true, text: "Drawing" },
          { id: "B", image: "https://via.placeholder.com/150?text=Reading", isCorrect: false, text: "Reading" },
          { id: "C", image: "https://via.placeholder.com/150?text=Running", isCorrect: false, text: "Running" },
          { id: "D", image: "https://via.placeholder.com/150?text=Singing", isCorrect: false, text: "Singing" },
        ],
      },
      {
        id: 5,
        questionText: "What would you like to learn today?",
        options: [
          { id: "A", image: "https://via.placeholder.com/150?text=Numbers", isCorrect: true, text: "Numbers" },
          { id: "B", image: "https://via.placeholder.com/150?text=Letters", isCorrect: false, text: "Letters" },
          { id: "C", image: "https://via.placeholder.com/150?text=Colors", isCorrect: false, text: "Colors" },
          { id: "D", image: "https://via.placeholder.com/150?text=Shapes", isCorrect: false, text: "Shapes" },
        ],
      },
    ],
  },
];

