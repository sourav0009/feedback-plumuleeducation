import { useState } from 'react';
import { ArrowLeft, Star, Trophy } from 'lucide-react';
import { grade1_4_questions } from '../data/grade1_4_questions';

interface QuestionPageProps {
  gradeSection: {
    id: string;
    title: string;
    color: string;
    icon_emoji: string;
  };
  onBack: () => void;
}

export default function QuestionPage({ gradeSection, onBack }: QuestionPageProps) {
  const questions = grade1_4_questions;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  function handleOptionClick(optionId: string) {
    if (showResult) return;

    setSelectedOption(optionId);
    setShowResult(true);

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = currentQuestion.options.find(
      o => o.id === optionId
    )?.isCorrect;

    if (isCorrect) {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(i => i + 1);
        setSelectedOption(null);
        setShowResult(false);
      } else {
        setCompleted(true);
      }
    }, 2000);
  }

  if (completed) {
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-xl w-full">
          <Trophy className="w-28 h-28 mx-auto text-yellow-500 mb-6 animate-bounce" />
          <h2 className="text-4xl font-bold mb-2">Congratulations!</h2>
          <p className="text-lg text-gray-600 mb-6">You completed the quiz</p>

          <div className="text-6xl font-black mb-4" style={{ color: gradeSection.color }}>
            {score}/{questions.length}
          </div>

          <div className="flex justify-center gap-2 mb-6">
            {questions.map((_, i) => (
              <Star
                key={i}
                className={`w-8 h-8 ${i < score ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
              />
            ))}
          </div>

          <button
            onClick={onBack}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold rounded-full hover:scale-105 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft />
            Back
          </button>
          <span className="font-bold">
            Question {currentQuestionIndex + 1} / {questions.length}
          </span>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-10">
          <div className="text-center mb-10">
            <div className="text-5xl mb-3">{gradeSection.icon_emoji}</div>
            <h2 className="text-3xl font-bold">
              {currentQuestion.questionText}
            </h2>
            <p className="text-gray-500 mt-2">Tap an image to answer</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentQuestion.options.map(option => {
              const isSelected = selectedOption === option.id;
              const showCorrect = showResult && option.isCorrect;
              const showWrong = showResult && isSelected && !option.isCorrect;

              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionClick(option.id)}
                  disabled={showResult}
                  className={`rounded-2xl border-4 p-4 transition ${showCorrect
                    ? 'border-green-500'
                    : showWrong
                      ? 'border-red-500'
                      : 'border-gray-200 hover:scale-105'
                    }`}
                >
                  <img
                    src={option.image}
                    alt={option.id}
                    className="w-[150px] h-[200px] object-cover rounded-xl"
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center bg-white p-6 rounded-2xl shadow">
          <div className="flex items-center gap-3">
            <Star className="text-yellow-400 fill-yellow-400" />
            <span className="font-bold text-xl">Score: {score}</span>
          </div>
          <span className="font-semibold text-gray-600">
            {questions.length - currentQuestionIndex - 1} more to go
          </span>
        </div>
      </div>
    </div>
  );
}
