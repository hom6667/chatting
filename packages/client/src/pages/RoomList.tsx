import React from "react";
import styled from "@emotion/styled/macro";
import { useQuery } from "react-query";
import { fetchChatRoomList } from "../apis/roomApi";



import BottomNavigation from "../components/BottomNavigation";
import TopNavigation from "../components/TopNavigation";
import ChatRoomList from "../components/ChatRoomList";
import { AxiosError, AxiosResponse } from "axios";
import { IRoom } from "../types";
import ChatRoom from "../components/ChatRoomList/ChatRoom";

const Base = styled.div`
  width: 100%;
  height: 100vh;
  padding: 0 12px;
  box-sizing: border-box;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;


const RoomList: React.FC = () => {
  const { data: chatRoomListData } = useQuery<
    AxiosResponse<Array<IRoom>>,
    AxiosError
  >("fetchChatRoomList", fetchChatRoomList);

  return (
    <Base>
      <Container>
        <TopNavigation title="Chat" />
        {chatRoomListData && (
          <ChatRoomList>
            {chatRoomListData.data.map((chatRoom) => (
              <ChatRoom
                key={chatRoom.id}
                id={chatRoom.id}
                username={chatRoom.user.username}
              />
            ))}
          </ChatRoomList>
        )}
        <BottomNavigation />
      </Container>
    </Base>
  );
};

export default RoomList;
