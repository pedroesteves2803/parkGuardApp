import { Platform } from 'react-native';

const plateDetectionUrl = 'https://parkguardmicroservice.fly.dev';

export async function detectPlace(token: string, imageUri: string): Promise<string> {
    try {
        const formData = new FormData();

        const type = Platform.OS === 'ios' ? 'image/jpeg' : 'image/png';

        formData.append('image', {
            uri: imageUri,
            type: type,
            name: `image.${type}`, 
        } as any);

        const response = await fetch(`${plateDetectionUrl}/detect`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        });


        if (!response.ok) { 
            throw new Error(`Erro na requisição (detectPlace): ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();
        console.log(response.ok, response.status, responseData);

        if(responseData.error){

            throw new Error(responseData.message);
        }

        return responseData.plate;
    } catch (error) {
        throw new Error("Algo deu errado, tente novamente mais tarde!");
    }
}

export const plateDetectionService = { detectPlace };
