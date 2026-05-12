import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Rect } from 'react-native-svg';
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
  orange: '#E8883E',
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

function TopUser({
  rank,
  name,
  steps,
  avatar,
  featured,
}: {
  rank: number;
  name: string;
  steps: string;
  avatar: string;
  featured?: boolean;
}) {
  const badgeColor = rank === 1 ? C.gold : rank === 2 ? '#C9D2E0' : C.orange;

  return (
    <View style={[s.topUser, featured && { marginTop: -18 }]}>
      <View style={[s.topAvatarWrap, featured && s.topAvatarWrapFeatured]}>
        <Image source={{ uri: avatar }} style={[s.topAvatar, featured && s.topAvatarFeatured]} />
        <View style={[s.rankBubble, { backgroundColor: badgeColor }]}>
          <Text style={s.rankBubbleText}>{rank}</Text>
        </View>
      </View>

      <Text style={s.topName}>{name}</Text>
      <Text style={s.topSteps}>{steps}</Text>
      <Text style={s.topStepsLabel}>steps</Text>
    </View>
  );
}

function RankRow({
  rank,
  name,
  steps,
  avatar,
}: {
  rank: number;
  name: string;
  steps: string;
  avatar: string;
}) {
  return (
    <View style={s.rankRow}>
      <Text style={s.rankNumber}>{rank}</Text>
      <Image source={{ uri: avatar }} style={s.rowAvatar} />
      <Text style={s.rowName}>{name}</Text>

      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
        <Text style={s.rowSteps}>{steps}</Text>
        <Text style={s.rowStepsLabel}>steps</Text>
      </View>
    </View>
  );
}

function YouButton() {
  return (
    <TouchableOpacity style={s.youCard} activeOpacity={0.85}>
      <View style={s.youBadge}>
        <Ionicons name="star" size={16} color={C.white} />
        <Text style={s.youBadgeText}>You</Text>
      </View>

      <Image source={{ uri: 'https://i.pravatar.cc/90?img=47' }} style={s.youAvatar} />

      <View style={{ flex: 1 }}>
        <Text style={s.youTitle}>You</Text>
        <Text style={s.youSub}>Keep going!</Text>
      </View>

      <Text style={s.youRank}>24</Text>
      <View style={s.divider} />

      <View style={{ alignItems: 'flex-start' }}>
        <Text style={s.youSteps}>4,827</Text>
        <Text style={s.youStepsLabel}>steps</Text>
      </View>

      <Ionicons name="chevron-forward" size={22} color={C.navy} />
    </TouchableOpacity>
  );
}

const topThree = [
  { rank: 2, name: 'Maya L.', steps: '12,543', avatar: 'https://i.pravatar.cc/120?img=45' },
  { rank: 1, name: 'Ethan R.', steps: '15,842', avatar: 'https://i.pravatar.cc/120?img=11', featured: true },
  { rank: 3, name: 'Alex P.', steps: '11,205', avatar: 'https://i.pravatar.cc/120?img=15' },
];

const ranks = [
  { rank: 4, name: 'Sarah K.', steps: '10,487', avatar: 'https://i.pravatar.cc/80?img=47' },
  { rank: 5, name: 'Daniel M.', steps: '9,876', avatar: 'https://i.pravatar.cc/80?img=12' },
  { rank: 6, name: 'Olivia T.', steps: '9,123', avatar: 'https://i.pravatar.cc/80?img=32' },
  { rank: 7, name: 'James W.', steps: '8,654', avatar: 'https://i.pravatar.cc/80?img=14' },
  { rank: 8, name: 'Isabella H.', steps: '7,932', avatar: 'https://i.pravatar.cc/80?img=44' },
  { rank: 9, name: 'Noah B.', steps: '7,205', avatar: 'https://i.pravatar.cc/80?img=33' },
  { rank: 10, name: 'Ava G.', steps: '6,842', avatar: 'https://i.pravatar.cc/80?img=49' },
];

