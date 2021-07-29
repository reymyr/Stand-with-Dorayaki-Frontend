import React, {Component} from 'react';
import {Button, Image, Table} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {Link} from 'react-router-dom';

import axios from 'axios';

const Dorayaki = (props) => (
  <tr>
    <td>
      <Image width="128" src={props.dorayaki.gambar} fluid />
    </td>
    <td>{props.dorayaki.rasa}</td>
    <td>{props.dorayaki.deskripsi}</td>
    <td>
      <Link
        to={{
          pathname: '/dorayaki/edit',
          state: {...props.dorayaki, file: props.file},
        }}
      >
        edit
      </Link>
      <br />
      <a href="#" onClick={() => {
        props.deleteDorayaki(props.dorayaki._id);
      }}>delete</a>
    </td>
  </tr>
);

export default class ListDorayaki extends Component {
  constructor(props) {
    super(props);

    this.deleteDorayaki = this.deleteDorayaki.bind(this);

    this.state = {dorayaki: []};
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

  deleteDorayaki(id) {
    axios.delete('http://localhost:5000/dorayaki/'+id)
        .then((response) => {
          console.log(response.data);
        });

    this.setState({
      dorayaki: this.state.dorayaki.filter((el) => el._id !== id),
    });
  }

  listDorayaki() {
    return this.state.dorayaki.map((curDorayaki) => {
      return <Dorayaki dorayaki={curDorayaki} deleteDorayaki={this.deleteDorayaki} key={curDorayaki._id} />;
    });
  }

  render() {
    return (
      <>
        <Table responsive>
          <thead>
            <tr>
              <th>Gambar</th>
              <th>Rasa</th>
              <th>Deskripsi</th>
            </tr>
          </thead>
          <tbody>
            { this.listDorayaki() }
          </tbody>
        </Table>
        <LinkContainer to="/dorayaki/add">
          <Button variant="primary">Add</Button>
        </LinkContainer>
      </>
    );
  }
}
