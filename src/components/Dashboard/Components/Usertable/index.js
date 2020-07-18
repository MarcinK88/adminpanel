import React from 'react'
import axios from "axios";
import Form from './components/Form'

// const CSRF_TOKEN = document.cookie.match(new RegExp(`XSRF-TOKEN=([^;]+)`))[1];
// const instance = axios.create({
//   headers: { "X-XSRF-TOKEN": CSRF_TOKEN }
// });
// export const AXIOS = instance;

export default class Usertable extends React.Component {

    state = {
        users: [],
        on: false,
        selectedUser: [],
        loggedUser: '',
        loginToken: ''
    }


    componentWillMount() {
        axios.get(`http://localhost:8080/hero/heroes`)
            .then(res => {
                const users = res.data;
                this.setState({ users });
            })

    }




    handleClickDelete(user) {
        alert("User " + user.name + " deleted.");
        axios.get(`http://localhost:8080/hero/remove/${user.id}`)
            .then(res => {
                const users = res.data;
                this.setState({ users });
            })

    }



    toggle(user) {


        // Create a new "on" state to mount the Portal component via the button
        this.setState({
            on: !this.state.on,
            selectedUser: user
        });

    };

    editUser = (e) => {


        let hero = {
            id: e.srcElement[0].value,
            name: e.srcElement[1].value,
            age: e.srcElement[2].value,
            city: e.srcElement[3].value
        }

        axios.post(`http://localhost:8080/hero/add`, hero, {
            headers: {
                'Content-Type': "application/json"
            }
        })
            .then((response) => {
                console.log("resp: ", response);
            }, (error) => {
                console.log("error: ", error);
            });

    }




    render() {


        const { on } = this.state;
        return (

            <div class="card mb-4">
                <div className='container'>
                <button className="btn btn-primary" onClick={() => {this.toggle({id: '', name: '', age: '', city: ''}); }} >Add new user</button>
                </div>
                <div class="card-header">
                    <i class="fas fa-table mr-1"></i>
                                User List
                            </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                                <tr>

                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>City</th>
                                    <th>Delete</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>City</th>
                                    <th>Delete</th>
                                    <th>Edit</th>
                                </tr>
                            </tfoot>
                            <tbody>
                                {this.state.users.map(user => (
                                    <tr>
                                        <td>
                                            {user.id}
                                        </td>
                                        <td>
                                            {user.name}

                                        </td>
                                        <td>
                                            {user.age}

                                        </td>
                                        <td>
                                            {user.city}

                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => {
                                                if (window.confirm('Are you sure you wish to delete ' + user.name + '?')) {
                                                    this.handleClickDelete(user)
                                                }
                                            }
                                            }>delete</button>
                                        </td>
                                        <td>
                                            <button className="btn btn-success" onClick={() => {
                                                this.toggle(user); }}>Edit</button>
                                        </td>
                                    </tr>
                                )
                                )

                                }

                                {this.state.on ? <Form user={this.state.selectedUser} editUser={this.editUser} /> : null}



                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        )
    }
}