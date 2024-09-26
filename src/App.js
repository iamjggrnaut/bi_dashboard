import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';

import data from './data.json'
import OverallReview from './containers/OverallReview';
import ReviewByEquipment from './containers/ReviewByEquipment';
import ReviewByEmployee from './containers/ReviewByEmployee';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function App() {

  const [tab, setTab] = useState('overall')

  const [map, setMap] = useState(false)

  const [activeObject, setActiveObject] = useState(null)

  const [coords, setCoords] = useState(null)

  const [filtered, setFiltered] = useState(data)

  useEffect(() => {
    if (activeObject) {
      let keys = Object.keys(data)
      let hash = {}
      keys.forEach(key => {
        hash[key] = data[key].filter(item => item.project_id === activeObject)
      })
      setFiltered(hash)

      let activeProject = data?.projects?.find(item => item.project_id === activeObject)
      if (activeProject) {
        setCoords(activeProject)
      }
    }
    else {
      setFiltered(data)
    }
  }, [activeObject])


  console.log(activeObject);


  const [modalShow, setModalShow] = useState(false);


  return (
    <div className="App">
      <Header />

      <div className="d-flex gap-2 justify-content-between contol-panel">
        <div className="container d-flex gap-2 justify-content-between">
          <div className="d-flex gap-2">
            <button className={tab === 'overall' ? 'prime-btn' : 'inactive'} onClick={() => setTab('overall')}>Общие данные</button>
            <button className={tab === 'equipment' ? 'prime-btn' : 'inactive'} onClick={() => setTab('equipment')}>Оборудование</button>
            <button className={tab === 'personnel' ? 'prime-btn' : 'inactive'} onClick={() => setTab('personnel')}>Персонал</button>
          </div>
          <div className="d-flex gap-2">
            <select name="" id="" className='selector' onChange={e => setActiveObject(Number(e.target.value))}>
              <option value={Number(0)}>Все проекты</option>
              {
                data && data.projects && data.projects.map((item) => (
                  <option key={item.project_id} value={item.project_id}>{item.project_name}</option>
                ))
              }
            </select>
            <button className={modalShow ? 'prime-btn' : "inactive"} onClick={() => { setMap(!map); setModalShow(true) }}>Карта</button>
          </div>
        </div>
      </div>

      <div className="container">
        {
          tab === 'overall' ?
            <OverallReview
              filtered={filtered}
              data={filtered}
              activeObject={activeObject}
              title={'План работ'}
              stages={data.project_stages}
              projects={data.projects}
            />
            :
            tab === 'equipment' ?
              <ReviewByEquipment
                filtered={filtered}
                data={filtered}
                activeObject={activeObject}
                title={'План работ'}
                stages={data.project_stages}
                projects={data.projects}
              />
              :
              <div>
                <ReviewByEmployee
                  filtered={filtered}
                  data={filtered}
                  activeObject={activeObject}
                  title={'План работ'}
                  stages={data.project_stages}
                  projects={data.projects}
                />
              </div>
        }

      </div>

      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Расположение объектов
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            !coords ?
              <h1>Выберите объект из списка</h1>
              :
              <MapContainer center={coords ? [coords?.coordinates?.latitude, coords?.coordinates?.longitude,] : [51.505, -0.09]} zoom={8} scrollWheelZoom={false}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={coords ? [coords?.coordinates?.latitude, coords?.coordinates?.longitude] : [51.505, -0.09]}>
                  {/* <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup> */}
                </Marker>
              </MapContainer>
          }
        </Modal.Body>
        <Modal.Footer>
          <button className='prime-btn' onClick={() => { setModalShow(!modalShow); setMap(!map) }}>Закрыть</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
