//tela de registro
import React, {useState} from "react";
import { SafeAreaView, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import {format} from 'date-fns';
import { useNavigation } from "@react-navigation/native";

import { Background, Input, SubmitButton, SubmitText } from "./styles";
import RegisterTypes from "../../components/RegisterTypes";
import Header from '../../components/Header';
import api from '../../services/api'; // conexão com SQLite

export default function New(){

    const navigation = useNavigation();

    const [labelInput,setLabelInput] = useState('');
    const [valueInput,setValueInput] = useState('');
    const [type,setType] = useState('receita');

    function handleSubit(){
        Keyboard.dismiss();
        
        //Abaixo; isNaN verifica se ñ é um numero
        if(isNaN(parseFloat(valueInput)) || type === null){
            alert('Preencha todos os campos')
            return;
        }

        Alert.alert( //alert do react-native
            'Confirmando dados',
            `Tipo: ${type} - valor: ${parseFloat(valueInput)}`,
            [ //array de objeto para criar os botão
                {
                    text: 'Cancelar', //primeiro botão
                    style: 'cancel',
                },
                {
                    text: 'Continuar', //segundo botão
                    onPress: () => handleAdd()
                }
            ]
        )
    }

    async function handleAdd(){
        Keyboard.dismiss();

        await api.post('/receive',{
            description: labelInput,
            value: Number(valueInput),
            type: type,
            date: format(new Date(), 'dd/MM/yyyy')
        })

        setLabelInput('');
        setValueInput('');
        //abaixo, retorna a tela de home apos registrar
        navigation.navigate('Home') //Conforme app.routes.js

    }

    return(
        <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
            <Background>
                <Header title="Registrando"/>
                
                <SafeAreaView style={{marginTop:14, alignItems:'center'}}>

                    <Input
                        placeholder="Descrição desse registro"
                        value={labelInput}
                        onChangeText={(text)=>setLabelInput(text)}
                    />

                    <Input
                        placeholder="Valor desejado"
                        keyboardType="numeric"
                        value={valueInput}
                        onChangeText={(text)=>setValueInput(text)}
                    />
                    
                    <RegisterTypes type={type} sendTypeChanged={(item)=>setType(item)}/>

                    <SubmitButton onPress={handleSubit}>
                        <SubmitText>Registrar</SubmitText>
                    </SubmitButton>

                </SafeAreaView>

            </Background>
        </TouchableWithoutFeedback>
    )
}