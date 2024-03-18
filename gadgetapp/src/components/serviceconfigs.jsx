import { useState, useEffect} from 'react';
import ConfigForm from './configform'
import Accordion from 'react-bootstrap/Accordion';
import { config_forms } from '../config.json';


async function fetchData(endpoint, setData, setLoading, setError) {
    try {
      setLoading(true);
      const response = await fetch(endpoint);
  
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

export default function ServiceConfigs({service_type}) {

    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    
    useEffect(() => {  
        fetchData(`/api/configs/${service_type}`, setData, setLoading, setError);
    }, [])

    function getDisplayNames(configs) {
      let displayNames = [];

      if (config_forms[configs['service_type']] !== undefined) {
        if (config_forms[configs['service_type']][configs['instance_name']] !== undefined) {
          if (config_forms[configs['service_type']][configs['instance_name']]['instance'] !== undefined) {
            if (config_forms[configs['service_type']][configs['instance_name']][configs['instance']]['configs'] !== undefined){
             displayNames = config_forms[configs['service_type']][configs['instance_name']][configs['instance']]['configs'];
            }
          } else {
            if (config_forms[configs['service_type']][configs['instance_name']]['configs'] !== undefined){
              displayNames = config_forms[configs['service_type']][configs['instance_name']]['configs'];
            }
          }
        } else {
          if (config_forms[configs['service_type']]['configs'] !== undefined){
            displayNames = config_forms[configs['service_type']]['configs'];
          }
        } 
      }

      return displayNames;
    }

    if (data !== null){
        return(
            <Accordion className='accordion' defaultActiveKey={0}>
            {
              data['data'].map((item, index) => {
                let displayNames = getDisplayNames(item)
                if (displayNames.length > 0){
                  return (
                    <Accordion.Item className='accordion-item' key={index} eventKey={index} >
                      <Accordion.Header>{item['service_type']}/{item['instance_name']}/{item['instance']}</Accordion.Header>
                      <Accordion.Body>
                        <ConfigForm configData={item} displayNames={displayNames}/>
                      </Accordion.Body>
                    </Accordion.Item>
                  );
                } else {
                  return <></>
                }
              })
            }
          </Accordion>
        );
    } else if (loading) {
      return <h1> Loading </h1>
    } else if (error) {
      return <h1> Error </h1>
    } else {
        return <></>
    }
}