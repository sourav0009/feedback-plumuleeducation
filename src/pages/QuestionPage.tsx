import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";

type Option = {
    id: string;
    option_text: string;
    image_url?: string;
    clicks: number;
    is_correct: boolean;
};

type Question = {
    id: string;
    question: string;
    options: Option[];
};

export default function QuestionPage() {
    const { gradeId } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

    async function handleSubmitFeedback() {
        if (!feedback.trim()) return;

        try {
            await fetch(`${import.meta.env.VITE_API_BASE_URL}/feedback`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    categoryId: gradeId,
                    feedback,
                }),
            });

            setFeedbackSubmitted(true);
        } catch (err) {
            console.error("Failed to submit feedback", err);
        }
    }



    /* ---------- Fetch ---------- */
    useEffect(() => {
        async function fetchQuestions() {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}/categories/${gradeId}/questions`
                );

                const data = await res.json();
                setQuestions(data.questions ?? []);
            } catch (err) {
                console.error("Failed to fetch questions", err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchQuestions();
    }, [gradeId]);

    /* ---------- Handlers ---------- */
    async function handleOptionClick(optionId: string) {
        if (showResult) return;
        setShowResult(true);
        try {
            await fetch(`${import.meta.env.VITE_API_BASE_URL}/options/vote`, {
                method: "POST",
                body: JSON.stringify({ optionId }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } catch (err) {
            console.error("Failed to record option click", err);
        }

    }

    function handleNextQuestion() {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(i => i + 1);
            setShowResult(false);
            setFeedback("");
            setFeedbackSubmitted(false);
        } else {
            setCompleted(true);
        }
    }


    /* ---------- Loading ---------- */
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">Loading questions...</p>
            </div>
        );
    }

    /* ---------- Result ---------- */
    if (completed) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50">
                <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
                    <Trophy className="w-96 h-24 mx-auto text-yellow-500 mb-4" />
                    <h2 className="text-3xl font-bold mb-4">Great Job!</h2>
                    <button
                        onClick={() => navigate("/")}
                        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full"
                    >
                        Back to Home
                    </button>

                    {/* Feedback */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Share your feedback (optional)
                        </label>

                        <textarea
                            value={feedback}
                            onChange={e => setFeedback(e.target.value)}
                            placeholder="Was this question clear? Any suggestions?"
                            rows={3}
                            disabled={feedbackSubmitted}
                            className="w-full rounded-xl border-2 border-gray-200 p-4 focus:outline-none focus:border-blue-500 resize-none"
                        />

                        <div className="flex justify-end mt-3">
                            <button
                                onClick={handleSubmitFeedback}
                                disabled={!feedback.trim() || feedbackSubmitted}
                                className={`px-5 py-2 rounded-full text-sm font-semibold
            ${feedbackSubmitted
                                        ? "bg-green-500 text-white"
                                        : "bg-gray-200 hover:bg-gray-300"
                                    }`}
                            >
                                {feedbackSubmitted ? "Feedback Submitted ✓" : "Submit Feedback"}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    if (!currentQuestion) return null;

    /* ---------- Question Screen ---------- */
    return (
        <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-white to-green-50">
            <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl p-10">
                    <h2 className="text-3xl font-bold text-center mb-10">
                        {currentQuestion.question}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {currentQuestion.options.map(option => {

                            return (
                                <button
                                    key={option.id}
                                    onClick={() => handleOptionClick(option.id)}
                                    disabled={showResult}
                                    className={`border-4 rounded-2xl p-5 text-xl font-medium transition`}
                                >
                                    {option.image_url && (
                                        <img
                                            src={option.image_url}
                                            alt="Option"
                                            className="mb-4 rounded-xl max-h-48 object-contain"
                                        />
                                    )}
                                    {option.option_text}
                                </button>
                            );
                        })}
                    </div>

                    {showResult && (
                        <div className="mt-8 space-y-6">

                            {/* Next / Finish */}
                            <div className="flex justify-end">
                                <button
                                    onClick={handleNextQuestion}
                                    className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full"
                                >
                                    {currentQuestionIndex < questions.length - 1
                                        ? "Next Question →"
                                        : "Finish Quiz 🎉"}
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
