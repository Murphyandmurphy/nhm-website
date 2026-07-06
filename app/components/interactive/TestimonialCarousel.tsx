"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "../ui/Icon";
import { Testimonial } from "../ui/Testimonial";
import { parseInline } from "../rich";

export type TestimonialItem = { quote: string; name: string; role?: string };

export function TestimonialCarousel({
  items,
  tone = "default",
}: {
  items: TestimonialItem[];
  tone?: "default" | "onblue";
}) {
  const [i, setI] = useState(0);
  const list = items && items.length ? items : [];
  const n = list.length;

  if (!n) return null;

  const go = (d: number) => setI((p) => (p + d + n) % n);
  const t = list[i];

  return (
    <div className="carousel">
      <div className="carousel__track">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <Testimonial quote={parseInline(t.quote)} name={t.name} role={t.role} tone={tone} />
          </motion.div>
        </AnimatePresence>
      </div>
      {n > 1 ? (
        <div className="carousel__controls">
          <button className="cbtn" onClick={() => go(-1)} aria-label="Previous">
            <Icon name="ArrowLeft" size={20} />
          </button>
          <button className="cbtn" onClick={() => go(1)} aria-label="Next">
            <Icon name="ArrowRight" size={20} />
          </button>
          <div style={{ display: "flex", gap: "8px", marginLeft: "10px" }}>
            {list.map((_, idx) => (
              <button
                key={idx}
                className={`carousel__dot ${idx === i ? "carousel__dot--active" : ""}`.trim()}
                onClick={() => setI(idx)}
                aria-label={`Go to ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
