type CreateMeeting = (token: string) => Promise<any>;

//Auth token to generate a meeting and connect to it
export const authToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJjNmZkMjY3Zi0yMjZhLTRjZTktYjE4My0wNTFhYzIwOTZiNDMiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY4NTYxMzUzMSwiZXhwIjoxNjg4MjA1NTMxfQ.eEyhQAbCAjR4xCJKPv4EqsHPcNGYKRA2RdQUrK96a1s';

// API call to create meeting
export const createMeeting: CreateMeeting = async token => {
  const res = await fetch('https://api.videosdk.live/v2/rooms', {
    method: 'POST',
    headers: {
      authorization: `${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });
  //Destructuring the roomId from the response
  const {roomId} = await res.json();
  return roomId;
};
