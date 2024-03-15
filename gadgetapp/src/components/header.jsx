import './css/header.css';
import LMILogo from '../images/lmi_technologies_RGB.png';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

import Col from 'react-bootstrap/Col';

export default function Header({ app_name, button_info}) {
    const navigate = useNavigate();

    return (
        <>
            <Col sm={2}>
                <img className='img_logo' src={LMILogo} alt="LMI Technologies Logo" />
            </Col>
            <Col sm={8} className='app-name'>
               <h2>{app_name}</h2>
            </Col>
            <Col sm={2} className='button-col' >
                <Button variant="primary" size="lg" onClick={() => navigate(`/${button_info}`)}> 
                    {button_info[0].toUpperCase()+button_info.substring(1)} Page
                </Button>        
            </Col>
        </>
    );
}
