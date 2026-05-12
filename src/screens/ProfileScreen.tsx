import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';

const C = {
  navy: '#004C9D', navyDeep: '#00264D',
  gold: '#A89968', white: '#FFFFFF', offWhite: '#F5F6FA',
  gray100: '#EEF0F5', gray200: '#E1E4EB', gray500: '#7A8299', gray700: '#3D4256',
  green: '#3EAF6E', blue: '#3B82F6', orange: '#E8883E',
};

function LevelRing({ level, progress }: { level: number; progress: number }) {
  const r = 50, circ = 2 * Math.PI * r;

  return (
    <View style={{ width: 120, height: 120, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={120} height={120} viewBox="0 0 120 120" style={{ transform: [{ rotate: '-90deg' }] }}>
        <Circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="8" />
        <Circle cx="60" cy="60" r={r} fill="none" stroke={C.gold} strokeWidth="8" strokeDasharray={circ} strokeDashoffset={circ * (1 - progress)} strokeLinecap="round" />
      </Svg>
      <View style={{ position: 'absolute', alignItems: 'center' }}>
        <Text style={s.levelNumber}>{level}</Text>
        <Text style={s.levelLabel}>Level</Text>
      </View>
    </View>
  );
}

function StatCard({ icon, value, label }: { icon: string; value: string; label: string }) {
  return (
    <TouchableOpacity style={s.statCard}>
      <Ionicons name={icon as any} size={22} color={C.gold} style={{ marginBottom: 8 }} />
      <Text style={s.statValue}>{value}</Text>
      <Text style={s.statLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

function ActivityRow({ icon, label, value, iconColor, last }: any) {
  return (
    <View style={[s.activityRow, last && { borderBottomWidth: 0 }]}>
      <View style={s.activityIcon}>
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>
      <Text style={s.activityLabel}>{label}</Text>
      <Text style={s.activityValue}>{value}</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={{ flex: 1, backgroundColor: C.offWhite }}>
      <StatusBar style="light" />

      <View style={s.header}>
        <SafeAreaView edges={['top']} style={{ backgroundColor: 'transparent' }}>
          
          {/* 🔥 FIXED TOP BAR */}
          <View style={s.topBar}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={s.iconButton}>
              <Ionicons name="arrow-back" size={20} color="rgba(255,255,255,0.8)" />
            </TouchableOpacity>

            <Text style={s.headerTitle}>Profile</Text>

            <TouchableOpacity
              style={s.iconButton}
              onPress={() => navigation.navigate('Settings')}
            >
              <Ionicons name="ellipsis-vertical" size={20} color="rgba(255,255,255,0.8)" />
            </TouchableOpacity>
          </View>

        </SafeAreaView>

        <View style={s.profileContent}>
          <View style={{ position: 'relative', marginBottom: 12 }}>
            <View style={s.avatar}>
              <Ionicons name="person-outline" size={32} color="rgba(255,255,255,0.85)" />
            </View>
            <TouchableOpacity style={s.avatarEditBtn}>
              <Ionicons name="create-outline" size={16} color={C.navyDeep} />
            </TouchableOpacity>
          </View>

          <Text style={s.name}>Natalie Langevoort</Text>
          <Text style={s.email}>natalie.langevoort@uakron.edu</Text>

          <View style={s.classTag}>
            <Text style={s.classText}>CLASS OF 2026</Text>
          </View>

          <View style={s.statsRow}>
            <StatCard icon="sparkles" value="342" label="COINS" />
            <StatCard icon="medal-outline" value="28" label="BADGES" />
            <StatCard icon="flame" value="7" label="STREAK" />
          </View>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={s.content}>
        <Text style={s.sectionTitle}>This Week</Text>
        <View style={s.card}>
          <ActivityRow icon="footsteps" label="Total Steps" value="42,837" iconColor={C.navy} />
          <ActivityRow icon="navigate" label="Distance" value="18.2 mi" iconColor={C.blue} />
          <ActivityRow icon="time" label="Active Time" value="4h 32m" iconColor={C.green} />
          <ActivityRow icon="sparkles" label="Coins Earned" value="127" iconColor={C.gold} last />
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  header: { backgroundColor: C.navy, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, paddingBottom: 24 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 8, paddingBottom: 16 },
  iconButton: { width: 36, height: 36, borderRadius: 11, backgroundColor: 'rgba(255,255,255,0.1)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 16, fontWeight: '600', color: C.white },
  profileContent: { alignItems: 'center', paddingHorizontal: 20 },
  avatar: { width: 80, height: 80, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.12)', borderWidth: 4, borderColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center' },
  avatarEditBtn: { position: 'absolute', bottom: -4, right: -4, width: 30, height: 30, borderRadius: 10, backgroundColor: C.gold, borderWidth: 3, borderColor: C.navy, alignItems: 'center', justifyContent: 'center' },
  name: { fontSize: 22, fontWeight: '700', color: C.white, marginTop: 12 },
  email: { fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 4 },
  classTag: { marginTop: 10, paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, backgroundColor: 'rgba(168,153,104,0.2)' },
  classText: { fontSize: 11, fontWeight: '600', color: C.gold },
  statsRow: { flexDirection: 'row', gap: 12, width: '100%', marginTop: 20 },
  statCard: { flex: 1, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 16, padding: 14, alignItems: 'center' },
  statValue: { fontSize: 22, fontWeight: '700', color: C.white },
  statLabel: { fontSize: 9, color: 'rgba(255,255,255,0.45)' },
  content: { padding: 18 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: C.gray700, marginBottom: 12 },
  card: { backgroundColor: C.white, borderRadius: 14 },
  activityRow: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12, borderBottomWidth: 1, borderBottomColor: C.gray100 },
  activityIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: C.gray100, alignItems: 'center', justifyContent: 'center' },
  activityLabel: { flex: 1, fontSize: 14, color: C.gray700 },
  activityValue: { fontSize: 15, fontWeight: '700', color: C.navy },
  
  levelNumber: {
  fontSize: 36,
  fontWeight: '700',
  color: C.white,
  letterSpacing: -1,
},

levelLabel: {
  fontSize: 12,
  color: 'rgba(255,255,255,0.5)',
  fontWeight: '600',
  marginTop: -2,
},
});