export default function LeaderboardScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: C.navy }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.scrollContentContainer}
        bounces={false}
        alwaysBounceVertical={false}
        overScrollMode="never"
      >
        <View style={s.header}>
          <SafeAreaView edges={['top']} style={{ backgroundColor: 'transparent' }}>
            <View style={s.topBar}>
              <Logo />

              <View style={s.coinBadge}>
                <MaterialCommunityIcons name="gold" size={18} color={C.gold} />
                <Text style={s.coinText}>35050</Text>
              </View>
            </View>
          </SafeAreaView>

          <View style={s.titleWrap}>
            <Text style={s.title}>Leaderboard</Text>
            <Text style={s.subtitle}>Today’s top campus walkers</Text>
          </View>

          <View style={s.segmentWrap}>
            <TouchableOpacity style={s.segmentActive}>
              <Text style={s.segmentActiveText}>Today</Text>
            </TouchableOpacity>

            <TouchableOpacity style={s.segment}>
              <Text style={s.segmentText}>Week</Text>
            </TouchableOpacity>
          </View>

          <View style={s.podium}>
            {topThree.map((user) => (
              <TopUser key={user.rank} {...user} />
            ))}
          </View>
        </View>

        <View style={s.rankCard}>
          <View style={{ padding: 14 }}>
            <YouButton />
          </View>

          {ranks.map((rank, index) => (
            <View key={rank.rank}>
              <RankRow {...rank} />
              {index !== ranks.length - 1 && <View style={s.rowLine} />}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({

  goldBar: {
  width: 50,
  height: 18,
  backgroundColor: C.gold,
  borderRadius: 5,
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
  paddingHorizontal: 28, // 👈 pushes logo away from edge
  paddingBottom: 52,
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

  coinBadge: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 6,
  backgroundColor: 'rgba(168,153,104,0.18)',
  borderRadius: 24,
  paddingVertical: 6,
  paddingHorizontal: 14,
  borderWidth: 1,
  borderColor: 'rgba(168,153,104,0.25)',
},

  coinText: {
  fontSize: 16,
  fontWeight: '800',
  color: C.gold,
},

  titleWrap: {
    alignItems: 'center',
    marginTop: 34,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: C.white,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.62)',
    fontWeight: '500',
    marginTop: 6,
    textAlign: 'center',
  },

  segmentWrap: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 10,
    padding: 3,
    width: '68%',
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  segmentActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: C.white,
  },
  segmentText: {
    color: C.white,
    fontSize: 12,
    fontWeight: '700',
  },
  segmentActiveText: {
    color: C.navy,
    fontSize: 12,
    fontWeight: '800',
  },

  podium: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 34,
    paddingHorizontal: 8,
  },
  topUser: {
    flex: 1,
    alignItems: 'center',
  },
  topAvatarWrap: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topAvatarWrapFeatured: {
    width: 78,
    height: 78,
    borderRadius: 39,
    borderColor: C.gold,
    borderWidth: 3,
  },
  topAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  topAvatarFeatured: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  rankBubble: {
    position: 'absolute',
    right: -9,
    bottom: -5,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankBubbleText: {
    color: C.white,
    fontSize: 13,
    fontWeight: '800',
  },
  topName: {
    color: C.white,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 10,
  },
  topSteps: {
    color: C.white,
    fontSize: 20,
    fontWeight: '800',
    marginTop: 4,
    letterSpacing: -0.3,
  },
  topStepsLabel: {
    color: 'rgb(255, 255, 255)',
    fontSize: 12,
    fontWeight: '500',
  },

  scrollContentContainer: {
    paddingBottom: 24,
    backgroundColor: C.offWhite,
  },

 rankCard: {
  backgroundColor: C.offWhite,
  marginTop: 0,
  paddingTop: 24,
  paddingHorizontal: 0,
  marginHorizontal: 0,
  width: '100%',
  borderRadius: 0,
  shadowOpacity: 0,
  elevation: 0,

 },
  
 rankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 54,
    paddingHorizontal: 18,
    gap: 12,
  },
  rankNumber: {
    width: 22,
    fontSize: 14,
    fontWeight: '700',
    color: C.gray700,
    textAlign: 'center',
  },
  rowAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  rowName: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    color: C.gray700,
  },
  rowSteps: {
    fontSize: 14,
    fontWeight: '800',
    color: C.navy,
  },
  rowStepsLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: C.gray500,
  },
  rowLine: {
    height: 1,
    backgroundColor: C.gray100,
    marginLeft: 66,
  },

  youCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#EAF3FF',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  youBadge: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: C.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  youBadgeText: {
    color: C.white,
    fontSize: 10,
    fontWeight: '800',
    marginTop: 1,
  },
  youAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  youTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: C.gray700,
  },
  youSub: {
    fontSize: 11,
    color: C.gray500,
    marginTop: 1,
  },
  youRank: {
    fontSize: 17,
    fontWeight: '800',
    color: C.navy,
  },
  divider: {
    width: 1,
    height: 28,
    backgroundColor: '#D6E3F5',
  },
  youSteps: {
    fontSize: 15,
    fontWeight: '800',
    color: C.navy,
  },
  youStepsLabel: {
    fontSize: 11,
    color: C.gray500,
    marginTop: -1,
  },
});
