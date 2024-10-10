import { Button, Stack, Typography } from "@mui/material";
import { TimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import dayjs from "dayjs";

export default function CalculateTotalAmount({ data }) {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [error, setError] = useState(null);

  const queryTotal = () => {
    if (!startTime.isBefore(endTime)) {
      setError("Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc.");
      return;
    }
    setError(null);

    console.log(data);

    const total = data.reduce((acc, row) => {
      const rowTime = dayjs(`${row.time}`, "HH:mm:ss");
      if (
        (rowTime.isAfter(startTime) && rowTime.isBefore(endTime)) ||
        rowTime.isSame(startTime) ||
        rowTime.isSame(endTime)
      ) {
        return acc + (row.total || 0);
      }
      return acc;
    }, 0);

    setTotalAmount(total);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack direction="row" gap={2} flexWrap={"wrap"} justifyContent={"end"}>
        <Stack direction="row" flexWrap={"wrap"} gap={2} justifyContent={"end"}>
          <TimePicker
            label="Bắt đầu"
            value={startTime}
            onChange={(newValue) => setStartTime(newValue)}
            slotProps={{ textField: { size: "small" } }}
            ampm={false}
            views={["hours", "minutes", "seconds"]}
            format="HH:mm:ss"
            sx={{ maxWidth: "200px" }}
          />
          <TimePicker
            label="Kết thúc"
            value={endTime}
            onChange={(newValue) => setEndTime(newValue)}
            placeholder="End Time"
            slotProps={{ textField: { size: "small" } }}
            views={["hours", "minutes", "seconds"]}
            format="HH:mm:ss"
            sx={{ maxWidth: "200px" }}
            ampm={false}
          />
        </Stack>

        <Button
          variant="contained"
          color="secondary"
          sx={{ textTransform: "none" }}
          onClick={queryTotal}
          disabled={!startTime || !endTime || data.length === 0}
        >
          Tính tổng
        </Button>
      </Stack>
      {error && (
        <Typography variant="body1" color="error" marginTop={2} textAlign="end">
          {error}
        </Typography>
      )}
      {totalAmount !== null && (
        <Typography variant="h6" marginTop={2} textAlign="end">
          Tổng tiền: {totalAmount.toLocaleString()} VNĐ
        </Typography>
      )}
    </LocalizationProvider>
  );
}
