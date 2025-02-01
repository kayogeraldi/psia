import React, { useState } from 'react';
import { Platform, ActivityIndicator, Alert } from 'react-native';
import { 
  AreaInput, 
  Background, 
  Container, 
  Input, 
  SubmitButton, 
  SubmitText, 
  Title 
} from '../SignIn/styles';
import { useNavigation } from '@react-navigation/native';
import AuthService from '../../api/services/authServices';
import { TextInputMask } from 'react-native-masked-text';


export default function SignUpPsi(){
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [crm, setCrm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    // Validação básica dos campos
    if (!nome || !email || !password || !dataNascimento || !crm) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    // Validação do formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido');
      return;
    }

    try {
      setLoading(true);
      
      const userData = {
        nome: nome,
        email: email,
        password: password,
        dataNascimento: dataNascimento,
        isPsicologo: true,
        crm: crm,
        role: "PSICOLOGO"
      };

      await AuthService.register(userData);
      
      Alert.alert('Sucesso', 'Conta de Psicólogo criada com sucesso!');
      navigation.navigate('SignIn');
    } catch (error) {
      Alert.alert(
        'Erro', 
        error.response?.data?.message || 'Erro ao criar conta de Psicólogo'
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
        <Title>Conta Psicólogo</Title>
     
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
            placeholder='Data de Nascimento'
            value={dataNascimento}
            onChangeText={(text) => setDataNascimento(text)}
            keyboardType='numeric'
            type={'datetime'}
            options={{
              format: 'DD-MM-YYYY'
            }}
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
              color: '#121212'
            }}
            placeholder='CRM (000000-XX)'
            value={crm}
            onChangeText={(text) => setCrm(text)}
            type={'custom'}
            options={{
              mask: '999999-SS'
            }}
          />
        </AreaInput>

        <SubmitButton onPress={handleSignUp}>
          {loading ? (
            <ActivityIndicator size={25} color="#fff" />
          ) : (
            <SubmitText>Cadastrar</SubmitText>
          )}
        </SubmitButton>
      </Container>
    </Background>
  )
}