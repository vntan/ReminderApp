import moment from "moment";

const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const today = new Date();

const disabledDate = (current) => {
    // console.log(new moment().endOf('day').add(-4))
    return current && current < moment().endOf('day').subtract(1, "day");
};

export {
    today,
    disabledDate,
    dateFormat,
    moment
}