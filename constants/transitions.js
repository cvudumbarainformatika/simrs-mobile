import { CardStyleInterpolators } from "@react-navigation/stack"
import { Easing } from "react-native"


export const openSring = {
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
export const closeSring = {
  animation: 'timing',
    config: {
        duration: 100,
        easing: Easing.linear,
    }
};



const config = {
  animation: 'spring',
  config: {
    stiffness: 300,
    damping: 50,
    mass: 1,
    overshootClamping: false,
    restDisplacementThreshold: 0.001,
    restSpeedThreshold: 0.001,
  },
};

const closeConfig = {
    animation: 'timing',
    config: {
        duration: 50,
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


export const TRANSITION_VERTICAL = {
  gestureDirection: 'vertivcal',
  transitionSpec: {
    open: config,
    close: closeConfig
  },
  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
}