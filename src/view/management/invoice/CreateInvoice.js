import React, { useState, useRef, useEffect } from "react"
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Typography,
  IconButton,
  Link,
  useTheme,
  Breadcrumbs,
  TextField,
  InputAdornment,
  Divider,
} from "@mui/material"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"
import { useLocation, Link as RouterLink } from "react-router-dom"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import { styled } from "@mui/system"

import { useReactToPrint } from "react-to-print"

const initialAddresses = [
  "123 Main St, City, Country",
  "456 Secondary St, City, Country",
  "789 Tertiary St, City, Country",
]

const schema = yup.object().shape({
  fromAddress: yup.string().required("From address is required"),
  toAddress: yup.string().required("To address is required"),
  invoiceId: yup.string().required("Invoice ID is required"),
  status: yup.string().required("Status is required"),
  createdDate: yup.date().required("Created date is required"),
  dueDate: yup.date().required("Due date is required"),
  items: yup.array().of(
    yup.object().shape({
      title: yup.string().required("Title is required"),
      description: yup.string().required("Description is required"),
      price: yup.number().required("Price is required").positive().integer(),
      quantity: yup
        .number()
        .required("Quantity is required")
        .positive()
        .integer(),
      total: yup.number().required("Total is required").positive().integer(),
    })
  ),
  shipping: yup.number().required("Shipping is required").positive().integer(),
  discount: yup.number().required("Discount is required").positive().integer(),
  tax: yup.number().required("Tax is required").positive().integer(),
  total: yup.number().required("Total is required").positive().integer(),
})

