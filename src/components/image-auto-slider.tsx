import React from "react";

type ImageAutoSliderProps = {
  images?: string[];
};

const defaultImages = [
  "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=2152&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=2126&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1673264933212-d78737f38e48?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1711434824963-ca894373272e?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1675705721263-0bbeec261c49?q=80&w=1940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1524799526615-766a9833dec0?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export const Component = ({ images = defaultImages }: ImageAutoSliderProps) => {
  const sourceImages = images.length ? images : defaultImages;
  const duplicatedImages = [...sourceImages, ...sourceImages];

  return (
    <>
      <style>{`
        @keyframes scroll-right {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .image-auto-slider-root {
          position: relative;
          display: flex;
          min-height: 368px;
          width: 100%;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: transparent;
        }

        .image-auto-slider-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: transparent;
        }

        .image-auto-slider-stage {
          position: relative;
          z-index: 1;
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: center;
          padding: 0;
        }

        .image-auto-slider-scroll-container {
          width: 100%;
          max-width: none;
          mask: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%);
          -webkit-mask: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%);
        }

        .image-auto-slider-infinite-scroll {
          display: flex;
          width: max-content;
          gap: 24px;
          animation: scroll-right 20s linear infinite;
        }

        .image-auto-slider-scroll-container:hover .image-auto-slider-infinite-scroll {
          animation-play-state: paused;
        }

        .image-auto-slider-item {
          width: 490px;
          height: 368px;
          flex-shrink: 0;
          overflow: hidden;
          border: 1px solid var(--color-bg-surface-raised);
          border-radius: 0;
          background: var(--color-bg-surface);
          box-shadow: none;
          transition: transform 0.3s ease, filter 0.3s ease;
        }

        .image-auto-slider-item:hover {
          transform: translateY(-8px);
          filter: brightness(1.06);
        }

        .image-auto-slider-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .image-auto-slider-bottom-gradient {
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 2;
          height: 0;
          background: transparent;
        }

        @media (max-width: 720px) {
          .image-auto-slider-root { min-height: 300px; }
          .image-auto-slider-item {
            width: 360px;
            height: 300px;
          }
        }
      `}</style>

      <div className="image-auto-slider-root">
        <div className="image-auto-slider-stage">
          <div className="image-auto-slider-scroll-container">
            <div className="image-auto-slider-infinite-scroll">
              {duplicatedImages.map((image, index) => (
                <div key={`${image}-${index}`} className="image-auto-slider-item">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image} alt={`Gallery image ${(index % sourceImages.length) + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
