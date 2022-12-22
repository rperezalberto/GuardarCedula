import {useState} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { CanvasComponent } from '../../components/CanvasComponent';
import { GlobalStyle } from '../../theme/GlobalStyle';
import { colores } from '../../theme/Colores';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';


interface Props extends StackScreenProps<any, any>{};


export const SignUp = ({navigation}: Props) => {
    const [eye, setEye] = useState(true);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');


  return (
    <ScrollView style={{flex:1}}>
        <CanvasComponent/>
        <View style={styles.container}>
            <View style={[styles.maginV, {flexDirection:'row', alignSelf:'center'}]}>
                <Text style={GlobalStyle.txtTitle}>Crear </Text>
                <Text style={[GlobalStyle.txtTitle, {color: colores.primary}]}>usuario</Text>
            </View>

            <View>
                <TextInput 
                    style={GlobalStyle.input}
                    placeholder="Nombre"
                />
                <TextInput 
                    style={GlobalStyle.input}
                    placeholder="Email"
                />
                <View>
                  <TextInput 
                    style={GlobalStyle.input}
                    placeholder='Contraseña'
                    secureTextEntry={eye}
                    onChangeText={e => setPass(e)}
                    />
                    
                  <TouchableOpacity style={GlobalStyle.eyes} onPress={() => (eye) ? setEye(false): setEye(true)}>
                    {
                      (eye) ?<AntDesign name="eyeo" size={24} color={colores.third} />
                      :
                      <AntDesign name="eye" size={24}  color={colores.primary} />
                    }
                  </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={GlobalStyle.btnLogin}>
                  <Text style={GlobalStyle.txtLogin}>Registrarse</Text>
            </TouchableOpacity>

            <View style={GlobalStyle.footer}>
              <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Text style={{color: colores.black, fontWeight: '600'}}>Inicia Sesión</Text>
              </TouchableOpacity>
          </View>

        </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginHorizontal: 10
    },
    maginV:{
        marginVertical: 30
    }
})