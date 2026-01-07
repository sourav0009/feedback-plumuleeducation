import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { supabase, GradeSection } from '../lib/supabase';

interface HomePageProps {
  onSelectGrade: (gradeSection: GradeSection) => void;
}

export default function HomePage({ onSelectGrade }: HomePageProps) {
  const [gradeSections, setGradeSections] = useState<GradeSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGradeSections();
  }, []);

  async function loadGradeSections() {
    const { data, error } = await supabase
      .from('grade_sections')
      .select('*')
      .order('sort_order');

    if (error) {
      console.error('Error loading grade sections:', error);
    } else {
      setGradeSections(data || []);
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-2xl text-gray-600 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-4">
            <Sparkles className="w-12 h-12 text-yellow-500 animate-bounce" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Learn by Playing
            </h1>
            <Sparkles className="w-12 h-12 text-yellow-500 animate-bounce" />
          </div>
          <p className="text-xl md:text-2xl text-gray-600 font-medium">
            Choose your grade and start the adventure!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {gradeSections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => onSelectGrade(section)}
              className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 p-8 border-4 border-transparent hover:border-current"
              style={{
                borderColor: section.color,
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity"
                   style={{
                     backgroundImage: `linear-gradient(135deg, ${section.color}, ${section.color}88)`
                   }}
              />

              <div className="relative">
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform">
                  {section.icon_emoji}
                </div>

                <h3 className="text-2xl font-bold mb-2 text-gray-800 group-hover:text-gray-900">
                  {section.name}
                </h3>

                <div className="inline-block px-4 py-2 rounded-full text-white font-semibold text-sm"
                     style={{ backgroundColor: section.color }}>
                  5 Fun Questions
                </div>

                <div className="mt-4 text-gray-500 group-hover:text-gray-700 font-medium">
                  Tap to Start →
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center mt-12 text-gray-500">
          <p className="text-lg">Made with love for curious minds</p>
        </div>
      </div>
    </div>
  );
}
