import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Quiz from "@/components/Quiz";

export default function QuizPage() {
  const router = useRouter();
  const { id } = router.query;
  const [moduleData, setModuleData] = useState(null);

  useEffect(() => {
    if (!id) return;
    const moduleId = id.split("-")[0]; // Extract module ID
    fetch(`/courses/${moduleId}.json`)
      .then((res) => res.json())
      .then((data) => setModuleData(data));
  }, [id]);

  if (!moduleData) return <p className="text-white">Loading Quiz...</p>;

  return (
    <div className="container mx-auto p-6 bg-gray-900 text-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6">{moduleData.title} - Quiz</h2>
      {moduleData.quiz ? (
        <Quiz moduleId={id.split("-")[0]} questions={moduleData.quiz} />
      ) : (
        <p className="text-yellow-400">No quiz available for this lesson.</p>
      )}
    </div>
  );
}
