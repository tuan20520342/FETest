import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import {
  Paper,
  Button,
  MenuItem,
  Typography,
  FormControl,
  Select,
  FormHelperText,
} from "@mui/material";

import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { forwardRef } from "react";
import { useImperativeHandle } from "react";
import { useRef } from "react";

const TransactionForm = forwardRef((props, ref) => {
  const pumps = ["Pump 1", "Pump 2", "Pump 3"];

  const initialValues = {
    transactionTime: null,
    quantity: "",
    pump: "",
    revenue: "",
    unitPrice: "",
  };

  const validationSchema = yup.object({
    transactionTime: yup
      .date()
      .nonNullable("Vui lòng điền thông tin")
      .typeError("Vui lòng nhập một ngày hợp lệ"),
    quantity: yup
      .number()
      .required("Vui lòng điền thông tin")
      .positive("Phải là số dương"),
    pump: yup.string().required("Vui lòng điền thông tin"),
    revenue: yup
      .number()
      .required("Vui lòng điền thông tin")
      .positive("Phải là số dương"),
    unitPrice: yup
      .number()
      .required("Vui lòng điền thông tin")
      .positive("Phải là số dương"),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log("Form data", values);
    alert("Transaction updated successfully!");
    resetForm();
  };

  useImperativeHandle(ref, () => ({
    submit: () => {
      // Call the Formik submit function
      formikRef.current.submitForm();
    },
  }));

  const formikRef = useRef();

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={true}
    >
      {({ setFieldValue, values, errors }) => (
        <Form>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl
              fullWidth
              margin="dense"
              error={Boolean(errors.transactionTime)}
            >
              <InputLabel
                id="transactionTime-label"
                htmlFor="transactionTime"
                variant="filled"
                shrink
                sx={{
                  "&.Mui-focused": {
                    color: "primary",
                  },
                }}
              >
                Thời gian
              </InputLabel>
              <DateTimePicker
                id="transactionTime"
                name="transactionTime"
                fullWidth
                slotProps={{
                  textField: {
                    sx: {
                      "& .MuiInputBase-input": {
                        transform: "translateY(6px)",
                      },
                    },
                    error: Boolean(errors.transactionTime),
                    onFocus: () => {
                      document
                        .getElementById("transactionTime-label")
                        .classList.add("Mui-focused");
                    },
                    onBlur: () => {
                      document
                        .getElementById("transactionTime-label")
                        .classList.remove("Mui-focused");
                    },
                  },
                }}
                value={values.transactionTime}
                onChange={(value) => setFieldValue("transactionTime", value)}
              />
              <ErrorMessage name="transactionTime" component={FormHelperText} />
            </FormControl>
          </LocalizationProvider>

          <FormControl
            fullWidth
            margin="dense"
            error={Boolean(errors.quantity)}
          >
            <InputLabel htmlFor="quantity" variant="filled" shrink>
              Số lượng
            </InputLabel>
            <OutlinedInput
              id="quantity"
              name="quantity"
              type="number"
              sx={{
                "& .MuiOutlinedInput-input": {
                  transform: "translateY(6px)",
                },
              }}
              value={values.quantity}
              onChange={(e) => setFieldValue("quantity", e.target.value)}
            />
            <ErrorMessage name="quantity" component={FormHelperText} />
          </FormControl>

          <FormControl fullWidth margin="dense" error={Boolean(errors.pump)}>
            <InputLabel id="pump-label" variant="filled" shrink>
              Trụ
            </InputLabel>
            <Select
              labelId="pump-label"
              id="pump"
              name="pump"
              sx={{
                "& .MuiOutlinedInput-input": {
                  transform: "translateY(6px)",
                },
              }}
              value={values.pump}
              onChange={(e) => setFieldValue("pump", e.target.value)}
            >
              {pumps.map((pump) => (
                <MenuItem key={pump} value={pump}>
                  {pump}
                </MenuItem>
              ))}
            </Select>
            <ErrorMessage name="pump" component={FormHelperText} />
          </FormControl>

          <FormControl fullWidth margin="dense" error={Boolean(errors.revenue)}>
            <InputLabel htmlFor="revenue" variant="filled" shrink>
              Doanh thu
            </InputLabel>
            <OutlinedInput
              id="revenue"
              name="revenue"
              type="number"
              sx={{
                "& .MuiOutlinedInput-input": {
                  transform: "translateY(6px)",
                },
              }}
              value={values.revenue}
              onChange={(e) => setFieldValue("revenue", e.target.value)}
            />
            <ErrorMessage name="revenue" component={FormHelperText} />
          </FormControl>

          <FormControl
            fullWidth
            margin="dense"
            error={Boolean(errors.unitPrice)}
          >
            <InputLabel htmlFor="unitPrice" variant="filled" shrink>
              Đơn giá
            </InputLabel>
            <OutlinedInput
              id="unitPrice"
              name="unitPrice"
              type="number"
              sx={{
                "& .MuiOutlinedInput-input": {
                  transform: "translateY(6px)",
                },
              }}
              value={values.unitPrice}
              onChange={(e) => setFieldValue("unitPrice", e.target.value)}
            />
            <ErrorMessage name="unitPrice" component={FormHelperText} />
          </FormControl>
        </Form>
      )}
    </Formik>
  );
});

export default TransactionForm;
