import { loginSuccess } from '@store/authSlice';
import { useAppDispatch } from '@store/index';
import colors from '@theme/colors';
import { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function LoginScreen() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState(false);

  const emailValid = /\S+@\S+\.\S+/.test(email);
  const passValid = password.length >= 4;
  const nameValid = name.trim().length >= 2;
  const formValid = emailValid && passValid && nameValid;

  function onSubmit() {
    setTouched(true);
    if (!formValid) {
      Alert.alert('Campos inválidos', 'Preencha nome, email e senha (mín. 4 caracteres).');
      return;
    }
    
    dispatch(loginSuccess({ name, email }));
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.select({ ios: 'padding', android: undefined })}>
      <View style={styles.imageWrapper}>
        <Image 
          source={require('src/img/icone.png')}
          style={styles.image}
        />
      </View>
      
      <Text style={styles.subtitle}>Entre para ver os produtos</Text>

      <TextInput
        placeholder="Seu nome"
        placeholderTextColor={colors.subtext}
        style={[styles.input, touched && !nameValid && styles.inputError]}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="email@exemplo.com"
        placeholderTextColor={colors.subtext}
        autoCapitalize='none'
        keyboardType='email-address'
        style={[styles.input, touched && !emailValid && styles.inputError]}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor={colors.subtext}
        secureTextEntry={true} // importante para ocultar a senha
        autoCapitalize="none"
        keyboardType="default" // garante que o teclado normal seja usado
        style={[styles.input, touched && !passValid && styles.inputError]}
        value={password}
        onChangeText={setPassword}
      />

      <Pressable onPress={onSubmit} style={({ pressed }) => [styles.button, pressed && { opacity: 0.85 }]}>
        <Text style={styles.buttonText}>Entrar</Text>
      </Pressable>

      <Text style={styles.helper}>* Login simulado. Dados ficam apenas em memória.</Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20, justifyContent: 'center'},
  imageWrapper: { alignItems: 'center', marginBottom: 20 },
  image: { width: 300, height: 300, resizeMode: 'contain'},
  title: { color: colors.text, fontSize: 28, fontWeight: '800', marginBottom: 8 },
  subtitle: { color: colors.subtext, marginBottom: 24 },
  input: {
    backgroundColor: '#e4e4e4ff',
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  inputError: { borderColor: '#ef4444' },
  button: { backgroundColor: colors.primary, paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 4 },
  buttonText: { color: '#0a0a0a', fontSize: 16, fontWeight: '800' },
  helper: { color: colors.subtext, marginTop: 12, fontSize: 12, textAlign: 'center' }
});