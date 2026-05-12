import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const C = {
  navy: '#004C9D', navyDeep: '#00264D', navyDark: '#003570',
  gold: '#A89968', white: '#FFFFFF', offWhite: '#F5F6FA',
  gray100: '#EEF0F5', gray200: '#E1E4EB', gray300: '#C5CAD4',
  gray500: '#7A8299', gray700: '#3D4256',
  green: '#3EAF6E', red: '#E05252',
};

const YEARS = ['Class of 2025', 'Class of 2026', 'Class of 2027', 'Class of 2028', 'Class of 2029'];

function Label({ text }: { text: string }) {
  return <Text style={s.label}>{text}</Text>;
}

function Field({ label, placeholder, value, onChangeText, secureTextEntry, keyboardType, hint, showToggle }: {
  label: string; placeholder: string; value: string; onChangeText: (v: string) => void;
  secureTextEntry?: boolean; keyboardType?: any; hint?: string; showToggle?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [show, setShow] = useState(false);
  return (
    <View style={{ gap: 6 }}>
      <Label text={label} />
      <View style={[s.inputWrap, focused && s.inputFocused]}>
        <TextInput
          style={s.input}
          placeholder={placeholder}
          placeholderTextColor={C.gray300}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !show}
          keyboardType={keyboardType}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoCapitalize="none"
        />
        {showToggle && (
          <TouchableOpacity onPress={() => setShow(!show)} style={{ padding: 4 }}>
            <Ionicons name={show ? 'eye' : 'eye-off'} size={18} color={C.gray500} />
          </TouchableOpacity>
        )}
      </View>
      {hint && <Text style={s.hint}>{hint}</Text>}
    </View>
  );
}

function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;
  const strength = password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const labels = ['', 'Weak', 'Good', 'Strong'];
  const colors = ['', C.red, C.gold, C.green];
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 }}>
      <View style={{ flex: 1, flexDirection: 'row', gap: 4 }}>
        {[1, 2, 3].map(i => (
          <View key={i} style={[s.strengthBar, { backgroundColor: i <= strength ? colors[strength] : C.gray200 }]} />
        ))}
      </View>
      <Text style={[s.strengthLabel, { color: colors[strength] }]}>{labels[strength]}</Text>
    </View>
  );
}

function YearPicker({ selected, onSelect }: { selected: string; onSelect: (y: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <View style={{ gap: 6 }}>
      <Label text="Graduation Year" />
      <TouchableOpacity
        style={[s.inputWrap, open && s.inputFocused]}
        onPress={() => setOpen(!open)}
        activeOpacity={0.8}
      >
        <Text style={[s.input, { color: selected ? C.gray700 : C.gray300, flex: 1 }]}>
          {selected || 'Select graduation year'}
        </Text>
        <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={16} color={C.gray500} />
      </TouchableOpacity>
      {open && (
        <View style={s.dropdown}>
          {YEARS.map(y => (
            <TouchableOpacity
              key={y}
              style={[s.dropdownItem, selected === y && s.dropdownItemActive]}
              onPress={() => { onSelect(y); setOpen(false); }}
            >
              <Text style={[s.dropdownText, selected === y && s.dropdownTextActive]}>{y}</Text>
              {selected === y && <Ionicons name="checkmark" size={16} color={C.navy} />}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

export default function RegisterScreen() {
  const navigation = useNavigation<any>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [year, setYear] = useState('');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.navyDeep }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

        {/* Navy header */}
        <View style={s.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
            <Ionicons name="arrow-back" size={20} color="rgba(255,255,255,0.7)" />
            <Text style={s.backText}>Back</Text>
          </TouchableOpacity>
          <Text style={s.title}>Create Account</Text>
          <Text style={s.subtitle}>Join ZipTrip and start earning rewards</Text>
        </View>

        {/* Form */}
        <ScrollView style={{ flex: 1, backgroundColor: C.white }} contentContainerStyle={s.form} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <Field label="Full Name" placeholder="Your full name" value={name} onChangeText={setName} />
          <Field label="UA Email" placeholder="yourname@uakron.edu" value={email} onChangeText={setEmail} keyboardType="email-address" hint="Must be a valid @uakron.edu address" />
          <View>
            <Field label="Password" placeholder="Create a password" value={password} onChangeText={setPassword} secureTextEntry showToggle />
            <PasswordStrength password={password} />
          </View>
          <Field label="Confirm Password" placeholder="Confirm your password" value={confirm} onChangeText={setConfirm} secureTextEntry showToggle />
          <YearPicker selected={year} onSelect={setYear} />

          <Text style={s.terms}>
            By creating an account you agree to our{' '}
            <Text style={s.termsLink}>Terms of Service</Text> and{' '}
            <Text style={s.termsLink}>Privacy Policy</Text>
          </Text>

          <TouchableOpacity style={s.btnPrimary} onPress={() => navigation.navigate('MainTabs')} activeOpacity={0.85}>
            <Text style={s.btnPrimaryText}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ alignItems: 'center', paddingBottom: 24 }}>
            <Text style={s.loginText}>
              Already have an account? <Text style={s.loginLink}>Log In</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  header:             { backgroundColor: '#004C9D', paddingHorizontal: 24, paddingTop: 8, paddingBottom: 28 },
  backBtn:            { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 20 },
  backText:           { fontSize: 14, color: 'rgba(255,255,255,0.7)', fontWeight: '500' },
  title:              { fontSize: 26, fontWeight: '800', color: '#FFFFFF', letterSpacing: -0.5 },
  subtitle:           { fontSize: 14, color: 'rgba(255,255,255,0.55)', marginTop: 6 },
  form:               { padding: 24, gap: 16 },
  label:              { fontSize: 12, fontWeight: '600', color: '#7A8299', letterSpacing: 0.5, textTransform: 'uppercase' },
  inputWrap:          { height: 50, borderRadius: 12, borderWidth: 2, borderColor: '#E1E4EB', backgroundColor: '#EEF0F5', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14 },
  inputFocused:       { borderColor: '#004C9D' },
  input:              { flex: 1, fontSize: 15, color: '#3D4256' },
  hint:               { fontSize: 11, color: '#7A8299' },
  strengthBar:        { flex: 1, height: 4, borderRadius: 2 },
  strengthLabel:      { fontSize: 11, fontWeight: '600', minWidth: 40 },
  dropdown:           { backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: '#E1E4EB', overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 4 },
  dropdownItem:       { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14, borderBottomWidth: 1, borderBottomColor: '#EEF0F5' },
  dropdownItemActive: { backgroundColor: '#EEF0F5' },
  dropdownText:       { fontSize: 15, color: '#3D4256' },
  dropdownTextActive: { fontWeight: '600', color: '#004C9D' },
  terms:              { fontSize: 11, color: '#7A8299', textAlign: 'center', lineHeight: 18 },
  termsLink:          { color: '#004C9D', fontWeight: '600' },
  btnPrimary:         { height: 54, borderRadius: 14, backgroundColor: '#004C9D', alignItems: 'center', justifyContent: 'center' },
  btnPrimaryText:     { fontSize: 16, fontWeight: '700', color: '#FFFFFF', letterSpacing: 0.3 },
  loginText:          { fontSize: 13, color: '#7A8299' },
  loginLink:          { color: '#004C9D', fontWeight: '700' },
});