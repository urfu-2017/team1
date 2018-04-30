
class AlarmClockController {
    static async create(req, res) {
        const { user } = req;
        const { alarmClock } = req.body;
        user.alarmClocks.push(alarmClock);
        await user.save();

        res.status(200).send({ alarmClocks: user.alarmClocks });
    }
}

module.exports = { AlarmClockController };
