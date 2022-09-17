import React, { useState } from 'react'
import Meta from '@/components/layout/Meta'
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { Container, TextField, Grid, List, InputAdornment, ListItem, Button, Typography, OutlinedInput, FormControl, InputLabel, FormHelperText } from '@mui/material'
import { FormValues } from '@/types/CreateProduct'
import { Product } from '@/types/Product';
import Image from 'next/image'

interface CreateProductProps {
  product?: Product;
  title: string;
  submitHandler: (product: Product) => void
}

const CreateProduct = (props: CreateProductProps) => {
  let product: Product | null = null;
  const { title, submitHandler } = props
  if (props.product) product = props.product
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  let initialImage = product && product.image ? product.image : ''
  const [previewSource, setPreviewSource] = useState(initialImage);
  const [file, setFile] = useState<any>(null);
  // Make field required if product does not exist or product does not have an image
  const required = (product && !product.image) || !product

  const initialState = {
    name: product ? product.name : '',
    description: product ? product.description : '',
    quantity: product ? product.quantity : 1,
    price: product ? product.price : 1
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: initialState
  });

  const previewFile = (file: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result as Buffer);
    };
  };

  const handleFileChange = (e: any) => {
    if (e.target.files.length < 1) return
    const img = e.target.files[0]
    previewFile(img)
    setFile(img);
  };

  const onSubmit = async ({ name, description, price, quantity }: FormValues) => {
    closeSnackbar()
    if (required && !file) {
      enqueueSnackbar('Please add a valid image', { variant: 'error' })
      return
    };
    submitHandler({ name, description, image: file, price, quantity })
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: '80vh' }}>
      <Meta title={title} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography component="h1" variant="h1" sx={{ textAlign: 'center' }}>
          {title}
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="name"
                  label="Name"
                  inputProps={{ type: 'name' }}
                  error={Boolean(errors.name)}
                  helperText={
                    errors.name
                      ? errors.name.type === 'minLength'
                        ? 'Name length is less than 1'
                        : 'Name is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="description"
                  label="description"
                  error={Boolean(errors.description)}
                  helperText={
                    errors.description
                      ? errors.description.type === 'minLength'
                        ? 'Description length is less than 1'
                        : 'Description is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Grid sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, width: '100%', justifyContent: 'space-between' }}>
              <Controller
                name="quantity"
                control={control}
                rules={{
                  required: true,
                  min: 1,
                }}
                render={({ field }) => (
                  <FormControl variant="outlined" sx={{ mb: { xs: 2, sm: 0 } }}>
                    <InputLabel id='quantity'>Quantity</InputLabel>
                    <OutlinedInput
                      {...field}
                      type='number'
                      id="quantity"
                      label="Quantity"
                      inputProps={{ min: 1 }}
                      error={Boolean(errors.quantity)}
                    />
                    <FormHelperText color="secondary" id="quantity-helper-text">{
                      errors.quantity
                        ? errors.quantity.type === 'min'
                          ? 'Quantity is less than 1'
                          : 'Quantity is required'
                        : ''
                    }</FormHelperText>
                  </FormControl>
                )}
              ></Controller>

              <Controller
                name="price"
                control={control}
                rules={{
                  required: true,
                  min: 1,
                }}
                render={({ field }) => (
                  <FormControl variant="outlined">
                    <InputLabel id='price'>Price</InputLabel>
                    <OutlinedInput
                      {...field}
                      type='number'
                      id="price"
                      label="Price"
                      inputProps={{ min: 1 }}
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      error={Boolean(errors.price)}
                    />
                    <FormHelperText color="secondary" id="price-helper-text">{
                      errors.price
                        ? errors.price.type === 'min'
                          ? 'Price is less than 1'
                          : 'Price is required'
                        : ''
                    }</FormHelperText>
                  </FormControl>
                )}
              ></Controller>
            </Grid>
          </ListItem>
          <ListItem>
            <input accept="image/*" type="file" onChange={handleFileChange} required={required} />
          </ListItem>
          <ListItem>
            <Grid sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Button variant="contained" type="submit" color="primary">
                Save
              </Button>
            </Grid>
          </ListItem>
        </List>
      </form>
      {previewSource && (
        <Image
          src={previewSource as string}
          alt="product image"
          width='100px'
          height='100px'
        />
      )}
    </Container>
  )
}

export default CreateProduct
