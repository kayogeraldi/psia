// src/pages/SignIn/index.js
import React, { useState, useContext } from 'react';
import { Platform, ActivityIndicator, Alert } from 'react-native';
import { 
  Background, 
  Container, 
  Logo, 
  AreaInput, 
  Input, 
  SubmitButton, 
  SubmitText,
  Link,
  LinkText
} from './styles';
import { useNavigation } from '@react-navigation/native';
import AuthService from '../../api/services/authServices';
import { AuthContext } from '../../contexts/AuthContext';

export default function SignIn() {
  const navigation = useNavigation();
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      setLoading(true);
      const authData = await AuthService.login(email, password);
      if (authData && authData.token) {
        // Atualiza o contexto com a nova autenticação
        setIsAuthenticated(true);
        setUser(authData.user);
      }
    } catch (error) {
      Alert.alert(
        'Erro', 
        error.response?.data?.message || 'Erro ao fazer login'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Background>
      <Container
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        enabled
        onSubmit={handleSubmit}
      >
        <Logo source={require('../../assets/1.png')} />

        <AreaInput>
          <Input
            placeholder="Seu email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
          />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder="Sua senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
          />
        </AreaInput>

        <SubmitButton activeOpacity={0.8} onPress={handleSubmit}>
          {loading ? (
            <ActivityIndicator size={20} color="#FFF" />
          ) : (
            <SubmitText>Acessar</SubmitText>
          )}
        </SubmitButton>

        <Link onPress={() => navigation.navigate('SignUp')}>
          <LinkText>Criar uma conta!</LinkText>
        </Link>
      </Container>
    </Background>
  );
}
