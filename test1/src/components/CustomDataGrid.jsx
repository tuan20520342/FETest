import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import CustomGridToolBar from "./CustomGridToolBar";

const paginationModel = { page: 0, pageSize: 10 };

export default function CustomDataGrid({ data, headers, UploadFile, loading }) {
  const columns =
    headers.length === 0
      ? []
      : [
          { field: "id", headerName: `${headers[0]}`, width: 70 },
          { field: "date", headerName: `${headers[1]}`, width: 120 },
          { field: "time", headerName: `${headers[2]}`, width: 100 },
          { field: "station", headerName: `${headers[3]}`, width: 200 },
          { field: "pumpNumber", headerName: `${headers[4]}`, width: 80 },
          { field: "product", headerName: `${headers[5]}`, width: 140 },
          { field: "quantity", headerName: `${headers[6]}`, width: 100 },
          {
            field: "price",
            headerName: `${headers[7]}`,
            width: 100,
            valueFormatter: (value) => value.toLocaleString(),
          },
          {
            field: "total",
            headerName: `${headers[8]}`,
            width: 140,
            valueFormatter: (value) => value.toLocaleString(),
          },
          { field: "paymentStatus", headerName: `${headers[9]}`, width: 180 },
          { field: "customerId", headerName: `${headers[10]}`, width: 140 },
          { field: "customerName", headerName: `${headers[11]}`, width: 140 },
          { field: "customerType", headerName: `${headers[12]}`, width: 140 },
          { field: "paymentDate", headerName: `${headers[13]}`, width: 140 },
          { field: "employee", headerName: `${headers[14]}`, width: 100 },
          { field: "licensePlate", headerName: `${headers[15]}`, width: 100 },
          { field: "invoiceStatus", headerName: `${headers[16]}`, width: 150 },
        ];

  return (
    <Paper
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <DataGrid
        slots={{
          toolbar: () => <CustomGridToolBar UploadFile={UploadFile} />,
        }}
        rows={data}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 20, 100]}
        sx={{ border: 0 }}
        loading={loading}
      />
    </Paper>
  );
}
