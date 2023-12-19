import React from "react";
import { TouchableWithoutFeedback, Alert } from "react-native";
import Icon from 'react-native-vector-icons/Feather'

import { Container, TipoText, Tipo, IconView, ValorText, TitleMov } from "./styles";

export default function HistoricoList({data, deleteItem}){

    function handleDeleteItem(){
        Alert.alert(
            'Atenção', //titulo
            'Você tem certeza que deseja deletar esse registro?', //mensagem
            [   //array de objeto referente aos botão
            {
                text:'Cancelar',
                style:'cancel',
            },
            {
                text:'Continuar',
                onPress: ()=> deleteItem(data.id) //id do item clicado
            }
            ]
        )
    }

    return(
        //Abaixo: onLongPress é quando segurar o dedo
        <TouchableWithoutFeedback onLongPress={handleDeleteItem}>
            <Container>

                <Tipo>
                    <IconView tipo={data.type}>

                        <Icon 
                            name={data.type === 'despesa' ? 'arrow-down' : 'arrow-up'} 
                            size={20} 
                            color="#fff"
                        />

                        <TipoText>{data.type}</TipoText>

                    </IconView>
                    
                    <TitleMov>{data.description}</TitleMov>

                </Tipo>

                <ValorText>R$ {data.value}</ValorText>

            </Container>
        </TouchableWithoutFeedback>

    )
}