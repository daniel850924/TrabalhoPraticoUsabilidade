import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import imgReplace from '../img/hero_default.png'

const CardStyle = {
  maxWidth: 250,
  background: 'white',
  border: '2px solid #e23636',
  boxShadow: 'none !important',
  '&:hover': {
    border: '2px solid #e2363690',
    filter: 'drop-shadow(0px 5px 5px gray)',
    transition: 'all 0.4s ease-in',
  },
}

const CardActionAreaStyle = {
  background: 'none',
  cursor: 'pointer',
  border: 'none',
  '&:hover': {
    '.MuiCardActionArea-focusHighlight': {
      opacity: '0',
    },
    filter: 'hue-rotate(90deg)',
    transition: 'all 0.3s ease-in',
  },
}

const CardMediaStyle = {
  objectFit: 'contain',
  height: '250px',
  width: '250px',
}

const CardCharacter = ({ item, openModal, information }) => {
  const [imagemForHero, setImagemForHero] = useState('')

  useEffect(() => {
    const changeForHero = () => {
      !!item.thumbnail.path.includes('image_not_available')
        ? setImagemForHero(imgReplace)
        : setImagemForHero(item.thumbnail.path + '/standard_fantastic.jpg')
    }
    changeForHero()
  }, [imagemForHero])

  const handleOpen = () => {
    openModal(true)
  }

  const handleDescription = () => {
    information({ item, imagemForHero })
  }

  const handleInformation = () => {
    handleOpen()
    handleDescription()
  }

  return (
    <Card sx={CardStyle}>
      <CardActionArea sx={CardActionAreaStyle} onClick={handleInformation}>
        <CardMedia
          component="img"
          height="140"
          image={imagemForHero}
          sx={CardMediaStyle}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null
            currentTarget.src = imgReplace
          }}
          alt={`imagem do heroi ${item.name}`}
        />
        <CardContent>
          <Typography sx={{ height: '40px' }}>{item.name}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CardCharacter
