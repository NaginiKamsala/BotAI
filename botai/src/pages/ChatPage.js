import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { IconButton, Stack, TextField, Button } from "@mui/material";
import Cards from "../components/Cards";
import Chat from "../components/Chat";
import { getAIResponse } from "../helper";
import { useOutletContext } from "react-router-dom";
import Modal from "@mui/material/Modal";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";
import CloseIcon from "@mui/icons-material/Close";

const NewConversationPage = () => {
  const [userAsked, isAsk, setAsk, chats, setChats] = useOutletContext();
  const [modalOpen, setModalOpen] = useState({
    open: false,
    chatId: null,
    datetimeIndex: null,
  });
  const [feedback, setFeedback] = useState("");
  const [star_ratings, setStarRatings] = useState(0);

  useEffect(() => {
    if (!userAsked || !isAsk) {
      return;
    }

    handleChats({ question: userAsked });
    setAsk(false);
  }, [isAsk]);

  const handleModal = (isOpen, chatId, datetimeId) => {
    setModalOpen((prev) => {
      return {
        ...prev,
        open: isOpen,
        chatId: chatId,
        datetimeIndex: datetimeId,
      };
    });
  };
  const updateFeedbackAndRatings = (
    key,
    value,
    chatIdIndex = null,
    datetimeIdIndex = null
  ) => {
    if (key === "feedback") {
      chatIdIndex = modalOpen["chatId"];
      datetimeIdIndex = modalOpen["datetimeIndex"];
    }
    chats[datetimeIdIndex]["chatsList"][chatIdIndex]["aiResponse"][key] = value;
  };

  const handleRatings = (value, chatId, datetimeId) => {
    setStarRatings(value);
    updateFeedbackAndRatings("ratings", value, chatId, datetimeId);
  };

  const handleChats = (value) => {
    const aiAnswer = getAIResponse(value["question"]);

    let updatedData = {};

    let updatedChats = {
      curUser: "human",
      user_question: value["question"],
      user_time: new Date(),
      aiResponse: {
        curUser: "ai",
        answer: aiAnswer["response"],
        ai_time: new Date(),
        ratings: 0,
        feedback: "",
        liked: null,
      },
    };

    const chatIdx = chats.findIndex(
      (item) => item["datetime"].getDate() === new Date().getDate()
    );

    if (chatIdx !== -1) {
      const prevChats = chats[chatIdx]["chatsList"];
      updatedData = {
        ...chats[chatIdx],
        chatsList: [...prevChats, { ...updatedChats }],
      };
      chats.splice(chatIdx, 1, updatedData);
      setChats([...chats]);
    } else {
      updatedData = {
        datetime: new Date(),
        chatsList: [{ ...updatedChats }],
      };
      setChats((prev) => [...prev, updatedData]);
    }
  };

  return (
    <Box>
      {chats.length <= 0 && <Chat handleChats={handleChats} />}
      {chats.length > 0 &&
        chats.map((item, idx) => {
          return item["chatsList"].map((singleChat, index) => {
            return (
              <Stack direction="column" spacing={2}>
                <Cards data={singleChat} key={index} curUser="human" />
                <Cards
                  data={singleChat}
                  key={`${index + 90}`}
                  curUser="ai"
                  star_ratings={star_ratings}
                  handleRatings={(value) => handleRatings(value, index, idx)}
                  handleModal={() => handleModal(true, index, idx)}
                />
              </Stack>
            );
          });
        })}
      {modalOpen["open"] && (
        <Modal
          open={modalOpen["open"]}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              backgroundColor: "#FFFFFF",
              borderRadius: "10px",
              width: "400px",
              padding: "1rem",
              transform: "translate(-50%, -50%)",
              border: "1px solid #00000073",
              boxShadow: "-4px 4px 10px 0px #00000040",
            }}
          >
            <Stack direction="column" spacing={2}>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <Stack>
                  <TipsAndUpdatesOutlinedIcon />
                  <p
                    style={{
                      fontFamily: "Open Sans",
                    }}
                  >
                    Provide Additional Feedback
                  </p>
                </Stack>
                <IconButton
                  onClick={() =>
                    setModalOpen((prev) => {
                      return { ...prev, open: false };
                    })
                  }
                >
                  <CloseIcon />
                </IconButton>
              </Stack>
              <Stack>
                <TextField
                  multiline
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </Stack>
              <Stack direction="row" justifyContent="flex-end">
                <Box></Box>
                <Button
                  variant="contained"
                  onClick={() => {
                    setModalOpen((prev) => {
                      return { ...prev, open: false };
                    });
                    updateFeedbackAndRatings("feedback", feedback);
                    setFeedback("");
                  }}
                >
                  Submit
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default NewConversationPage;
