import React from 'react'
import {Card, Container, Row} from "react-bootstrap";

const Data = ({data, loading, err}) => {
    if (loading) {
        return <h2>Loading...</h2>
    }
    return (
        <div>
            <Container>
                <Row xs={1} md={2} lg={3} className='d-flex justify-content-center'>
                    {data !== undefined && (err && data.length === 0)
                        ? <h3 className='m-5'>There is no photo in this sol!</h3>
                        : data.map(item => (
                            <div key={item.id}>
                                <Card border="primary" className='m-1'>
                                    <Card.Img variant="bottom" src={item.img_src}/>
                                </Card>
                            </div>))}
                </Row>

            </Container>

        </div>
    )
}

export default Data