const getNotificationAudio = ((path) => {
    let notificationAudio = null;
    return () => {
        if (!notificationAudio) {
            notificationAudio = new Audio('/static/sound/message.mp3');
        }
        return notificationAudio;
    }
})('/static/sound/message.mp3');

const vibrateDuration = 1 * 1000 // 1 секунда

export const notificateAboutNewMessage = () => {
    if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(vibrateDuration);
    }
    getNotificationAudio().play();
}