import {
  Button,
  Divider,
  FormControl,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { lazy, Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import { auth, db } from "../firebase-config";
import Loading from "../modules/Loading";
import { useQuery } from "react-query";

const Comment = lazy(() => {
  return Promise.all([
    import("../modules/Comment"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

export default function News() {
  const { id } = useParams();

  const [comment, setComment] = React.useState("");

  const { data: articleData, status: articleStauts } = useQuery(
    ["article", id],
    () => {
      const articleCollectionRef = collection(db, "news");
      const articleRef = doc(articleCollectionRef, id);
      return getDoc(articleRef);
    }
  );

  const { data: commentsData, status: commentsStatus } = useQuery(
    ["comments", id],
    () => {
      const commentsRef = collection(db, "news/" + id + "/comments");
      const q = query(commentsRef, where("content", ">", ""));
      return getDocs(q);
    },
    {
      refetchInterval: 10000,
    }
  );

  const postComment = async () => {
    console.log("postComment");
    const commentsCollectionRef = collection(db, "news/" + id + "/comments");
    const data = {
      content: comment,
      uname: auth.currentUser.displayName,
      uid: auth.currentUser.uid,
      created: new Date(),
    };
    addDoc(commentsCollectionRef, data).then((doc) => {
      setComment("");
      console.log(doc);
    });
  };

  if (articleStauts === "loading") {
    return <Loading />;
  }

  return (
    <Container>
      <Paper
        style={{
          padding: "1rem",
          margin: "1rem",
          borderRadius: "1rem",
          backgroundColor: "#fafafa",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box>
          <Typography variant="h4">{articleData.data().title}</Typography>
          <Divider />
          <Typography variant="body1">{articleData.data().content}</Typography>
          <Typography variant="body1">
            Skrivet av:{" "}
            <Link to={"/user/" + articleData.data().uid}>
              {articleData.data().uname}
            </Link>{" "}
          </Typography>
          <Divider />
        </Box>
        <Box>
          <FormControl fullWidth>
            <Typography variant="h6">Kommentera</Typography>
            <Box mb={2} />
            <TextField
              field="comment"
              label="Kommentar"
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <Box mb={2} />
            <Button onClick={postComment}>Kommentera</Button>
          </FormControl>
        </Box>
        <Box>
          <Typography variant="h6">Kommentarer</Typography>
          <Divider />
          {commentsStatus === "loading" && <Loading />}
          {commentsStatus === "error" && (
            <Typography variant="body1">
              N??got gick fel, f??rs??k igen senare.
            </Typography>
          )}
          {commentsStatus === "success" &&
            commentsData.docs.map((comment) => {
              return (
                <Suspense fallback={<Loading />}>
                  <Comment key={comment.id} comment={comment.data()} />
                </Suspense>
              );
            })}
        </Box>
      </Paper>
    </Container>
  );
}
