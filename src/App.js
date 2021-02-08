import React, {useState} from 'react'
import './App.css';
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import Pagination from "./components/Pagination";
import Data from "./components/Data";

function App() {
    const [rover, setRover] = useState('')
    const [camera, setCamera] = useState('')
    const [sol, setSol] = useState(0)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [dataPerPage, setDataPerPage] = useState(3)
    const [err, setErr] = useState(false)

    console.log(data)



    const apiKey = 'aNpW6PvfxwheJ7flXFxW4WsumGOsWfyebEufPYwu'
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&camera=${camera}&page=&api_key=${apiKey}`

    const getData = async () => {
        setLoading(true)
        const res = await axios.get(url)
        if (res.data.photos.length === 0){
            setData(res.data.photos)
            setErr(true)
        }else {
            setErr(false)
            setData(res.data.photos)
        }
        setLoading(false)

    }

    const indexOfLastData = currentPage * dataPerPage
    const indexOfFirstData = indexOfLastData - dataPerPage
    const currentData = data.slice(indexOfFirstData, indexOfLastData)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    const handleChange = (e) => setSol(e.target.value)

    console.log(data)

    return (
        <div className="App py-3 container">
            <>
                <h4>Choose the rover</h4>
                <Button onClick={() => setRover('curiosity')} className='m-2' variant="outline-primary"
                        size="lg">Curiosity</Button>
                <Button onClick={() => setRover('opportunity')} className='m-2' variant="outline-primary"
                        size="lg">Opportunity</Button>
                <Button onClick={() => setRover('spirit')} className='m-2' variant="outline-primary"
                        size="lg">Spirit</Button>
            </>
            {rover && <>
                <hr className='bg-white'/>
                <h4 className="py-1">Choose the camera</h4>
                <Button onClick={() => setCamera('fhaz')} className='m-2' variant="outline-primary" size="lg">Front
                    Hazard Avoidance Camera</Button>
                <Button onClick={() => setCamera('rhaz')} className='m-2' variant="outline-primary" size="lg">Rear
                    Hazard Avoidance Camera</Button>

                {rover === 'curiosity' && <><Button onClick={() => setCamera('mast')} className='m-2'
                                                    variant="outline-primary" size="lg">Mast
                    Camera</Button>
                    <Button onClick={() => setCamera('chemcam')} className='m-2' variant="outline-primary" size="lg">Chemistry
                        and Camera Complex</Button>
                    <Button onClick={() => setCamera('mahli')} className='m-2' variant="outline-primary" size="lg">Mars
                        Hand
                        Lens Imager</Button>
                    <Button onClick={() => setCamera('mardi')} className='m-2' variant="outline-primary" size="lg">Mars
                        Descent Imager</Button></>}

                <Button onClick={() => setCamera('navcam')} className='m-2' variant="outline-primary" size="lg">Navigation
                    Camera</Button>

                {rover !== 'curiosity' && <>
                    <Button onClick={() => setCamera('pancam')} className='m-2' variant="outline-primary" size="lg">Panoramic
                        Camera</Button>
                    <Button onClick={() => setCamera('minites')} className='m-2' variant="outline-primary" size="lg">Miniature
                        Thermal Emission Spectrometer (Mini-TES)</Button>

                </>}

            </>}
            {camera && <>
                <hr className='bg-white'/>
                <h4 className="py-3">Choose the sol</h4>
                <Form className="container">
                    <Form.Group controlId="formBasicRange">
                        <Form.Label>Sol {sol}</Form.Label>
                        <Form.Control onChange={handleChange} type="range" min="0" max="1000" value={sol} steps="1"/>
                    </Form.Group>
                </Form>
            </>}
            {camera && <Button onClick={getData} className='m-2' variant="outline-success"
                               size="lg">{loading ? 'Loadding...' : 'Get Photos'}</Button>}

            <Data data={currentData} loading={loading} err={err}/>
            {data.length !==0 && <Pagination
                dataPerPage={dataPerPage}
                totalData={data.length}
                paginate={paginate}
                setDataPerPage={setDataPerPage}
            />}

        </div>
    )
}

export default App
