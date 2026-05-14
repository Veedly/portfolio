"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Flip from "gsap/Flip";
import type { ComponentProps } from "react";
import { useRef } from "react";

gsap.registerPlugin(Flip);

type FlipRevealItemProps = {
    flipKey: string;
} & ComponentProps<"div">;

export const FlipRevealItem = ({ flipKey, ...props }: FlipRevealItemProps) => {
    return <div data-flip={flipKey} {...props} />;
};

type FlipRevealProps = {
    keys: string[];
    showClass?: string;
    hideClass?: string;
} & ComponentProps<"div">;

export const FlipReveal = ({ keys, hideClass = "", showClass = "", ...props }: FlipRevealProps) => {
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const isShow = (key: string | null) => {
        if (!key) return false;
        if (keys.includes("all")) return true;

        return key.split("|").some((itemKey) => keys.includes(itemKey));
    };

    useGSAP(
        () => {
            if (!wrapperRef.current) return;

            const wrapper = wrapperRef.current;
            const items = gsap.utils.toArray<HTMLDivElement>(wrapperRef.current.querySelectorAll("[data-flip]"));
            const previousHeight = wrapper.offsetHeight;
            const state = Flip.getState(items);

            items.forEach((item) => {
                const key = item.getAttribute("data-flip");
                if (isShow(key)) {
                    item.classList.add(showClass);
                    item.classList.remove(hideClass);
                } else {
                    item.classList.remove(showClass);
                    item.classList.add(hideClass);
                }
            });

            const nextHeight = wrapper.offsetHeight;

            gsap.fromTo(
                wrapper,
                { height: previousHeight },
                { height: nextHeight, duration: 0.6, ease: "power1.inOut", clearProps: "height" },
            );

            Flip.from(state, {
                duration: 0.6,
                scale: true,
                ease: "power1.inOut",
                stagger: 0.05,
                absolute: true,
                onEnter: (elements) =>
                    gsap.fromTo(
                        elements,
                        { opacity: 0, scale: 0 },
                        {
                            opacity: 1,
                            scale: 1,
                            duration: 0.8,
                        },
                    ),
                onLeave: (elements) => gsap.to(elements, { opacity: 0, scale: 0, duration: 0.8 }),
            });
        },

        { scope: wrapperRef, dependencies: [keys] },
    );

    return <div {...props} ref={wrapperRef} />;
};
