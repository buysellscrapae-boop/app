import React from 'react';
import { Redirect } from 'expo-router';

export default function SellScreen() {
  // Redirect to category selection since location is already handled by tab navigation
  return <Redirect href="/sell/category" />;
}