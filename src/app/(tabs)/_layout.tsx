import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { Image } from 'expo-image';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#D2FF00', // Neon lime
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarStyle: {
          backgroundColor: '#0B0F19',
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? 24 : 16,
          left: 18,
          right: 18,
          borderRadius: 36,
          height: 62,
          borderTopWidth: 0,
          elevation: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.35,
          shadowRadius: 10,
          paddingHorizontal: 12,
          paddingTop: 8,
          paddingBottom: 8,
        },
      }}>
      {/* 1. Market (Shopping Bag) */}
      <Tabs.Screen
        name="market"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconBox}>
              <Image
                source={require('@/assets/images/nav/nav_bag.png')}
                style={[
                  styles.navIcon,
                  { tintColor: focused ? '#D2FF00' : '#FFFFFF' },
                ]}
                contentFit="contain"
              />
            </View>
          ),
        }}
      />

      {/* 2. Karta (Compass / Target) */}
      <Tabs.Screen
        name="karta"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconBox}>
              <Image
                source={require('@/assets/images/nav/nav_target.png')}
                style={[
                  styles.navIconTarget,
                  { tintColor: focused ? '#D2FF00' : '#FFFFFF' },
                ]}
                contentFit="contain"
              />
            </View>
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
                source={require('@/assets/images/nav/nav_cat.png')}
                style={[
                  styles.navIconCat,
                  { tintColor: focused ? '#D2FF00' : '#FFFFFF' },
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
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconBox}>
              <Image
                source={require('@/assets/images/nav/nav_bookmark.png')}
                style={[
                  styles.navIconBookmark,
                  { tintColor: focused ? '#D2FF00' : '#FFFFFF' },
                ]}
                contentFit="contain"
              />
            </View>
          ),
        }}
      />

      {/* 5. Profil (User Profile) */}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconBox}>
              <Image
                source={require('@/assets/images/nav/nav_user.png')}
                style={[
                  styles.navIconUser,
                  { tintColor: focused ? '#D2FF00' : '#FFFFFF' },
                ]}
                contentFit="contain"
              />
            </View>
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
  iconBox: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    width: 22,
    height: 25,
  },
  navIconTarget: {
    width: 24,
    height: 24,
  },
  centerLogoBtn: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIconCat: {
    width: 28,
    height: 32,
  },
  navIconBookmark: {
    width: 20,
    height: 22,
  },
  navIconUser: {
    width: 22,
    height: 23,
  },
});
