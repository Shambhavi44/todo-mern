import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { CardActions, Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default function CardDisplay(props) {
  const {
    todoInfo = {},
    onDeleteIconClick = () => {},
    onEditIconClick = () => {},
    headerColor = "bg-seconday",
  } = props;
  return (
    <Card sx={{ maxWidth: 250 }} className="m-4">
      <CardHeader
        title={todoInfo.title}
        subheader={todoInfo.date}
        titleTypographyProps={{ variant: "h6" }}
        subheaderTypographyProps={{ variant: "p", color: "white" }}
        className={`sticky-top ${headerColor} text-light`}
      />
      <CardContent style={{ maxHeight: 200, overflowY: "auto" }}>
        <Typography variant="body2" color="text.secondary">
          {todoInfo.description}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions className="d-flex justify-content-center">
        <IconButton
          aria-label="settings"
          className="px-4"
          onClick={() => onEditIconClick(todoInfo._id)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="settings"
          className="px-4"
          onClick={() => onDeleteIconClick(todoInfo._id)}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
