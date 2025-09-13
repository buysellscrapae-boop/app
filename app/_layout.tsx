import { Stack } from 'expo-router';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { LocationProvider } from '@/contexts/LocationContext'; // Import LocationProvider

export default function RootLayout() {
  useFrameworkReady();

  return (
    <LocationProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="location" options={{ presentation: 'modal', title: 'Select Location' }} />
        <Stack.Screen name="sell" options={{ headerShown: false }} />
      </Stack>
    </LocationProvider>
  );
}
