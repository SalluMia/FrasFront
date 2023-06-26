import axios from 'axios';
import hosp from './hosp';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import style from './style.css';
import { Modal, Button } from 'react-bootstrap';

function Hospitals() {
    const [hospitals, setHospitals] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedHospital, setSelectedHospital] = useState(null);

    useEffect(() => {
        const filteredHospitals = hosp.hospitals.filter((hospital) =>
            hospital.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setHospitals(filteredHospitals);
    }, [searchTerm]);

    const handleClose = () => setSelectedHospital(null);

    const handleShow = (hospital) => setSelectedHospital(hospital);

    return (
        <div>
            <div className="container bg-light p-2 mt-2" id='RescContainer'>
                <div className="row">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control search-input"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button className="btn btn-outline-secondary" type="submit">
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-sm-12">
                        {/* <h1>List of Hospitals</h1> */}
                        <div id="hosp-table">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th><i class="fa-solid fa-file-signature" style={{ fontSize: '13px'}}></i> Name</th>
                                        <th><i class="fa-solid fa-location-dot"style={{ fontSize: '13px'}}></i> Location</th>
                                        <th><i class="fa-solid fa-hospital" style={{ fontSize: '13px'}}></i> Panel</th>
                                        <th><i class="fa-solid fa-phone" style={{ fontSize: '13px'}}></i> Phone#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {hospitals.map((hospital, index) => (
                                        <tr key={index} onClick={() => handleShow(hospital)}>
                                            <td> <b> {hospital.name}</b></td>
                                            <td>{hospital.location}</td>
                                            <td>{hospital.panel}</td>
                                            <td>{hospital.contact_number}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {selectedHospital && (
                <Modal show={selectedHospital} onHide={handleClose} id="modal" >
                    <Modal.Header closeButton style={{width:'500px !important'}}>
                        <Modal.Title><i class="fa-solid fa-hospital" ></i> <b>{selectedHospital.name}</b></Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{width:'500px !important'}}>
                        <p><b><i class="fa-solid fa-location-dot"style={{ fontSize: '15px'}}></i> Address: </b>{selectedHospital.location}</p>
                        <p><b><i class="fa-solid fa-hospital" style={{ fontSize: '15px'}}></i> Panels: </b>{selectedHospital.panel}</p>
                        <p><b><i class="fa-solid fa-phone" style={{ fontSize: '15px'}}></i> Contact No#: </b>{selectedHospital.contact_number}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose} style={{background:'orangered'}}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
}
export default Hospitals;