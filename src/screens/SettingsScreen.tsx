import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
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
  purple: '#5B35D5',
  pink: '#EF4C78',
  red: '#E83A4F',
};

function SettingRow({
  icon,
  title,
  subtitle,
  color,
  value,
  last,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  color: string;
  value?: string;
  last?: boolean;
}) {
  return (
    <TouchableOpacity activeOpacity={0.75} style={[s.settingRow, last && { borderBottomWidth: 0 }]}>
      <View style={s.settingIcon}>
        <Ionicons name={icon} size={20} color={color} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={s.settingTitle}>{title}</Text>
        <Text style={s.settingSubtitle}>{subtitle}</Text>
      </View>

      {value && <Text style={s.settingValue}>{value}</Text>}

      <Ionicons name="chevron-forward" size={20} color={C.gray500} />
    </TouchableOpacity>
  );
}

export default function SettingsScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  return (
    <View style={s.screen}>
      <StatusBar style="light" />

      <View style={s.header}>
        <SafeAreaView edges={['top']} style={{ backgroundColor: 'transparent' }}>
          <View style={s.topBar}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={s.iconButton}>
              <Ionicons name="arrow-back" size={22} color="rgba(255,255,255,0.85)" />
            </TouchableOpacity>

            <Text style={s.headerTitle}>Settings</Text>

            <View style={s.iconButtonGhost} />
          </View>
        </SafeAreaView>

        <View style={s.profilePreview}>
          <View style={s.avatar}>
            <Ionicons name="person-outline" size={34} color="rgba(255,255,255,0.85)" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={s.name}>Natalie Langevoort</Text>
            <Text style={s.email}>natalie.langevoort@uakron.edu</Text>

            <View style={s.classTag}>
              <Text style={s.classText}>CLASS OF 2026</Text>
            </View>
          </View>

          <Ionicons name="chevron-forward" size={28} color="rgba(255,255,255,0.7)" />
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          s.content,
          {
            paddingBottom: insets.bottom + 105,
          },
        ]}
      >
        <Text style={s.sectionTitle}>ACCOUNT</Text>
        <View style={s.card}>
          <SettingRow
            icon="person"
            title="Edit Profile"
            subtitle="Update your personal information"
            color={C.navy}
          />
          <SettingRow
            icon="lock-closed"
            title="Change Password"
            subtitle="Update your account password"
            color={C.green}
          />
          <SettingRow
            icon="mail"
            title="Email Preferences"
            subtitle="Manage your email notifications"
            color={C.purple}
            last
          />
        </View>

        <Text style={s.sectionTitle}>APP SETTINGS</Text>
        <View style={s.card}>
          <SettingRow
            icon="notifications"
            title="Notifications"
            subtitle="Manage push notifications"
            color={C.navy}
          />
          <SettingRow
            icon="resize"
            title="Units"
            subtitle="Choose your preferred units"
            color="#F39A1E"
            value="Miles"
          />
          <SettingRow
            icon="heart"
            title="Health & Data"
            subtitle="Manage health data permissions"
            color={C.pink}
          />
          <SettingRow
            icon="shield"
            title="Privacy"
            subtitle="Manage your privacy settings"
            color={C.navy}
            last
          />
        </View>

        <Text style={s.sectionTitle}>SUPPORT</Text>
        <View style={s.card}>
          <SettingRow
            icon="help-circle"
            title="Help Center"
            subtitle="Get help and support"
            color={C.blue}
          />
          <SettingRow
            icon="chatbubble"
            title="Contact Us"
            subtitle="We're here to help"
            color={C.green}
          />
          <SettingRow
            icon="log-out-outline"
            title="Log Out"
            subtitle="Sign out of your account"
            color={C.red}
            last
          />
        </View>

        <Text style={s.version}>App Version 1.2.0</Text>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: C.offWhite,
  },

  header: {
    backgroundColor: C.navy,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 28,
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 22,
  },

  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconButtonGhost: {
    width: 42,
    height: 42,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: C.white,
  },

  profilePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    paddingHorizontal: 26,
  },

  avatar: {
    width: 78,
    height: 78,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  name: {
    fontSize: 19,
    fontWeight: '800',
    color: C.white,
    letterSpacing: -0.4,
  },

  email: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.65)',
    marginTop: 4,
  },

  classTag: {
    alignSelf: 'flex-start',
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(168,153,104,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(168,153,104,0.35)',
  },

  classText: {
    fontSize: 11,
    fontWeight: '700',
    color: C.gold,
    letterSpacing: 1,
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 24,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: C.gray700,
    letterSpacing: 1.2,
    marginLeft: 10,
    marginBottom: 12,
    marginTop: 8,
  },

  card: {
    backgroundColor: C.white,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },

  settingRow: {
    minHeight: 78,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: C.gray100,
  },

  settingIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: C.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  settingTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: C.gray700,
  },

  settingSubtitle: {
    fontSize: 13,
    color: C.gray500,
    marginTop: 3,
  },

  settingValue: {
    fontSize: 13,
    fontWeight: '800',
    color: C.navy,
    marginRight: 2,
  },

  version: {
    textAlign: 'center',
    fontSize: 13,
    color: '#A0A4B3',
    marginTop: -10,
  },
});