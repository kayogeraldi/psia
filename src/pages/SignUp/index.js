import React, {useContext} from 'react';
import { Platform } from 'react-native';
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

export default function SignUpPsi() {
  const navigation = useNavigation();

  const {user} = useContext(AuthContext)

function handleSignUp(){
  console.log(user.nome)
}



  return(
    <Background>
      <Container
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        enabled
      >

<Title>Conta Paciente</Title>
      <AreaInput>
        <Input placeholder='Nome' />
      </AreaInput>

      <AreaInput>
        <Input placeholder='Idade' />
      </AreaInput>

      <AreaInput>
        <Input placeholder='E-mail' />
      </AreaInput>

      <AreaInput>
        <Input placeholder='Senha' />
      </AreaInput>

      <SubmitButton onPress={handleSignUp}>
        <SubmitText>Cadastrar</SubmitText>
      </SubmitButton>


      <Link onPress={() => navigation.navigate('SignUpPsi')}>
        <LinkText>Criar conta Psicólogo</LinkText>
      </Link>

      </Container>
    </Background>
  );
}
