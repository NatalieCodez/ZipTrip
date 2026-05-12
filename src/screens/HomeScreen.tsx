import React, { useEffect, useRef } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

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
  greenLight: '#E8F8EF',
  orange: '#E8883E',
  orangeLight: '#FFF3E8',
  blue: '#3B82F6',
  blueLight: '#EBF2FF',
};

function Logo() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 9 }}>
      <Svg width={26} height={28} viewBox="0 0 26 28">
        <Rect x="0" y="0" width="26" height="28" rx="7" fill="rgba(255,255,255,0.12)" />
        <Path d="M15 3L6 15h7l-2 10 11-14h-7l2-8z" fill={C.gold} />
      </Svg>

      <View style={{ flexDirection: 'row' }}>
        <Text style={s.logoZip}>Zip</Text>
        <Text style={s.logoTrip}>Trip</Text>
      </View>
    </View>
  );
}

function StepRing({ steps, goal }: { steps: number; goal: number }) {
  const anim = useRef(new Animated.Value(0)).current;
  const progress = Math.min(steps / goal, 1);
  const r = 88;
  const circ = 2 * Math.PI * r;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: progress,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  }, [anim, progress]);

  return (
    <View style={s.stepRingWrap}>
      <Svg width={210} height={210} viewBox="0 0 210 210" style={{ transform: [{ rotate: '-90deg' }] }}>
        <Circle
          cx="105"
          cy="105"
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="13"
          strokeLinecap="round"
        />
        <Circle
          cx="105"
          cy="105"
          r={r}
          fill="none"
          stroke={C.gold}
          strokeWidth="13"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - progress)}
        />
      </Svg>

      <View style={s.stepCenter}>
        <Text style={s.stepCount}>{steps.toLocaleString()}</Text>
        <Text style={s.stepLabel}>of {goal.toLocaleString()} steps</Text>
      </View>
    </View>
  );
}

function Pill({
  icon,
  value,
  label,
  bg,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  bg: string;
}) {
  return (
    <View style={s.pill}>
      <View style={[s.pillIcon, { backgroundColor: bg }]}>{icon}</View>
      <Text style={s.pillValue}>{value}</Text>
      <Text style={s.pillLabel}>{label}</Text>
    </View>
  );
}

