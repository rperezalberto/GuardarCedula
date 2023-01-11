import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { colores } from '../../theme/Colores';
import { GlobalStyle } from '../../theme/GlobalStyle';
// import { AlertComponent } from '../../components/AlertComponent';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../../hook/hook';
import { resetData } from '../../feacture/authSlice';
import { dbFirestore, dbStore } from '../../firebase/config';
import { doc, deleteDoc } from 'firebase/firestore';
import { deleteObject, ref, getDownloadURL } from 'firebase/storage';
import { async } from '@firebase/util';

export const InfoDocScreen = ({ route, navigation }: any) => {

    const dateInfo = route.params;
    const dateInfoCedula = route;

    // const navigation = useNavigation();
    const dispatch = useAppDispatch();





    const AlertComponent = (item: any) => {

        const deleteImg = async () => {
            const desertRef = ref(dbStore, `cedulaInfo/${item.data.nameImg}`);
            await deleteObject(desertRef)
                .then(() => {
                    deletTitle();
                    dispatch(resetData());
                });
        }

        const deletTitle = async () => {
            await deleteDoc(doc(dbFirestore, `cedulaInfo/${item.id}`))
                .then(() => navigation.navigate('HomeScreen'));
        }


        Alert.alert(
            'Borrar',
            `Estas seguro que quiere a borrar ${item.data.title}?`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Ok!',
                    onPress: () => deleteImg()
                }
            ]
        )
    }



    const DownloadImg = async () => {
        const id = dateInfo.data.urlCedula;

        // console.log(dateInfo.data.urlCedula);

        const starRef = ref(dbStore, id);
        await getDownloadURL(starRef)
            .then(url => {
                alert('Imagen descargada');
            })
    }



    return (
        <View style={styles.container}>
            <Image
                style={styles.img}
                source={{ uri: dateInfo.data.urlCedula }}
            />
            <Text style={GlobalStyle.txtTitle}>{dateInfo.data.title}</Text>

            <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                <TouchableOpacity style={[styles.btn, { backgroundColor: colores.primary }]} onPress={() => DownloadImg()}>
                    <Text style={styles.txt}>Descargar</Text>
                    <AntDesign name="clouddownloado" size={24} color={colores.white} />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.btn, { backgroundColor: colores.delete }]} onPress={() => AlertComponent(dateInfo)}>
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