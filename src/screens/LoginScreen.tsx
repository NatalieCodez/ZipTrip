import { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity,
  ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const C = {
  navy: '#004C9D', navyDeep: '#00264D', navyDark: '#003570',
  gold: '#A89968', white: '#FFFFFF', offWhite: '#F5F6FA',
  gray100: '#EEF0F5', gray200: '#E1E4EB', gray300: '#C5CAD4',
  gray500: '#7A8299', gray700: '#3D4256',
};

function Label({ text }: { text: string }) {
  return <Text style={s.label}>{text}</Text>;
}

function Field({ label, placeholder, value, onChangeText, secureTextEntry, keyboardType, showToggle }: {
  label: string; placeholder: string; value: string; onChangeText: (v: string) => void;
  secureTextEntry?: boolean; keyboardType?: any; showToggle?: boolean;
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
    </View>
  );
}

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
          <Text style={s.title}>Welcome Back</Text>
          <Text style={s.subtitle}>Log in to continue your journey</Text>
        </View>

        {/* Form */}
        <ScrollView 
          style={{ flex: 1, backgroundColor: C.white }} 
          contentContainerStyle={s.form} 
          keyboardShouldPersistTaps="handled" 
          showsVerticalScrollIndicator={false}
        >
          <Field 
            label="UA Email" 
            placeholder="yourname@uakron.edu" 
            value={email} 
            onChangeText={setEmail} 
            keyboardType="email-address" 
          />
          
          <Field 
            label="Password" 
            placeholder="Enter your password" 
            value={password} 
            onChangeText={setPassword} 
            secureTextEntry 
            showToggle 
          />

          <TouchableOpacity style={{ alignSelf: 'flex-end', marginTop: -8 }}>
            <Text style={s.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={s.btnPrimary} 
            onPress={() => navigation.navigate('MainTabs')} 
            activeOpacity={0.85}
          >
            <Text style={s.btnPrimaryText}>Log In</Text>
          </TouchableOpacity>

          <View style={s.divider}>
            <View style={s.dividerLine} />
            <Text style={s.dividerText}>OR</Text>
            <View style={s.dividerLine} />
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{ alignItems: 'center', paddingBottom: 24 }}>
            <Text style={s.registerText}>
              Don't have an account? <Text style={s.registerLink}>Sign Up</Text>
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
  form:               { padding: 24, gap: 20 },
  label:              { fontSize: 12, fontWeight: '600', color: '#7A8299', letterSpacing: 0.5, textTransform: 'uppercase' },
  inputWrap:          { height: 50, borderRadius: 12, borderWidth: 2, borderColor: '#E1E4EB', backgroundColor: '#EEF0F5', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14 },
  inputFocused:       { borderColor: '#004C9D' },
  input:              { flex: 1, fontSize: 15, color: '#3D4256' },
  forgotText:         { fontSize: 13, color: '#004C9D', fontWeight: '600' },
  btnPrimary:         { height: 54, borderRadius: 14, backgroundColor: '#004C9D', alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  btnPrimaryText:     { fontSize: 16, fontWeight: '700', color: '#FFFFFF', letterSpacing: 0.3 },
  divider:            { flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 8 },
  dividerLine:        { flex: 1, height: 1, backgroundColor: '#E1E4EB' },
  dividerText:        { fontSize: 12, color: '#7A8299', fontWeight: '600' },
  registerText:       { fontSize: 13, color: '#7A8299' },
  registerLink:       { color: '#004C9D', fontWeight: '700' },
});