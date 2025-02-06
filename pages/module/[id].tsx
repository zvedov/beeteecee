import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ModulePage() {
  const router = useRouter();
  const { id } = router.query;
  const [moduleData, setModuleData] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/courses/${id}.json`)
      .then(res => res.json())
      .then(data => setModuleData(data));
  }, [id]);

  if (!moduleData) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold">{moduleData.title}</h2>
      {moduleData.slides.map((slide, index) => (
        <Link 
            key={index} 
            href={`/class/${id}-${index}`} 
            className="block p-4 my-2 bg-gray-800 rounded-lg hover:bg-gray-700"
            >
            {slide.title}
        </Link>
      ))}
    </div>
  );
}
