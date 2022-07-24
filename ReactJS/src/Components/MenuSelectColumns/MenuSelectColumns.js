import { Checkbox, Row, Col } from "antd";
import styles from './MenuSelectColumns.module.css'


const SelectColumnsMenu = ({ columnsTable, updateVisibleColumns }) => {

    const getColumnsVisible = () => {
        return columnsTable.map((columns) => {
            if (columns.isVisible) return columns.title;
        })
    }

    const onChange = (checkedValues) => {
        //updateVisibleColumns({ "columnsVisible": checkedValues });
        for(const columns of columnsTable) columns.isVisible = false;

        for(const nameColumn of checkedValues){
            const index = columnsTable.findIndex(column => column.title === nameColumn)
            if (index >= 0 ) columnsTable[index].isVisible = true;
        }

        console.log("hello");

        updateVisibleColumns(columnsTable)
    };

    return (
        <Checkbox.Group defaultValue={getColumnsVisible} onChange={onChange}>
            <div className={styles.scrollbar}>
                <Col>
                    {
                        columnsTable.map((columns, index) => {
                            if (columns.title.toLowerCase() === 'action') {
                                return <Row style={{ marginBottom: "12px" }} key={index}>
                                    <Checkbox value={columns.title} disabled >
                                        {columns.title}
                                    </Checkbox>
                                </Row>
                            }
                            return (
                                <Row style={{ marginBottom: "12px" }} key={index}>
                                    <Checkbox value={columns.title} >
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




export default SelectColumnsMenu;
