import React, {Component} from 'react';
import {Form, Button} from 'react-bootstrap';
// import {LinkContainer} from 'react-router-bootstrap';

// import TokoCard from './TokoCard';

import axios from 'axios';

export default class ListToko extends Component {
  constructor(props) {
    super(props);

    this.onChangeNama = this.onChangeNama.bind(this);
    this.onChangeJalan = this.onChangeJalan.bind(this);
    this.onChangeKecamatan = this.onChangeKecamatan.bind(this);
    this.onChangeProvinsi = this.onChangeProvinsi.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      nama: '',
      jalan: '',
      kecamatan: '',
      provinsi: '',
      stok: [],
      dorayaki: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/dorayaki/')
        .then((response) => {
          this.setState({dorayaki: response.data});
        })
        .catch((error) => {
          console.log(error);
        });
  }

  onChangeNama(e) {
    this.setState({
      nama: e.target.value,
    });
  }

  onChangeJalan(e) {
    this.setState({
      jalan: e.target.value,
    });
  }

  onChangeKecamatan(e) {
    this.setState({
      kecamatan: e.target.value,
    });
  }

  onChangeProvinsi(e) {
    this.setState({
      provinsi: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const toko = {
      nama: this.state.nama,
      jalan: this.state.jalan,
      kecamatan: this.state.kecamatan,
      provinsi: this.state.provinsi,
      stok: [],
    };

    console.log(toko);

    axios.post('http://localhost:5000/toko/add', toko)
        .then((res) => console.log(res.data));

    window.location = '/toko';
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit} autoComplete="off" >
        <Form.Group className="m-3" controlId="formNamaToko">
          <Form.Label>Nama Toko</Form.Label>
          <Form.Control onChange={this.onChangeNama} required type="text" />
        </Form.Group>

        <Form.Group className="m-3" controlId="formJalan">
          <Form.Label>Jalan</Form.Label>
          <Form.Control onChange={this.onChangeJalan} required type="text" />
        </Form.Group>

        <Form.Group className="m-3" controlId="formKecamatan">
          <Form.Label>Kecamatan</Form.Label>
          <Form.Control onChange={this.onChangeKecamatan} required type="text" />
        </Form.Group>

        <Form.Group className="m-3" controlId="formProvinsi">
          <Form.Label>Provinsi</Form.Label>
          <Form.Control onChange={this.onChangeProvinsi} required type="text" />
        </Form.Group>

        <Button variant="primary" type="submit">
                Submit
        </Button>
      </Form>
    );
  }
}
