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

    try {
      setLoading(true);
      
      // Dados para registro de psicólogo conforme o JSON de exemplo
      const userData = {
        nome: nome,
        email: email,
        password: password,
        dataNascimento: dataNascimento,
        role: {
          authority: "PSICOLOGO"
        },
        psicologo: {
          crm: crm
        }
      };

      // Usando o novo AuthService para registro
      await AuthService.register(userData);
      
      // Navegação após registro bem-sucedido
      Alert.alert('Sucesso', 'Conta de Psicólogo criada com sucesso!');
      navigation.navigate('SignIn');
    } catch (error) {
      // Tratamento de erro de registro
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
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY'
            }}
            placeholder='Data de Nascimento'
            value={dataNascimento}
            onChangeText={(text) => setDataNascimento(text)}
            customTextInput={Input}
            customTextInputProps={{
              keyboardType: 'numeric'
            }}
          />
        </AreaInput>

        <AreaInput>
          <Input 
            placeholder='CRM' 
            value={crm}
            onChangeText={(text) => setCrm(text)}
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