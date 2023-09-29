import React, { Component } from "react";
import AlumnosService from "../services/alumnos.service";
import './board-admin.component.css';
// import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';
import Save from '@material-ui/icons/Save';
import Clear from '@material-ui/icons/Clear';
import Image from '@material-ui/icons/Image';
import { Dialog } from '@material-ui/core';
import ListadoPadresfamilia from './listadoPadrefamilia.admin.component';
import Select from "@material-ui/core/Select";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';	
import Button from "@mui/material/Button";
import Switch from '@mui/material/Switch';


export default class AddAlumno extends Component {

  constructor(props) {
    super(props);
    this.onChangeAlumno = this.onChangeAlumno.bind(this);
    this.onChangeCuenta = this.onChangeCuenta.bind(this);
    this.onChangePadreFamilia = this.onChangePadreFamilia.bind(this);
    this.onChangeTokenMovil = this.onChangeTokenMovil.bind(this);    

    this.onChangePromedio = this.onChangePromedio.bind(this);
    this.onChangeReprobadas = this.onChangeReprobadas.bind(this);
    this.imagenFile = this.imagenFile.bind(this);
    this.setSwitchStatus = this.setSwitchStatus.bind(this);
    this.setImgSrc = this.setImgSrc.bind(this);

    this.saveAlumno = this.saveAlumno.bind(this);
    this.newAlumno = this.newAlumno.bind(this);

    this.state = {
      id: null,
      alumno: "",
      cuenta: "", 
      padrefamilia: "",
      tokenmovil: "",
      grado: "",
      grupo: "",
      turno: "",
      promedio: "",
      reprobadas: "",
      fasedeedoneae: "",
      imagenPreview: "",
      

      submitted: false,
      modalBuscarFlag: false,
      switchStatus: false,
      imagenFlag: false,
      imagenFiles: '',
    };
  }

  onChangeAlumno(e) {
    this.setState({
      alumno: e.target.value
    });
  }

  onChangeCuenta(e) {
    this.setState({
      cuenta: e.target.value
    });
  }

  onChangePadreFamilia(e) {
    this.setState({
      padrefamilia: e.target.value
    });
   
  }

  onChangeTokenMovil(e) {
    this.setState({
      tokenmovil: e.target.value
    });
  }
  
  onChangePromedio(e) {
    this.setState({
      promedio: e.target.value
    });
  }
  
  onChangeReprobadas(e) {
    this.setState({
      reprobadas: e.target.value
    });
  }
  
