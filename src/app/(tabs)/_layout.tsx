import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons, Feather } from '@expo/vector-icons';
import { ZooColors } from '@/constants/zooTheme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#D2FF00', // Neon lime
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarStyle: {
          backgroundColor: '#0D1322',
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? 24 : 16,
          left: 20,
          right: 20,
          borderRadius: 34,
          height: 60,
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.25,
          shadowRadius: 10,
          paddingHorizontal: 12,
          paddingTop: 10,
          paddingBottom: 10,
        },
      }}>
      {/* 1. Market (Shopping Bag) */}
      <Tabs.Screen
        name="market"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Feather
              name="shopping-bag"
              size={22}
              color={color}
            />
          ),
        }}
      />

      {/* 2. Karta (Compass / Target Location) */}
      <Tabs.Screen
        name="karta"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Feather
              name="crosshair"
              size={22}
              color={color}
            />
          ),
        }}
      />

      {/* 3. Home Feed (Center ZOO BOZOR Cat Spiral Logo) */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.centerLogoBtn}>
              <Image
                source={require('@/assets/images/zoo_logo.png')}
                style={[
                  styles.centerLogoImg,
                  focused && { tintColor: '#D2FF00' },
                ]}
                contentFit="contain"
              />
            </View>
          ),
        }}
      />

      {/* 4. Saqlangan (Bookmark Ribbon) */}
      <Tabs.Screen
        name="favorites"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'bookmark' : 'bookmark-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />

      {/* 5. Profil (User Profile) */}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />

      {/* Hidden tabs kept for direct routing */}
      <Tabs.Screen
        name="chat"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  centerLogoBtn: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerLogoImg: {
    width: 28,
    height: 28,
    tintColor: '#FFFFFF',
  },
});
