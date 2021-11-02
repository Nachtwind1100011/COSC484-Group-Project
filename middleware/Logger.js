const Logger = (req, res, next) => {
    let date = new Date();
    console.log(`[MIDDLEWARE LOG ${date}:]  ${req.method} ${req.originalUrl}`);
    next();
}
module.exports = { Logger };