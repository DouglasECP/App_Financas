import React, {useContext, useEffect, useState} from "react";
import {TouchableOpacity, Modal } from "react-native";
import {AuthContext} from '../../contexts/auth';
import {format} from 'date-fns';
import { useIsFocused } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Background, ListBalance, Area, Title, List} from './styles'

import Header from "../../components/Header";
import api from "../../services/api";
import BalanceItem from "../../components/BalanceItem";
import HistoricoList from "../../components/HistoricoList";
import CalendarModal from "../../components/CalendarModal";

export default function Home(){
    //abaixo:verifica se esta c/foco na tela, booleano, true c/foco
    const isFocused = useIsFocused();

    //abaixo; recebe o balanso do dia (resumo)
    const [listBalance,setListBalance] = useState([]);
    //abaixo: recebe o dia atual, para mostrar a moviment. do dia
    const [dateMovements,setDateMovements] = useState(new Date())
    //abaixo: recebe todas as movimentaçõs do dia (detalhado)
    const [moviments,setMoviments] = useState([]);
    //abaixo: Controla o visible do modal em filtro de data moviment.
    const [modalVisible,setModalVisible] = useState(false);

    useEffect(()=>{ //busca dados do dia ao abrir a Home
        let isActive = true;

        async function getMovements(){
            //abaixo:format(data que qué formatar, para o formato)
            //abaixo:pega a data do celular.
            //abaixo: comentado por que pega o tamezona, e não queremos
            //let dateFormated = format(dateMovements,'dd/MM/yyyy');

            //criando nova date com a data selecionada, com o tamezone correto
            let date = new Date(dateMovements);
            //abaixo, garante que independente do local, vai dar a data correta
            //valueOf, pega a data em milesegundos, getTimezoneOffset é a diferenteça
            //entre a minutos do celular com a universal
            let onlyDate = date.valueOf() + date.getTimezoneOffset() * 60 * 1000;
            let dateFormated = format(onlyDate, 'dd/MM/yyyy')

            console.log(dateFormated);

            //abaixo, tras as ultimas movimentações
            const receives = await api.get('/receives',{
                params:{date:dateFormated}
            })

            const balance = await api.get('/balance',{
                params:{date: dateFormated}
            })
            if(isActive){
                //abaixo salva balanço do dia (resumo)
                setListBalance(balance.data);
                //abaixo salva a movimentação do dia (toda movim.)
                setMoviments(receives.data);
            }
        }

        getMovements();

        //abaoxo; garante que ao sair da tela home não henderiza mais
        //assim economizando em poder de processamento.
        return ()=> isActive = false;

    },[isFocused, dateMovements]) //isFocused garante que movimetações get os dados

    async function handleDelete(id){
        try{
            await api.delete('receives/delete',{
                params:{
                    item_id: id
                }
            })
            setDateMovements(new Date()) //atualizo a data e forço att do useEffect
        }catch(err){
            console.log(err);
        }
    }

    function filterDateMovements(dateSelected){
        setDateMovements(dateSelected);
    }

    return(
        <Background>
            <Header title="Minhas movimentações"/>

            <ListBalance //lista horizontal
                data={listBalance}
                horizontal={true} //formato horizontal
                showsHorizontalScrollIndicator={false} //sem rolagem
                keyExtractor={item => item.tag} //o tag classifica o tipo
                renderItem={({item})=>(<BalanceItem data={item}/>)}
            />

            <Area>
                <TouchableOpacity onPress={()=> setModalVisible(true)}>
                    <Icon name="event" color='#121212' size={30}/>
                </TouchableOpacity>

                <Title>Ultimas movimentações</Title>
            </Area>

            <List //lista movimentação do dia (detalhado)
                data={moviments}
                keyExtractor={item => item.id}
                renderItem={({item})=> <HistoricoList data={item} deleteItem={handleDelete}/>}
                //abaixo: barra de rolagem desativada
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddinBottom:20}} //estilo da lista
            />

            <Modal visible={modalVisible} animationType="fade" transparent={true}>

                <CalendarModal
                    setVisible={()=> setModalVisible(false)} //setVisible é uma propriedade
                    handleFilter={filterDateMovements}
                />

            </Modal>

        </Background>
    )
}