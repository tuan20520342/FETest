import { Box, Button, Paper, styled } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useState } from "react";
import * as XLSX from "xlsx";
import CustomDataGrid from "./components/CustomDataGrid";
import CalculateTotalAmount from "./components/CalculateTotalAmount";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function App() {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [fileLoading, setFileLoading] = useState(false);

  const handleFileUpload = (e) => {
    setFileLoading(true);
    const reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const headers = parsedData[7];

      // const extractedData = parsedData.slice(8).map((row) => {
      //   return headers.reduce((acc, curr, index) => {
      //     acc[curr] = row[index];
      //     return acc;
      //   }, {});
      // });

      const extractedData = parsedData.slice(8).map((row) => {
        return {
          id: row[0],
          date: row[1],
          time: row[2],
          station: row[3],
          pumpNumber: row[4],
          product: row[5],
          quantity: row[6],
          price: row[7],
          total: row[8],
          paymentStatus: row[9],
          customerId: row[10],
          customerName: row[11],
          customerType: row[12],
          paymentDate: row[13],
          employee: row[14],
          licensePlate: row[15],
          invoiceStatus: row[16],
        };
      });
      setHeaders(headers);
      setData(extractedData);
      setFileLoading(false);
    };
  };

  const FileUploadButton = () => {
    return (
      <Button
        sx={{ textTransform: "none" }}
        component="label"
        role={undefined}
        tabIndex={-1}
        endIcon={<UploadFileIcon />}
        variant="outlined"
        color="secondary"
      >
        Upload Excel
        <VisuallyHiddenInput
          type="file"
          onChange={handleFileUpload}
          accept=".xls, .xlsx"
        />
      </Button>
    );
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#8BC462"
    >
      <Paper
        elevation={3}
        sx={{
          p: 2,
          width: "90%",
          height: "90%",
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
        }}
      >
        <Box sx={{ mb: 2, height: "90%" }}>
          <CustomDataGrid
            data={data}
            headers={headers}
            UploadFile={FileUploadButton}
            loading={fileLoading}
          />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <CalculateTotalAmount data={data} />
        </Box>
      </Paper>
    </Box>
  );
}

export default App;
