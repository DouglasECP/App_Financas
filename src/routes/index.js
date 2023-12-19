//faz a gestão de telas com login ou sem login
import React, {useContext} from "react";
import { View, ActivityIndicator } from "react-native";

import {AuthContext} from './../contexts/auth'

import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";



function Routes(){
    const {signed, loading} = useContext(AuthContext)
    
    if(loading){ //se loading esta true executa abaixo
        return(
            <View style={{
            flex:1, 
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'#f0f4ff'
            }}>
                <ActivityIndicator size='large' color='#131313'/>
            </View>
        )
    }

    return(
        signed ? <AppRoutes/> : <AuthRoutes/>
    )
}

export default Routes;