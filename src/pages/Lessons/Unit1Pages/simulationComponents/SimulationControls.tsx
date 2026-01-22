export default function SimulationControls({controllableVariables}: {controllableVariables: React.ReactNode;}) {
  return (
    <div className="absolute z-10 h-max-full overflow-scroll">
      {controllableVariables}
    </div>
  );
}