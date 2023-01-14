import { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, useWindowDimensions, TextInput } from 'react-native';
import { useAppSelector, useAppDispatch } from '../../hook/hook';
import { GlobalStyle } from '../../theme/GlobalStyle';
import { colores } from '../../theme/Colores';
import { StackScreenProps } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { dbFirestore } from '../../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { ActivityScreen } from '../activity/ActivityScreen';
import { resultSearch } from '../../feacture/authSlice';

interface Props extends StackScreenProps<any, any> { };

export const SearchScreen = ({ navigation }: Props) => {

    const dispatch = useAppDispatch();
    const { dataSearch } = useAppSelector(state => state.auth);


    // console.log(dataSearch);

    const { width } = useWindowDimensions();
    const wid = (width / 3) - 2;

    const [isLoad, setIsLoad] = useState(false);
    const [name, setName] = useState('');



    useEffect(() => {
        navigation.addListener('focus', () => {
            dispatch(resultSearch(
                {
                    title: '',
                    nameImg: '',
                    tokenUser: '',
                    urlCedula: '',
                    id: ''
                }
            ));
        });
    }, []);






    const searchCedula = async () => {
        setIsLoad(true);
        const q = query(collection(dbFirestore, 'cedulaInfo'), where('title', '==', name));
        const querySnapshot = await getDocs(q);


        if (querySnapshot.size === 0) {
            dispatch(resultSearch(
                {
                    title: '',
                    nameImg: '',
                    tokenUser: '',
                    urlCedula: '',
                    id: ''
                }
            ));
            alert('Cédula no encontrada');
        }


        querySnapshot.forEach((document) => {
            const data = document.data();

            dispatch(resultSearch(
                {
                    title: data.title,
                    nameImg: data.nameImg,
                    tokenUser: data.tokenUser,
                    urlCedula: data.urlCedula,
                    id: document.id
                }
            ));
        })
        setIsLoad(false);
    }

    if (isLoad) return <ActivityScreen />

    return (
        <View>
            <Text style={GlobalStyle.txtTitleHeader}>Ingresea numero de cédula</Text>
            <View style={styles.containerSearch}>
                <View style={styles.searchIcon}>
                    <MaterialIcons name="search" size={24} color="black" />
                </View>
                <TextInput
                    style={[GlobalStyle.input, { width: '100%', paddingLeft: 35 }]}
                    placeholder='Buscar cédula'
                    onChangeText={e => setName(e)}
                    onEndEditing={() => searchCedula()}
                />
            </View>

            {
                dataSearch.urlCedula && <TouchableOpacity onPress={() => navigation.navigate('InfoDocumento', { ...dataSearch })}>
                    <View style={[styles.renderItem, { width: wid }]}>
                        <Image
                            style={styles.img}
                            source={{ uri: dataSearch.urlCedula }}
                        />
                    </View>
                </TouchableOpacity>
            }

        </View>
    )
}


const styles = StyleSheet.create({
    searchIcon: {
        position: 'absolute',
        marginHorizontal: 10
    },
    containerSearch: {
        alignItems: 'center',
        flexDirection: "row",
        // marginHorizontal: 10
    },
    txtTitle: {
        top: 50,
        position: 'absolute',
        color: colores.white,
        alignSelf: 'center'
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
    img: {
        width: '100%',
        // height: 50
        height: '100%'
    },
})