import { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, useWindowDimensions, Image, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hook/hook';
import { colores } from '../../theme/Colores';
import { GlobalStyle } from '../../theme/GlobalStyle';
import { StackScreenProps } from '@react-navigation/stack';
import { BtnAdd } from '../../components/BtnAdd';
import * as ImagePicker from 'expo-image-picker';
import { collection, onSnapshot } from 'firebase/firestore';
import { dbFirestore } from '../../firebase/config';
import { getDocument } from '../../feacture/authSlice';
// import config from '../../../config';

interface Props extends StackScreenProps<any, any> { };

export const HomeScreen = ({ navigation }: Props) => {


    const { width } = useWindowDimensions();

    const dispatch = useAppDispatch();
    const { data } = useAppSelector(state => state.auth);

    const wid = (width / 3) - 2;

    const AddPhoto = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            const urlTemp = result.assets;
            navigation.navigate('AddPhoto', urlTemp);
        }
    }

    const addGalery = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            const urlTemp = result.assets;
            navigation.navigate('AddPhoto', urlTemp);
        }
    }



    // Renderizar Item
    const renderList = (item: any) => {
        // console.log(item.id)
        return (
            <TouchableOpacity onPress={() => navigation.navigate('InfoDocumento', { ...item })}>
                <View style={[styles.renderItem, { width: wid }]}>
                    <Image
                        style={styles.img}
                        source={{ uri: item.data.urlCedula }}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    // Camera
    const _headerList = () => {
        return (
            <View>
                <Text style={[GlobalStyle.txtTitle, styles.txtTitle]}>Agregar C??dula</Text>
            </View>
        )
    }

    useEffect(() => {
        const getDocuments = () => {
            onSnapshot(collection(dbFirestore, `cedulaInfo`), (document) => {
                document.forEach(item => {
                    dispatch(getDocument({ data: item.data(), id: item.id }));
                });
            })
        }
        getDocuments();
    }, [])



    return (
        <>
            <FlatList
                data={data}
                ListHeaderComponent={() => _headerList()}
                renderItem={({ item }) => renderList(item)}
                numColumns={3}
                scrollEnabled={true}
            />
            <View style={{ position: 'absolute', bottom: 60, right: 0 }}>
                <BtnAdd icon='image' size={20} color='#FFF' onPress={() => addGalery()} />
            </View>
            <View>
                <BtnAdd icon='camera-alt' size={20} color='#FFF' onPress={() => AddPhoto()} />
            </View>
        </>
    )
}




const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0
    },
    containerCamera: {
        height: 150,
        borderWidth: 1,
        borderColor: colores.black,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colores.secundary,
        margin: 1,
        borderRadius: 5,
    },
    renderItem: {
        alignItems: 'center',
        // justifyContent: 'center',
        height: 150,
        margin: 1,
        borderWidth: StyleSheet.hairlineWidth,
        backgroundColor: colores.secundary,
        borderRadius: 5,
    },
    txtTitle: {
        top: 50,
        position: 'absolute',
        color: colores.white,
        alignSelf: 'center'
    },
    img: {
        width: '100%',
        // height: 50
        height: '100%'
    },
    txtImg: {
        color: colores.white,
        padding: 10,
        marginVertical: 5
    }
})