import { useEffect, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { dbFirestore, dbAuth } from '../../firebase/config';
import { deleteUser, reauthenticateWithCredential } from 'firebase/auth';
import { collection, onSnapshot } from 'firebase/firestore';
import { useAppSelector, useAppDispatch } from '../../hook/hook';
import { getUsers } from '../../feacture/authSlice';
import prompt from 'react-native-prompt-android';

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



    const deleteUsers = () => {
        // const user = dbAuth.currentUser;
        // const credential = ;

        prompt(
            'Enter password',
            'Enter your password to claim your $1.5B in lottery winnings',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: password => console.log('OK Pressed, password: ' + password) },
            ],
        );

        //  await reauthenticateWithCredential(user, credential)

        // await deleteUser(user).then(() => {
        //     alert('Borrado');
        // }).catch((error) => {
        //     alert(error)
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