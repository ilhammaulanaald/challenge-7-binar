import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Button, Card, Col, Form } from 'react-bootstrap'
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { Navigate } from 'react-router';


export const AddCar = () => {

    const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }
    const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }
    const handleimg = (files, allFiles) => {
        console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove())
      }
    
    
const [dataInput, setDataInput] = useState({
        name: "",
        price: "",
        category:"",
        image:  "",
        status: "false",
      });

      const handleSubmit = () => {
        var config = {
            method: "post",
            url: "https://rent-car-appx.herokuapp.com/admin/car",
            data: dataInput,
          };
          
          axios(config)
          .then(function (response) {

            console.log(response);
          })
          .catch(function (error){
              console.log(error);
          });

          
      }
      

  return (
    <div>
        <h2>Add New Car</h2>
        <Form>
        <Card>
        <Card.Body>
            <label>Name</label>
            <Col>
            <input
                type='name'
                id='inputName'
                placeholder='Isi Nama Mobil Disini '
                value={dataInput.name}
                onChange={(e) =>
                setDataInput({
                    ...dataInput,
                    name: e.target.value,
                    })
                }

            />
            </Col>

<label>Price</label>
<Col>
<input
                type='price'
                id='inputPrice'
                placeholder='Isi Harga Mobil Disini '
                value={dataInput.price}
                onChange={(e) =>
                setDataInput({
                    ...dataInput,
                    price: e.target.value,
                    })
                }

            />
</Col>

<label>Category</label>
<Col>
<input
                type='text'
                id='inputcategory'
                placeholder='small/medium/large '
                value={dataInput.category}
                onChange={(e) =>
                setDataInput({
                    ...dataInput,
                    category: e.target.value,
                    })
                }

            />
</Col>
<label>Image</label>
<Col>
<Dropzone
                        getUploadParams={getUploadParams}
                        onChangeStatus={handleChangeStatus}
                        onSubmit={handleimg}
                        onChange={(e) =>
                setDataInput({
                    ...dataInput,
                    image: e.target.value,
                    })
                }
                        accept="image/*"
                      />
</Col>
<br></br>
            <Button
                onClick={() => handleSubmit()}
            > Submit </Button>
        </Card.Body>
    </Card>
        </Form>
    </div>
  )
}

// import axios from 'axios';
// import React from 'react'
// import { useState } from 'react';
// import { useNavigate } from 'react-router';
// import Swal from 'sweetalert2';

// export const AddCar = () => {
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState(0);
//   const [image, setImage] = useState('');
//   const [category, setCategory] = useState('');
//   const [status, setStatus] = useState (false);
//   const navigate = useNavigate();

//   const handleStateInput = (e) => {
//     if (e.target.id === "tipe-input") {
//       setCategory(e.target.value);
//     } else if (e.target.id === "nama-input") {
//       setName(e.target.value);
//     } else if (e.target.id === "harga-input") {
//       setPrice(e.target.value);
//     } else if (e.target.id === "foto-input") {
//       setImage(e.target.files[0]);
//     }
//   };

//   const data = new FormData();
//     data.append("name", name);
//     data.append("price", price);
//     data.append("image", image);
//     data.append("status", status);
//     data.append("category", category);

//     var config = {
//         method: "post",
//         url: "https://rent-car-appx.herokuapp.com/admin/car",
//         data: data, 
//       };
  
//       axios(config)
//         .then(function (response) {
//           console.log(response);

//         })
//         .catch(function (error) {
//           console.log(error);
//         });

//   return (
//     <div>
//         <h1>asf</h1>
//     </div>
//   )
// }

