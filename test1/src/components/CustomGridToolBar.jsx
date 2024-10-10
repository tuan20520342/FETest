import { GridToolbarContainer } from "@mui/x-data-grid";

export default function CustomGridToolBar({ UploadFile }) {
  return (
    <GridToolbarContainer sx={{ justifyContent: "end", p: "8px" }}>
      <UploadFile />
    </GridToolbarContainer>
  );
}
