import React, {Component} from 'react';
import {Row, Col, Table, Form, Button} from 'react-bootstrap';

import axios from 'axios';

const Stok = (props) => (
  <tr>
    <td>{props.stok.dorayaki.rasa}</td>
    <td>{props.stok.jumlah}</td>
  </tr>
);

export default class StokToko extends Component {
  constructor(props) {
    super(props);

    this.onSubmitAdd = this.onSubmitAdd.bind(this);
    this.onSubmitSubtract = this.onSubmitSubtract.bind(this);
    this.stokToko = this.stokToko.bind(this);
    this.changeStok = this.changeStok.bind(this);

    this.state = {
      toko: {stok: []},
      dorayaki: [],
      newStok: [{dorayaki: '', jumlah: 0}],
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/toko/${this.props.location.state.id}`)
        .then((response) => {
          this.setState({toko: response.data});
        })
        .catch((error) => {
          console.log(error);
        });

    axios.get('http://localhost:5000/dorayaki')
        .then((response) => {
          this.setState({dorayaki: response.data});
        })
        .catch((error) => {
          console.log(error);
        });
  }

  createInput() {
    return this.state.newStok.map((el, i) => (
      <Row key={i}>
        <Form.Group as={Col} className="mb-3">
          <Form.Select value={el.dorayaki || ''}name="dorayaki" onChange={this.onChangeRasa.bind(this, i)}>
            <option value="" hidden disabled>-- rasa dorayaki --</option>
            {this.state.dorayaki.map((curDorayaki) => (
              <option key={curDorayaki.rasa} value={curDorayaki._id}>{curDorayaki.rasa}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} className="mb-3">
          <Form.Control name="jumlah" value={el.jumlah || 0} type="number" min="0" onChange={this.onChangeJumlah.bind(this, i)} />
        </Form.Group>
        <Col>
          <Button variant="danger" type="submit"onClick={this.removeClick.bind(this, i)} >
            -
          </Button>
        </Col>
      </Row>
    ));
  }

  stokToko() {
    return this.state.toko.stok.map((curStok) => {
      return <Stok stok={curStok} key={curStok._id} />;
    });
  }

  addClick() {
    this.setState((prevState) => ({
      newStok: [...prevState.newStok, {dorayaki: '', jumlah: ''}],
    }));
  }

  removeClick(i) {
    const newStok = [...this.state.newStok];
    newStok.splice(i, 1);
    this.setState({newStok});
  }

  onChangeRasa(i, e) {
    const {name, value} = e.target;
    const newStok = [...this.state.newStok];
    newStok[i] = {...newStok[i], [name]: value};
    this.setState({newStok});
  }

  onChangeJumlah(i, e) {
    const {name, value} = e.target;
    const newStok = [...this.state.newStok];
    newStok[i] = {...newStok[i], [name]: +value};
    this.setState({newStok});
  }

  changeStok(changeStok) {
    axios.patch(`/toko/${this.state.toko._id}/stok`, changeStok)
        .then((res) => this.setState((prevState) => ({
          toko: {
            ...prevState.toko,
            stok: res.data.stok,
          },
          newStok: [{dorayaki: '', jumlah: 0}],
        })))
        .catch((err) => {
          console.log(err);
        });
  }

  onSubmitAdd(e) {
    e.preventDefault();

    const newStok = {
      stok: this.state.newStok,
    };

    this.changeStok(newStok);
  }

  onSubmitSubtract(e) {
    e.preventDefault();

    const newStok = {
      stok: this.state.newStok.map(el => ({ dorayaki: el.dorayaki, jumlah: el.jumlah * -1 }))
    };

    this.changeStok(newStok);
  }

  render() {
    return (
      <>
        <Row className="mt-3">
          <h2>{this.state.toko.nama}</h2>
        </Row>
        <Row className="mb-3">
          <h6>{this.state.toko.jalan}, {this.state.toko.kecamatan}, {this.state.toko.provinsi}</h6>
        </Row>
        <Row>
          <h5>Stok</h5>
        </Row>
        <Table responsive>
          <thead>
            <tr>
              <th>Rasa Dorayaki</th>
              <th>Jumlah</th>
            </tr>
          </thead>
          <tbody>
            { this.stokToko() }
          </tbody>
        </Table>
        <Row>
          <h6>Ubah stok</h6>
        </Row>
        <Row>
          <Col md={4}>Rasa</Col>
          <Col md={8}>Jumlah</Col>
        </Row>
        {this.createInput()}
        <Row>
          <Col md={{offset: 4}}>
            <Button variant="primary" onClick={this.addClick.bind(this) }>
              +
            </Button>
          </Col>
        </Row>
        <Button className="me-2" variant="primary" type="submit" onClick={this.onSubmitAdd}>
          Tambah Stok
        </Button>
        <Button variant="danger" type="submit" onClick={this.onSubmitSubtract}>
          Kurangi Stok
        </Button>
      </>
    );
  }
}
