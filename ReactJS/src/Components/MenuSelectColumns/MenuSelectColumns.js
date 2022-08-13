import { Checkbox, Row, Col } from "antd";
import styles from './MenuSelectColumns.module.css'

import { connect } from "react-redux";
import { updateVisibleColumns } from "../../Models/columnsTableReducer";
import { useEffect } from "react";


const SelectColumnsMenu = ({ columnsTable, updateVisibleColumns, columnsTableDisable }) => {

    useEffect(() => {
        if (!columnsTableDisable) columnsTableDisable = [];
        else columnsTableDisable =
            console.log(columnsTableDisable)
    }, []);

    const getColumnsVisible = () => {
        return columnsTable.map((columns) => {
            if (columns.isVisible) return columns.title;
        })
    }

    const onChange = (checkedValues) => {
        updateVisibleColumns(checkedValues)
    };

    return (
        <Checkbox.Group defaultValue={getColumnsVisible} onChange={onChange}>
            <div className={styles.scrollbar}>
                <Col>
                    {
                        columnsTable.map((columns, index) => {
                            return (
                                <Row style={{ marginBottom: "12px" }} key={index}>
                                    <Checkbox value={columns.title}
                                        disabled={columnsTableDisable &&
                                            columnsTableDisable.map(columns => columns.toLowerCase())
                                                .includes(columns.title.toLowerCase())
                                        }
                                    >
                                        {columns.title}
                                    </Checkbox>
                                </Row>
                            )

                        })

                    }
                </Col>
            </div>



        </Checkbox.Group>
    )
};


const mapStateToProps = (state) => {
    return {
        columnsTable: state.columnsTable,
    }
}

const mapActionToProps = {
    updateVisibleColumns,
}

export default connect(mapStateToProps, mapActionToProps)(SelectColumnsMenu);

