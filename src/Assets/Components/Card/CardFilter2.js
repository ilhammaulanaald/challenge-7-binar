import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Form, Button } from 'react-bootstrap'
import '../Card/CardFilter.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Cardmobil } from './Cardmobil'

export const CardFilter2 = () => {

  const [dataMobil, setDataMobil] = useState([])
  const [idCar, setIdCar] = useState()
  const [supir, setSupir] = useState()
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState(new Date())
  const [page, setPage] = useState('1')

  useEffect(() => {
    var axios = require('axios');

    var config = {
      method: 'get',
      url: 'https://rent-cars-api.herokuapp.com/admin/car',
      headers: { }
    };
    
    axios(config)
    .then(function (response) {
      setDataMobil(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });    
  }, []);

// filter supir

const filterSupir = (e) => {

  if (e.target.value === 'Dengan Sopir') {
    setSupir(true);
  }

  else if (e.target.value === 'Tanpa Sopir') {
    setSupir(false);
  }
};

const handleMobil = (data, supir) => {
  let dataValue = data;
  let dataSupir = supir;

  return dataValue
  .filter((value) => value.status === dataSupir)
  .map((value, index) => {
    return (
      <Cardmobil
        image={value.image}
        name={value.name}
        price={value.price}
        nextPage={(e) => {
          changePage(e, '3')
          setIdCar(value.id)
        }}
      />
    );
  } );
}



  // 
  // ------------------ CARDFILTER -------------------- //
  // 

  const changePage = (e, page) => {
    e.preventDefault();
    setPage(page)
  }

  return (
    <div>
    {page === '2' ? (
      <div>
      <Card className='kartufilter'>
  <Card.Body>
    <Row>
      <Col>
      <div>
          <label className='txtsupir'>Tipe Driver</label>
          <select className='pilsupir'>
          <option disabled selected hidden>Pilih Tipe Driver</option>
          <option className='dropmen' key={1} value={'Dengan Sopir'}>Dengan Sopir</option>
          <option className='dropmen' key={2} value={'Tanpa Sopir'}>Tanpa Sopir (Lepas Kunci)</option>
          </select>
    </div>
  </Col>

  <Col>
  <div>
      <label className='txtsupir'>Tanggal</label>
        <DatePicker className='pilsupir'
        selected={date} onChange={(date) => setDate(date)}/>
  </div>
  </Col>

  <Col>
  <div>
      <label className='txtsupir'>Waktu Jemput/Ambil</label>
      <DatePicker className='pilsupir' selected={time} onChange={(date) => setTime(date)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={60}
      timeCaption="Time"
      dateFormat="h:mm aa"
      />
  </div>
  </Col>

  <Col>
      <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className='tulisanfilter'>Jumlah Penumpang (Optional)</Form.Label>
            <Form.Control placeholder="Jumlah Penumpang" />
            </Form.Group>
      </Form>
  </Col>

  <Col className='btnmobil'>
  <br></br>
  <Button variant="outline-primary">Edit</Button>
  </Col>
    </Row>
  </Card.Body>
</Card>

      </div>
    ) : null}


    {/* ---------------   PAGE 2 --------------------------*/}

    {page === '2' ? (
      <div>
      <Card className='kartufilter'>
  <Card.Body>
    <Row>
      <Col>
      <div>
          <label className='txtsupir'>Tipe Driver</label>
          <select className='pilsupir'>
          <option disabled selected hidden>Pilih Tipe Driver</option>
          <option className='dropmen' key={1} value={'Dengan Sopir'}>Dengan Sopir</option>
          <option className='dropmen' key={2} value={'Tanpa Sopir'}>Tanpa Sopir (Lepas Kunci)</option>
          </select>
    </div>
  </Col>

  <Col>
  <div>
      <label className='txtsupir'>Tanggal</label>
        <DatePicker className='pilsupir'
        selected={date} onChange={(date) => setDate(date)}/>
  </div>
  </Col>

  <Col>
  <div>
      <label className='txtsupir'>Waktu Jemput/Ambil</label>
      <DatePicker className='pilsupir' selected={time} onChange={(date) => setTime(date)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={60}
      timeCaption="Time"
      dateFormat="h:mm aa"
      />
  </div>
  </Col>

  <Col>
      <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className='tulisanfilter'>Jumlah Penumpang (Optional)</Form.Label>
            <Form.Control placeholder="Jumlah Penumpang" />
            </Form.Group>
      </Form>
  </Col>

  <Col className='btnmobil'>
  <br></br>
  <Button variant="outline-primary">Edit</Button>
  </Col>
    </Row>
  </Card.Body>
</Card>

      </div>
    ) : null}



{/* ----------------------------  PAGE 3  -------------------------- */}


     
       
    </div>
  )
}
