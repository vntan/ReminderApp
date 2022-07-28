import moment from "moment";

const dateFormat = 'YYYY-MM-DD';
const today = new Date();

const disabledDate = (current) => {
    return current && current < moment().endOf('day');
};

export {
    today,
    disabledDate,
    dateFormat,
    moment
}