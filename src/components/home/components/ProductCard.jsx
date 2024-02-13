import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

function ProductCard({ details, cardActions, navigateToDetails }) {
  return (
    <Card
      sx={{
        maxWidth: 300,
        minHeight: 400,
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        cursor: "pointer",
      }}
    >
      <Box onClick={navigateToDetails}>
        <CardHeader
          // avatar={
          //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          //     R
          //   </Avatar>
          // }
          // action={
          //   <IconButton aria-label="settings">
          //     <MoreVertIcon />
          //   </IconButton>
          // }
          title={details?.title}
          subheader={details?.category}
        />
        <CardMedia
          component="img"
          height="194"
          image={details?.thumbnail}
          alt={details?.title}
        />
        <CardContent>
          <Typography variant="h5" color="text.secondary">
            ${details?.price}/-
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {details?.description}
          </Typography>
        </CardContent>
      </Box>
      <CardActions disableSpacing>
        {cardActions}
        {details?.quantity && (
          <Typography>Quantity: {details?.quantity}</Typography>
        )}
      </CardActions>
    </Card>
  );
}

export default ProductCard;
