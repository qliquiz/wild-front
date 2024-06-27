import React, { useState } from 'react';
import styles from "./index.module.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Input from '@mui/material/Input';
import Grid from '@mui/material/Grid';
import WorldMap from "../WorldMap";
import Select from 'react-select';
import { Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import FileUploadIcon from '@mui/icons-material/FileUpload';

function CreateForm() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [images, setImages] = useState([]); // Массив для хранения файлов
    const [imagePreviews, setImagePreviews] = useState([]);
    const FullWidthButton = styled(Button)(({ theme }) => ({ width: '100%' }))

    const handleCategoryChange = (event) => {
      setCategory(event.target.value);
    };

    const handleImageChange = (event) => {
      const files = event.target.files;
      const newImages = [...images];
      const newPreviews = [...imagePreviews];
  
      for (let i = 0; i < files.length; i++) {
        newImages.push(files[i]);
  
        const reader = new FileReader();
        reader.onload = (e) => {
          newPreviews.push(e.target.result);
          setImagePreviews(newPreviews);
        };
        reader.readAsDataURL(files[i]);
      }
  
      setImages(newImages);
    };

    const InputFile = styled(Input)(({ theme }) => ({
      display: 'none',
    }));

    
    const handleSubmit = (event) => {
      event.preventDefault();
      // Отправка формы на сервер
      console.log('Имя:', name);
     
    };
  
    

    return (
      <div className={styles.form_container}>
        <Typography fontWeight={600} variant="h4">Создание места</Typography>
        <Typography marginTop="10px" fontWeight={500} variant="h5">Заполните данные о месте:</Typography>

        <TextField 
          label="Название" 
          variant="outlined" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          margin="normal" 
          fullWidth
        />

        <TextField 
          label="Описание" 
          variant="outlined" 
          value={description}
          onChange={(e) => setDescription(e.target.value)} 
          margin="normal" 

          fullWidth
        />
        <Select
          placeholder="Категория"
          styles={{
            menu: (provided) => ({
              ...provided,
              zIndex: 100099, //  Установите высокий z-index
              height: 100,
              fontFamily: '"Roboto", sans-serif',
              fontSize: '1rem'
            }),
            control: (provided) => ({
              ...provided,
              marginTop: '15px',
              height: '56px',  // Установите максимальную высоту
              paddingLeft: '4px',
              fontFamily: '"Roboto", sans-serif',
              fontSize: '1rem'
            }),
          }}
          options={[
            { value: 1, label: 'Кэмпинг' },
            { value: 2, label: 'Красивое место' },
            { value: 3, label: 'Пляж' },
          ]}
          defaultValue={null} // Установите значение по умолчанию как null
        />
   

        <Grid container spacing={2} mt={2} marginBottom={1}> {/* Используем Grid для выравнивания картинок */}
          <Grid item xs={12}> {/* Кнопка на всю ширину */}
            <label htmlFor="contained-button-file">
              <InputFile id="contained-button-file" type="file" multiple onChange={handleImageChange} />
              <FullWidthButton variant="contained" component="span"endIcon={<FileUploadIcon />}>
                Загрузить файлы
              </FullWidthButton>
            </label>
          </Grid>
          {imagePreviews.map((preview, index) => (
            <Grid item xs={3} key={index}> {/* Каждая картинка в Grid item */}
              <img src={preview} alt="Preview" width="100%" height="auto" />
            </Grid>
          ))}
        </Grid>

        <Typography marginTop="50px" marginBottom="15px" fontWeight={500} variant="h5">Выберите местоположение на карте:</Typography>

        <WorldMap width={"100%"} height={400} isCreate={true}/>
        <Button variant="contained" type="submit" size="large" endIcon={<SendIcon />}>Отправить</Button>
      </div>
    );
}


export default CreateForm;