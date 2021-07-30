import React, {Component} from 'react';
import {Row, Col, Form, Button, Image} from 'react-bootstrap';
// import {LinkContainer} from 'react-router-bootstrap';

// import TokoCard from './TokoCard';

import axios from 'axios';

export default class AddDorayaki extends Component {
  constructor(props) {
    super(props);

    this.onChangeRasa = this.onChangeRasa.bind(this);
    this.onChangeDeskripsi = this.onChangeDeskripsi.bind(this);
    this.onChangeGambar = this.onChangeGambar.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      rasa: '',
      deskripsi: '',
      gambar: '',
      stok: [],
      dorayaki: [],
    };
  }

  componentDidMount() {
    axios.get('/dorayaki/')
        .then((response) => {
          this.setState({toko: response.data});
        })
        .catch((error) => {
          console.log(error);
        });
  }

  onChangeRasa(e) {
    this.setState({
      rasa: e.target.value,
    });
  }

  onChangeDeskripsi(e) {
    this.setState({
      deskripsi: e.target.value,
    });
  }

  onChangeGambar(e) {
    e.preventDefault();
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function(upload) {
        this.setState({
          gambar: upload.target.result,
        });
      }.bind(this);
      reader.readAsDataURL(e.target.files[0]);
    }
  }


  onSubmit(e) {
    e.preventDefault();

    const dorayaki = {
      rasa: this.state.rasa,
      deskripsi: this.state.deskripsi,
      gambar: this.state.gambar,
    };

    axios.post('/dorayaki/add', dorayaki)
        .then((res) => console.log(res.data))
        .then(() => window.location = '/dorayaki')
        .catch((err) => {
          if (err.request) {
            console.log(err.request);
          } if (err.response) {
            console.log(err.response);
          }
        });
  }

  render() {
    return (
      <>
        <h2 className="my-3">Tambah Dorayaki</h2>
        <Form onSubmit={this.onSubmit} autoComplete="off" >
          <Form.Group className="m-3" controlId="formRasaDorayaki">
            <Form.Label>Rasa Dorayaki</Form.Label>
            <Form.Control onChange={this.onChangeRasa} required type="text" />
          </Form.Group>

          <Form.Group className="m-3" controlId="formDeskripsi">
            <Form.Label>Deskripsi</Form.Label>
            <Form.Control onChange={this.onChangeDeskripsi} required type="text" />
          </Form.Group>

          <Form.Group className="m-3" controlId="formGambar">
            <Form.Label>Gambar</Form.Label>
            <Form.Control onChange={this.onChangeGambar} required type="file" accept="image/*" />
          </Form.Group>

          {this.state.gambar &&
            <Row>
              <Col>
                <Image className="m-3" width="256" src={this.state.gambar} />
              </Col>
            </Row>
          }

          <Button className="m-3" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </>
    );
  }
}
