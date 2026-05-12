import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const C = {
  navy: '#004C9D',
  navyDeep: '#00264D',
  gold: '#A89968',
  white: '#FFFFFF',
  offWhite: '#F5F6FA',
  gray100: '#EEF0F5',
  gray200: '#E1E4EB',
  gray500: '#7A8299',
  gray700: '#3D4256',
  green: '#3EAF6E',
  blue: '#3B82F6',
  orange: '#E8883E',
  purple: '#9B45E4',
};

function AlertRow({
  icon,
  label,
  value,
  iconColor,
  last,
  unread,
}: {
  icon: any;
  label: string;
  value: string;
  iconColor: string;
  last?: boolean;
  unread?: boolean;
}) {
  return (
    <TouchableOpacity style={[s.alertRow, last && { borderBottomWidth: 0 }]} activeOpacity={0.75}>
      <View style={s.unreadDotWrap}>
        {unread && <View style={s.unreadDot} />}
      </View>

      <View style={s.alertIcon}>
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={s.alertLabel}>{label}</Text>
        <Text style={s.alertSub}>{value}</Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color={C.gray500} />
    </TouchableOpacity>
  );
}

export default function AlertsScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={{ flex: 1, backgroundColor: C.offWhite }}>
      <StatusBar style="light" />

      <View style={s.header}>
        <SafeAreaView edges={['top']} style={{ backgroundColor: 'transparent' }}>
          <View style={s.topBar}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={s.iconButton}>
              <Ionicons name="arrow-back" size={20} color="rgba(255,255,255,0.8)" />
            </TouchableOpacity>

            <Text style={s.headerTitle}>Alerts</Text>

            <View style={s.iconButtonGhost} />
          </View>
        </SafeAreaView>

        <View style={s.headerContent}>
          <Text style={s.title}>Campus Updates</Text>
          <Text style={s.subtitle}>Routes, rewards, and activity alerts</Text>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={s.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={s.sectionTitle}>Today</Text>

        <View style={s.card}>
          <AlertRow
            unread
            icon="sparkles"
            label="Coins Earned"
            value="You earned 15 coins for reaching 2,000 steps"
            iconColor={C.gold}
          />
          <AlertRow
            unread
            icon="location-outline"
            label="Near Bierce Library"
            value="Check in nearby to earn more coins"
            iconColor={C.purple}
          />
          <AlertRow
            icon="business-outline"
            label="New Building Discovered"
            value="You discovered Guzzetta Hall"
            iconColor={C.navy}
            last
          />
        </View>

        <Text style={s.sectionTitle}>Earlier</Text>

        <View style={s.card}>
          <AlertRow
            icon="walk-outline"
            label="Step Goal Achieved"
            value="You reached your daily goal of 8,000 steps"
            iconColor={C.green}
          />
          <AlertRow
            icon="trophy-outline"
            label="Badge Unlocked"
            value="You unlocked the Campus Explorer badge"
            iconColor={C.orange}
            last
          />
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  header: {
    backgroundColor: C.navy,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 24,
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },

  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconButtonGhost: {
    width: 36,
    height: 36,
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: C.white,
  },

  headerContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 8,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: C.white,
    marginTop: 6,
  },

  subtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
  },

  content: {
    padding: 18,
    paddingBottom: 120,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: C.gray700,
    marginBottom: 12,
    marginTop: 4,
  },

  card: {
    backgroundColor: C.white,
    borderRadius: 14,
    marginBottom: 22,
    overflow: 'hidden',
  },

  alertRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: C.gray100,
  },

  unreadDotWrap: {
    width: 8,
    alignItems: 'center',
  },

  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: C.orange,
  },

  alertIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: C.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  alertLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: C.gray700,
  },

  alertSub: {
    fontSize: 13,
    color: C.gray500,
    marginTop: 3,
  },
});