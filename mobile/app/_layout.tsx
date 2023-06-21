import { useEffect, useState } from 'react';
import { ImageBackground } from 'react-native';
import { styled } from 'nativewind';

import * as SecureStore from 'expo-secure-store';
import { StatusBar } from 'expo-status-bar';
import { SplashScreen, Stack } from 'expo-router';

import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree';

import blurBg from '../src/assets/bg-blur.png';
import Stripes from '../src/assets/stripes.svg';

const StyledStripes = styled(Stripes);

export default function Layout() {
  const [isUserAuthenticaded, setIsUserAuthenticaded] = useState<null | boolean>(null);

  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold
  });

  if (!hasLoadedFonts) {
    return <SplashScreen />;
  }

  useEffect(() => {
    SecureStore.getItemAsync('token').then(token => {
      setIsUserAuthenticaded(!!token);
    });
  }, []);

  return (
    <ImageBackground
      source={blurBg}
      imageStyle={{ position: 'absolute', left: '-100%' }}
      className="bg-gray-900 flex-1 relative"
    >
      <StyledStripes className="absolute left-2" />
      <StatusBar style="light" translucent />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
          animation: 'fade'
        }}
      >
        <Stack.Screen name="index" redirect={isUserAuthenticaded} />
        <Stack.Screen name="memories" />
        <Stack.Screen name="new" />
      </Stack>
    </ImageBackground>
  );
}
