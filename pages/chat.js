import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';

const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzM5NTE5MywiZXhwIjoxOTU4OTcxMTkzfQ.NmbnaUQHJbL4Up7XoIAQplWFcIHSv0HpdzVQ5EY5rn0'
const supabaseURL = 'https://ysgeoiobtmxnhfwoezjb.supabase.co'
const supabaseClient = createClient(supabaseURL, supabaseAnonKey)


function listenInRealTimeMessage(addMessege) {
    return supabaseClient
        .from('message')
        .on('INSERT', (response) => {
            addMessege(response.new)
        })
        .subscribe()
}


export default function ChatPage() {
    const route = useRouter();
    const loggedUser = route.query.username;
    // console.log('usuario: ', loggedUser)
    const [message, setMessage] = React.useState('');
    const [messageList, setMessageList] = React.useState([])

    React.useEffect(() => {
        supabaseClient
            .from('message')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                setMessageList(data)
            })
        
      const subscription =  listenInRealTimeMessage((newMessage)=>{
            console.log('lista de mesagens: ', messageList)
            console.log('Nova mensagem:', newMessage)

            setMessageList((currentListValue)=>{
                console.log('Valor atual da lista:', currentListValue)
                return[
                    newMessage,
                    ...currentListValue,
                ]
            })
        
        });
            return()=>{
                subscription.unsubscribe()
            } 
    }, []);
    // Sua lógica vai aqui

    // ./Sua lógica vai aqui
    function handleNewMessage(newMessage) {
        const message = {
            // id: messageList.length + 1,
            from: loggedUser,
            text: newMessage,
        }

        supabaseClient
            .from('message')
            .insert([
                message
            ])
            .then(({ data }) => {
            })


        setMessage('')
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundImage: 'url(https://i.redd.it/0660ms71jp251.jpg)',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}

                >

                    <MessageList message={messageList} />
                    {/* {messageList.map((currentMessage)=>{
                        return(
                            <li key={currentMessage.id}>
                                {currentMessage.from}: {currentMessage.text}
                            </li>
                        )
                    })} */}
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={message}
                            onChange={(event) => {
                                const value = event.target.value
                                setMessage(value)
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault()

                                    handleNewMessage(message)

                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <ButtonSendSticker
                            onStickerClick={(sticker)=>{
                                // console.log('salvou')
                                handleNewMessage(':sticker:' + sticker)
                            }}
                        />
                        <Button
                            variant='tertiary'
                            colorVariant='neutral'
                            label='Enviar'
                            onClick={() => handleNewMessage(message)}
                        />

                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    // console.log(props);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.message.map((message) => {
                return (
                    <Text
                        key={message.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${message.from}.png`}
                            />
                            <Text tag="strong">
                                {message.from}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}

                            </Text>
                        </Box>
                        {message.text.startsWith(':sticker:') ? (
                            <Image src={message.text.replace(':sticker:', '')}/>
                        ) : (
                                message.text
                            )}
                        
                    </Text>
                )
            })}

        </Box>
    )
}