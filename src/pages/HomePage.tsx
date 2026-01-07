import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type Category = {
    id: string;
    name: string;
};

export default function HomePage() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCategories = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/category`);
            const data = await res.json();
            setCategories(data.categories.reverse() || []);
        } catch (err) {
            console.error("Failed to fetch categories", err);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="loader mb-4"></div>
                    <p className="text-gray-600">Loading categories...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
            <div className="container mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <Sparkles className="w-12 h-12 text-yellow-500 animate-bounce" />
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                            Learn by Playing
                        </h1>
                        <Sparkles className="w-12 h-12 text-yellow-500 animate-bounce" />
                    </div>

                    <p className="text-xl text-gray-600">
                        Choose your grade and start the adventure!
                    </p>
                </div>

                {/* Grade Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {categories.map((section, index) => (
                        <button
                            key={section.id}
                            onClick={() => navigate(`/quiz/${section.id}`)}
                            className="group bg-white rounded-3xl shadow-lg hover:scale-105 transition p-8 border-4"
                            style={{
                                animationDelay: `${index * 100}ms`,
                            }}
                        >

                            <h3 className="text-2xl font-bold mb-2">
                                {section.name}
                            </h3>

                            <div className="mt-4 text-gray-500 font-medium">
                                Tap to Start →
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
