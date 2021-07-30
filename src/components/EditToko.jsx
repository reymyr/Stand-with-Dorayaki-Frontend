import React, {Component} from 'react';
import {Form, Button} from 'react-bootstrap';

import axios from 'axios';

export default class EditToko extends Component {
  constructor(props) {
    super(props);

    this.onChangeNama = this.onChangeNama.bind(this);
    this.onChangeJalan = this.onChangeJalan.bind(this);
    this.onChangeKecamatan = this.onChangeKecamatan.bind(this);
    this.onChangeProvinsi = this.onChangeProvinsi.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      ...props.location.state,
    };
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
    };

    axios.put(`/toko/${this.state._id}`, toko)
        .then((res) => console.log(res.data));

    window.location = '/toko';
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit} autoComplete="off" >
        <Form.Group className="m-3" controlId="formNamaToko">
          <Form.Label>Nama Toko</Form.Label>
          <Form.Control onChange={this.onChangeNama} required type="text" value={this.state.nama} />
        </Form.Group>

        <Form.Group className="m-3" controlId="formJalan">
          <Form.Label>Jalan</Form.Label>
          <Form.Control onChange={this.onChangeJalan} required type="text" value={this.state.jalan} />
        </Form.Group>

        <Form.Group className="m-3" controlId="formKecamatan">
          <Form.Label>Kecamatan</Form.Label>
          <Form.Control onChange={this.onChangeKecamatan} required type="text" value={this.state.kecamatan} />
        </Form.Group>

        <Form.Group className="m-3" controlId="formProvinsi">
          <Form.Label>Provinsi</Form.Label>
          <Form.Control onChange={this.onChangeProvinsi} required type="text" value={this.state.provinsi} />
        </Form.Group>

        <Button className="m-3" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}
