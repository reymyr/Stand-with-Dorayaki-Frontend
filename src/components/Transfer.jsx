import React, {Component} from 'react';
import {Row, Col, Form, Button, Table} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {Link} from 'react-router-dom';

import axios from 'axios';

const Stok = (props) => (
  <tr>
    <td>{props.stok.dorayaki.rasa}</td>
    <td>{props.stok.jumlah}</td>
  </tr>
);

export default class Transfer extends Component {
  constructor(props) {
    super(props);

    this.stokToko = this.stokToko.bind(this);
    this.onChangeTokoAsal = this.onChangeTokoAsal.bind(this);

    this.state = {
      toko: [],
      tokoAsal: {stok: [], _id: ''},
      idTokoTujuan: '',
      stok: [],
      dorayaki: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/toko')
        .then((response) => {
          this.setState({toko: response.data});
        })
        .catch((error) => {
          console.log(error);
        });
  }

  createInputStok() {
    return this.state.stok.map((el, i) => (
      <Row key={i}>
        <Form.Group as={Col} className="mb-3">
          <Form.Select value={el.dorayaki || ''} name="dorayaki" onChange={this.onChangeRasa.bind(this, i)}>
            <option value="" hidden disabled>-- rasa dorayaki --</option>
            {this.state.tokoAsal.stok.map((curStok) => (
              <option key={curStok._id} value={curStok.dorayaki._id}>{curStok.dorayaki.rasa}</option>
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

  deleteToko(id) {
    axios.delete('http://localhost:5000/toko/'+id)
        .then((response) => {
          console.log(response.data);
        });

    this.setState({
      toko: this.state.toko.filter((el) => el._id !== id),
    });
  }

  stokToko() {
    return this.state.tokoAsal.stok.map((curStok) => {
      return <Stok stok={curStok} key={curStok._id} />;
    });
  }

  onChangeTokoAsal(e) {
    console.log(e.target.value);
    const id = e.target.value;

    axios.get(`http://localhost:5000/toko/${id}`)
        .then((response) => {
          this.setState({tokoAsal: response.data});
        })
        .catch((error) => {
          console.log(error);
        });
  }

  addClick() {
    this.setState((prevState) => ({
      stok: [...prevState.stok, {dorayaki: '', jumlah: ''}],
    }));
  }

  removeClick(i) {
    const stok = [...this.state.stok];
    stok.splice(i, 1);
    this.setState({stok});
  }

  onChangeRasa(i, e) {
    const {name, value} = e.target;
    const stok = [...this.state.stok];
    stok[i] = {...stok[i], [name]: value};
    this.setState({stok});
  }

  onChangeJumlah(i, e) {
    const {name, value} = e.target;
    const stok = [...this.state.stok];
    stok[i] = {...stok[i], [name]: +value};
    this.setState({stok});
  }

  render() {
    return (
      <>
        <Form.Group as={Col} className="mb-3">
          <Form.Select value={this.state.tokoAsal._id || ''} name="tokoAsal" onChange={this.onChangeTokoAsal}>
            <option value="" hidden disabled>-- Toko Asal --</option>
            {this.state.toko.map((curToko) => (
              <option key={curToko._id} value={curToko._id}>{curToko.nama}</option>
            ))}
          </Form.Select>
        </Form.Group>
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
        {this.createInputStok()}
        <Row>
          <Col md={{offset: 4}}>
            <Button variant="primary" onClick={this.addClick.bind(this) }>
              +
            </Button>
          </Col>
        </Row>
      </>
    );
  }
}
