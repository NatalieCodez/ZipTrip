import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path, Rect } from 'react-native-svg';


const C = { navy: '#004C9D', navyDeep: '#00264D', gold: '#A89968', white: '#FFFFFF' };

function Logo() {
  return (
    <View style={s.logoWrap}>
      <Svg width={56} height={60} viewBox="0 0 26 28">
        <Rect x="0" y="0" width="26" height="28" rx="7" fill="rgba(255,255,255,0.15)" />
        <Path d="M15 3L6 15h7l-2 10 11-14h-7l2-8z" fill={C.gold} />
      </Svg>
      <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
        <Text style={s.logoZip}>Zip</Text>
        <Text style={s.logoTrip}>Trip</Text>
      </View>
    </View>
  );
}

export default function LandingScreen() {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView style={s.container}>
      <StatusBar style="light" />
      <View style={s.content}>
        <Logo />
        <Text style={s.tagline}>Finding your way one step at a time.</Text>
        <Text style={s.sub}>Navigate campus, collect ZipCoins, and arrive on time.</Text>
        <View style={s.divider} />
        <View style={s.buttons}>
          <TouchableOpacity style={s.btnPrimary} onPress={() => navigation.navigate('Home')} activeOpacity={0.85}>
            <Text style={s.btnPrimaryText}>Get Started</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.btnSecondary} onPress={() => navigation.navigate('Home')} activeOpacity={0.85}>
            <Text style={s.btnSecondaryText}>Log In</Text>
          </TouchableOpacity>
        </View>
        <Text style={s.footer}>University of Akron students only</Text>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#00264D' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  logoWrap: { alignItems: 'center', gap: 14 },
  logoZip: { fontSize: 42, fontWeight: '800', color: '#FFFFFF', letterSpacing: -1 },
  logoTrip: { fontSize: 42, fontWeight: '800', color: '#A89968', letterSpacing: -1 },
  tagline: { fontSize: 15, color: 'rgba(255,255,255,0.55)', textAlign: 'center', lineHeight: 22, marginTop: 28 },
  sub: { fontSize: 13, color: 'rgba(255,255,255,0.3)', textAlign: 'center', lineHeight: 20, marginTop: 10, maxWidth: 240 },
  divider: { width: 40, height: 2, backgroundColor: 'rgba(168,153,104,0.4)', borderRadius: 2, marginVertical: 36 },
  buttons: { width: '100%', gap: 12 },
  btnPrimary: { width: '100%', height: 54, borderRadius: 14, backgroundColor: '#A89968', alignItems: 'center', justifyContent: 'center' },
  btnPrimaryText: { fontSize: 16, fontWeight: '700', color: '#00264D', letterSpacing: 0.3 },
  btnSecondary: { width: '100%', height: 54, borderRadius: 14, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center' },
  btnSecondaryText: { fontSize: 16, fontWeight: '600', color: '#FFFFFF', letterSpacing: 0.3 },
  footer: { fontSize: 11, color: 'rgba(255,255,255,0.2)', marginTop: 24, textAlign: 'center' },
});