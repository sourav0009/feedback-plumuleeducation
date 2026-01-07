import { useState } from 'react';
import HomePage from './components/HomePage';
import QuestionPage from './components/QuestionPage';
import { GradeSection } from './lib/supabase';

function App() {
  const [selectedGrade, setSelectedGrade] = useState<GradeSection | null>(null);

  return (
    <>
      {selectedGrade ? (
        <QuestionPage
          gradeSection={selectedGrade}
          onBack={() => setSelectedGrade(null)}
        />
      ) : (
        <HomePage onSelectGrade={setSelectedGrade} />
      )}
    </>
  );
}

export default App;
