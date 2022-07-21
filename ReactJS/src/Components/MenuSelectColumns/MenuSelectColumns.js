import { Checkbox, Row, Col } from "antd";
import styles from './MenuSelectColumns.module.css'


const SelectColumnsMenu = ({ columnsTable, updateVisibleColumns }) => {

    const getColumnsVisible = () => {
        return columnsTable.map((columns) => {
            if (columns.isVisible) return columns.nameColumns;
        })
    }

    const onChange = (checkedValues) => {
        updateVisibleColumns({ "columnsVisible": checkedValues });

    };

    return (
        <Checkbox.Group defaultValue={getColumnsVisible} onChange={onChange}>
            <div className={styles.scrollbar}>
                <Col>
                    {
                        columnsTable.map((columns, index) => {
                            if (columns.nameColumns.toLowerCase() === 'action') {
                                return <Row style={{ marginBottom: "12px" }} key={index}>
                                    <Checkbox value={columns.nameColumns} disabled >
                                        {columns.nameColumns}
                                    </Checkbox>
                                </Row>
                            }
                            return (
                                <Row style={{ marginBottom: "12px" }} key={index}>
                                    <Checkbox value={columns.nameColumns} >
                                        {columns.nameColumns}
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




export default SelectColumnsMenu;
