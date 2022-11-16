import { CardStyleInterpolators } from "@react-navigation/stack"
import { Easing } from "react-native"


const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 1,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const closeConfig = {
    animation: 'timing',
    config: {
        duration: 100,
        easing: Easing.linear,
    }
}

export const TRANSITION_HORIZONTAL = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: config,
    close: closeConfig
  },
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
}