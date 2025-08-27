import { useEffect, useRef } from 'react';
import { useInView, useAnimation } from 'framer-motion';

export const useScrollAnimation = (threshold = 0.1, triggerOnce = true) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    amount: threshold, 
    once: triggerOnce,
    margin: "0px 0px -100px 0px" 
  });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, isInView]);

  return { ref, controls, isInView };
};

export const slideUpVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as any,
      staggerChildren: 0.1
    }
  }
};

export const slideInLeftVariants = {
  hidden: {
    opacity: 0,
    x: -60,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as any
    }
  }
};

export const slideInRightVariants = {
  hidden: {
    opacity: 0,
    x: 60,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as any
    }
  }
};

export const fadeInVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as any
    }
  }
};

export const staggeredChildrenVariants = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as any
    }
  }
};

export const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

export const scaleInVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    rotateX: 20
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as any
    }
  }
};
