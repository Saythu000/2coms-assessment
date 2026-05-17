import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LayoutDashboard, Users, BookOpen } from 'lucide-react-native';
import { FeedScreen } from '../screens/FeedScreen';
import { DirectoryScreen } from '../screens/DirectoryScreen';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

// Placeholder for Knowledge Screen
const KnowledgeScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FAFC' }}>
    <Text style={{ color: '#0A192F', fontWeight: 'bold' }}>Knowledge Hub (Mobile)</Text>
  </View>
);

export const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Pulse') return <LayoutDashboard size={size} color={color} />;
          if (route.name === 'Colleagues') return <Users size={size} color={color} />;
          if (route.name === 'Docs') return <BookOpen size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007BFF',
        tabBarInactiveTintColor: 'gray',
        headerStyle: { backgroundColor: '#fff', elevation: 0, shadowOpacity: 0, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
        headerTitleStyle: { color: '#0A192F', fontWeight: 'bold' },
      })}
    >
      <Tab.Screen name="Pulse" component={FeedScreen} options={{ title: 'Daily Pulse' }} />
      <Tab.Screen name="Colleagues" component={DirectoryScreen} options={{ title: 'Directory' }} />
      <Tab.Screen name="Docs" component={KnowledgeScreen} options={{ title: 'Policies' }} />
    </Tab.Navigator>
  );
};
