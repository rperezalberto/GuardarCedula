import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { GlobalStyle } from '../../theme/GlobalStyle';
import { AntDesign } from '@expo/vector-icons';
import { colores } from '../../theme/Colores';

export const EditProfile = () => {
    const [eye1, setEye1] = useState(true);
    const [eye2, setEye2] = useState(true);

    return (
        <View style={styles.container}>
            <Text style={styles.txtTitle}> Editar informacion del perfil</Text>

            <View>
                <Text>Nombre del usuario:</Text>
                <TextInput
                    style={GlobalStyle.input}
                    placeholder='Nombre'
                />
            </View>

            <Text style={styles.txtTitle}>Cambiar contraseña</Text>


            <View>
                <Text>Contraseña nueva:</Text>
                <TextInput
                    style={GlobalStyle.input}
                    placeholder='Contraseña'
                    secureTextEntry={eye1}
                //   onChangeText={e => setPass(e)}
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
                //   onChangeText={e => setPass(e)}
                />

                <TouchableOpacity style={styles.eyes} onPress={() => (eye2) ? setEye2(false) : setEye2(true)}>
                    {
                        (eye2) ? <AntDesign name="eyeo" size={24} color={colores.third} />
                            :
                            <AntDesign name="eye" size={24} color={colores.primary} />
                    }
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={GlobalStyle.btnLogin}>
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
    txtTitle: {
        fontSize: 25,
        fontWeight: '600',
        alignSelf: 'center',
        marginVertical: 20,
    },
    eyes: {
        position: 'absolute',
        right: 10,
        top: 40
    }
});