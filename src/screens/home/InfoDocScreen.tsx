import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { colores } from '../../theme/Colores';
import { GlobalStyle } from '../../theme/GlobalStyle';
import { AlertComponent } from '../../components/AlertComponent';
import { useNavigation } from '@react-navigation/native';

export const InfoDocScreen = ({ route }: any) => {

    const dateInfo = route.params;
    const dateInfoCedula = route;

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image
                style={styles.img}
                source={{ uri: dateInfo.data.urlCedula }}
            />
            <Text style={GlobalStyle.txtTitle}>{dateInfo.data.title}</Text>

            <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                <TouchableOpacity style={[styles.btn, { backgroundColor: colores.primary }]}>
                    <Text style={styles.txt}>Descargar</Text>
                    <AntDesign name="clouddownloado" size={24} color={colores.white} />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.btn, { backgroundColor: colores.delete }]} onPress={() => AlertComponent(dateInfo, navigation)}>
                    <Text style={styles.txt}>Eliminar</Text>
                    <AntDesign name="delete" size={24} color={colores.white} />
                </TouchableOpacity>
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 1
    },
    img: {
        width: '100%',
        height: 400,
        resizeMode: 'cover',
    },
    btn: {
        width: 150,
        flexDirection: 'row',
        marginHorizontal: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txt: {
        color: colores.white,
        fontSize: 18,
        fontWeight: '400',
        margin: 10,
        shadowColor: colores.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 3.5,
        shadowOpacity: 5,
        elevation: 5,
    }
})