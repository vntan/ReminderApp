import { Checkbox, Row, Col } from "antd";
import styles from './FilterSelector.module.css'

import { updateVisibleStatus } from "../../Models/statusTasksReducer";

import { connect } from "react-redux";


const FilterSelector = ({ filterStatus, updateVisibleStatus }) => {

    const getStatusVisible = () => {
        return filterStatus.map((status) => {
            if (status.isVisible) return status.nameStatus;
        })
    }

    const onChange = (checkedValues) => {
        updateVisibleStatus({ "statusVisible": checkedValues });

    };

    return (
        <Checkbox.Group defaultValue={getStatusVisible} onChange={onChange}>
                <Col>
                    {
                        filterStatus.map((status, index) => {
                            return (
                                <Row style={{ marginBottom: "12px" }} key={index}>
                                    <Checkbox value={status.nameStatus} style={status.style}>
                                        {status.nameStatus}
                                    </Checkbox>
                                </Row>
                            )

                        })

                    }
                </Col>




        </Checkbox.Group>
    )
};


const mapStateToProps = (state) => ({
  filterStatus: state.statusTask
})

const mapActionToProps = {
  updateVisibleStatus, 
}

export default connect(mapStateToProps, mapActionToProps)(FilterSelector);
