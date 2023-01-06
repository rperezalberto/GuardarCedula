import 'react-native-get-random-values';
import { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colores } from '../../theme/Colores';
import { GlobalStyle } from '../../theme/GlobalStyle';
import { dbStore, dbFirestore } from '../../firebase/config';
import { doc, addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { useAppSelector } from '../../hook/hook';
import { LoadImg } from '../../util/Util';
import { ActivityScreen } from '../activity/ActivityScreen';



export const AddPhoto = ({ route }: any) => {
    const urlTmp = route.params[0].uri;

    const [title, setTitle] = useState('');
    const [isLoad, setIsLoad] = useState(false);
    const [urlCedula, setUrlCedula] = useState('');

    const { token } = useAppSelector(state => state.auth);

    const uploadPhoto = async () => {
        if (title.trim() !== '') {
            try {
                setIsLoad(true);
                const url = await LoadImg(urlTmp);
                const nameImg = v4();
                const storageRef = ref(dbStore, 'cedulaInfo/' + nameImg);
                await uploadBytes(storageRef, url);
                await getDownloadURL(storageRef)
                    .then(e => {
                        uploadImgTitle(e, nameImg);
                    })

                // uploadImgTitle(urlCedula);
            } catch (error) {
                setIsLoad(false);
            }
            setIsLoad(false);
        } else {
            alert('El nombre de la cédula es obligatorio');
        }
    }


    const uploadImgTitle = (e: string, nameImg: string) => {
        const refDocument = collection(dbFirestore, 'cedulaInfo');

        addDoc(refDocument, {
            title,
            urlCedula: e,
            tokenUser: token,
            nameImg
        })
    }



    if (isLoad) return <ActivityScreen />

    return (
        <View style={styles.container}>
            <Image
                style={styles.img}
                source={{ uri: urlTmp }}
            />
            <TextInput
                style={[GlobalStyle.input, styles.btn]}
                placeholder='Nombre de la cédula'
                onChangeText={(e) => setTitle(e)}
            />

            <TouchableOpacity style={[GlobalStyle.btnLogin, styles.btn]} onPress={() => uploadPhoto()}>
                <Text style={styles.txtBtn}>Subir cédula</Text>
            </TouchableOpacity>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colores.white,
    },
    img: {
        width: '100%',
        height: 300
    },
    btn: {
        marginHorizontal: 15
    },
    txtBtn: {
        fontSize: 15,
        padding: 15,
        color: colores.white,
        fontWeight: '600'
    }
})