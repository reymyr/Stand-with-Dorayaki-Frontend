import React, {Component} from 'react';
import {Row, Col, Form, Button, Image} from 'react-bootstrap';

import axios from 'axios';

export default class EditDorayaki extends Component {
  constructor(props) {
    super(props);

    this.onChangeRasa = this.onChangeRasa.bind(this);
    this.onChangeDeskripsi = this.onChangeDeskripsi.bind(this);
    this.onChangeGambar = this.onChangeGambar.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      ...props.location.state,
    };
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
      console.log(this.state);
    }
  }


  onSubmit(e) {
    e.preventDefault();

    const dorayaki = {
      rasa: this.state.rasa,
      deskripsi: this.state.deskripsi,
      gambar: this.state.gambar,
    };

    axios.put(`http://localhost:5000/dorayaki/${this.state._id}`, dorayaki)
        .then((res) => console.log(res.data))
        .catch((err) => {
          if (err.request) {
            console.log(err.request);
          } if (err.response) {
            console.log(err.response);
          }
        });

    window.location = '/dorayaki';
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit} autoComplete="off" >
        <Form.Group className="m-3" controlId="formRasaDorayaki">
          <Form.Label>Rasa Dorayaki</Form.Label>
          <Form.Control onChange={this.onChangeRasa} required type="text" value={this.state.rasa} />
        </Form.Group>

        <Form.Group className="m-3" controlId="formDeskripsi">
          <Form.Label>Deskripsi</Form.Label>
          <Form.Control onChange={this.onChangeDeskripsi} required type="text" value={this.state.deskripsi} />
        </Form.Group>

        <Form.Group className="m-3" controlId="formGambar">
          <Form.Label>Gambar</Form.Label>
          <Form.Control onChange={this.onChangeGambar} type="file" accept="image/*" />
        </Form.Group>

        {this.state.gambar &&
          <Row>
            <Col>
              <Image width="128" src={this.state.gambar} />
            </Col>
          </Row>
        }

        <Button variant="primary" type="submit">
                    Submit
        </Button>
      </Form>
    );
  }
}
