## Goals

- Web app calculator with basic arithmatic
- Shows log of completed calculations
- Shows real-time calculations done by all users to all users

## About

This is build off a fork of https://github.com/pixochi/socket.io-react-hooks-chat. This was a great starting place, with a websocket based chatroom built in React.

I modified the behavior to be more like a calculator, and to parse expressions as they are typed with regex. I also added message logging and formatting, and removed the idea of separate chat rooms.

It's hosted at http://ec2-3-142-76-81.us-east-2.compute.amazonaws.com:1123/

The chat is served by the same EC2 instance at port 4000.
