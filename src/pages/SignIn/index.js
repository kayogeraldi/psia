import React, { useState } from 'react';
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

export default function SignIn(){
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    // Previne o comportamento padrão do formulário
    if (event) {
      event.preventDefault();
    }

    // Validação básica de email e senha
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      setLoading(true);
      // Usando o AuthService para fazer login
      const authData = await AuthService.login(email, password);
      
      // Navegar para a tab de Home
      navigation.navigate('Quiz', { screen: 'Home' });
    } catch (error) {
      // Tratamento de erro de login
      Alert.alert('Erro', error.response?.data?.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  }

  return(
    <Background>
      {/* Envolvendo o conteúdo com um componente de formulário */}
      <Container
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        enabled
        onSubmit={handleSubmit}
      >
        <Logo
          source={require('../../assets/1.png')}
        />

        <AreaInput>
          <Input
            placeholder="Seu email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => {/* Foco no próximo input */}}
          />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder="Sua senha"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
          />
        </AreaInput>

        <SubmitButton 
          activeOpacity={0.8} 
          onPress={handleSubmit}
        >
          {
            loading ? (
              <ActivityIndicator size={20} color="#FFF" />
            ) : (
              <SubmitText>Acessar</SubmitText>
            ) 
          }
        </SubmitButton>

        <Link onPress={() => navigation.navigate('SignUp')}>
          <LinkText>Criar uma conta!</LinkText>
        </Link>

      </Container>
    </Background>
  )
}