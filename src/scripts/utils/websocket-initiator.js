import NotificationHelper from './notification-helper';
import CONFIG from '../globals/config';

const WebSocketInitiator = {
  init(url) {
    const webSocket = new WebSocket(url);
    webSocket.onmessage = this._onMessageHandler;
  },

  _onMessageHandler(message) {
    const cafe = JSON.parse(message.data);
    NotificationHelper.sendNotification({
      title: `${cafe.title} is on cinema!`,
      options: {
        body: cafe.overview,
        image: `${CONFIG.BASE_IMAGE_URL + cafe.poster_path}`,
      },
    });
  },
};

export default WebSocketInitiator;
