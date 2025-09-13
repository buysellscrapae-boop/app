import { Stack } from 'expo-router';
import { LocationProvider } from '@/contexts/LocationContext'; // Import LocationProvider

export default function RootLayout() {
  return (
    <LocationProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="location" options={{ presentation: 'modal', title: 'Select Location' }} />
      </Stack>
    </LocationProvider>
  );
}
