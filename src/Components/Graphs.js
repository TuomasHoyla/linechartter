import React, {useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import MyChart from './MyChart'
import {Container, Row, Col} from 'react-bootstrap'



const Graphs = ({}) => {

    const [selectedNode, selectNode] = useState(null);
    const [activities, setActivities] = useState([]);
    const [isLoading, setLoading] = useState(true)
    const [hasError, setError] = useState(false)
   
    useEffect(() => {
        fetch('/api')
          .then(res => res.json())
          .then(response => {
              setActivities(response)
              setLoading(false)
          })
          .catch(error => {
              console.log(error)
              setError(true)}
              )
      }, [])

    return (<div>
        
        <Container fluid>
            <Row>
                <Col><h2>Test Graph</h2></Col>
                </Row>
            <Row>
                <Col>
                    <MyChart />
                </Col>
        </Row>
        <Row>
                <Col>
                </Col>
        </Row>
        </Container>
  
       </div>
    )
}

  Graphs.propTypes = {
    tree: PropTypes.array.isRequired,
}

export default Graphs