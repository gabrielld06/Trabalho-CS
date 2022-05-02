import { useMediaQuery, Card, CardActions, CardContent, CardMedia, Button, Typography, Grid, Divider, Box, TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import React from 'react'
import SupimpaLogo from '../../assets/supimpa.png'
import Header from '../../components/Header'
import './styles.css'

export default function MyPresentationView(props) {
  const { myPresentationList, handleChangeField, filter } = props;
  const matches = useMediaQuery('(min-width:768px)');
  
  const maxLength = 69;
  return (
    <div>
      <Header></Header>
      <Grid direction={matches ? 'row' : 'column'} className='mainContainer'>
        <Box className='leftSide'>
          <TextField
            id="searchField"
            label="Busca"
            onChange={(e) => { handleChangeField(e) }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon/>
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
        </Box>
        {matches ? <Divider orientation="vertical" flexItem /> : <Divider orientation="horizontal" flexItem />}
        <Box className='rightSide'>
          <Grid container
            direction={matches ? 'row' : 'column'}
            width='100%'
            justifyContent="space-evenly"
            rowGap={2}
            columnGap={2}
            alignItems="center">
                
            {myPresentationList.filter(e => (filter === "" ? e : e.name.toLowerCase().includes(filter.toLowerCase()))).map((item) => (
              <Card key={`${item.name}`} sx={{ minWidth: 430, minHeight: 250, maxHeight: 300, maxWidth: 430 }}>
                <Link to={`/${item.event.name}/${item.name}`}>
                  <CardMedia
                    component="img"
                    alt="evento"
                    height="140"
                    src={item.thumb ? item.thumb : SupimpaLogo}
                  />
                </Link>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.theme.length < 72 ? item.theme : (item.theme.substring(0, maxLength) + "...")}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button component={Link} to={`/${item.event.name}/${item.name}`} size="small">Ver palestra</Button>
                  <Button component={Link} to={`/${item.event.name}/${item.name}/edit_presentation`} size="small">Editar palestra</Button>
                  <Button component={Link} to={`/${item.event.name}/${item.name}/presentation_report`} size="small">Gerar relatório</Button>
                </CardActions>
              </Card>
            ))}
          </Grid>
        </Box>
      </ Grid>
    </div>
  )
}
