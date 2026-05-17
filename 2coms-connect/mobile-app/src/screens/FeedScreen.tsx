import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Heart, MessageCircle, Share2 } from 'lucide-react-native';

// Reusing same mock data structure logic
const MOCK_MOBILE_FEED = [
  {
    id: '1',
    type: 'PROJECT_WIN',
    title: 'Project Apollo 11 Launch',
    content: 'The Tech team successfully deployed the Apollo 11 dashboard. Huge impact!',
    author: 'Rahul Varma',
    reactions: 24
  },
  {
    id: '2',
    type: 'RECOGNITION',
    title: 'Peer Shout-out: Ananya',
    content: 'Huge thanks to Ananya for helping with the culture workshop!',
    author: 'Admin',
    reactions: 15
  }
];

export const FeedScreen = () => {
  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.type.replace('_', ' ')}</Text>
        </View>
        <Text style={styles.timestamp}>2h ago</Text>
      </View>
      
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
      
      <View style={styles.footer}>
        <View style={styles.interactionRow}>
          <TouchableOpacity style={styles.iconButton}>
            <Heart size={20} color="#64748B" />
            <Text style={styles.iconText}>{item.reactions}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MessageCircle size={20} color="#64748B" />
            <Text style={styles.iconText}>4</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Share2 size={20} color="#64748B" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_MOBILE_FEED}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={() => (
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeTitle}>Hello, Rahul!</Text>
            <Text style={styles.welcomeSub}>Stay updated with the latest pulse.</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  list: { padding: 16 },
  welcomeSection: { marginBottom: 24 },
  welcomeTitle: { fontSize: 24, fontWeight: 'bold', color: '#0A192F' },
  welcomeSub: { color: '#64748B', marginTop: 4 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#E2E8F0' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  badge: { backgroundColor: '#EFF6FF', paddingHorizontal: 8, py: 4, borderRadius: 4 },
  badgeText: { color: '#2563EB', fontSize: 10, fontWeight: 'bold' },
  timestamp: { color: '#94A3B8', fontSize: 12 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#0A192F', marginBottom: 8 },
  content: { color: '#475569', fontSize: 14, lineHeight: 20 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  interactionRow: { flexDirection: 'row', gap: 16 },
  iconButton: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  iconText: { color: '#64748B', fontSize: 14 }
});
