import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../../storybook/views"
import { TransactionGroupHeader } from "./"

storiesOf("TransactionGroupHeader")
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <TransactionGroupHeader text="Click It" preset="primary" onPress={() => window.alert("pressed")} />
      </UseCase>
      <UseCase text="Disabled" usage="The disabled behaviour of the primary button.">
        <TransactionGroupHeader text="Click It" preset="primary" onPress={() => window.alert("pressed")} disabled />
      </UseCase>
    </Story>
  ))
