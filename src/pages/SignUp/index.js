import React, {useContext, useState} from 'react';
import { Platform, ActivityIndicator } from 'react-native';
import { AreaInput, Background, Title, Container, Input, SubmitButton, SubmitText, Link, LinkText } from '../SignIn/styles';
import { useNavigation } from '@react-navigation/native';

export {
  Background, 
  Container, 
  AreaInput, 
  Input, 
  SubmitText, 
  SubmitButton,
  Link,
  Title
} from '../SignIn/styles';

import {AuthContext} from '../../contexts/auth';

export default function SignUp() {

  const [nome, setNome] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigation = useNavigation();
  const {signUp, loadingAuth} = useContext(AuthContext)

function handleSignUp(){
  if(nome === '' || email === '' || password === ''){
    Alert.alert('Preencha todos os campos!')
    return;
  }
  signUp(email, password, nome);
}



  return(
    <Background>
      <Container
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        enabled
      >

<Title>Conta Paciente</Title>
      <AreaInput>
        <Input placeholder='Nome'
        value = {nome}
        onChangeText={(text) => setNome(text)}
         />
      </AreaInput>

      
      <AreaInput>
        <Input placeholder='E-mail'
          value = {email}
          onChangeText={(text) => setEmail(text)}
         />
      </AreaInput>

      <AreaInput>
        <Input placeholder='Senha'
          value = {password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry= {true}
         />
      </AreaInput>

      <SubmitButton onPress={handleSignUp}>
        {loadingAuth ? (
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
