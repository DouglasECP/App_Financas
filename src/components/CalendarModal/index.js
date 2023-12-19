//modal do calendario
import React, {useState} from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import {Calendar, LocaleConfig } from 'react-native-calendars';

import { ptBR } from "./localeCalendar";
import { Container, ButtonFilterText, ModalContent,
    ButtonFilter } from "./styles";

    //abaixo, ['pt-BR'] recebe a config do ptBR confm import
    LocaleConfig.locales['pt-br'] = ptBR;
    //abaixo: configura como padrão o pt-BR confm criado acima
    LocaleConfig.defaultLocale = 'pt-br';

export default function CalendarModal({setVisible, handleFilter}){

    //abaixo: data atual
    const [dateNow,setdateNow] = useState(new Date());
    const [markeddates,setMarkedDates] = useState({});

    function handleOnDayPress(date){
        //acima:data recebe o dia clicado
        //abaixo:dateNow muda para o dia selecionado
        setdateNow(new Date(date.dateString))

        let markedDay = {};
        //passa o dia selecionado para a variavez fazer o estilo
        markedDay[date.dateString] = { //config. quand selecionado
            selected: true,
            selectedColor:'#3b3dbf',
            textColor:'#fff'
        }
        //passa o estilo ao useState para renderizar o novo estilo
        setMarkedDates(markedDay);
    }

    function handleFilterDate(){ //executa ao clicar no filtro
        //abaixo:propriedade handleFilter recebe a data selecionada
        handleFilter(dateNow);
        setVisible(); //fecha o calendario (modal)
    }

    return(
        <Container>
            <TouchableWithoutFeedback onPress={setVisible}>
                <View style={{flex:1}}></View>
            </TouchableWithoutFeedback>

            <ModalContent>

                <Calendar
                    onDayPress={handleOnDayPress} //pega o dia clicado
                    markedDates={markeddates} //data selecionada
                    enableSwipeMonths={true} //permitir troca de mês
                    theme={{
                        todayTextColor:'#ff0000', //color do dia
                        selectedDayBackgroundColor:'#00adf5',
                        selectedDayTextColor:'#fff',
                    }}
                />
                
                <ButtonFilter onPress={handleFilterDate}>
                    <ButtonFilterText>Filtrar</ButtonFilterText>
                </ButtonFilter>

            </ModalContent>

        </Container>
    )
}