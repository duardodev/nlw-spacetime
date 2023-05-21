import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { styled } from 'nativewind';

import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree';

import blurBg from './src/assets/bg-blur.png';
import Stripes from './src/assets/stripes.svg';
import NLWLogo from './src/assets/nlw-spacetime-logo.svg';

const StyledStripes = styled(Stripes);

export default function App() {
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold
  });

  if (!hasLoadedFonts) {
    return null;
  }

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

        <TouchableOpacity activeOpacity={0.7} className="bg-green-500 px-5 py-2 rounded-full">
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
