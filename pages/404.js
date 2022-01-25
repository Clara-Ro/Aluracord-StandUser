import appConfig from '../config.json';
import { Box, Button, Text, TextField, Image } from '@skynexui/components';

export default function Page404() {
    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItens: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary['600'],
                    backgroundImage: 'url(https://wallpaperforu.com/wp-content/uploads/2021/09/Wallpaper-Jojos-Bizarre-Adventure-Stardust-Crusaders-Jo461024x600.jpg)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                }}
            >
            
            <Text variant="body3" styleSheet={{ marginTop: '50px', color: appConfig.theme.colors.neutrals['000'],textAlign:'center', fontSize:'40px' }}>
                <h1>Erro inesperado!</h1>
            </Text>
            </Box>    
        </>
    )
}