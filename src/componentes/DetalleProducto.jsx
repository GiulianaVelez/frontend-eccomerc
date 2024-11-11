import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Button, Grid, CardMedia, TextField, MenuItem } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

function DetalleProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState({});
  const [dataImg, setDataImg] = useState([]);
  const [selectedImg, setSelectedImg] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [color, setColor] = useState('');
  const [talle, setTalle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarDescripcion, setMostrarDescripcion] = useState(false);

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const respuesta = await axios.get(`/api/producto/${id}`);
        setProducto(respuesta.data.data);

        const imagenesRespuesta = await axios.get(`/api/imagen/producto/${id}`);
        setDataImg(imagenesRespuesta.data.data);

        if (imagenesRespuesta.data.data.length > 0) {
          setSelectedImg(imagenesRespuesta.data.data[0].ubicacion);
        }
      } catch (error) {
        console.error('Error al cargar el producto:', error);
        setError('Error al cargar el producto.');
      } finally {
        setLoading(false);
      }
    };

    obtenerProducto();
  }, [id]);

  const agregarAlCarrito = () => {
    alert(`Producto agregado: ${producto.nombre}\nCantidad: ${cantidad}\nColor: ${color}\nTalle: ${talle}`);
  };

  const incrementarCantidad = () => {
    setCantidad(cantidad + 1);
  };

  const decrementarCantidad = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  const toggleDescripcion = () => {
    setMostrarDescripcion(!mostrarDescripcion);
  };

  
  const coloresDisponibles = ['#FFFFFF', '#000000', '#D5006D', "#E6E6FA",'#77DD77']; // Blanco, Negro, Rosa, Beige, Verde Pastel

  if (loading) {
    return <div className="text-center text-gray-600">Cargando producto...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  if (!producto) {
    return <div className="text-center text-gray-600">No se encontró el producto.</div>;
  }

  return (
    <Box className="container mx-auto p-5">
      <Box className="bg-pink-100 rounded-lg p-5">
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            
            <Box>
              {dataImg && dataImg.length > 0 ? (
                dataImg.map((imagen) => (
                  <img
                    key={imagen.id}
                    src={imagen.ubicacion}
                    alt={producto.nombre}
                    onClick={() => {
                      setSelectedImg(imagen.ubicacion);
                    }}
                    className={`w-full h-24 object-cover rounded-lg cursor-pointer mb-2 ${selectedImg === imagen.ubicacion ? 'border-2 border-pink-600' : ''}`} // Borde para imagen activa
                  />
                ))
              ) : (
                <Typography>No hay imágenes disponibles.</Typography>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={9}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                
                <Carousel
                  showThumbs={false}
                  onChange={(index) => setSelectedImg(dataImg[index]?.ubicacion)}
                  interval={3000}
                  autoPlay
                  infiniteLoop
                  showIndicators={false}
                  selectedItem={dataImg.findIndex((img) => img.ubicacion === selectedImg)} // Establecer el índice seleccionado
                >
                  {dataImg.map((imagen) => (
                    <div key={imagen.id}>
                      <CardMedia
                        component="img"
                        image={imagen.ubicacion}
                        alt={producto.nombre}
                        className="rounded-lg w-full h-96 object-cover"
                      />
                    </div>
                  ))}
                </Carousel>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box mt={4}>
                  <Typography variant="h4" component="h1" gutterBottom>
                    {producto.nombre}
                  </Typography>
                  <Typography variant="h5" component="p" color="text.secondary" gutterBottom>
                    ${producto.precio}
                  </Typography>

                  <Typography variant="body1" color="black" paragraph>
                    {producto.descripcion_larga}
                  </Typography>

                  

                  
                  <TextField
                    select
                    label="Talle"
                    value={talle}
                    onChange={(e) => setTalle(e.target.value)}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#D5006D', 
                        },
                        '&:hover fieldset': {
                          borderColor: '#D5006D', 
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#D5006D', 
                        },
                      },
                    }}
                  >
                    <MenuItem value="S">S</MenuItem>
                    <MenuItem value="M">M</MenuItem>
                    <MenuItem value="L">L</MenuItem>
                    <MenuItem value="XL">XL</MenuItem>
                  </TextField>

                  <Typography variant="subtitle1" className="mt-2">Color:</Typography>
                  <Box className="flex mt-1">
                    {coloresDisponibles.map((colorDisponible) => (
                      <Box
                        key={colorDisponible}
                        onClick={() => setColor(colorDisponible)}
                        className={`w-8 h-8 rounded-full border cursor-pointer mr-2 ${color === colorDisponible ? 'border-black' : 'border-gray-400'}`}
                        style={{ backgroundColor: colorDisponible }} 
                      />
                    ))}
                  </Box>

                  
                  <Box className="inline-flex items-center mt-2 border-2 border-pink-500 p-2 rounded"> {/* Añadir borde rosa */}
                    <Button 
                      onClick={decrementarCantidad} 
                      className="bg-white border-2 border-pink-500 text-pink-500 hover:bg-pink-100 rounded w-10 h-10">
                      -
                    </Button>
                    <Typography className="mx-2 text-gray-700">{cantidad}</Typography> {/* Muestra la cantidad actual */}
                    <Button 
                      onClick={incrementarCantidad} 
                      className="bg-white border-2 border-pink-500 text-pink-500 hover:bg-pink-100 rounded w-10 h-10">
                      +
                    </Button>
                  </Box>

                  
                  <Box mt={4}> 
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: '#D5006D', 
                        color: 'white',
                      }}
                      className="hover:bg-pink-700" 
                      onClick={agregarAlCarrito}
                    >
                      Agregar al carrito 
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default DetalleProducto;