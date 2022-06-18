import React, { useState } from 'react'
import {
  Box,
  Modal,
  Tooltip,
  ListItem,
  CardMedia,
  Accordion,
  ListItemText,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CardHero from './CardHero'
import imgReplace from '../img/hero_default.png'

const BoxStyle = {
  width: 720,
  height: 520,
  top: '50%',
  left: '50%',
  boxShadow: 24,
  display: 'flex',
  padding: '24px',
  position: 'absolute',
  alignItems: 'center',
  border: '2px solid #e23636',
  bgcolor: 'background.paper',
  justifyContent: 'space-around',
  transform: 'translate(-50%, -50%)',
}

const BoxStyleGif = {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const CardMediaStyle = {
  objectFit: 'contain',
  height: '250px',
  width: '250px',
}

const TableHero = ({ items }) => {
  const [openModal, setOpenModal] = useState(false)
  const [informationCard, setInformationCard] = useState([])
  const imgHero = informationCard?.imagemForHero
  const infoHero = informationCard?.item

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <section className="contents">
      {items.map((item) => (
        <CardHero
          key={item.id}
          item={item}
          openModal={setOpenModal}
          information={setInformationCard}
        ></CardHero>
      ))}

      <Modal
        className="Mui-Modal"
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={BoxStyle}>
          <Box style={{ height: '100%', color: 'black', overflowY: 'auto' }}>
            <ListItem sx={{ pb: 0 }}>
              <ListItemText>Name: {infoHero?.name}</ListItemText>
            </ListItem>
            <ListItem sx={{ pb: 0, pt: 0 }}>
              <ListItemText>Biography:</ListItemText>
            </ListItem>
            <ListItem sx={{ pb: 0, pt: 0 }}>
              <ListItemText>
                {infoHero?.description.length > 0
                  ? infoHero?.description
                  : 'Não há Descrição para o herói'}
              </ListItemText>
            </ListItem>
            <ListItem sx={{ pb: 0, pt: 0 }} style={{ display: 'block' }}>
              {infoHero?.comics?.items.length > 0 ? (
                <Accordion sx={{ boxShadow: 'none', padding: 0, margin: 0 }}>
                  <AccordionSummary
                    sx={{ padding: 0, margin: 0 }}
                    id="panel1a-header"
                    aria-controls="panel1a-content"
                    expandIcon={<ExpandMoreIcon sx={{ fontSize: '42px' }} />}
                  >
                    <Tooltip
                      title="Clique para ver mais"
                      placement="bottom-start"
                    >
                      <ListItem sx={{ pb: 0, pt: 0, padding: 0, margin: 0 }}>
                        <ListItemText>Comics:</ListItemText>
                      </ListItem>
                    </Tooltip>
                  </AccordionSummary>
                  {infoHero?.comics?.items.map((comics) => (
                    <AccordionDetails>
                      <ListItemText
                        sx={{ pb: 0, pt: 0 }}
                        key={comics?.resourceURI}
                      >
                        {comics?.name}
                      </ListItemText>
                    </AccordionDetails>
                  ))}
                </Accordion>
              ) : (
                <>
                  <ListItemText>Comics:</ListItemText>
                  <ListItemText sx={{ pb: 0, pt: 0 }}>
                    Não há registro de quadrinhos para o herói
                  </ListItemText>
                </>
              )}
            </ListItem>
          </Box>
          <Box>
            <CardMedia
              component="img"
              height="140"
              image={imgHero}
              sx={CardMediaStyle}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null
                currentTarget.src = imgReplace
              }}
              alt={`imagem do heroi ${infoHero?.name}`}
            />
          </Box>
        </Box>
      </Modal>
    </section>
  )
}

export default TableHero