function QA({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <TouchableOpacity style={s.qa} activeOpacity={0.85}>
      <View style={s.qaIcon}>{icon}</View>
      <Text style={s.qaLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

function Card({
  icon,
  bg,
  title,
  sub,
  value,
  color,
  check,
}: {
  icon: React.ReactNode;
  bg: string;
  title: string;
  sub: string;
  value: string;
  color: string;
  check?: boolean;
}) {
  return (
    <View style={s.card}>
      <View style={[s.cardIcon, { backgroundColor: bg }]}>{icon}</View>

      <View style={{ flex: 1 }}>
        <Text style={s.cardTitle} numberOfLines={1}>
          {title}
        </Text>
        <Text style={s.cardSub}>{sub}</Text>
      </View>

      <View style={s.cardRight}>
        {check ? (
          <View style={s.checkBadge}>
            <Ionicons name="checkmark" size={15} color={C.blue} />
          </View>
        ) : (
          <Text style={[s.cardValue, { color }]}>{value}</Text>
        )}
      </View>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: C.navy }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        alwaysBounceVertical={false}
        overScrollMode="never"
        contentContainerStyle={s.scrollContentContainer}
      >
        <View style={s.header}>
          <SafeAreaView edges={['top']} style={{ backgroundColor: 'transparent' }}>
            <View style={s.topBar}>
              <Logo />

              <View style={s.avatar}>
                <Ionicons name="person" size={18} color={C.white} />
              </View>
            </View>
          </SafeAreaView>

          <View style={s.greetingWrap}>
            <Text style={s.greeting}>Welcome back</Text>
            <Text style={s.subGreeting}>Ready for your next ZipTrip?</Text>
          </View>

          <View style={s.ringWrap}>
            <StepRing steps={8420} goal={10000} />
          </View>

          <View style={s.pillRow}>
            <Pill
              icon={<Ionicons name="flame" size={17} color={C.orange} />}
              value="421"
              label="CALORIES"
              bg={C.orangeLight}
            />
            <Pill
              icon={<Ionicons name="location" size={17} color={C.green} />}
              value="3.8 mi"
              label="DISTANCE"
              bg={C.greenLight}
            />
            <Pill
              icon={<MaterialCommunityIcons name="clock-outline" size={17} color={C.blue} />}
              value="74m"
              label="ACTIVE"
              bg={C.blueLight}
            />
          </View>
        </View>

        <View style={s.content}>
          <View style={s.quickActions}>
            <QA icon={<Ionicons name="map-outline" size={20} color={C.navy} />} label="Routes" />
            <QA icon={<Ionicons name="trophy-outline" size={20} color={C.navy} />} label="Goals" />
            <QA icon={<Ionicons name="notifications-outline" size={20} color={C.navy} />} label="Alerts" />
          </View>

          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>Today’s Activity</Text>
            <TouchableOpacity>
              <Text style={s.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={s.cardStack}>
            <Card
              icon={<Ionicons name="walk" size={21} color={C.green} />}
              bg={C.greenLight}
              title="Morning campus walk"
              sub="Completed at 9:42 AM"
              value="+2,840"
              color={C.green}
              check
            />

            <Card
              icon={<Ionicons name="flag" size={21} color={C.orange} />}
              bg={C.orangeLight}
              title="Daily step goal"
              sub="1,580 steps remaining"
              value="84%"
              color={C.orange}
            />

            <Card
              icon={<Ionicons name="trending-up" size={21} color={C.blue} />}
              bg={C.blueLight}
              title="Weekly progress"
              sub="You’re ahead of last week"
              value="+12%"
              color={C.blue}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  scrollContentContainer: {
    paddingBottom: 24,
    backgroundColor: C.offWhite,
  },

  logoZip: {
    fontSize: 18,
    fontWeight: '800',
    color: C.white,
    letterSpacing: -0.5,
  },
  logoTrip: {
    fontSize: 18,
    fontWeight: '800',
    color: C.gold,
    letterSpacing: -0.5,
  },

  header: {
    backgroundColor: C.navy,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
  },

  avatar: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  greetingWrap: {
    marginTop: 28,
    alignItems: 'center',
  },
  greeting: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.55)',
    fontWeight: '500',
  },
  subGreeting: {
    fontSize: 22,
    fontWeight: '800',
    color: C.white,
    marginTop: 4,
    letterSpacing: -0.3,
    textAlign: 'center',
  },

  ringWrap: {
    alignItems: 'center',
    marginTop: 18,
  },
  stepRingWrap: {
    width: 210,
    height: 210,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCenter: {
    position: 'absolute',
    alignItems: 'center',
  },
  stepCount: {
    fontSize: 40,
    fontWeight: '800',
    color: C.white,
    letterSpacing: -1,
    lineHeight: 46,
  },
  stepLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '500',
    marginTop: 2,
  },

  pillRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  pill: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 14,
    padding: 11,
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  pillIcon: {
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillValue: {
    fontSize: 14,
    fontWeight: '700',
    color: C.white,
  },
  pillLabel: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.45)',
    fontWeight: '500',
    letterSpacing: 0.5,
  },

  content: {
    paddingHorizontal: 14,
    paddingTop: 16,
    gap: 14,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 10,
  },
  qa: {
    flex: 1,
    alignItems: 'center',
    gap: 7,
    padding: 11,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: C.gray200,
    backgroundColor: C.white,
  },
  qaIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: 'rgba(0,76,157,0.07)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qaLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: C.gray700,
    letterSpacing: 0.2,
  },

  sectionHeader: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: C.gray700,
  },
  seeAll: {
    fontSize: 12,
    fontWeight: '600',
    color: C.navy,
  },

  cardStack: {
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    backgroundColor: C.white,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: C.gray700,
  },
  cardSub: {
    fontSize: 11,
    color: C.gray500,
    marginTop: 1,
  },
  cardRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  cardValue: {
    fontSize: 13,
    fontWeight: '700',
  },
  checkBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: C.blueLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
