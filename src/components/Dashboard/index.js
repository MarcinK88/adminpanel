import React from 'react'
import Cards from './Components/Cards'
import Charts from './Components/Charts'
import Usertable from './Components/Usertable'
import Footer from './Components/Footer'


export default function () {

    return (
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid">
                    <h1 class="mt-4">Dashboard</h1>
                    <ol class="breadcrumb mb-4">
                        <li class="breadcrumb-item active">Dashboard</li>
                    </ol>
                    <Cards />
                    <Charts />
                    <Usertable />
                    <Footer />



                </div>
            </main>

        </div>
    )
}