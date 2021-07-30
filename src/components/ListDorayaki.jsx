import React, {Component} from 'react';
import {Button, Image, Table} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {Link} from 'react-router-dom';
import {Delete} from '@material-ui/icons';

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
        <Button className="me-1" size="sm" variant="primary">
          Edit
        </Button>
      </Link>
      <Button 
        className="mx-1"
        size="sm"
        variant="danger" 
        onClick={() => {props.deleteDorayaki(props.dorayaki._id);}}
      >
        <Delete fontSize="small"/>
      </Button>
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
    axios.get('/dorayaki')
        .then((response) => {
          this.setState({dorayaki: response.data});
        })
        .catch((err) => {
          console.log(err);
        });
  }

  deleteDorayaki(id) {
    axios.delete('/dorayaki/'+id)
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
        <h2 className="my-3">List Dorayaki</h2>
        <Table style={{tableLayout: "fixed", overflowWrap: 'break-word'}}>
          <thead>
            <tr>
              <th>Gambar</th>
              <th>Rasa</th>
              <th>Deskripsi</th>
              <th>Aksi</th>
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
