export default function Slider({
  value,
  onValueChange,
  label = "Slider Component",
  min = 0,
  max = 100,
  step = 1,
}: {
  value: number[];
  onValueChange: (value: number[]) => void;
  label?: string;
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
    <div className="w-full px-4 pb-2 bg-transparent rounded-lg">
      <h2 className="font-bold text-center text-gray-800">{label}</h2>
      <div className="">
        <div className="relative">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={currentValue}
            onChange={(e) => handleSliderChange(Number(e.target.value))}
            className="w-full cursor-pointer "
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`,
            }}
          />
        </div>

        {/* Min/Max Labels */}
        <div className="grid grid-cols-3 text-sm">
          <span>{min}</span>
          <input
            className="justify-self-center w-full text-center pl-[1rem] font-bold "
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
          
          <span className="text-right">{max}</span>
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
