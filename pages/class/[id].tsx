import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Slideshow from "@/components/Slideshow";

export default function ClassPage() {
  const router = useRouter();
  const { id } = router.query;
  const [slides, setSlides] = useState([]);
  const [moduleId, setModuleId] = useState("");
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    if (!id) return;

    const [module, slide] = id.split("-");
    setModuleId(module);
    setSlideIndex(parseInt(slide, 10) || 0);

    fetch(`/courses/${module}.json`)
      .then(res => res.json())
      .then(data => setSlides(data.slides || []));
  }, [id]);

  if (!slides.length) return <p className="text-white">Loading slides...</p>;

  return (
    <Slideshow slides={slides} moduleId={moduleId} currentSlideIndex={slideIndex} totalSlides={slides.length} />
  );
}
