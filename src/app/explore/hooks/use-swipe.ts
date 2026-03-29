import { useMotionValue, useTransform } from "motion/react";

export function useSwipe(dismiss: () => void) {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-18, 18]);
    const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

    const handleDragEnd = (_event: any, info: any) => {
        if (info.offset.x > 100) dismiss();
        else if (info.offset.x < -100) dismiss();
    };

    return { x, rotate, opacity, handleDragEnd };
}
