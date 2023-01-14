import { useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { colores } from '../../theme/Colores';
import { GlobalStyle } from '../../theme/GlobalStyle';
// import { AlertComponent } from '../../components/AlertComponent';
import { useAppDispatch } from '../../hook/hook';
import { resetData } from '../../feacture/authSlice';
import { dbFirestore, dbStore } from '../../firebase/config';
import { doc, deleteDoc } from 'firebase/firestore';
import { deleteObject, ref, getDownloadURL } from 'firebase/storage';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { ActivityScreen } from '../activity/ActivityScreen';

export const InfoDocScreen = ({ route, navigation }: any) => {

    const dateInfo = route.params;
    const dataSearch = route.params;

    const [isLoad, setIsLoad] = useState(false);

    const dispatch = useAppDispatch();

    const AlertComponent = (item: any) => {


        const deleteImg = async () => {
            const desertRef = ref(dbStore, `cedulaInfo/${(dateInfo.data) ? item.data.nameImg : dataSearch.nameImg}`);
            await deleteObject(desertRef)
                .then(() => {
                    deletTitle();
                    dispatch(resetData());
                });
        }

        const deletTitle = async () => {
            await deleteDoc(doc(dbFirestore, `cedulaInfo/${(dateInfo.data) ? item.id : dataSearch.id}`))
                .then(() => navigation.navigate('HomeScreen'));
        }


        Alert.alert(
            'Borrar',
            `Estas seguro que quiere a borrar ${(dateInfo.data) ? item.data.title : dataSearch.title}?`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Ok!',
                    onPress: () => deleteImg()
                }
            ],
        )
    }



    const DownloadImg = async () => {
        const nameImg = dateInfo.data ? dateInfo.data.nameImg : dateInfo.nameImg;

        const starRef = ref(dbStore, `cedulaInfo/${nameImg}`);
        await getDownloadURL(starRef)
            .then(url => {
                getUrlImg(url);
            })
    }


    const getUrlImg = async (url: any) => {
        let permission = await MediaLibrary.requestPermissionsAsync();

        if (permission.status !== 'granted') {
            await MediaLibrary.requestPermissionsAsync();
        } else {
            setIsLoad(true);
            FileSystem.downloadAsync(url, FileSystem.documentDirectory + `${dateInfo.data ? dateInfo.data.title : dateInfo.title}.png`)
                .then(({ uri }) => {
                    console.log('Finished downloading to ', uri);
                    creteAlbum(uri);

                })
                .catch(error => {
                    console.error(error);
                });

        }
    }

    const creteAlbum = async (uri: string) => {

        const asset = await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAlbumAsync('Cedulas', asset, false);
        setIsLoad(false);
        alert('Cedula descargada, revice la galeria');
    }






    if (isLoad) return <ActivityScreen />


    return (
        <View style={styles.container}>
            <Image
                style={styles.img}
                source={{ uri: (dateInfo.data) ? dateInfo.data.urlCedula : dataSearch.urlCedula }}
            />
            <Text style={GlobalStyle.txtTitle}>{(dateInfo.data) ? dateInfo.data.title : dataSearch.title}</Text>

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