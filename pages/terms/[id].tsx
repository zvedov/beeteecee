import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function TermsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [terms, setTerms] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/courses/${id}.json`)
      .then(res => res.json())
      .then(data => setTerms(data.terms));
  }, [id]);

  if (!terms) return <p className="text-white">Loading...</p>;

  return (
    <div className="container mx-auto p-6 bg-gray-900 text-white">
      <h2 className="text-3xl font-bold mb-4">Glossary</h2>
      <ul className="list-disc pl-5">
        {Object.entries(terms).map(([term, definition]) => (
          <li key={term} className="my-2">
            <strong className="text-blue-400">{term}:</strong> {definition}
          </li>
        ))}
      </ul>
    </div>
  );
}
