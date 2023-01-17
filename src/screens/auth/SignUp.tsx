import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { CanvasComponent } from '../../components/CanvasComponent';
import { GlobalStyle } from '../../theme/GlobalStyle';
import { colores } from '../../theme/Colores';
import { AntDesign } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import DropDownPicker from 'react-native-dropdown-picker';
import { dbAuth, dbFirestore } from '../../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useAppDispatch } from '../../hook/hook';
import { home, signUp } from '../../feacture/authSlice';
import { ActivityScreen } from '../activity/ActivityScreen';
import { getDoc, doc, collection, setDoc } from 'firebase/firestore';


interface Props extends StackScreenProps<any, any> { };


export const SignUp = ({ navigation }: Props) => {
  const [eye, setEye] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Administrador', value: 'admin' },
    { label: 'Usuario', value: 'user' }
  ]);

  const [isLoad, setIsLoad] = useState(false);

  const dispatch = useAppDispatch();


  // Crear usuario
  const SignUp = async () => {
    try {

      if (email.trim() !== '' && pass.trim() !== '' && name.trim() !== '') {
        setIsLoad(true);
        await createUserWithEmailAndPassword(dbAuth, email, pass)
          .then(e => {
            // console.log(e.user.uid)
            dispatch(signUp({ name, email }));
            validarPrivilegio(e.user.uid);
            navigation.navigate('SignIn');
          })
          .catch(e => {
            alert('Usuario a existe');
          })
        setIsLoad(false);
      } else {
        alert('Todos los caampos son obligatorio');
        setIsLoad(false);
      }

    } catch (error) {
      console.log(error);
      setIsLoad(false);
    }
  }

  const validarPrivilegio = async (id: any) => {

    // const docRef = collection(dbFirestore, 'usuarios', id);

    const docRef = doc(dbFirestore, 'usuarios', id);

    await setDoc(docRef, {
      id: id,
      name: name,
      email: email,
      privilegio: value
    });

    // doc(collection(dbFirestore, 'usuarios', id), {

    // })

    // const docSnap = await getDoc(docRef);
    // const data = docSnap.data();

    // console.log(data);

    // dispatch(home({
    //   id: data.id,
    //   name: data.name,
    //   email: data.email,
    //   privilegio: data.privilegio
    // })
    // );
    // console.log(docSnap.data());
  }


  if (isLoad) return <ActivityScreen />

  return (
    <ScrollView style={{ flex: 1 }}>
      <CanvasComponent />
      <View style={styles.container}>
        <View style={[styles.maginV, { flexDirection: 'row', alignSelf: 'center' }]}>
          <Text style={GlobalStyle.txtTitle}>Crear </Text>
          <Text style={[GlobalStyle.txtTitle, { color: colores.primary }]}>usuario</Text>
        </View>

        <View>
          <TextInput
            style={GlobalStyle.input}
            placeholder="Nombre"
            onChangeText={e => setName(e)}
          />

          <TextInput
            style={GlobalStyle.input}
            placeholder="Email"
            onChangeText={e => setEmail(e)}
            keyboardType="email-address"
          // value={email}
          />

          <View>
            <TextInput
              style={GlobalStyle.input}
              placeholder='Contraseña'
              secureTextEntry={eye}
              onChangeText={e => setPass(e)}
            />
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              style={GlobalStyle.input}
            />

            <TouchableOpacity style={GlobalStyle.eyes} onPress={() => (eye) ? setEye(false) : setEye(true)}>
              {
                (eye) ? <AntDesign name="eyeo" size={24} color={colores.third} />
                  :
                  <AntDesign name="eye" size={24} color={colores.primary} />
              }
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={GlobalStyle.btnLogin} onPress={() => SignUp()}>
          <Text style={GlobalStyle.txtLogin}>Registrarse</Text>
        </TouchableOpacity>

        <View style={GlobalStyle.footer}>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={{ color: colores.black, fontWeight: '600' }}>Inicia Sesión</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10
  },
  maginV: {
    marginVertical: 30
  }
})