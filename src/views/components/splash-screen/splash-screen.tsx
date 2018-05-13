import * as React from "react"
import { Image, View, Dimensions } from "react-native"
import { SplashScreenProps } from "./splash-screen.props"
import { splashscreenImg } from "./"
/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function SplashScreen(props: SplashScreenProps) {
  const deviceHeight = Dimensions.get("window").height
  const deviceWidth = Dimensions.get("window").width

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        style={{ position: "absolute", left: 0, top: 0, width: deviceWidth, height: deviceHeight }}
        source={splashscreenImg}
      />
    </View>
  )
}
