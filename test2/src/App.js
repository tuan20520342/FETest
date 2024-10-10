import TransactionForm from "./components/TransactionForm";
import { Container, Box, Paper, Typography, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./App.css";
import { useRef } from "react";

function App() {
  const transactionFormRef = useRef();

  const handleSubmit = () => {
    if (transactionFormRef.current) {
      transactionFormRef.current.submit();
    }
  };

  return (
    <Box
      sx={{ backgroundColor: "#f5f5f5" }}
      width={"100vw"}
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Container maxWidth="sm">
        <Paper>
          <Box
            sx={{
              p: "16px 24px 2px 24px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
            display={"flex"}
            justifyContent={"space-between"}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyItems={"start"}
            >
              <Button
                variant="text"
                startIcon={<ArrowBackIcon />}
                sx={{
                  width: "fit-content",
                  color: "black",
                  textTransform: "none",
                }}
              >
                Đóng
              </Button>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
                Nhập giao dịch
              </Typography>
            </Box>
            <Box>
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ textTransform: "none" }}
              >
                Chập nhật
              </Button>
            </Box>
          </Box>

          <Box sx={{ p: 4 }}>
            <TransactionForm ref={transactionFormRef} />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default App;
