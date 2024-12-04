import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

const dashboard = () => {
  return (
    <SafeAreaView>
    <View>
      <Text>dashboard</Text>
    </View>
    <View>
        <TouchableOpacity onPress={()=> router.push("/")}><Text>index</Text></TouchableOpacity>
    </View>
    <View>
        <TouchableOpacity onPress={()=> router.push("/explore")}><Text>explore</Text></TouchableOpacity>
    </View>
    <View>
        <TouchableOpacity onPress={()=> router.push("/login")}><Text>Login</Text></TouchableOpacity>
    </View>
    </SafeAreaView>
  )
}

export default dashboard