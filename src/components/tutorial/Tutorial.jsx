import { useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import "./Tutorial.css";

const TutorialOverlay = ({ onClose, children }) => {
  const [step, setStep] = useState(0);

  const handleNext = () => setStep((prev) => Math.min(prev + 1, children.length - 1));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      {/* Click blocker (Prevents clicking background) */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Tutorial Content */}
      <div 
        className="relative bg-white p-4 rounded-lg shadow-lg text-black z-50 pointer-events-auto max-w-lg w-full"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div 
          className={`transition-opacity duration-300 ${step === 0 ? 'opacity-100' : 'opacity-0'}`}
          style={{ display: step === 0 ? 'block' : 'none' }}
        >
          {children[0]}
        </div>
        <div 
          className={`transition-opacity duration-300 ${step === 1 ? 'opacity-100' : 'opacity-0'}`}
          style={{ display: step === 1 ? 'block' : 'none' }}
        >
          {children[1]}
        </div>
        {/* Add more divs for additional steps as needed */}
        {children.slice(2).map((child, index) => (
          <div 
            key={index + 2} // Ensure unique keys for each step
            className={`transition-opacity duration-300 ${step === index + 2 ? 'opacity-100' : 'opacity-0'}`}
            style={{ display: step === index + 2 ? 'block' : 'none' }}
          >
            {child}
          </div>
        ))}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-4">
          {/* Hide Back button if on first page */}
          {step > 0 ? (
            <button onClick={handleBack} className="back-button">
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <div /> // Keeps spacing aligned
          )}
          <button onClick={step < children.length - 1 ? handleNext : onClose} className="next-button">
            {step < children.length - 1 ? <ArrowRight className="w-5 h-5" /> : "Finish"}
          </button>
        </div>

        {/* Close button */}
        <button onClick={onClose} className="close-button">
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default TutorialOverlay;