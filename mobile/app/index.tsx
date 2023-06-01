import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

import * as SecureStore from 'expo-secure-store';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { StatusBar } from 'expo-status-bar';

import { api } from '../src/lib/api';
import { styled } from 'nativewind';

import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree';

import blurBg from '../src/assets/bg-blur.png';
import Stripes from '../src/assets/stripes.svg';
import NLWLogo from '../src/assets/nlw-spacetime-logo.svg';

const StyledStripes = styled(Stripes);

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: 'https://github.com/settings/connections/applications/dab13cb5ec7d599f6ebf'
};

export default function App() {
  const router = useRouter();

  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold
  });

  if (!hasLoadedFonts) {
    return null;
  }

  const [, response, signInWithGithub] = useAuthRequest(
    {
      clientId: 'dab13cb5ec7d599f6ebf',
      scopes: ['activity', 'sleep'],
      redirectUri: makeRedirectUri({
        scheme: 'nlwspacetime'
      })
    },
    discovery
  );

  async function handleGithubOAuthCode(code: string) {
    const response = await api.post('/register', {
      code
    });

    const { token } = response.data;

    await SecureStore.setItemAsync('token', token);

    router.push('/memories');
  }

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;

      handleGithubOAuthCode(code);
    }
  }, [response]);

  return (
    <ImageBackground
      source={blurBg}
      imageStyle={{ position: 'absolute', left: '-100%' }}
      className="bg-gray-900 px-8 py-10 flex-1 items-center relative"
    >
      <StyledStripes className="absolute left-2" />

      <View className="flex-1 items-center justify-center gap-6">
        <NLWLogo />

        <View className="space-y-2">
          <Text className="text-2xl text-gray-50 text-center font-title leading-tight">
            Sua cápsula do tempo
          </Text>
          <Text className="text-base text-gray-100 text-center font-body leading-relaxed">
            Colecione momentos marcantes da sua jornada e compartilhe (se quiser) com o mundo!
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          className="bg-green-500 px-5 py-2 rounded-full"
          onPress={() => signInWithGithub()}
        >
          <Text className="text-sm text-black uppercase font-alt">Cadastrar lembranças</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-sm text-gray-200 text-center font-body leading-relaxed">
        Feito com 💜 no NLW da Rocketseat
      </Text>

      <StatusBar style="light" translucent />
    </ImageBackground>
  );
}
