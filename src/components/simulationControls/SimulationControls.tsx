import { useState } from "react";
import CloseButtonWithText from "../buttons/CloseButtonWithText";
import OpenSimulationControlsButton from "../buttons/OpenSimulationControlsButton";

export default function SimulationControls({
  controllableVariables,
}: {
  controllableVariables: React.ReactNode;
}) {
  const [isControlsPanelVisible, setisControlsPanelVisible] = useState(false);
  const handleClick = () => {
    setisControlsPanelVisible(!isControlsPanelVisible);
  };

  return (
    <>
      <div
        className={`absolute right-3 top-3 z-10 rounded-2xl bg-zinc-100 border border-black overflow-hidden duration-500 ${
          isControlsPanelVisible
            ? "height-full w-80 opacity-100"
            : "height-full w-0 opacity-0 p-0"
        }`}
        style={{
          transition:
            "width 500ms ease-in-out, opacity 100ms ease-out, padding 200ms ease-out",
        }}
      >
        <CloseButtonWithText
          onClick={handleClick}
          className="right-3 top-2 z-10 absolute"
        />
        <h1 className="text-center font-bold mt-6 text-[20px]">Simulation Controls</h1>
        {controllableVariables}
      </div>

      {!isControlsPanelVisible && (
        <OpenSimulationControlsButton
          onClick={handleClick}
          label="Controls"
          className="right-3 top-3 z-10 absolute"
        />
      )}
    </>
  );
}
