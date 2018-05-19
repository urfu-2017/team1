const getNotificationAudio = ((path) => {
    let notificationAudio = null;
    return () => {
        if (!notificationAudio) {
            notificationAudio = new Audio('/static/sound/message.mp3');
        }
        return notificationAudio;
    }
})('/static/sound/message.mp3');

export const notificateAboutNewMessage = () => {
    getNotificationAudio().play();
}