const CreateInvoice = () => {
  const theme = useTheme()
  const location = useLocation()
  const pathnames = location.pathname.split("/").filter((x) => x)

  const [addresses, setAddresses] = useState(initialAddresses)
  const [total, setTotal] = useState(null)

  const getTodayDate = () => {
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, "0")
    const dd = String(today.getDate()).padStart(2, "0")
    return `${yyyy}-${mm}-${dd}`
  }

  const { control, handleSubmit, setValue, getValues, watch } = useForm({
    defaultValues: {
      fromAddress: "kakwadi,patel faliya,valsad,396 385",
      toAddress: addresses[0],
      invoiceId: "",
      status: "",
      createdDate: getTodayDate(),
      dueDate: "",
      items: [
        {
          title: "",
          description: "",
          price: null,
          quantity: null,
          total: null,
        },
      ],
      shipping: null,
      discount: null,
      tax: null,
      total: null,
    },
    resolver: yupResolver(schema),
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  })

  const componentRef = useRef()

  const calculateItemTotal = (index) => {
    const items = getValues("items")
    const item = items[index]
    const itemTotal = item.price * item.quantity
    setValue(`items[${index}].total`, itemTotal.toFixed(2))
    calculateFinalTotal()
  }

  const calculateFinalTotal = () => {
    const items = getValues("items")
    const shipping = parseFloat(getValues("shipping") || 0)
    const discount = parseFloat(getValues("discount") || 0)
    const tax = parseFloat(getValues("tax") || 0)

    const itemTotal = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    )
    const finalTotal = itemTotal + shipping - discount + tax

    setValue("total", finalTotal.toFixed(2))
    setTotal(finalTotal.toFixed(2))
  }

  useEffect(() => {
    const subscription = watch((values, { name, type }) => {
      if (
        name?.includes("items") ||
        ["shipping", "discount", "tax"].includes(name)
      ) {
        calculateFinalTotal()
      }
    })
    return () => subscription.unsubscribe()
  }, [watch])

  const onSubmit = (data) => {
    console.log(data)
  }

  const handleAddAddress = (newAddress) => {
    setAddresses([...addresses, newAddress])
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  const StyledTextfield = styled(TextField)({
    borderRadius: "8px",
    backgroundColor: theme.palette.background.paper,
    "& .MuiFormLabel-root": {
      fontFamily: "Inter, sans-serif",
      fontSize: "14px",
    },
  })

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: { xs: "20px", md: "40px 80px", lg: "70px 70px" },
        backgroundColor: theme.palette.background.box,
        minHeight: { lg: "92vh", md: "94vh", sm: "110vh", xs: "140vh" },
      }}
    >
      <Typography
        sx={{
          fontWeight: "600",
          fontSize: "30px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        Create a new Invoice
      </Typography>
      <Breadcrumbs
        aria-label='breadcrumb'
        separator={
          <NavigateNextIcon
            fontSize='small'
            sx={{ color: theme.palette.text.primary }}
          />
        }
        sx={{
          mb: 6,
          fontSize: "14px",
          fontWeight: "400",
          color: "black",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <Link
          underline='hover'
          sx={{ color: theme.palette.text.secondary }}
          component={RouterLink}
          to='/'
        >
          Home
        </Link>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`
          const isLast = index === pathnames.length - 1
          return isLast ? (
            <Typography
              color='text.primary'
              key={to}
              sx={{
                fontSize: "14px",
                fontWeight: "500",
                color: theme.palette.text.primary,
                fontFamily: "Inter, sans-serif",
              }}
            >
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </Typography>
          ) : (
            <Link
              underline='hover'
              color='inherit'
              component={RouterLink}
              to={to}
              key={to}
              sx={{
                fontSize: "14px",
                fontWeight: "500",
                color: theme.palette.text.primary,
                fontFamily: "Inter, sans-serif",
              }}
            >
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </Link>
          )
        })}
      </Breadcrumbs>
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: "10px",
          p: 2,
        }}
      >
        <Grid
          container
          spacing={3}
          component='form'
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid item xs={12}>
            <Box ref={componentRef} sx={{ padding: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='fromAddress'
                    control={control}
                    render={({ field, fieldState }) => (
                      <StyledTextfield
                        label='From'
                        fullWidth
                        {...field}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        sx={{}}
                        InputProps={{
                          style: {
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: theme.palette.text.primary,
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='toAddress'
                    control={control}
                    render={({ field, fieldState }) => (
                      <StyledTextfield
                        select
                        label='To'
                        fullWidth
                        {...field}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        InputProps={{
                          style: {
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: theme.palette.text.primary,
                          },
                        }}
                      >
                        {addresses.map((address, index) => (
                          <MenuItem
                            key={index}
                            value={address}
                            sx={{
                              margin: "2px",
                              fontFamily: "Inter, sans-serif",
                              fontSize: "14px",
                            }}
                          >
                            {address}
                          </MenuItem>
                        ))}
                        <MenuItem
                          value=''
                          sx={{
                            margin: "2px",
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                          }}
                        >
                          <Button
                            sx={{
                              color: theme.palette.text.secondary,
                              fontWeight: "bold",
                            }}
                            startIcon={<AddIcon />}
                            onClick={() =>
                              handleAddAddress(prompt("Enter new address:"))
                            }
                          >
                            Add Address
                          </Button>
                        </MenuItem>
                      </StyledTextfield>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <Controller
                    name='invoiceId'
                    control={control}
                    render={({ field, fieldState }) => (
                      <StyledTextfield
                        label='Invoice ID'
                        fullWidth
                        {...field}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        InputProps={{
                          style: {
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: theme.palette.text.primary,
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Controller
                    name='status'
                    control={control}
                    render={({ field, fieldState }) => (
                      <StyledTextfield
                        select
                        label='Status'
                        fullWidth
                        {...field}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        InputProps={{
                          style: {
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: theme.palette.text.primary,
                          },
                        }}
                      >
                        <MenuItem
                          value='pending'
                          sx={{
                            margin: "2px",
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                          }}
                        >
                          Pending
                        </MenuItem>
                        <MenuItem
                          value='draft'
                          sx={{
                            margin: "2px",
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                          }}
                        >
                          Draft
                        </MenuItem>
                        <MenuItem
                          value='overdue'
                          sx={{
                            margin: "2px",
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                          }}
                        >
                          OverDue
                        </MenuItem>
                        <MenuItem
                          value='paid'
                          sx={{
                            margin: "2px",
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                          }}
                        >
                          Paid
                        </MenuItem>
                      </StyledTextfield>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Controller
                    name='createdDate'
                    control={control}
                    render={({ field, fieldState }) => (
                      <StyledTextfield
                        type='date'
                        label='Created Date'
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        {...field}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        InputProps={{
                          style: {
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: theme.palette.text.primary,
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Controller
                    name='dueDate'
                    control={control}
                    render={({ field, fieldState }) => (
                      <StyledTextfield
                        type='date'
                        label='Due Date'
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        {...field}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        InputProps={{
                          style: {
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: theme.palette.text.primary,
                          },
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "20px",
                      fontWeight: "500",
                      mb: 2,
                    }}
                    gutterBottom
                  >
                    Details
                  </Typography>
                  {fields.map((item, index) => (
                    <Grid container spacing={2} key={item.id}>
                      <Grid item xs={12} sm={3}>
                        <Controller
                          name={`items[${index}].title`}
                          control={control}
                          render={({ field, fieldState }) => (
                            <StyledTextfield
                              label='Title'
                              fullWidth
                              {...field}
                              error={!!fieldState.error}
                              helperText={fieldState.error?.message}
                              InputProps={{
                                style: {
                                  fontFamily: "Inter, sans-serif",
                                  fontSize: "14px",
                                  fontWeight: "500",
                                  color: theme.palette.text.primary,
                                },
                              }}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Controller
                          name={`items[${index}].description`}
                          control={control}
                          render={({ field, fieldState }) => (
                            <StyledTextfield
                              label='Description'
                              fullWidth
                              {...field}
                              error={!!fieldState.error}
                              helperText={fieldState.error?.message}
                              InputProps={{
                                style: {
                                  fontFamily: "Inter, sans-serif",
                                  fontSize: "14px",
                                  fontWeight: "500",
                                  color: theme.palette.text.primary,
                                },
                              }}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12} sm={2}>
                        <Controller
                          name={`items[${index}].quantity`}
                          control={control}
                          render={({ field, fieldState }) => (
                            <StyledTextfield
                              type='text'
                              label='Quantity'
                              fullWidth
                              {...field}
                              onChange={(e) => {
                                field.onChange(e)
                                calculateItemTotal(index)
                              }}
                              error={!!fieldState.error}
                              helperText={fieldState.error?.message}
                              InputProps={{
                                style: {
                                  fontFamily: "Inter, sans-serif",
                                  fontSize: "14px",
                                  fontWeight: "500",
                                  color: theme.palette.text.primary,
                                },
                              }}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12} sm={2}>
                        <Controller
                          name={`items[${index}].price`}
                          control={control}
                          render={({ field, fieldState }) => (
                            <StyledTextfield
                              type='text'
                              label='Price'
                              fullWidth
                              {...field}
                              onChange={(e) => {
                                field.onChange(e)
                                calculateItemTotal(index)
                              }}
                              error={!!fieldState.error}
                              helperText={fieldState.error?.message}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position='start'>
                                    $
                                  </InputAdornment>
                                ),
                                style: {
                                  fontFamily: "Inter, sans-serif",
                                  fontSize: "14px",
                                  fontWeight: "500",
                                  color: theme.palette.text.primary,
                                },
                              }}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <Controller
                          name={`items[${index}].total`}
                          control={control}
                          render={({ field }) => (
                            <StyledTextfield
                              type='number'
                              disabled='true'
                              label='Total'
                              fullWidth
                              {...field}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position='start'>
                                    $
                                  </InputAdornment>
                                ),
                                readOnly: true,
                                style: {
                                  fontFamily: "Inter, sans-serif",
                                  fontSize: "14px",
                                  fontWeight: "500",
                                  color: theme.palette.text.primary,
                                },
                              }}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            mt: "-8px",
                          }}
                        >
                          <Typography
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "14px",
                              fontWeight: "500",
                              color: "red",
                            }}
                          >
                            <IconButton onClick={() => remove(index)}>
                              <DeleteIcon
                                sx={{ color: "red", height: "20px" }}
                              />
                            </IconButton>
                            &nbsp; Remove
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  ))}
                  <Button
                    sx={{
                      color: theme.palette.text.secondary,
                      fontWeight: "bold",
                    }}
                    onClick={() => {
                      append({
                        title: "",
                        description: "",
                        price: null,
                        quantity: null,
                        total: null,
                      })
                    }}
                  >
                    + Add Item
                  </Button>
                </Grid>
                <Divider />
                <Grid item xs={12} md={6} sm={3}></Grid>
                <Grid item xs={12} md={2} sm={3}>
                  <Controller
                    name='shipping'
                    control={control}
                    render={({ field, fieldState }) => (
                      <StyledTextfield
                        type='text'
                        label='Shipping'
                        fullWidth
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          calculateFinalTotal()
                        }}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        InputProps={{
                          style: {
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: theme.palette.text.primary,
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={2} sm={3}>
                  <Controller
                    name='discount'
                    control={control}
                    render={({ field, fieldState }) => (
                      <StyledTextfield
                        type='text'
                        label='Discount'
                        fullWidth
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          calculateFinalTotal()
                        }}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        InputProps={{
                          style: {
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: theme.palette.text.primary,
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={2} sm={3}>
                  <Controller
                    name='tax'
                    control={control}
                    render={({ field, fieldState }) => (
                      <StyledTextfield
                        type='text'
                        label='Tax'
                        fullWidth
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          calculateFinalTotal()
                        }}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        InputProps={{
                          style: {
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: theme.palette.text.primary,
                          },
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "18px",
                      fontWeight: "600",
                    }}
                    align='right'
                  >
                    Total: $ {total}
                  </Typography>
                </Grid>

                <Grid item xs={12} align='right'>
                  <Button
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "500",
                      textTransform: "none",
                      backgroundColor: "#5F00D9",
                      color: "white",
                    }}
                    color='primary'
                    type='submit'
                    variant='contained'
                  >
                    Save and Create
                  </Button>
                  <Button
                    variant='contained'
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "500",
                      textTransform: "none",
                      backgroundColor: "#5F00D9",
                      color: "white",
                      ml: 2,
                    }}
                    onClick={handlePrint}
                  >
                    Print
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default CreateInvoice
