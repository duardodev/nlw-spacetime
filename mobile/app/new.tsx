import { Image, ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';

import { Link, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';

import { api } from '../src/lib/api';
import Icon from '@expo/vector-icons/Feather';
import NLWLogo from '../src/assets/nlw-spacetime-logo.svg';

export default function NewMemory() {
  const [isPublic, setIsPublic] = useState(false);
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState<string | null>(null);

  const { top, bottom } = useSafeAreaInsets();

  async function handleCreateMemory() {
    const token = await SecureStore.getItemAsync('token');
    const router = useRouter();

    let coverUrl = '';

    if (preview) {
      const uploadFormData = new FormData();

      uploadFormData.append('file', {
        uri: preview,
        name: 'image.jpg',
        type: 'image/jpeg'
      } as any);

      const uploadResponse = await api.post('/upload', uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      coverUrl = uploadResponse.data.fileUrl;
    }

    await api.post(
      '/memories',
      {
        coverUrl,
        content,
        isPublic
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    router.push('/memories');
  }

  async function openImagePicker() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1
      });

      if (result.assets[0]) {
        setPreview(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView
      className="flex-1 px-8"
      contentContainerStyle={{ paddingTop: top, paddingBottom: bottom }}
    >
      <View className="mt-4 flex-row items-center justify-center">
        <NLWLogo />

        <Link href="/memories" asChild>
          <TouchableOpacity className="h-10 w-10 bg-purple-500 rounded-full items-center justify-center">
            <Icon name="arrow-left" size={16} color="#FFF" />
          </TouchableOpacity>
        </Link>
      </View>

      <View className="mt-6 space-y-6">
        <View className="flex-row">
          <Switch
            value={isPublic}
            onValueChange={setIsPublic}
            trackColor={{ false: '#767577', true: '#372560' }}
            thumbColor={isPublic ? '#9b79ea' : '#9e9eab'}
          />

          <Text className="text-gray-200 text-base font-body">Tornar memória pública</Text>
        </View>

        <TouchableOpacity
          onPress={openImagePicker}
          activeOpacity={0.7}
          className="h-32 bg-black/20 border border-dashed border-gray-500 rounded-lg items-center justify-center"
        >
          {preview ? (
            <Image source={{ uri: preview }} className="h-full w-full object-cover rounded-lg" />
          ) : (
            <View className="flex-row items-center gap-2">
              <Icon name="image" color="#FFF" />

              <Text className="text-gray-200 text-sm font-body">
                Adicionar foto ou vídeo de capa
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          value={content}
          onChangeText={setContent}
          multiline
          className="text-gray-50 text-lg font-body p-0"
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre!"
          placeholderTextColor="#56565a"
          textAlignVertical="top"
        />

        <TouchableOpacity
          onPress={handleCreateMemory}
          activeOpacity={0.7}
          className="bg-green-500 px-5 py-2 rounded-full items-center self-end"
        >
          <Text className="text-sm text-black uppercase font-alt">Salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
