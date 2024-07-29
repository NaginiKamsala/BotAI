import React from "react";
import Box from "@mui/material/Box";
import { IconButton, Stack, Typography } from "@mui/material";
import AIIMage from "../assets/logo.png";
import UserImage from "../assets/user.png";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import Ratings from "./RatingsMenu";
import { useLocation } from "react-router-dom";

const Cards = ({
  data,
  handleChats,
  curUser,
  handleModal,
  star_ratings,
  handleRatings,
}) => {
  const { question, response } = data;
  const location = useLocation();

  return (
    <Box
      borderRadius={location.pathname === "/" && "20px"}
      p={3}
      boxShadow={location.pathname === "/" && "0px 4px 10px 0px #00000040"}
      onClick={handleChats}
      sx={{ cursor: "pointer" }}
    >
      <Stack direction="column" spacing={2}>
        <Stack direction="row" alignItems="center" spacing={2}>
          {curUser && (
            <Stack>
              <img
                src={curUser !== "ai" ? UserImage : AIIMage}
                alt="profile pic"
                width={65}
                height={69}
              />
            </Stack>
          )}

          <Stack direction="column" spacing={1}>
            {(question || curUser === "human") && (
              <Typography
                variant="h3"
                component="h3"
                fontFamily="Ubuntu"
                lineheight="22.98px"
              >
                {data?.["user_question"] ? data["user_question"] : question}
              </Typography>
            )}

            {(response || curUser === "ai") && (
              <Typography
                variant="p"
                fontFamily="Open Sans"
                color="#00000080"
                lineheight="21.79px"
              >
                {data?.["aiResponse"]?.["answer"]
                  ? data["aiResponse"]?.["answer"]
                  : response}
              </Typography>
            )}
            <Stack direction="row" spacing={5} alignItems="center">
              {curUser === "human" && (
                <p
                  style={{
                    fontFamily: "Open Sans",
                    lineheight: "16.34px",
                    color: "#0000009E",
                  }}
                >
                  {location.pathname !== "/"
                    ? new Date(data?.["user_time"]).toLocaleString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : `${data?.["user_time"].toLocaleString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}`}
                </p>
              )}
              {curUser === "ai" && (
                <p
                  style={{
                    fontFamily: "Open Sans",
                    lineheight: "16.34px",
                    color: "#0000009E",
                  }}
                >
                  {location.pathname !== "/"
                    ? new Date(
                        data?.["aiResponse"]?.["ai_time"]
                      ).toLocaleString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : `${data?.["aiResponse"]?.["ai_time"].toLocaleString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}`}
                </p>
              )}

              {curUser === "ai" ? (
                <Stack direction="row" spacing={{ xs: "1", md: "3" }}>
                  <IconButton onClick={() => handleModal(true)}>
                    <ThumbUpOutlinedIcon />
                  </IconButton>

                  <IconButton onClick={() => handleModal(true)}>
                    <ThumbDownOffAltOutlinedIcon />
                  </IconButton>
                </Stack>
              ) : (
                ""
              )}
            </Stack>
          </Stack>
        </Stack>

        {curUser === "ai" && data?.["aiResponse"]?.["feedback"] && (
          <>
            <Stack spacing={1}>
              {star_ratings === 0 && (
                <Typography
                  variant="p"
                  component="p"
                  fontFamily="Open Sans"
                  fontWeight={700}
                >
                  Rate this response
                </Typography>
              )}
              <Ratings value={star_ratings} handleValue={handleRatings} />
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography
                variant="p"
                component="p"
                fontFamily="Open Sans"
                fontWeight={700}
              >
                Feedback
              </Typography>
              <Typography
                variant="p"
                component="p"
                fontFamily="Open Sans"
                fontWeight={400}
              >
                {data?.["aiResponse"]?.["feedback"]}
              </Typography>
            </Stack>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default Cards;
