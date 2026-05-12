import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const C = {
  navy: '#004C9D',
  navyDeep: '#00264D',
  white: '#FFFFFF',
  offWhite: '#F5F6FA',
  gray100: '#EEF0F5',
  gray200: '#E1E4EB',
  gray500: '#7A8299',
  gray700: '#3D4256',
};

const destinations = [
  {
    name: "Rob’s Café",
    area: 'Student Union',
    description: 'Great food and coffee on campus.',
    checkIns: 89,
    icon: 'cafe-outline',
  },
  {
    name: 'Student Union',
    area: 'Central Campus',
    description: 'Hang out, eat, and get involved.',
    checkIns: 156,
    icon: 'business-outline',
  },
  {
    name: 'Bierce Library',
    area: 'Central Campus',
    description: 'Study space and resources.',
    checkIns: 102,
    icon: 'book-outline',
  },
  {
    name: 'Student Recreation Center',
    area: 'West Campus',
    description: 'Fitness, sports, and wellness.',
    checkIns: 78,
    icon: 'barbell-outline',
  },
  {
    name: 'Polsky Fountain',
    area: 'Central Campus',
    description: 'Campus landmark and hangout spot.',
    checkIns: 64,
    icon: 'water-outline',
  },
];

function DestinationRow({ item, last }: any) {
  return (
    <TouchableOpacity style={s.destinationRow} activeOpacity={0.82}>
      <View style={s.iconBox}>
        <Ionicons name={item.icon} size={28} color={C.navyDeep} />
      </View>

      <View style={s.destinationInfo}>
        <Text style={s.destinationTitle}>{item.name}</Text>

        <View style={s.locationRow}>
          <Ionicons name="location" size={13} color={C.gray500} />
          <Text style={s.area}>{item.area}</Text>
        </View>

        <Text style={s.description}>{item.description}</Text>
      </View>

      <View style={s.checkIns}>
        <View style={s.checkTopRow}>
          <Ionicons name="people-outline" size={16} color={C.navy} />
          <Text style={s.checkNumber}>{item.checkIns}</Text>
        </View>

        <Text style={s.checkText}>checked in today</Text>
      </View>

      <Ionicons name="chevron-forward" size={22} color={C.gray500} />

    </TouchableOpacity>
  );
}

export default function MapScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={s.screen}>
      <StatusBar style="light" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.scrollContent}
        bounces={false}
        alwaysBounceVertical={false}
        overScrollMode="never"
      >
        <View style={s.header}>
          <SafeAreaView edges={['top']} style={{ backgroundColor: 'transparent' }}>
            <View style={s.topBar}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={s.backButton}
              >
                <Ionicons name="chevron-back" size={24} color={C.white} />
              </TouchableOpacity>

              <Text style={s.headerTitle}>Find a Destination</Text>

              <View style={s.headerSpacer} />
            </View>
          </SafeAreaView>

          <View style={s.searchBar}>
            <Ionicons name="search" size={24} color={C.gray500} />

            <TextInput
              value="FOLK HALL"
              editable={false}
              style={s.searchInput}
            />

            <TouchableOpacity style={s.clearButton}>
              <Ionicons name="close" size={16} color={C.white} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={s.content}>
          <Text style={s.sectionTitle}>Top Result</Text>

          <TouchableOpacity style={s.topCard} activeOpacity={0.82}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=900&auto=format&fit=crop',
              }}
              style={s.topImage}
            />

            <View style={s.topInfo}>
              <Text style={s.topTitle}>Folk Hall</Text>

              <View style={s.locationRow}>
                <Ionicons name="location" size={14} color={C.gray500} />
                <Text style={s.area}>East Campus</Text>
              </View>

              <Text style={s.topDescription}>
                Classrooms, labs, and offices for engineering students.
              </Text>

              <View style={s.topFooter}>
                <View style={s.inlineCheck}>
                  <Ionicons
                    name="people-outline"
                    size={18}
                    color={C.navy}
                  />

                  <Text style={s.topCheckNumber}>124</Text>

                  <Text style={s.inlineCheckText}>
                    checked in today
                  </Text>
                </View>

                  <Ionicons
                    name="chevron-forward"
                    size={22}
                    color={C.gray500}
                    style={{
                      marginLeft: 'auto',
                      paddingLeft: 12,
                    }}
                   />
              </View>
            </View>
          </TouchableOpacity>

          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>
              Popular Destinations on Campus
            </Text>

            <TouchableOpacity activeOpacity={0.75}>
              <Text style={s.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={s.listCard}>
            {destinations.map((item, index) => (
              <DestinationRow
                key={item.name}
                item={item}
                last={index === destinations.length - 1}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: C.navy,
  },

  scrollContent: {
    backgroundColor: C.offWhite,
    paddingBottom: Platform.OS === 'ios' ? 120 : 95,
  },

  header: {
    backgroundColor: C.navy,
    paddingHorizontal: 18,
    paddingBottom: 28,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 20,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerSpacer: {
    width: 44,
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: C.white,
  },

  searchBar: {
    height: 58,
    borderRadius: 16,
    backgroundColor: C.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12,
  },

  searchInput: {
    flex: 1,
    fontSize: 17,
    fontWeight: '500',
    color: '#151A2E',
    paddingVertical: 0,
  },

  clearButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#B2B8C8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 24,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: C.navyDeep,
    marginBottom: 14,
  },

  topCard: {
    flexDirection: 'row',
    backgroundColor: C.white,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 28,
    minHeight: 220,
  },

  topImage: {
    width: '45%',
    height: 220,
  },

  topInfo: {
    flex: 1,
    padding: 18,
  },

  topTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: C.navyDeep,
    marginBottom: 8,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  area: {
    fontSize: 13,
    fontWeight: '600',
    color: C.gray500,
  },

  topDescription: {
    fontSize: 14,
    lineHeight: 21,
    color: C.gray700,
    fontWeight: '500',
    marginTop: 14,
    marginBottom: 18,
  },

  topFooter: {
  borderTopWidth: 1,
  borderTopColor: C.gray200,
  paddingTop: 14,
  flexDirection: 'row',
  alignItems: 'center',
},

topArrow: {
  marginLeft: 'auto',
  paddingLeft: 16,
},

 inlineCheck: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  width: '85%',
},

  topCheckNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: C.navy,
  },
  
inlineCheckText: {
  fontSize: 12,
  fontWeight: '600',
  color: C.navyDeep,
},

  sectionHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 14,
},

seeAll: {
  fontSize: 15,
  fontWeight: '700',
  color: C.navy,
},

  listCard: {
  gap: 14,
},

destinationRow: {
  minHeight: 106,
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 18,
  paddingVertical: 14,
  gap: 14,
  backgroundColor: C.white,
  borderRadius: 18,
},

  iconBox: {
    width: 58,
    height: 58,
    borderRadius: 16,
    backgroundColor: C.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  destinationInfo: {
    flex: 1,
    minWidth: 0,
  },

  destinationTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: C.navyDeep,
    marginBottom: 5,
  },

  description: {
    fontSize: 13,
    fontWeight: '500',
    color: C.gray700,
    lineHeight: 18,
    marginTop: 6,
  },

  checkIns: {
    width: 86,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  checkNumber: {
    fontSize: 17,
    fontWeight: '800',
    color: C.navy,
  },

  checkText: {
    fontSize: 10,
    fontWeight: '600',
    color: C.navyDeep,
    textAlign: 'center',
    lineHeight: 13,
    marginTop: 2,
  },

});