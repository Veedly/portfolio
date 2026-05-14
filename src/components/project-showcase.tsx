"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";

export type ShowcaseProject = {
  title: string;
  description?: string;
  year?: string;
  link: string;
  image?: string;
};

type ProjectShowcaseProps = {
  eyebrow: string;
  projects: ShowcaseProject[];
};

export function ProjectShowcase({ eyebrow, projects }: ProjectShowcaseProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const activeProject = hoveredIndex === null ? null : projects[hoveredIndex];
  const hasPreview = Boolean(activeProject?.image);

  useEffect(() => {
    const animate = () => {
      setSmoothPosition((prev) => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.16,
        y: prev.y + (mousePosition.y - prev.y) * 0.16,
      }));
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [mousePosition]);

  if (!projects.length) return null;

  const handleMouseMove = (event: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  return (
    <section ref={containerRef} onMouseMove={handleMouseMove} className="project-showcase motion-reveal">
      <p className="mono-label project-showcase-eyebrow">{eyebrow}</p>

      <div
        className={`project-showcase-preview ${hasPreview ? "visible" : ""}`}
        style={{
          transform: `translate3d(${smoothPosition.x + 28}px, ${smoothPosition.y - 112}px, 0)`,
        }}
        aria-hidden="true"
      >
        {projects.map((project, index) =>
          project.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={project.link}
              src={project.image}
              alt=""
              className={hoveredIndex === index ? "active" : ""}
              loading="lazy"
            />
          ) : null,
        )}
      </div>

      <div className="project-showcase-list">
        {projects.map((project, index) => (
          <Link
            key={project.link}
            href={project.link}
            className="project-showcase-item"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <span className="project-showcase-highlight" />
            <span className="project-showcase-main">
              <span className="project-showcase-title">
                {project.title}
                <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.75} />
              </span>
              {project.description ? <span className="project-showcase-description">{project.description}</span> : null}
            </span>
            {project.year ? <span className="mono-label project-showcase-year">{project.year}</span> : null}
          </Link>
        ))}
      </div>
    </section>
  );
}
