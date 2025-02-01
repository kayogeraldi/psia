import React, { useState } from 'react';
import { Platform, ActivityIndicator, Alert } from 'react-native';
import { 
  AreaInput, 
  Background, 
  Title, 
  Container, 
  Input, 
  SubmitButton, 
  SubmitText, 
  Link, 
  LinkText 
} from '../SignIn/styles';
import { useNavigation } from '@react-navigation/native';
import AuthService from '../../api/services/authServices';

export default function SignUp() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  async function handleSignUp() {
    // Validação básica dos campos
    if (!nome || !email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      setLoading(true);
      
      // Usando o novo AuthService para registro
      const userData = {
        name: nome,
        email: email,
        password: password
      };

      await AuthService.register(userData);
      
      // Navegação após registro bem-sucedido
      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      navigation.navigate('SignIn');
    } catch (error) {
      // Tratamento de erro de registro
      Alert.alert(
        'Erro', 
        error.response?.data?.message || 'Erro ao criar conta'
      );
    } finally {
      setLoading(false);
    }
  }

  return(
    <Background>
      <Container
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        enabled
      >
        <Title>Conta Paciente</Title>
        
        <AreaInput>
          <Input 
            placeholder='Nome'
            value={nome}
            onChangeText={(text) => setNome(text)}
          />
        </AreaInput>

        <AreaInput>
          <Input 
            placeholder='E-mail'
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </AreaInput>

        <AreaInput>
          <Input 
            placeholder='Senha'
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </AreaInput>

        <SubmitButton onPress={handleSignUp}>
          {loading ? (
            <ActivityIndicator size={25} color="#fff" />
          ) : (
            <SubmitText>Cadastrar</SubmitText>
          )}
        </SubmitButton>

        <Link onPress={() => navigation.navigate('SignUpPsi')}>
          <LinkText>Criar conta Psicólogo</LinkText>
        </Link>
      </Container>
    </Background>
  );
}
