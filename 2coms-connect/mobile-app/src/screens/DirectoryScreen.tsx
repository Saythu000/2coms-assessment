import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { Search, Mail, MessageCircle } from 'lucide-react-native';
import { MOCK_USERS } from '../api/mockData';

export const DirectoryScreen = () => {
  const [search, setSearch] = useState('');
  const filtered = MOCK_USERS.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Search size={18} color="#94A3B8" style={styles.searchIcon} />
        <TextInput 
          placeholder="Find a colleague..." 
          style={styles.input}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.dept}>{item.department}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.iconBtn}><MessageCircle size={20} color="#007BFF" /></TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn}><Mail size={20} color="#64748B" /></TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', padding: 16 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 12, marginBottom: 16, borderWidth: 1, borderColor: '#E2E8F0' },
  searchIcon: { marginRight: 8 },
  input: { flex: 1, height: 45, fontSize: 14 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  avatar: { width: 50, height: 50, borderRadius: 10 },
  info: { flex: 1, marginLeft: 12 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#0A192F' },
  dept: { fontSize: 12, color: '#64748B' },
  actions: { flexDirection: 'row', gap: 12 },
  iconBtn: { padding: 8, backgroundColor: '#F1F5F9', borderRadius: 8 }
});
