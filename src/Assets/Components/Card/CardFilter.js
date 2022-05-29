import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Form, Button } from 'react-bootstrap'
import '../Card/CardFilter.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Cardmobil } from './Cardmobil'
import { SignIn } from '../../../pages/SignIn';
import { BgUngu } from '../Navbar/BgUngu';
import { CardDesc } from './CardPayment/CardDesc';
import { CarDesc } from './CardPayment/CarDesc';
import { CardPembayaran } from './CardPembayaran';
import { Transfer } from './Transfer';
import { KartuBayar } from './KartuBayar';
import { BgUngu3 } from './BgUngu3';
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import invoicepdf from '../../pdf/invoice.pdf';
import { ChartBawah } from './ChartBawah';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { AddCar } from './AddCar';




export const CardFilter = () => {

  const [dataMobil, setDataMobil] = useState([])
  const [idCar, setIdCar] = useState()
  const [supir, setSupir] = useState()
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState(new Date())
  const [page, setPage] = useState('1')
  const [InputNama, setInputNama] = useState(null);
  const [InputHarga, setInputHarga] = useState(null);
  const [InputFoto, setInputFoto] = useState(null);
  const [AddDataStat, setAddDataStat] = useState("not");
  const [SuccessAddStat, setSuccessAddStat] = useState(false);
  const navigate = useNavigate;

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

const filterSupir = (e, page) => {

    
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

const carpaymentdesc = (id, data) => {
  let dataValue = data;
  let idValue = id;
  let Valuecar = dataValue.find((value) => value.id === idValue)
  
  return (
  <div className='container-xl'>
  <div className='cardhasil'>
  <CardDesc
     nextPage={(e) => {
          changePage(e, '4')
        }}
  />
    <CarDesc
      image = {Valuecar.image}
      name = {Valuecar.name}
      price = {Valuecar.price}
      nextPage={(e) => {
          changePage(e, '4')
        }}
    />
  </div>
  </div>
  )
}

const finishpayment = (id, data) => {
  let dataValue = data;
  let idValue = id;
  let Valuecar = dataValue.find((value) => value.id === idValue)

  return (
    <div>
    <CardPembayaran/>
  <div className='container-xl'>
  <div className='cardhasil'>
  <Transfer/>
  <KartuBayar
    price = {Valuecar.price}
    name = {Valuecar.name}
    nextPage={(e) => {
          changePage(e, '5')
        }}
  />
  </div>
  </div>
    </div>
  )
}


  // 
  // ------------------ CARDFILTER -------------------- //
  // 

  const changePage = (e, page) => {
    e.preventDefault();
    setPage(page)
  }

  // ------------------------ ADD NEW CAR -----------------------//

  // function PostForm() {
  //   const url = 'https://rent-car-appx.herokuapp.com/admin/car'
  //   const {data, setData} = useState({
  //     name: '',
  //     price: '',
  //     image: ''
  //   })
    
  //   function submit(e) {
  //     e.preventDefault();
  //     axios.post(url,{
  //       name: data.name,
  //       price: data.price,
  //       image: data.image
  //     })
  //     .then(res=>{
  //       console.log(res.data)
  //     })
  //   }

  //   function handle(e) {
  //     const newdata = {...data}
  //     newdata[e.target.id] = e.target.value
  //     setData(newdata)
  //     console.log(newdata)
  //   }
  // }
  return (
    <div>
    {/* ----------------   PAGE 1  --------------------- */}
    {page === '1' ? (
      <div>
      <SignIn/>
      <Card className='kartufilter'>
  <Card.Body>
  <form onSubmit={(e) => {
    changePage(e, '2');
  }}>
  <Row>
      <Col>
      <div onChange={(e) => {
        filterSupir(e, page)
      }}>
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
            <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
            <Form.Label className='tulisanfilter'>Jumlah Penumpang (Optional)</Form.Label>
            <input className='boxorang' type="text" name="name" placeholder='Jumlah Penumpang' />
            </Form.Group>
      </Form>
  </Col>

  <Col className='btnmobil'>
  <br></br>
  <Button type='submit' variant="success">Cari Mobil</Button>
  </Col>
    </Row>
  </form>
  </Card.Body>
</Card>
<ChartBawah/>


      </div>
    ) : null}

    {/* ---------------   PAGE 2   -----------------------*/}

    {page === '2' ? (
      <div>
      <BgUngu/>
      <Card className='kartufilter2'>
  <Card.Body>
  <form>
  <h5><strong>Pencarianmu</strong></h5>
    <Row>
      <Col>
      <div onChange={(e) => {
        filterSupir(e, page)
      }}>
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
            <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
            <Form.Label className='tulisanfilter'>Jumlah Penumpang (Optional)</Form.Label>
            <input className='boxorang' type="text" name="name" placeholder='Jumlah Penumpang' />
            </Form.Group>
      </Form>
  </Col>

  <Col className='btnedit'>
  <br></br>
  <Button href='/dashboard' type='submit' variant="outline-primary">Edit</Button>
  </Col>
    </Row>
  </form>
  </Card.Body>
</Card>
<Button href='/mobilbaru' className='btn-addcar'>Add New Car</Button>
<div className='container-xl'>
  <div className='cardhasil'>
      {handleMobil(dataMobil, supir)}
  </div>
</div>

      </div>
    ) : null}


     {/* ---------------   PAGE 3 --------------------------*/}

     {page === '3' ? (
      <div>
      <BgUngu/>
      <Card className='kartufilter2'>
  <Card.Body>
  <h5><strong>Pencarianmu</strong></h5>
    <Row>
      <Col>
      <div>
          <label className='txtsupir'>Tipe Driver</label>
          <div className='boxabu'></div>
    </div>
  </Col>

  <Col>
  <div>
      <label className='txtsupir'>Tanggal</label>
      <div className='boxabu'></div>
  </div>
  </Col>

  <Col>
  <div>
      <label className='txtsupir'>Waktu Jemput/Ambil</label>
      <div className='boxabu'></div>
  </div>
  </Col>

  <Col>
  <div>
          <label className='txtsupir'>Jumlah Penumpang (opsional)</label>
          <div className='boxabu'></div>
    </div>
  </Col>
    </Row>
  </Card.Body>
</Card>
<div>
  <div>
  {carpaymentdesc(idCar, dataMobil)}
  </div>
</div>

      </div>
    ) : null}

    {/* ---------------   PAGE 4   --------------------------*/}

    {page === '4' ? (
      <div>
      <div className='container-xl'>
  <div className='cardhasil'>
  {finishpayment(idCar, dataMobil)}
  </div>
</div>

      </div>
    ) : null}

    {/* ---------------   PAGE 5   --------------------------*/}

    {page === '5' ? (
      <div>
      <BgUngu3/>
      <div className='container-xl'>
  <div className='centang'>
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="24" cy="24" r="24" fill="#5CB85F"/>
<path d="M35.3333 15.5L19.75 31.0833L12.6666 24" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
<h6 className='berhasil'><strong>Pembayaran Berhasil!</strong></h6>
  <p className='txthasil'>Tunjukkan invoice ini ke petugas BCR di titik temu.</p>

  <>
  <Card className='kartuinvoice'>
    <Card.Body>
      <Card.Text>
      <Row>
        <Col> 
        <h6 className='txtvoice'><strong>Invoice</strong></h6>
        <p className='txtvoicex'>*no invoice</p>
        </Col>
        <Col>
          <Button className='btndownload' variant='outline-primary'>Unduh</Button>
        </Col>
      </Row>
      </Card.Text>
    </Card.Body>
    <div className='pdfviewer'>
    <div className="pdf-show">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
            <Viewer fileUrl={invoicepdf} />
          </Worker>
        </div>
    </div>
  </Card>
</>
  </div>
</div>

      </div>
    ) : null}

       
    </div>
  )
}
