import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { GlobalStyle } from '../../theme/GlobalStyle';
import { AntDesign } from '@expo/vector-icons';
import { colores } from '../../theme/Colores';
import { useAppSelector } from '../../hook/hook';
import { dbFirestore } from '../../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';
import { ActivityScreen } from '../activity/ActivityScreen';

export const EditProfile = () => {
    const { name, token } = useAppSelector(state => state.auth);
    const [isLoad, setIsLoad] = useState(false);
    const [eye1, setEye1] = useState(true);
    const [eye2, setEye2] = useState(true);

    const [clave1, setClave1] = useState("");
    const [clave2, setClave2] = useState("");

    const [nameProfile, setNameProfile] = useState(name);


    const saveProfile = async () => {

        if (clave1.trim() !== '') {
            if (clave1.length < 6) {
                alert('La contraseña tiene que tener mas de 6 digitos');
            } else {
                if (clave1 === clave2) {
                    alert('Correcto');
                } else {
                    alert('Las contraseña no son iguales, intentalo de nuevo');
                }
            }
        }

        const updateProfile = doc(dbFirestore, 'usuarios', token);
        setIsLoad(true);
        await updateDoc(updateProfile, {
            name: nameProfile,
        })
            .then(() => {
                alert('Modificado correcctamente');
            })
        setIsLoad(false);


    }

    if (isLoad) return <ActivityScreen />



    return (
        <View style={styles.container}>
            <Text style={GlobalStyle.txtTitleHeader}> Editar informacion del perfil</Text>

            <View>
                <Text>Nombre del usuario:</Text>
                <TextInput
                    style={GlobalStyle.input}
                    placeholder='Nombre'
                    onChangeText={e => setNameProfile(e)}
                    value={nameProfile}
                />
            </View>

            <Text style={GlobalStyle.txtTitleHeader}>Cambiar contraseña</Text>


            <View>
                <Text>Contraseña nueva:</Text>
                <TextInput
                    style={GlobalStyle.input}
                    placeholder='Contraseña'
                    secureTextEntry={eye1}
                    onChangeText={e => setClave1(e)}
                />

                <TouchableOpacity style={styles.eyes} onPress={() => (eye1) ? setEye1(false) : setEye1(true)}>
                    {
                        (eye1) ? <AntDesign name="eyeo" size={24} color={colores.third} />
                            :
                            <AntDesign name="eye" size={24} color={colores.primary} />
                    }
                </TouchableOpacity>
            </View>


            <View>
                <Text>Repetir contraseña:</Text>
                <TextInput
                    style={GlobalStyle.input}
                    placeholder='Repetir contraseña'
                    secureTextEntry={eye2}
                    onChangeText={e => setClave2(e)}
                />

                <TouchableOpacity style={styles.eyes} onPress={() => (eye2) ? setEye2(false) : setEye2(true)}>
                    {
                        (eye2) ? <AntDesign name="eyeo" size={24} color={colores.third} />
                            :
                            <AntDesign name="eye" size={24} color={colores.primary} />
                    }
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={GlobalStyle.btnLogin} onPress={() => saveProfile()}>
                <Text style={GlobalStyle.txtLogin}>Guardar Cambios</Text>
            </TouchableOpacity>

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10
    },
    eyes: {
        position: 'absolute',
        right: 10,
        top: 40
    }
});