

export default {
    SATU: {
        stiffness: 1000,
        damping: 50,
        mass: 1,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
    },
    DUA : {
        damping: 100,
        overshootClamping: true,
        restDisplacementThreshold: 0.1,
        restSpeedThreshold: 0.1,
        shiftness: 200
    }
}