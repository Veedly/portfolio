import ThermodynamicGrid from "@/components/interactive-thermodynamic-grid";

export function GlobalThermodynamicBackground() {
  return (
    <ThermodynamicGrid
      aria-hidden="true"
      className="global-thermodynamic-bg"
      coolingFactor={0.982}
      data-testid="global-thermodynamic-bg"
      resolution={16}
    />
  );
}
