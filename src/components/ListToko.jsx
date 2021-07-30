import React, {Component} from 'react';
import {Button, Table} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {Link} from 'react-router-dom';
import {Delete} from '@material-ui/icons';

import axios from 'axios';

const Toko = (props) => (
  <tr>
    <td>{props.toko.nama}</td>
    <td >{props.toko.jalan}</td>
    <td>{props.toko.kecamatan}</td>
    <td>{props.toko.provinsi}</td>
    <td>
      <Link
        to={{
          pathname: '/toko/stok',
          state: {id: props.toko._id},
        }}
      >
        <Button className="me-1" size="sm" variant="primary">
          Stok
        </Button>
      </Link>
      <Link
        to={{
          pathname: '/toko/edit',
          state: {...props.toko},
        }}
      >
        <Button className="mx-1" size="sm" variant="primary">
          Edit
        </Button>
      </Link>
      <Button 
        className="mx-1"
        size="sm"
        variant="danger" 
        onClick={() => { props.deleteToko(props.toko._id);}}
      >
        <Delete fontSize="small"/>
      </Button>
    </td>
  </tr>
);

export default class ListToko extends Component {
  constructor(props) {
    super(props);

    this.deleteToko = this.deleteToko.bind(this);

    this.state = {toko: []};
  }

  componentDidMount() {
    axios.get('/toko')
        .then((response) => {
          this.setState({toko: response.data});
        })
        .catch((error) => {
          console.log(error);
        });
  }

  deleteToko(id) {
    axios.delete('/toko/'+id)
        .then((response) => {
          console.log(response.data);
        });

    this.setState({
      toko: this.state.toko.filter((el) => el._id !== id),
    });
  }

  listToko() {
    return this.state.toko.map((curToko) => {
      console.log(curToko);
      return <Toko toko={curToko} deleteToko={this.deleteToko} key={curToko._id} />;
    });
  }

  render() {
    return (
      <>
        <h2 className="my-3">List Toko</h2>
        <Table style={{tableLayout: "fixed", overflowWrap: 'break-word'}}>
          <thead>
            <tr>
              <th>Nama Toko</th>
              <th>Jalan</th>
              <th>Kecamatan</th>
              <th>Provinsi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            { this.listToko() }
          </tbody>
        </Table>
        <LinkContainer to="/toko/add">
          <Button variant="primary">Add</Button>
        </LinkContainer>
      </>
    );
  }
}
