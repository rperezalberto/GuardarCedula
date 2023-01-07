

export const LoadImg = async (uri: string) => {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function () {
            reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
    });
    return blob;
}

export interface AuthData {
    name?: string;
    email: string;
    token: null;
    createUserUser: string;
    data: [
        {
            id?: string;
            data: {
                title?: string;
                tokenUser?: string;
                urlCedula?: string
            }
        }
    ],
    users: [
        // {
        //     id?: string;
        //     name?: string;
        //     email?: string;
        //     createUser?: string
        // }
    ]
}

