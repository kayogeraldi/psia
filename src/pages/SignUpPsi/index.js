import React from 'react';
import { Platform } from 'react-native';
import { AreaInput, Background, Container, Input, SubmitButton, SubmitText, Title } from '../SignIn/styles';



export {
  Background, 
  Container, 
  AreaInput, 
  Input, 
  SubmitText, 
  SubmitButton,
  Title
} from '../SignIn/styles';



export default function SignUpPsi(){
  return(
    <Background>
      <Container
       behavior={Platform.OS === 'ios' ? 'padding' : ''}
       enabled
      >


<Title>Conta Psicólogo</Title>
     
      <AreaInput>
        <Input
        placeholder='Nome'
        />
      </AreaInput>
      <AreaInput>
        <Input
        placeholder='Idade'
        />
      </AreaInput>

      
      <AreaInput>
        <Input placeholder='CRM' />
      </AreaInput>

      <AreaInput>
        <Input
        placeholder='E-mail'
        />
      </AreaInput>
      <AreaInput>
        <Input
        placeholder='Senha'
        />
      </AreaInput>


      <SubmitButton>
        <SubmitText>Cadastrar</SubmitText>
      </SubmitButton>




        </Container>
    </Background>
  )
}