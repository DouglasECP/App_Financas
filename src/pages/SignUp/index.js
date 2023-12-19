import React, {useContext, useState} from "react";
import { Platform, ActivityIndicator } from "react-native";

import {Background,Container,AreaInput,Input,
    SubmitButtom,SubmitText} from '../SignIn/styles'

import {AuthContext} from "../../contexts/auth";

export default function SignUp(){

    const {SignUp, loadingAuth} = useContext(AuthContext);

    const [nome,setNome] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    function handleSignUp(){

        if(nome ==='' || email === '' || password === '')return;

        //abaixo, passa p/ Context os atributos
        SignUp(email,password,nome);
    }

    return(
        <Background>
            <Container
            behavior={Platform.OS ==='ios' ? 'padding' : ''}
            enabled
            >
                <AreaInput>
                    <Input
                        placeholder="Seu Nome"
                        value={nome}
                        onChangeText={(text)=>setNome(text)}
                    />
                </AreaInput>

                <AreaInput>
                    <Input
                        placeholder="Seu e-mail"
                        value={email}
                        onChangeText={(text)=>setEmail(text)}
                    />
                </AreaInput>

                <AreaInput>
                    <Input
                        placeholder="Sua Senha"
                        value={password}
                        onChangeText={(text)=>setPassword(text)}
                        secureTextEntry={true}
                    />
                </AreaInput>

                <SubmitButtom onPress={handleSignUp}>
                    {
                        loadingAuth ? (
                            <ActivityIndicator size={20} color='#fff'/>
                        ) : (
                            <SubmitText>Cadastrar</SubmitText>
                        )
                    }

                </SubmitButtom>

            </Container>
        </Background>
    )
}