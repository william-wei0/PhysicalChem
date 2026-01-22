export type ControllableSimulationVariable = {
    id : string;
    currentValue : number[] | string[];
    setValue : (currentValue : number[] | string[]) => void;
}

type SliderProps = ControllableSimulationVariable & {
    min? : number;
    max? : number;
}

export type SliderExtraProps = Record<string, unknown>;