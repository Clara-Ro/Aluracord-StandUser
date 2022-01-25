import appConfig from '../config.json';
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';
import react from 'react';


function Title(props){
  const Tag = props.tag || 'h1';

  return(
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
        ${Tag}{
          font-size: 24px;
          font-weight: 600;
          color: ${appConfig.theme.colors.neutrals['000']};
        }
      `}</style>
    </>
  )
}

export default function HomePage() {
  //const username = 'Clara-Ro';
  const [username, setUsername]= React.useState('');
  const route = useRouter();
  const [name, setName] = React.useState('');
  
  React.useEffect(()=>{
    if(username.length>2){
      const url= `https://api.github.com/users/${username}`
      fetch(url).then((res)=>{
        res.json().then((data)=>{
          console.log(data)
          const {name}= data
          setName(name)
        })
      }).catch((error)=>{
        console.log(error)
      })
    }
  },[username])

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage: 'url(https://i.redd.it/0660ms71jp251.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            as='form'
            onSubmit={function(infoevent){
              infoevent.preventDefault();
              route.push('/chat')
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Title tag="h2">Bem-vindo de volta Crusader!</Title>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>

            <TextField
             value= {username}
             onChange={function (event) {
               const value = event.target.value;
               //Trocar o valor da variavel
               setUsername(value);
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box 
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={
                username.length>2 ? `https://github.com/${username}.png`
                : 'https://i.pinimg.com/736x/d8/c4/14/d8c4147b34116e801aa18d329719284a.jpg'
                }
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px',
                textAlign:'center'
              }}
            >
              {username.length > 2 ? username: ""}  <br/>
              {name ? name:username.length > 2 ? username: "" }
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}