import { Platform } from 'react-native';

const plateDetectionUrl = 'http://192.168.1.124:8282';

export async function detectPlace(token: string, imageUri: string): Promise<string> {
    try {
        const formData = new FormData();

        const type = Platform.OS === 'ios' ? 'image/jpeg' : 'image/png';

        formData.append('image', {
            uri: imageUri,
            type: type,
            name: 'image.jpg', 
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

        if(responseData.error){
            throw new Error(responseData.message);
        }

        return responseData.placa;
    } catch (error) {
        console.error('Erro ao detectar placa:', error.message);
        throw new Error(error.message);
    }
}

export const plateDetectionService = { detectPlace };
