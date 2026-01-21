import { useState } from "react";

type SliderExtraProps = Record<string, unknown>;

type SliderOptions = {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
} & SliderExtraProps;

type SliderConfig = {
  id: string;
  label: string;
  value: number[];
  updateValue: (value: number[]) => void;
} & Omit<SliderOptions, "label">;

export default function useSliders<T extends Record<string, number>>(
  initialValues: T,
  config?: Partial<Record<keyof T, SliderOptions>>
) {
  const [variables, setValues] = useState<T>(initialValues);

  const updateSlider = <K extends keyof T>(key: K, newValue: number[]) => {
    setValues((prev) => ({ ...prev, [key]: newValue[0] }));
  };

  const getVariables = (): SliderConfig[] =>
    Object.entries(variables).map(([key, val]) => {
      const opts = config?.[key as keyof T];

      // Separate label from the rest of the props
      const { label, ...rest } = opts ?? {};

      return {
        id: key,
        label: label ?? key,
        value: [val],
        updateValue: (newVal: number[]) => updateSlider(key as keyof T, newVal),

        // ✅ includes min/max/step/disabled + any extra unknown props
        ...rest,
      };
    });

  return { variables, updateSlider, getVariables };
}