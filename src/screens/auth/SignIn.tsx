import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, Image, ScrollView } from 'react-native';
import { useAppSelector, useAppDispatch } from '../../hook/hook';
import { AntDesign } from '@expo/vector-icons';
import { colores } from '../../theme/Colores';
import { CanvasComponent } from '../../components/CanvasComponent';
import { GlobalStyle } from '../../theme/GlobalStyle';
import { StackScreenProps } from '@react-navigation/stack';
import { dbFirestore, dbAuth } from '../../firebase/config';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ActivityScreen } from '../activity/ActivityScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { home, dataUSer, setToken } from '../../feacture/authSlice';

interface Props extends StackScreenProps<any, any> { };
// interface userData {
//   idUser: string;
//   emailUser: boolean;
//   createUserUser: boolean
// }

export const SignIn = ({ navigation }: Props) => {
  const [eye, setEye] = useState(true);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [isLoad, setIsLoad] = useState(false);


  const dispatch = useAppDispatch();
  const { name } = useAppSelector(state => state.auth);

  const SignIn = async () => {
    try {
      if (email.trim() !== '' && pass.trim() !== '') {
        setIsLoad(true);
        await signInWithEmailAndPassword(dbAuth, email, pass)
          .then(e => {
            const token = e.user.uid;
            // dispatch(home(token));
            validarPrivilegio(token)
            AsyncStorage.setItem('@token', token);
          })
        setIsLoad(false);
      } else {
        alert('Todos los campos son obligatorio');
      }
    } catch (error) {
      alert('Clave incorrecta');
      setIsLoad(false);
    }
    setIsLoad(false);
  }


  const signHome = () => {
    onAuthStateChanged(dbAuth, (user) => {
      if (user) {
        const dataUser = {
          idUser: user.uid,
          emailUser: user.email,
          createUserUser: user.metadata.creationTime
        }
        dispatch(dataUSer(dataUser));
        SignInCreateData(dataUser);
      }
    });
  }


  const getValue = async () => {
    setIsLoad(true);
    const value = await AsyncStorage.getItem('@token');
    setIsLoad(false);

    if (value) {
      dispatch(setToken(value));
      setIsLoad(false);
      // signHome();
    }
    setIsLoad(false);
  }


  const validarPrivilegio = async (id: any) => {

    const docRef = doc(dbFirestore, 'usuarios', id);

    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    dispatch(home({
      id: data.id,
      name: data.name,
      email: data.email,
      privilegio: data.privilegio
    })
    );
    console.log(docSnap.data());
  }


  const SignInCreateData = async (dataUser: any) => {
    try {
      const docRef = doc(dbFirestore, 'usuarios', dataUser.idUser);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return;
      } else {
        await setDoc(docRef, {
          id: dataUser.idUser,
          email: dataUser.emailUser,
          createUserUser: dataUser.createUserUser,
          name: name,
        });
      }

    } catch (error) {

    }
  }



  useEffect(() => {
    getValue();
  }, [])


  if (isLoad) return <ActivityScreen />

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colores.white }} >

      <View style={{ position: 'absolute', marginTop: 100, zIndex: 2, marginHorizontal: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.txtHeader}>Iniciar sesión</Text>
          <AntDesign name="user" size={30} color={colores.white} />
        </View>
        <Text style={{ color: colores.white }}>¡Bienvenido de nuevo!</Text>
      </View>

      <CanvasComponent />

      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
          <Text style={GlobalStyle.txtTitle}>Hospital </Text>
          <Text style={[GlobalStyle.txtTitle, { color: colores.primary }]}>Piedra Blanca</Text>
        </View>

        <View>
          <View>
            <TextInput
              style={GlobalStyle.input}
              // value={email}
              placeholder='Email'
              onChangeText={e => setEmail(e)}
              keyboardType="email-address"
            />
            <TouchableOpacity style={GlobalStyle.eyes} onPress={() => setEmail('')}>
              {
                (email.length > 0) ? <AntDesign name="delete" size={24} color="black" /> : ''
              }
            </TouchableOpacity>
          </View>

          <View>
            <TextInput
              style={GlobalStyle.input}
              placeholder='Contraseña'
              secureTextEntry={eye}
              onChangeText={e => setPass(e)}
            />

            <TouchableOpacity style={GlobalStyle.eyes} onPress={() => (eye) ? setEye(false) : setEye(true)}>
              {
                (eye) ? <AntDesign name="eyeo" size={24} color={colores.third} />
                  :
                  <AntDesign name="eye" size={24} color={colores.primary} />
              }
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
            <Text>Recuperar contraseña</Text>
          </TouchableOpacity>

          <TouchableOpacity style={GlobalStyle.btnLogin} onPress={() => SignIn()}>
            <Text style={GlobalStyle.txtLogin}>Inicia Sesión</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.containerLine}>
          <Text style={styles.lineSign}></Text>
          <Text style={{ marginHorizontal: 5, color: colores.third }}>Or sign up with</Text>
          <Text style={styles.lineSign}></Text>
        </View>

        <TouchableOpacity style={styles.containerGoogle}>
          <Image style={{ alignSelf: 'center' }} source={require('../../assets/google.png')} />
        </TouchableOpacity>

        <View style={GlobalStyle.footer}>
          <Text style={{ color: colores.third }}>¿Aún no te registras? </Text>
          <TouchableOpacity onPress={() => alert('Solo Robin puede hacer esto')}>
            <Text style={{ color: colores.black, fontWeight: '600' }}>Crear una cuenta</Text>
          </TouchableOpacity>
        </View>

        {/* <View style={GlobalStyle.footer}>
          <Text style={{ color: colores.third }}>¿Aún no te registras? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={{ color: colores.black, fontWeight: '600' }}>Crear una cuenta</Text>
          </TouchableOpacity>
        </View> */}

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  txtHeader: {
    fontSize: 24,
    fontWeight: '600',
    color: colores.white
  },


  containerLine: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  lineSign: {
    flex: 1,
    height: 0.1,
    borderWidth: 0.2,
    borderColor: colores.third

  },
  containerGoogle: {
    width: 75,
    height: 48,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colores.white,
    alignSelf: 'center',
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },

})
