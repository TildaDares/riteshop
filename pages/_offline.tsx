import { Container, Typography } from '@mui/material'
import Image from 'next/image'
import Carousel from 'react-material-ui-carousel';
import Meta from '@/components/layout/Meta';

const Offline = () => {
  const featuredImages = ['/carousel-img1.jpg', '/carousel-img2.jpg', '/carousel-img3.jpg']

  return (
    <>
      <Meta title="Home" />
      <Carousel animation="slide" sx={{ marginTop: '10px' }}>
        {featuredImages.map((src, index) =>
          <Image
            layout='responsive'
            objectFit='cover'
            width={640}
            height={200}
            key={index}
            src={src}
            alt=' Women Fashion'
          />
        )}
      </Carousel>
      <Container sx={{ minHeight: '80vh' }}>
        <Typography component="h2" variant="h2" align="center">Uh oh! Looks like you are offline :(</Typography>
      </Container>
    </>
  )
}

export default Offline
