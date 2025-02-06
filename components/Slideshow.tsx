import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";

export default function Slideshow({ slides, moduleId, currentSlideIndex, totalSlides }) {
  const [currentSlide, setCurrentSlide] = useState(currentSlideIndex);
  const router = useRouter();

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // Swipe Gesture Handlers
  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div {...handlers} className="flex flex-col items-center p-4 sm:p-6 bg-black text-green-400 font-mono min-h-screen w-full">
      {/* Progress Bar */}
      <div className="w-full bg-gray-700 h-1 mt-2">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
          transition={{ duration: 0.5 }}
          className="bg-green-400 h-1"
        />
      </div>

      {/* Slide Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide} // Ensures animations work per slide change
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="w-full flex flex-col items-center"
        >
          {/* Slide Title & Description */}
          <h2 className="text-xl sm:text-3xl font-bold text-center">{slides[currentSlide].title}</h2>
          <p className="text-gray-400 text-sm sm:text-lg text-center mt-2">{slides[currentSlide].description}</p>

          {/* Slide Image */}
          {slides[currentSlide].image && (
            <div className="w-full flex justify-center my-4">
              <Image
                src={slides[currentSlide].image}
                width={400}
                height={300}
                alt={slides[currentSlide].title}
                className="rounded-lg max-w-full"
              />
            </div>
          )}

          {/* Slide Content List */}
          <ul className="list-disc pl-5 text-sm sm:text-lg mt-2">
            {slides[currentSlide].content.map((text, index) => (
              <li key={index} className="my-1">{text}</li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between w-full max-w-xs sm:max-w-xl mt-6">
        <button
          onClick={prevSlide}
          className={`px-4 sm:px-6 py-2 sm:py-3 bg-gray-900 border border-green-400 rounded-lg transition ${
            currentSlide === 0 ? "cursor-not-allowed opacity-50" : "hover:bg-gray-800 hover:text-yellow-400"
          }`}
          disabled={currentSlide === 0}
        >
          ◀ Previous
        </button>
        <span className="text-sm sm:text-lg">{currentSlide + 1} / {totalSlides}</span>
        <button
          onClick={nextSlide}
          className={`px-4 sm:px-6 py-2 sm:py-3 bg-gray-900 border border-green-400 rounded-lg transition ${
            currentSlide === slides.length - 1 ? "cursor-not-allowed opacity-50" : "hover:bg-gray-800 hover:text-yellow-400"
          }`}
          disabled={currentSlide === slides.length - 1}
        >
          Next ▶
        </button>
      </div>

      {/* Swipe Indicator (Only visible on mobile) */}
      <p className="text-gray-500 text-sm sm:hidden mt-4">Swipe left or right to navigate 📲</p>
    </div>
  );
}
