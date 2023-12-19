//compartilha informações com o App
import React,{createContext, useState, useEffect} from "react";
import api from "../services/api";
import {useNavigation} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthContext = createContext({});

function AuthProvider({children}){

    const [user,setUser] = useState(null); //usuário logado
    const[loadingAuth,setLoadingAuth] = useState(false); //logando
    const [loading,setLoading] = useState(true); //carregando user já logado

    const navigation = useNavigation();

    useEffect(()=>{
        async function loadStorage(){
            const storageUser = await AsyncStorage.getItem('@finToken');

            if(storageUser){ //if tem storageUser?
                const response = await api.get('/me',{
                    headers:{ //headers = cabeçalho da requisição
                        'Authorization':`Bearer ${storageUser}`
                    }
                })
                .catch(()=>{ //se não validar o token deve deslogar user
                    setUser(null);
                })
                //abaixo passa para a api o token, (repassa já que esta salvo)
                api.defaults.headers['Authorization'] = `Bearer ${storageUser}`;
                setUser(response.data); //recebe os atributos do user (id, name ...)
                setLoading(false);
            }
            setLoading(false);
        }
        loadStorage();
    },[])

    async function SignUp(email,password,nome){ //Cadastro
        setLoadingAuth(true);
        try{ //cadastra no SQLite
            const response = await api.post('/users',{
                name: nome,
                password: password,
                email: email,
            })
            setLoadingAuth(false);
            navigation.goBack();//voltar 1 tela

        }catch(err){
            console.log("Erro ao cadastrar", err)
            setLoadingAuth(false);
        }
    }

    async function singIn(email,password){ //Entrada

        setLoadingAuth(true); //logando
            
        try{
            const response = await api.post('/login',{
                email: email,
                password: password
            })

            const {id, name, token } = response.data; //.data ve a resposta
            //abaixo data recebe conforme desfragmentado acima
            const data = {id, name, token, email,};
            
            //abaixo, setItem é para salvar algo ('é a chave unica key')
            //AsyncStorage é para salvar o login p/ abrir já logado (database)
            //dps da , é o que deseja salvar, no caso a chave Token p/login.
            await AsyncStorage.setItem('@finToken',token)

            //abaixo fornece a API o tekon para fazer as consultas
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            //abaixo, como usuário validado, é passado ao user os dados
            setUser({id, name, email});

            //processo de login encerrado, agora logado
            setLoadingAuth(false);

        }catch(err){
            console.log("ERRO AO LOGAR ",err);
            setLoadingAuth(false); //não está mais logando
        }
    }

    async function signOut(){ //Saida
        await AsyncStorage.clear() //limpa o dado salvo, (promise)
        .then(()=>{
            setUser(null);
        })
    }

    return(
        //signed:!!user convert o user para boolean - se null é false se algo vdd.
        <AuthContext.Provider value={{signed:!!user, user, SignUp, singIn, 
        loadingAuth, loading, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;