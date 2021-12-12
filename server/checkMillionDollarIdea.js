const checkMillionDollarIdea = (req, res, next) => {
    let newIdea = req.body;
    if (Number(newIdea.numWeeks) || Number(newIdea.weeklyRevenue)) {
        if (Number(newIdea.numWeeks) * Number(newIdea.weeklyRevenue) >= 1000000) {
            next();
        } else {
            res.status(400).send('Yield is less than a million Dollars')
        }
    } else {
        res.status(400).send('Please supply numWeeks and weeklyRevenue')
    }
}
// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
