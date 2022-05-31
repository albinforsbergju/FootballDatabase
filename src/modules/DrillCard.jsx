import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Paper,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import calculateTime from "../scripts/calculateTime";

export default function DrillCard({ drill, showCreator }) {
  return (
    // Create mui card
    <Paper elevation={3}>
      <Card>
        <Link to={`/drill/${drill.id}`}>
          <CardActionArea>
            <CardHeader
              title={<Link to={`/drill/${drill.id}`}>{drill.data().name}</Link>}
              subheader={calculateTime(drill.data().created.seconds)}
            />
            <CardMedia
              image={drill.data().imgLink}
              title={drill.data().title}
              height="auto"
              component="img"
            />
            <CardContent>
              <p>{drill.data().content}</p>
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
    </Paper>

    // <div className="col mx-auto">
    //   <div className="card mb">
    //     <Link to={`/drill/${drill.id}`}>
    //       <img
    //         src={drill.data().imgLink}
    //         alt={drill.data().name}
    //         className="card-img-top mx-auto"
    //       />
    //     </Link>
    //     <div className="card-body">
    //       <Link to={`/drill/${drill.id}`}>
    //         <h5 className="card-title">{drill.data().name}</h5>
    //       </Link>
    //       <p className="card-text cut-text" id="drillDescription">
    //         {drill.data().description}
    //       </p>
    //       <p className="card-text">
    //         <small className="text-muted">
    //           {drill.data().difficulty} - {drill.data().type}
    //         </small>
    //       </p>
    //       <p className="card-text">
    //         <small className="text-muted">{drill.data().why}</small>
    //       </p>
    //     </div>
    //     <hr />
    //     {(showCreator && (
    //       <div className="card-footer">
    //         <p className="card-text">
    //           <Link to={"/user/" + drill.data().uid}>{drill.data().uname}</Link>{" "}
    //           {calculateTime(drill.data().created.seconds)}
    //         </p>
    //       </div>
    //     )) || (
    //       <div className="card-footer">
    //         <p className="card-text">
    //           <small className="text-muted">
    //             {calculateTime(drill.data().created.seconds)}
    //           </small>
    //         </p>
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
}
