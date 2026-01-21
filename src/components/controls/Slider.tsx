
export default function Slider({ 
  value, 
  onValueChange, 
  min = 0, 
  max = 100,
  step = 1 
}: { 
  value: number[];
  onValueChange: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  const currentValue = value[0];
  const percentage = ((currentValue - min) / (max - min)) * 100;

  const handleSliderChange = (newValue: number) => {
    onValueChange([newValue]);
  };

  return (
    <div className="w-full p-4 border-2 border-cyan-700 bg-white rounded-lg">
      <h2 className="font-bold text-gray-800 mb-4">Slider Component</h2>

      <div className="space-y-4">
        {/* Slider */}
        <div className="relative">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={currentValue}
            onChange={(e) => handleSliderChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`,
            }}
          />
        </div>

        {/* Value Display */}
        <input
          className="w-full font-bold text-blue-600 text-center border border-gray-300 rounded px-2 py-1"
          type="number"
          value={currentValue}
          min={min}
          max={max}
          onChange={(e) => {
            const newValue = Number(e.target.value);
            if (newValue >= min && newValue <= max) {
              handleSliderChange(newValue);
            }
          }}
        />

        {/* Min/Max Labels */}
        <div className="flex justify-between text-sm text-gray-600">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: #3b82f6;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #3b82f6;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider::-webkit-slider-thumb:hover {
          background: #2563eb;
        }

        .slider::-moz-range-thumb:hover {
          background: #2563eb;
        }
      `}</style>
    </div>
  );
}