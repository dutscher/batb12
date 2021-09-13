// notifications
(async () => {
    console.log('jojo')
    const result = await Notification.requestPermission();
    if (result === 'granted') {
        const noti = new Notification('Update', {
            body: 'New Battle out there',
            icon: 'favicon.png'
        });
        noti.onclick = () => {
            console.log('pew pew');
        };
    }
})();
