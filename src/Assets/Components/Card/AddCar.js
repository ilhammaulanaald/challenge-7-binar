import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router';

export const AddCar = () => {
const [dataInput, setDataInput] = useState({
        name: "",
        price: "",
        image: null,
        status: "true",
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

<label>Price</label>
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

            <Button
                onClick={() => handleSubmit()}
            />
        </Card.Body>
    </Card>
        </Form>
    </div>
  )
}
