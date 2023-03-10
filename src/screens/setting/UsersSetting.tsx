import { useEffect, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { dbFirestore, dbAuth } from '../../firebase/config';
import { deleteUser, reauthenticateWithCredential, getAuth } from 'firebase/auth';
import { collection, onSnapshot } from 'firebase/firestore';
import { useAppSelector, useAppDispatch } from '../../hook/hook';
import { getUsers } from '../../feacture/authSlice';

import { ListItem } from '@rneui/themed';
import { colores } from '../../theme/Colores';
import { Button } from '@rneui/base';
import { GlobalStyle } from '../../theme/GlobalStyle';
import { StackScreenProps } from '@react-navigation/stack';


interface IfoUser {
    id?: string;
    name?: string;
    email?: string;
    createUser?: string
}


interface Props extends StackScreenProps<any, any> { };

export const UsersSetting = ({ navigation }: Props) => {

    const { users } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const getProfileExist = () => {
        onSnapshot(collection(dbFirestore, 'usuarios'), (document) => {
            document.forEach((item) => {
                dispatch(getUsers(item.data()));
            })
        })
    }



    const deleteUsers = async () => {
        // const auth = getAuth();
        // const user = auth.currentUser;

        // const credential = promptForCredentials();

        // reauthenticateWithCredential(user, credential).then(() => {
        //     alert('Ya')
        // }).catch((error) => {
        //     alert(error);
        // });

    }



    const getUsersData = useMemo(() => getProfileExist(), []);




    const renderItemUser = (item: IfoUser) => {
        return (
            <ListItem.Swipeable
                leftContent={() => (
                    <Button
                        title="Info"
                        onPress={() => navigation.navigate('InfUser')}
                        icon={{ name: 'info', color: colores.white }}
                        buttonStyle={{ minHeight: '100%', backgroundColor: colores.primary }}
                    />
                )}

                rightContent={() => (
                    <Button
                        title="Eliminar"
                        onPress={() => deleteUsers()}
                        icon={{ name: 'delete', color: 'white' }}
                        buttonStyle={{ minHeight: '100%', backgroundColor: colores.delete }}
                    />
                )}
            >

                <ListItem.Content>
                    <ListItem.Title><Text>{item.name}</Text></ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem.Swipeable>
        )
    }


    const renderItemHeader = () => {
        return (
            <View>
                <Text style={GlobalStyle.txtTitleHeader}>Listados de usuarios registrados</Text>
                <Text style={styles.subTitle}>Para ver mas opciones deslice a la derecha o izquierda </Text>
            </View>
        )
    }


    return (
        <View>
            <FlatList
                data={users}
                renderItem={({ item }) => renderItemUser(item)}
                ListHeaderComponent={() => renderItemHeader()}
                ItemSeparatorComponent={() => <View style={{ borderWidth: StyleSheet.hairlineWidth }}></View>}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    subTitle: {
        alignSelf: 'center',
        marginBottom: 10
    }
})