"use client";

import { motion } from "framer-motion";
import { Children } from "react";

interface CardGridProps {
  children: React.ReactNode;
  className?: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function CardGrid({ children, className }: CardGridProps) {
  const items = Children.toArray(children);

  return (
    <motion.div
      className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${className ?? ""}`}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {items.map((child, i) => (
        <motion.div
          key={i}
          variants={item}
          style={{ perspective: 1000 }}
          className="[transform-style:preserve-3d]"
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
