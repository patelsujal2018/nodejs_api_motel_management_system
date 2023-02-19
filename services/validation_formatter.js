module.exports = function(req){
    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
        return `${msg}`;
    };
}