//cuida da área sem Login
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const AuthStack = createNativeStackNavigator();

function AuthRoutes(){
    return(
        <AuthStack.Navigator>

            <AuthStack.Screen
                name="SignIn"
                component={SignIn}
                options={{
                    headerShown:false, //desativa a barra superior
                }}
            />

            <AuthStack.Screen
            name="SignUp"
            component={SignUp}
            options={{
                headerStyle:{
                    backgroundColor:'#3b3bdf', //color da barra
                    borderBottomWidth:1,       //contorno
                    borderBottomColor:'#00b94a',//cor da borda
                },
                headerTintColor:'#fff', //Cor da palavra
                headerTitle:'Voltar', //troca palavra
                headerBackTitleVisible:false, //Só aplica no IOS (o IOS tem +1 buttom)
            }}
            />

        </AuthStack.Navigator>
    )
}

export default AuthRoutes;