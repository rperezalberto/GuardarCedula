import {useState} from 'react';
import { View, Text,StyleSheet, TouchableOpacity, TextInput, SafeAreaView} from 'react-native';
import { useAppSelector, useAppDispatch } from '../../hook/hook'
import { singIn } from '../../feacture/authSlice'
import { AntDesign } from '@expo/vector-icons';

import { Canvas, Circle, Group } from '@shopify/react-native-skia'
import { colores } from '../../theme/Colores';

export const SignIn = () => {

  const [eye, setEye] = useState(true);

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');


  return (
    <SafeAreaView style={{flex:1}}>
        <View style={{position:'absolute', marginTop: 100, zIndex:2, marginHorizontal: 10}}>
          <View style={{flexDirection: 'row', alignItems:'center'}}>
            <Text style={styles.txtHeader}>Iniciar sesión</Text>
            <AntDesign name="user" size={30} color={colores.white} />
          </View>
          <Text style={{color: colores.white}}>¡Bienvenido de nuevo!</Text>
        </View>
        <Canvas style={{height: 250}}>
          <Group blendMode='multiply'>
            <Circle cx={130} cy={-100} r={350} color={colores.primary} />
            <Circle cx={400} cy={70} r={150} color={colores.primary} />
          </Group>
        </Canvas>

        <View style={styles.container}>
            <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', marginVertical:20}}>
              <Text style={styles.txtTitle}>Hospital </Text>
              <Text style={[styles.txtTitle, {color:colores.primary}]}>Piedra Blanca</Text>
            </View>

            <View>
                <View>
                  <TextInput 
                    style={styles.input}
                    value={email}
                    placeholder='Email'
                    onChangeText={e => setEmail(e)}
                    keyboardType="email-address"
                    />
                    <TouchableOpacity style={styles.eyes} onPress={() => setEmail('')}>
                      {
                        (email.length > 0) ? <AntDesign name="delete" size={24} color="black" /> : ''
                      }
                    </TouchableOpacity>
                </View>

                <View>
                  <TextInput 
                    style={styles.input}
                    placeholder='Contraseña'
                    secureTextEntry={eye}
                    onChangeText={e => setPass(e)}
                  />
                    
                  <TouchableOpacity style={styles.eyes} onPress={() => (eye) ? setEye(false): setEye(true)}>
                    {
                      (eye) ?<AntDesign name="eyeo" size={24} color={colores.third} />
                        :
                        <AntDesign name="eye" size={24}  color={colores.primary} />
                    }
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={{alignSelf:'flex-end'}}>
                  <Text>Recuperar contraseña</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.btnLogin}>
                  <Text style={styles.txtLogin}>Inicia Sesión</Text>
                </TouchableOpacity>

            </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  txtHeader:{
    fontSize: 24,
    fontWeight:'600',
    color: colores.white
  },
  txtTitle:{
    fontSize: 40,
    fontWeight:'500',
    textAlign:'auto',
  },
  input:{
    height: 48,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
    paddingLeft: 20,
    paddingRight: 40,
    fontSize: 15
  },
  eyes:{
    position:'absolute',
    right:10,
    top: 22
  },
  btnLogin:{
      height:48,
      marginVertical: 50,
      backgroundColor: colores.primary,
      justifyContent:'center',
      alignItems:'center',
      borderRadius: 10,
      shadowColor: colores.black,
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowRadius: 3.5,
      shadowOpacity: 5,
      elevation: 5
  },
  txtLogin:{
    color: colores.white,
    fontSize: 18,
    fontWeight: '400'
  }
})
