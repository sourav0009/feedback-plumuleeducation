export interface Option {
  id: string;
  image: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  questionText: string;
  options: Option[];
}

export const grade1_4_questions: Question[] = [
  {
    id: 1,
    questionText: "What would you love to build?",
    options: [
      { id: "A", image: "/src/assets/grade1-4/q1/option1.png", isCorrect: true },
      { id: "B", image: "/src/assets/grade1-4/q1/option2.png", isCorrect: false },
      { id: "C", image: "/src/assets/grade1-4/q1/option3.png", isCorrect: false },
      { id: "D", image: "/src/assets/grade1-4/q1/option4.png", isCorrect: false },
    //   { id: "E", image: "/src/assets/grade1-4/q1/option5.png", isCorrect: false },
    ],
  },
  {
    id: 2,
    questionText: "When would you love to play?",
    options: [
      { id: "A", image: "/src/assets/grade1-4/q1/option1.png", isCorrect: true },
      { id: "B", image: "/src/assets/grade1-4/q1/option2.png", isCorrect: false },
      { id: "C", image: "/src/assets/grade1-4/q1/option3.png", isCorrect: false },
      { id: "D", image: "/src/assets/grade1-4/q1/option4.png", isCorrect: false },
    //   { id: "E", image: "/src/assets/grade1-4/q1/option5.png", isCorrect: false },
    ],
  },
  {
    id: 3,
    questionText: "Which object completes the electric circuit?",
    options: [
      { id: "A", image: "/src/assets/grade1-4/q1/option1.png", isCorrect: true },
      { id: "B", image: "/src/assets/grade1-4/q1/option2.png", isCorrect: false },
      { id: "C", image: "/src/assets/grade1-4/q1/option3.png", isCorrect: false },
      { id: "D", image: "/src/assets/grade1-4/q1/option4.png", isCorrect: false },
    //   { id: "E", image: "/src/assets/grade1-4/q1/option5.png", isCorrect: false },
    ],
  },
  {
    id: 4,
    questionText: "What makes you most happy?",
    options: [
      { id: "A", image: "/src/assets/grade1-4/q1/option1.png", isCorrect: true },
      { id: "B", image: "/src/assets/grade1-4/q1/option2.png", isCorrect: false },
      { id: "C", image: "/src/assets/grade1-4/q1/option3.png", isCorrect: false },
      { id: "D", image: "/src/assets/grade1-4/q1/option4.png", isCorrect: false },
    //   { id: "E", image: "/src/assets/grade1-4/q1/option5.png", isCorrect: false },
    ],
  },
  {
    id: 5,
    questionText: "Which object completes the electric circuit?",
    options: [
      { id: "A", image: "/src/assets/grade1-4/q1/option1.png", isCorrect: true },
      { id: "B", image: "/src/assets/grade1-4/q1/option2.png", isCorrect: false },
      { id: "C", image: "/src/assets/grade1-4/q1/option3.png", isCorrect: false },
      { id: "D", image: "/src/assets/grade1-4/q1/option4.png", isCorrect: false },
    //   { id: "E", image: "/src/assets/grade1-4/q1/option5.png", isCorrect: false },
    ],
  },
];