  saveAlumno = async () => {

    const formData = new FormData();
    
    formData.append('alumno', this.state.alumno);
    formData.append('cuenta', this.state.cuenta);
    formData.append('padrefamilia', this.state.padrefamilia);
    formData.append('tokenmovil', this.state.tokenmovil);
    formData.append('grado', this.state.grado);
    formData.append('grupo', this.state.grupo);
    formData.append('turno', this.state.turno);
    formData.append('promedio', this.state.promedio);
    formData.append('reprobadas', this.state.reprobadas);
    formData.append('fasedeedoneae', this.state.fasedeedoneae);
    formData.append('imagen', this.state.imagenFiles);
   
    console.log(...formData);

    await AlumnosService.create(formData)
      .then(response => {
         this.setState({
         id: response.data.id,
         alumno: response.data.alumno,
         cuenta: response.data.cuenta,
         padrefamilia: response.data.padrefamilia,
         tokenmovil: response.data.tokenmovil,
         grado: response.data.grado,
         grupo: response.data.grupo,
         turno: response.data.turno,
         promedio: response.data.priomedio,
         reprobadas: response.data.reprobadas,
         fasedeedoneae: response.data.fasedeedoneae,
         imagenAlumno: response.data.imagenAlumno,

         submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newAlumno() {
    this.setState({
      id: null,
      alumno: "",
      cuenta: "",
      padrefamilia: "",
      tokenmovil: "",
      grado: "",
      grupo: "",
      turno: "",
      promedio: "",
      reprobadas: "",
      fasedeedoneae: "",
      imagenFiles: [],
      switchStatus: false,

      message:'',
      submitted: false,
      modalBuscarFlag: false,
    });
  }

  handleOpenModalBuscar = () => {
    this.setState({ modalBuscarFlag: true })
  }

  handlCloseModalBuscar = () => {
    this.setState({ modalBuscarFlag: false})
  }

  callbackFunction = (childData) => {
    this.setState({ message: childData.slice(1,2) });
    const nomTutor = childData.slice(1,2);
    this.setState({ padrefamilia: nomTutor[0] });
   
    this.setState({ modalBuscarFlag: false});
  }

  tituloModal = () => {
    return (
      <div >
          <div>

          </div>
      </div>
    )
  }

  textoModal = () => {
    return (
     
       <div id="background" style={{  height: '600px', backgroundImage: `url(${process.env.PUBLIC_URL + '/img/primary.png'})`, width: '100%' }}>
       <ListadoPadresfamilia parentCallbackPadrefamilia = {this.callbackFunction} />
       </div>    
    )
  }

  handleChangeSelectGrado = async (value) => {
    await this.setState({ grado: value })
    
  };

  handleChangeSelectGrupo = async (value) => {
    await this.setState({ grupo: value })
  };

  handleChangeSelectTurno = async (value) => {
    await this.setState({ turno: value })
    
  };

  handleChangeSelectReprobadas = async (value) => {
    await this.setState({ reprobadas: value })
    
  };

  handleChangeSelectNEAE = async (value) => {
    await this.setState({ fasedeedoneae: value })
    
  };

  imagenFile = async (e) => {
   
    const values = e.target.files[0];

    await this.setState({imagenFiles: values});

  }

  setSwitchStatus = async () => {

    await this.setState({ switchStatus: !this.state.switchStatus });

    this.setState({imagenFiles: []});
     
  }

  setImgSrc = () => {
    this.setState({imagenPreview: "Invalid Image Source"})
  }
  

  render() {

    const filesImage = this.state.imagenFiles.name;

    const label = { inputProps: { 'aria-label': 'Color switch demo' } };

    const switchStatusImage = this.state.switchStatus;   

    ///Here is the code for converting "image source" (url) to "Base64".///

    let url = 'https://www.shutterstock.com/image-vector/no-image-available-vector-hand-600w-745639717.jpg'
    const toDataURL = url => fetch(url)
          .then(response => response.blob())
          .then(blob => new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.onerror = reject
          reader.readAsDataURL(blob)
         }))
       
    ///Here is code for converting "Base64" to javascript "File Object".///
    
      function dataURLtoFile(dataurl, filename) {
         var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
         bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
         while(n--){
         u8arr[n] = bstr.charCodeAt(n);
         }
       return new File([u8arr], filename, {type:mime});
      }
    
    /// Calling both function ///
      
      if(this.state.imagenFiles.length === 0){
        toDataURL(url)
        .then(dataUrl => {
           var fileData = dataURLtoFile(dataUrl, "business_logo.jpg");
           this.setState({imagenFiles: fileData})
         })
      }

    return (
      
      <div className="submit-form" action="http://localhost:8080/api/alumnos" method="POST" encType="multipart/form-data">
        {this.state.submitted ? (
          <div>
            <h4>Se guardaron los datos correctamente!</h4>
            <button className="btn btn-success" onClick={this.newAlumno}>
              Agregar
            </button>
          </div>
        ) : (
          <div>
            <div className="selectContainer">
            <h4 style={{ marginLeft: '10px'}}>Agregar Alumno</h4>
            <div className="form-group" style={{ marginLeft: '10px'}}>
              <div style={{ marginLeft: '10px'}}>
              <label htmlFor="alumno">Nombre Alumno:</label>
              <input
                type="text"
                className="form-control w-50"
                id="alumno"
                required 
                value={this.state.alumno}
                onChange={this.onChangeAlumno}
                name="alumno"
              />
              </div>
              <div className="form-group w-30" style={{ width: '12%', marginLeft: '52%', marginTop: '-81px' }}>
              <label htmlFor="cuenta">Cuenta:</label>
              <input
                type="text"
                className="form-control w-30"
                id="cuenta"
                required
                value={this.state.cuenta}
                onChange={this.onChangeCuenta}
                name="cuenta"
              />
            </div>
            </div>
        
            
       
            <div className="form-group" style={{ marginLeft: '20px'}}>
              <label htmlFor="padrefamilia">Nombre Tutor:</label>
              <input
                type="text"
                className="form-control w-50"
                id="padrefamilia"
                required
                value={ this.state.padrefamilia}
                onChange={this.onChangePadreFamilia}
                name="padrefamilia"
              />
              <div className="form-group w-30" style={{ marginLeft: '560px', marginTop: '-40px' }}>
                      <Button
                          startIcon={<PersonIcon />}
                          variant="contained"
                          color="primary"
                          onClick={this.handleOpenModalBuscar}
                          size="large"
                          >                  
                          Buscar
                       </Button>
                      </div>
            </div>
            
            <div className="form-group" style={{ marginLeft: '20px'}}>
              <label htmlFor="tokenmovil">Token Movil:</label>
              <input
                type="text"
                className="form-control w-50"
                id="tokenmovil"
                required
                value={this.state.tokenmovil}
                onChange={this.onChangeTokenMovil}
                name="tokenmovil"
              />
            </div>

            <div className="form-group w-30"  style={{ marginTop: '-15px'}}>
            <FormControl variant="outlined"style={{ marginLeft: '20px', marginTop: '30px' }} >
            <InputLabel id="demo-simple-select-outlined-label" style={{  marginTop: '-10px',  width: '50%' }}>Grupo:</InputLabel>
                    <Select
                      native
                      style={{ height: '40px', width: '150%' }}
                      labelId="demo-simple-select-outlined-label"
                      value={this.state.grupo}
                      onChange={(e) => {this.handleChangeSelectGrupo(e.target.value);}}
                      inputProps={{
                      name: "age",
                      id: "demo-simple-select-outlined"
                      }}
                    >
                    <option aria-label="None" value="" />
                    <option value={"101"}>101</option>
                    <option value={"102"}>102</option>
                    <option value={"103"}>103</option>
                    <option value={"201"}>201</option>
                    <option value={"202"}>202</option>
                    <option value={"203"}>203</option>
                    <option value={"301"}>301</option>
                    <option value={"302"}>302</option>
                    <option value={"303"}>303</option>
                    <option value={"401"}>401</option>
                    <option value={"402"}>402</option>
                    <option value={"403"}>403</option>
                    </Select>            
                    </FormControl>

                    <FormControl variant="outlined" style={{ marginLeft: '60px', marginTop: '30px' }} >
                    <InputLabel id="demo-simple-select-outlined-label" style={{ marginTop: '-10px' }}>Turno:</InputLabel>
                    <Select
                      native
                      style={{height: '40px', width: '60%' }}
                      labelId="demo-simple-select-outlined-label"
                      value={this.state.turno}
                      onChange={(e) => {this.handleChangeSelectTurno(e.target.value);}}
                      inputProps={{
                      name: "age",
                      id: "demo-simple-select-outlined"
                      }}
                    >
                    <option aria-label="None" value="" />
                    <option value={"Matutino"}>Matutino</option>
                    <option value={"Vespertino"}>Vespertino</option>
                    <option value={"Semiescolarizada"}>Semiescolarizada</option>
                    </Select>            
                    </FormControl>

                    <FormControl variant="outlined" style={{ marginLeft: '-45px', marginTop: '30px' }}>
                    <InputLabel id="demo-simple-select-outlined-label" style={{  marginTop: '-10px' }}>Grado:</InputLabel>
                    <Select
                      native
                      style={{ height: '40px', width: '100%' }}
                      labelId="demo-simple-select-outlined-label"
                      value={this.state.grado}
                      onChange={(e) => {this.handleChangeSelectGrado(e.target.value);}}
                      inputProps={{
                      name: "age",
                      id: "demo-simple-select-outlined"
                      }}
                    >
                    <option aria-label="None" value="" />
                    <option value={"Primero"}>Primero</option>
                    <option value={"Segundo"}>Segundo</option>
                    <option value={"Tercero"}>Tercero</option>
                    </Select>            
                    </FormControl>
                    
                    <FormControl variant="outlined" style={{ marginLeft: '23px', marginTop: '30px' }}>
                    <InputLabel id="demo-simple-select-outlined-label" style={{  marginTop: '-10px',  width: '50%' }}>NEAE:</InputLabel>
                    <Select
                      native
                      style={{ height: '40px', width: '235%' }}
                      labelId="demo-simple-select-outlined-label"
                      value={this.state.fasedeedoneae}
                      onChange={(e) => {this.handleChangeSelectNEAE(e.target.value);}}
                      inputProps={{
                      name: "age",
                      id: "demo-simple-select-outlined"
                      }}
                    >
                    <option aria-label="None" value="" />
                    <option value={"2"}>2</option>
                    <option value={"3"}>3</option>
                    </Select>            
                    </FormControl>
            </div>

                  <div className="form-group w-30"  style={{ marginTop: '-25px'}}>
                    <FormControl variant="outlined" style={{ marginLeft: '20px', marginTop: '30px' }}>
                    <InputLabel id="demo-simple-select-outlined-label" style={{  marginTop: '-10px',  width: '30%' }}>Reprobadas:</InputLabel>
                    <Select
                      native
                      style={{ height: '40px', width: '280%' }}
                      labelId="demo-simple-select-outlined-label"
                      value={this.state.reprobadas}
                      onChange={(e) => {this.handleChangeSelectReprobadas(e.target.value);}}
                      inputProps={{
                      name: "age",
                      id: "demo-simple-select-outlined"
                      }}
                    >
                    <option aria-label="None" value="" />
                    <option value={"1"}>1</option>
                    <option value={"2"}>2</option>
                    <option value={"3"}>3</option>
                    <option value={"4"}>4</option>
                    <option value={"5"}>5</option>
                    </Select>            
                    </FormControl>


                    <div className="form-group w-30"  style={{  width: '185px', marginLeft: '19%', marginTop: '-40px' }}>
                    <input
                    type="text"
                    className="form-control w-30 "
                    id="promedio"
                    required
                    value={this.state.promedio}
                    onChange={this.onChangePromedio}
                    name="promedio"
                    placeholder="Promedio"
                    />
                    </div>
                  </div>


                  <div className="cargarImagen">
                  <label>Cargar Imagen</label>
                  </div>
                  <div className="form-group w-30" style={{ marginLeft: '83%', marginTop: '10px' }}>
                  <Switch {...label}
                    checked = {this.state.switchStatus}
                    disabled = { false }
                    onClick= { this.setSwitchStatus }
                    defaultChecked
                  />
                  </div> 


                  { switchStatusImage ?
                    <div className="vlImage2 w-20"> 
                    <div style={{ marginLeft: '-330px', marginTop: '150%' }} >
                    <section  >
                    <div className="containerImage sizeImageA" >
                      <img src={filesImage} onError = {() => this.setImgSrc("/business_logo.jpg")} alt='imagen' className="containerpicture"/>
                    </div>
                    </section>
                    </div>
                    <div  style={{ marginLeft: '95px', marginTop: '-45%' }} >
                    <input style={{ display: 'none' }}  
                    accept="image/*"
                    name="image"
                    id="contained-button-file"
                    display="none"
                    type="file"
                    onChange={this.imagenFile.bind()}
                    />
                    <label htmlFor="contained-button-file">
                      <Button
                        startIcon={<Image />}
                        variant="contained"
                        component="span"
                        color="primary"
                        size="large"
                        type="file"
                        >                  
                        Imagen
                      </Button>
                    </label>                  
                    </div>
  </div>:null
}
  </div>
                    <div className="buttonsGuardar" >
                    <Button onClick={this.newAlumno} 
                    startIcon={<Clear />} 
                    size="large" 
                    variant="contained" 
                    color="warning"
                    >
                    Clear All
                    </Button>
                    <Button 
                    onClick={this.saveAlumno} 
                    startIcon={<Save />} 
                    size="large" 
                    variant="contained" 
                    color="success" 
                    style={{ marginLeft: '20px'}}
                    >
                    Guardar
                    </Button>
                    </div>
</div>
    )}

{this.state.modalBuscarFlag ?
        <div>
         <Dialog style={{ marginTop: 50, height: '300px' }}
          open={this.state.modalBuscarFlag}
          onClose={this.handlCloseModalBuscar}
          fullWidth
          maxWidth="xl"
          scroll="disabled"
        >
      
        
            {<this.textoModal/>}
      
        
       
        </Dialog>
        </div>
      :null}     

      </div>
    );
  }
}
