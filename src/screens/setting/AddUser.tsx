import { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { GlobalStyle } from '../../theme/GlobalStyle';
import DropDownPicker from 'react-native-dropdown-picker';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, } from 'firebase/firestore';
import { dbAuth, dbFirestore } from '../../firebase/config';
import { ActivityScreen } from '../activity/ActivityScreen';
import { StackScreenProps } from '@react-navigation/stack';


interface Props extends StackScreenProps<any, any> { };

export const AddUser = ({ navigation }: Props) => {
    const [isLoad, setIsLoad] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('false');

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);

    const [items, setItems] = useState([
        { label: 'Administrador', value: 'admin' },
        { label: 'Usuario', value: 'user' }
    ]);



    const createUser = async () => {

        if (name.trim() !== '' && email.trim() !== '' && value !== null) {
            setIsLoad(true);
            await createUserWithEmailAndPassword(dbAuth, email, pass)
                .then((item) => {
                    createUserFirestore(item);
                    navigation.navigate('Setting');
                })
            setIsLoad(false);
        } else {
            alert('Todos los campos son obligatorio');
        }
        setIsLoad(false);

    }


    const createUserFirestore = async (item: any) => {
        const docRef = doc(dbFirestore, 'usuarios', item.user.uid);

        await setDoc(docRef, {
            id: item.user.uid,
            name: name,
            email: email,
            privilegio: value
        })
    }

    // console.log(value);
    if (isLoad) return <ActivityScreen />

    return (
        <View style={styles.container}>
            <Text style={GlobalStyle.txtTitleHeader}>Llenar los campos para crea un usuario</Text>
            <View>
                <TextInput
                    style={GlobalStyle.input}
                    placeholder={'Nombre del usuario'}
                    onChangeText={e => setName(e)}
                />
                <TextInput
                    style={GlobalStyle.input}
                    placeholder={'Email del usuario'}
                    keyboardType="email-address"
                    onChangeText={e => setEmail(e)}
                />
                <TextInput
                    style={GlobalStyle.input}
                    placeholder={'Contraseña del usuario'}
                    secureTextEntry={true}
                    onChangeText={e => setPass(e)}
                />
            </View>

            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                style={GlobalStyle.input}
            />

            <TouchableOpacity style={GlobalStyle.btnLogin} onPress={() => createUser()}>
                <Text style={GlobalStyle.txtLogin}>Agregar</Text>
            </TouchableOpacity>


        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10
    }
})