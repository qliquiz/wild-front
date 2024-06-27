import React from 'react';
import styles from "./index.module.css";
import Button from '@mui/material/Button';
import WorldMap from "../WorldMap";
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
function MainForm() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        navigate("/create");
      };

    return ( 
        <div className={styles.form_container}>
            <Typography fontWeight={600} variant="h4" marginBottom="15px">Места для отдыха на Байкале</Typography>
            <WorldMap width={"100%"} height={400}/>
            
            <Button variant="contained" type="submit" onClick={handleSubmit}>Создать своё место</Button>
        </div>
     );
}

export default MainForm;