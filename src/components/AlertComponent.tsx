
import { Alert } from 'react-native';
import { dbStore, dbFirestore } from '../firebase/config';
import { ref, deleteObject } from 'firebase/storage';
import { doc, deleteDoc } from 'firebase/firestore';




export const AlertComponent = (item: any, navigation: any) => {

    const deleteImg = async () => {
        const desertRef = ref(dbStore, `cedulaInfo/${item.data.nameImg}`);
        await deleteObject(desertRef)
            .then(() => {
                deletTitle();
                console.log('Borrando');
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
