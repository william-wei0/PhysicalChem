import { useState } from "react";

type SliderConfig = {
  id: string;
  label: string;
  value: number[];
  updateValue: (value: number[]) => void;
};

export default function useSliders(
  initialValues: Record<string, number>,
  config?: Record<string, { label?: string; min?: number; max?: number }>
) {
  const [variables, setValues] = useState(initialValues);

  const updateSlider = (key: string, newValue: number[]) => {
    setValues((prev) => ({ ...prev, [key]: newValue[0] }));
  };

  const getVariables = (): SliderConfig[] =>
    Object.entries(variables).map(([key, val]) => ({
      id: key,
      label: config?.[key]?.label || key, // Use custom label or fallback to key
      value: [val],
      updateValue: (newVal: number[]) => updateSlider(key, newVal),
      ...(config?.[key] && { min: config[key].min, max: config[key].max }),
    }));

  return { variables, updateSlider, getVariables };
}