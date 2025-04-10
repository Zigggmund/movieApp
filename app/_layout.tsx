import { Stack } from 'expo-router';

import './globals.css';

export default function RootLayout() {
  return (
    // for hiding headers
    <Stack>
      <Stack.Screen
        name={'(tabs)'}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name={'movies/[id]'}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
}
