import React from 'react'
import { Stack } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const _layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Stack >
        <Stack.Screen
        name='login'
        options={{headerShown: false}}/>
        <Stack.Screen
        name='register'
        options={{headerShown: false}}/>
    </Stack>
    </GestureHandlerRootView>
  )
}

export default _layout