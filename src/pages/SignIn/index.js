import React,{useState, useContext} from "react";
import { Platform,ActivityIndicator } from "react-native";

import {Background, Container, Logo, AreaInput, Input,
SubmitButtom,SubmitText,Link,LinkText} from './styles'

import { useNavigation } from "@react-navigation/native";

import {AuthContext} from '../../contexts/auth'

export default function SignIn(){

    const navigation = useNavigation();

    const {singIn, loadingAuth} = useContext(AuthContext);
    
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    function handleLogin(){
        singIn(email,password);
    }

    return(        

        <Background>

            <Container
                behavior={Platform.OS ==='ios' ? 'padding' : ''}
                enabled
            >

                <Logo
                    source={require('../../assets/Logo.png')}
                />
                
                <AreaInput>
                    <Input
                        placeholder="Seu e-mail"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </AreaInput>

                <AreaInput>
                    <Input
                        placeholder="Sua Senha"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    />
                </AreaInput>

                <SubmitButtom activeOpacity={0.8} onPress={handleLogin}>
                    {
                        loadingAuth ? (
                            <ActivityIndicator size={20} color='#fff'/>
                        ) : (
                            <SubmitText>Acessar</SubmitText>   
                        )
                    }
                
                </SubmitButtom>

                <Link onPress={()=>navigation.navigate('SignUp')}>
                    <LinkText>Criar uma conta!</LinkText>
                </Link>

            </Container>

        </Background>

    )
}