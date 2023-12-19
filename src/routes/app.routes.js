//configuraçãodo drower- rotas home - perfil etc.

import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Home from '../pages/Home';
import New from '../pages/New';
import Profile from '../pages/Profile';
import CustomDrawer from '../components/CustomDrawer';

const appDrawer = createDrawerNavigator();

function AppRoutes(){
    return(
        <appDrawer.Navigator

            drawerContent={(props)=> <CustomDrawer {...props}/> }

            screenOptions={{
                headerShown:false, //sem barra superior

                drawerStyle:{
                    backgroundColor:'#fff', //cor fundo, atras btn
                    paddingTop:20, //margin cima botão
                },
                drawerActiveBackgroundColor:'#3b3dbf', //cor btn selec
                drawerActiveTintColor:'#fff', //cor letra

                drawerInactiveBackgroundColor: '#f0f2ff', //cor btn ñ selec
                drawerInactiveTintColor: '#121212' //cor letra ñ selec
            }} 
        >
            
            <appDrawer.Screen
                name='Home'
                component={Home}
            />

            <appDrawer.Screen
                name='Registrar'
                component={New}
            />

            <appDrawer.Screen
                name="Perfil"
                component={Profile}
            />

        </appDrawer.Navigator>
    )
}

export default AppRoutes;