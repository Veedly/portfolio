import type { ComponentProps } from "react";

type BGVariantType = "dots" | "grid";
type BGMaskType = "fade-center" | "fade-edges" | "none";

type BGPatternProps = ComponentProps<"div"> & {
  variant?: BGVariantType;
  mask?: BGMaskType;
  size?: number;
  fill?: string;
};

export function BGPattern({
  variant = "dots",
  mask = "none",
  size = 24,
  fill = "rgba(242, 242, 242, 0.12)",
  className = "",
  style,
  ...props
}: BGPatternProps) {
  const backgroundImage =
    variant === "grid"
      ? `linear-gradient(to right, ${fill} 1px, transparent 1px), linear-gradient(to bottom, ${fill} 1px, transparent 1px)`
      : `radial-gradient(${fill} 1px, transparent 1px)`;

  return (
    <div
      className={`bg-pattern bg-pattern--${mask} ${className}`.trim()}
      style={{
        backgroundImage,
        backgroundSize: `${size}px ${size}px`,
        ...style,
      }}
      {...props}
    />
  );
}
