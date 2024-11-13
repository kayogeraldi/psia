import React, { createContext, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export const AuthContext = createContext({});

import api from '../services/api'

import AsyncStorage from '@react-native-async-storage/async-storage';


function AuthProvider({ children }){
  const [user, setUser] = useState(null); 
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

 const navigation = useNavigation();

  useEffect(() => {
    async function loadStorageData(){
      const storageUser = await AsyncStorage.getItem('@psiapp');

      if(storageUser){
        const response = await api.get('/me', {
          headers: {
            Authorization: `Bearer ${storageUser}`
          }
        })
        .catch(() => {
          setUser(null);
        })

        api.defaults.headers.Authorization = `Bearer ${storageUser}`;
        setUser(response.data);
        setLoading(false);
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);


  async function signUp(email, password, nome){

  setLoadingAuth(true);
    try{
      const response = await api.post('/users',{
        name: nome,
        email: email,
        password: password
      })
      setLoadingAuth(false);
      navigation.goBack();

    }catch(err){
      console.log("ERRO AO CADASTRAR", err)
      setLoadingAuth(false);
    }
  }

  async function signIn(email, password){
    setLoadingAuth(true);
    try{
      const response = await api.post('/login', {
        email: email,
        password: password
      })

      const { id, name, token } = response.data;
      const data = {
        id,
        name,
        token,
        email,
      };

      await AsyncStorage.setItem('@psiapp', token);


      api.defaults.headers.Authorization = `Bearer ${token}`;

      setUser({
        id,
        name,
        email,
      })
      setLoadingAuth(false);
    }catch(err){
      console.log("ERRO AO FAZER LOGIN", err)
      setLoadingAuth(false);
    }
  }

  async function signOut(){
    await AsyncStorage.clear().then(() => {
      setUser(null);
    })
  }





  return(
    <AuthContext.Provider value={{ signed: !!user, user, signUp, signOut, signIn, loadingAuth, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;

