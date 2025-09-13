import { Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function SellLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.white,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: Colors.textPrimary,
        },
        headerTintColor: Colors.primary,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Select Location',
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="category" 
        options={{ 
          title: 'Select Category',
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="motors" 
        options={{ 
          title: 'Motors Details',
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="jobs" 
        options={{ 
          title: 'Job Details',
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="property-sale" 
        options={{ 
          title: 'Property for Sale',
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="property-rent" 
        options={{ 
          title: 'Property for Rent',
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="classifieds" 
        options={{ 
          title: 'Classifieds',
          headerShown: true,
        }} 
      />
    </Stack>
  );
}