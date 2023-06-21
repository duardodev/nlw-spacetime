import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Link, useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import Icon from '@expo/vector-icons/Feather';

import dayjs from 'dayjs';
import ptBr from 'dayjs/locale/pt-br';

import NLWLogo from '../src/assets/nlw-spacetime-logo.svg';
import { api } from '../src/lib/api';

dayjs.locale(ptBr);

interface Memory {
  id: string;
  coverUrl: string;
  excerpt: string;
  createdAt: string;
}

export default function NewMemory() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const { top, bottom } = useSafeAreaInsets();

  const router = useRouter();

  async function signOut() {
    await SecureStore.deleteItemAsync('token');

    router.push('/');
  }

  async function loadMemories() {
    const token = await SecureStore.getItemAsync('token');

    const response = await api.get('/memories', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setMemories(response.data);
  }

  useEffect(() => {
    loadMemories();
  }, []);

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingTop: top, paddingBottom: bottom }}
    >
      <View className="mt-4 px-8 flex-row items-center justify-center">
        <NLWLogo />

        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={signOut}
            className="h-10 w-10 bg-red-500 rounded-full items-center justify-center"
          >
            <Icon name="log-out" size={16} color="#000" />
          </TouchableOpacity>

          <Link href="/new" asChild>
            <TouchableOpacity className="h-10 w-10 bg-green-500 rounded-full items-center justify-center">
              <Icon name="plus" size={16} color="#000" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <View className="mt-6 space-y-10">
        {memories.map(memory => {
          return (
            <View key={memory.id} className="space-y-4">
              <View className="flex-row items-center gap-2">
                <View className="bg-gray-50 h-px w-5" />
                <Text className="text-gray-100 text-xs font-body">
                  {dayjs(memory.createdAt).format('D[ de ]MMM[, ]YYYY')}
                </Text>
              </View>

              <View className="px-4 space-y-4">
                <Image
                  source={{
                    uri: memory.coverUrl
                  }}
                  className="w-full rounded-lg aspect-video"
                  alt=""
                />

                <Text className="text-gray-100 text-base  leading-relaxed">{memory.excerpt}</Text>

                <Link href="/memories/id" asChild>
                  <TouchableOpacity className="flex-row items-center gap-2">
                    <Text className="text-gray-200 text-sm font-body">Ler mais</Text>
                    <Icon name="arrow-right" size={16} color="#9e9ea8" />
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
