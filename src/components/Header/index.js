import React from "react";
import { Container, Title, ButtonMenu } from "./style";
import Feather from 'react-native-vector-icons/Feather';

import { useNavigation } from "@react-navigation/native";

export default function Header({title}){

    const navigation = useNavigation();

    return(
        <Container>
            <ButtonMenu onPress={()=>navigation.openDrawer()}>
                <Feather name='menu' size={35} color='#121212'/>
            </ButtonMenu>

            {title && ( //se receber o title então
                <Title> {title}</Title> //renderiza o title
            )}
        </Container>
    )
}