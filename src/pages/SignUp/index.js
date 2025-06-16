import React, { useState } from 'react';
import { Platform, ActivityIndicator, Alert } from 'react-native';
import { 
  AreaInput, 
  Background, 
  Container, 
  Input, 
  SubmitButton, 
  SubmitText, 
  Title,
  Link,
  LinkText 
} from '../SignIn/styles';
import { useNavigation } from '@react-navigation/native';
import AuthService from '../../api/services/authServices';
import { TextInputMask } from 'react-native-masked-text';

export default function SignUp() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [psicologoEmail, setPsicologoEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    // Validação básica dos campos
    if (!nome || !email || !password || !dataNascimento || !psicologoEmail) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    // Validação do formato dos emails
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || !emailRegex.test(psicologoEmail)) {
      Alert.alert('Erro', 'Por favor, insira emails válidos');
      return;
    }

    try {
      setLoading(true);
      
      // Convertendo o formato da data de DD/MM/AAAA para DD-MM-AAAA
      const dataFormatada = dataNascimento.replace(/\//g, '-');
      
      const userData = {
        nome: nome,
        email: email,
        password: password,
        dataNascimento: dataFormatada,
        isPsicologo: false,
        role: "PACIENTE",
        psicologoEmail: psicologoEmail
      };

      await AuthService.register(userData);
      
      Alert.alert('Sucesso', 'Conta de Paciente criada com sucesso!');
      navigation.navigate('SignIn');
    } catch (error) {
      Alert.alert(
        'Erro', 
        error.response?.data?.message || 'Erro ao criar conta de Paciente'
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
            placeholder='Nome Completo'
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

        <AreaInput>
          <TextInputMask
            style={{
              width: '90%',
              height: 50,
              padding: 10,
              fontSize: 16,
              backgroundColor: '#FFF',
              borderRadius: 8,
              color: '#121212',
              marginBottom: 15
            }}
            placeholder='Data de Nascimento'
            value={dataNascimento}
            onChangeText={(text) => setDataNascimento(text)}
            keyboardType='numeric'
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY'
            }}
          />
        </AreaInput>

        <AreaInput>
          <Input 
            placeholder='E-mail do Psicólogo'
            value={psicologoEmail}
            onChangeText={(text) => setPsicologoEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
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
