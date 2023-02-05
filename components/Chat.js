import { Avatar } from '@material-ui/core';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import getRecipientEmail from '../utils/getRecipientEmail';
import { useRouter } from 'next/dist/client/router';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';

import { storage } from '../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import Image from 'next/image'
import BoardsIcon from '../public/BoardsIcon.svg'
import { useEffect, useState } from 'react';




function Chat({ id, users, mh }) {
  const [messageBoardIcon, setMessageBoardIcon] = useState()
  const [bulletinBoardIcon, setBulletinBoardIcon] = useState()


  const router = useRouter();

  const falseArray = [];

  const keys = Object.keys(mh);

  const [user] = useAuthState(auth);

  const recipientEmail = getRecipientEmail(users, user);
  // console.log(getRecipientEmail(users, user))
  // console.log(recipientEmail)

  const enterChat = () => {
    router.push(`/chat/${id}`);
  };

  const userChatRef = db
    .collection('users')
    .where('email', '==', getRecipientEmail(users, user));
  // const userChatRef = db
  // .collection('users')
  // .where('email', '==', "test@gmail.com");

    // console.log(userChatRef)

  const [recipientSnapshot] = useCollection(userChatRef);

  console.log(useCollection(userChatRef)[0]?.docs?.[0]?.data())
  

  const recipientData = recipientSnapshot?.docs?.[0]?.data();
  // console.log(recipientData)
  // console.log('hellloooooo')

  keys.forEach((key) => {
    if (mh[key] === false) {
      falseArray.push(key);
    }
  });

  useEffect(() => {
    storage.child('MessageBoardIcon.svg').getDownloadURL().then(url => {
      console.log(url)
      setMessageBoardIcon(url)
    })
  
    storage.child('BulletinBoardIcon.svg').getDownloadURL().then(url => {
      console.log(url)
      setBulletinBoardIcon(url)
    })
  }, [])

  return (
    <Container
      onClick={enterChat}
      style={falseArray.includes(recipientEmail) ? hide : show}
    >
      {recipientData ? (
        <UserAvatar src={messageBoardIcon} />
        // <UserAvatar src="/BoardsIcon />
      ) : (
        // <UserAvatar src={recipientEmail[0]} />
        <UserAvatar src={bulletinBoardIcon} />

      )}
      <p>{recipientEmail}</p>
      <ArrowContainer className="ac">
        <KeyboardArrowDownRoundedIcon
          style={{
            fontSize: 25,
            opacity: '0.6',
          }}
        />
      </ArrowContainer>
    </Container>
  );
}

export default Chat;

const hide = {
  display: 'none',
};
const show = {
  display: 'flex',
};
const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 1.5rem;
  word-break: break-word;
  font-size: 1.35rem;
  color: #495057;
  border-bottom: 1px solid #e9ecef;
  position: relative;

  :hover {
    background-color: #e9eaeb;

    & > .ac {
      display: flex;
    }
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 0.5rem;
  margin-right: 1.5rem;
`;

const ArrowContainer = styled.div`
  position: absolute;
  bottom: 0.5rem;
  right: 0.8rem;
  display: none;
  height: 2.3rem;
  width: 2.3rem;
  background-color: #fff;
  border-radius: 50%;
  display: none;
  justify-content: center;
  align-items: center;
`;
