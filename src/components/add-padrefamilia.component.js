import React, { Component } from "react";
import PadrefamiliaService from "../services/padrefamilia.service";
import './board-admin.component.css';
import ListadoAdmin from './listado.admin.component';
import PersonIcon from '@material-ui/icons/Person';
import { Dialog } from '@material-ui/core';
import Save from '@material-ui/icons/Save';
import Clear from '@material-ui/icons/Clear';
import Button from "@mui/material/Button";
import Switch from '@mui/material/Switch';
import Image from '@material-ui/icons/Image';

export default class AddPadrefamilia extends Component {
  constructor(props) {
    super(props);
    this.onChangePadrefamilia = this.onChangePadrefamilia.bind(this);
    this.onChangeTokenmovilpadrefamilia = this.onChangeTokenmovilpadrefamilia.bind(this);
    this.onChangeAlumno = this.onChangeAlumno.bind(this);

    this.savePadrefamilia = this.savePadrefamilia.bind(this);
    this.newPadrefamilia = this.newPadrefamilia.bind(this);

    this.state = {
      id: null,
      nombre: "",
      tokenmovilpadrefamilia: "", 
      alumno: "",
      alumnos: "",
      message:'',
      modalBuscarFlag: false,
      dialogoTitulo: '',
      dialogoMensaje: '',

      submitted: false,
      switchStatus: false,
      imagenFlag: false,
      imagenFiles: '',
    };
  }

  onChangePadrefamilia(e) {
    this.setState({
      nombre: e.target.value
    });
  }

  onChangeTokenmovilpadrefamilia(e) {
    this.setState({
      tokenmovilpadrefamilia: e.target.value
    });
  }

  onChangeAlumno(e) {
    this.setState({
      alumno: e.target.value
    });
    console.log(this.state.alumno);
  }

  savePadrefamilia = async () => {

    const formData = new FormData();
    
    formData.append('nombre', this.state.nombre);
    formData.append('tokenmovilpadrefamilia', this.state.tokenmovilpadrefamilia);
    formData.append('alumno', this.state.alumno);
    formData.append('imagen', this.state.imagenFiles);
   
    console.log(...formData);

    await PadrefamiliaService.create(formData)
      .then(response => {
        this.setState({
          id: response.data.id,
          nombre: response.data.nombre,
          tokenmovilpadrefamilia: response.data.tokenmovilpadrefamilia,
          alumno: response.data.alumno,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newPadrefamilia() {
    this.setState({
      id: null,
      nombre: "",
      tokenmovilpadrefamilia: "",
      alumno: "",
      switchStatus: false,

      submitted: false,
    });
  }

  handleOpenModalBuscar = () => {
    this.setState({ modalBuscarFlag: true })
  }

  handlCloseModalBuscar = () => {
    this.setState({ modalBuscarFlag: false})
  }

  tituloModal = () => {
    return (
      <div >
          <div>

          </div>
      </div>
    )
  }

  callbackFunction = (childData) => {
    this.setState({ message: childData.slice(1,2) });
    const nomAlumno = childData.slice(1,2);
    this.setState({ alumno: nomAlumno[0] });
    this.setState({ modalBuscarFlag: false});
  }

  textoModal = () => {
    return (
     
       <div id="background" style={{  height: '600px', backgroundImage: `url(${process.env.PUBLIC_URL + '/img/primary.png'})`, width: '100%' }}>
       <ListadoAdmin parentCallback = {this.callbackFunction} />
       </div>      
    )
  }

  imagenFile = async (e) => {
   
    const values = e.target.files[0];

    await this.setState({imagenFiles: values});

  }

  setSwitchStatus = async () => {

    await this.setState({ switchStatus: !this.state.switchStatus });

    this.setState({imagenFiles: []});
     
  }

  render() {

    const label = { inputProps: { 'aria-label': 'Color switch demo' } };

    const modalBuscar = this.state.modalBuscarFlag;
    console.log(modalBuscar);

    const filesImage = this.state.imagenFiles.name;

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
      
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Se guardaron los datos correctamente!</h4>
            <button className="btn btn-success" onClick={this.newPadrefamilia}>
              Agregar
            </button>
          </div>
        ) : (
          <div>
            <div className="selectContainer"> 
            <h4 style={{ marginLeft: '10px'}}>Agregar padres de familia</h4>
            <div className="form-group" style={{ marginLeft: '10px'}}>

            
              <label htmlFor="padrefamilia">Nombre Tutor</label>
              <input
                type="text"
                className="form-control w-50"
                id="padrefamilia"
                required
                value={this.state.nombre}
                onChange={this.onChangePadrefamilia}
                name="padrefamilia"
              />
            </div>

            <div className="form-group" style={{ marginLeft: '10px'}}>
              <label htmlFor="tokenmovilpadrefamilia">Token Movil</label>
              <input
                type="text"
                className="form-control w-50"
                id="tokenmovilpadrefamilia"
                required
                value={this.state.tokenmovilpadrefamilia}
                onChange={this.onChangeTokenmovilpadrefamilia}
                name="tokenmovilpadrefamilia"
              />
            </div>

            <div className="form-group" style={{ marginLeft: '10px'}}>
              <label htmlFor="alumno">Nombre Alumno</label>
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
            <div style={{ marginLeft: '52%', marginTop: '-57px' }}>
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

            <div className="cargarImagen2">
                  <label>Cargar Imagen</label>
                  </div>
                  <div className="form-group w-30" style={{ marginLeft: '82%', marginTop: '-03px' }}>
                  <Switch {...label}
                    checked = {this.state.switchStatus}
                    disabled = { false }
                    onClick= { this.setSwitchStatus }
                    defaultChecked
                  />
                  </div> 

            
                  { switchStatusImage ?
                    <div className="vlImage3"> 
                    <div style={{ marginLeft: '-340px', marginTop: '150%' }} >
                    <section  >
                    <div className="containerImage2 sizeImageB" >
                      <img src={filesImage} onError = {() => this.setImgSrc("/business_logo.jpg")} alt='imagen' className="containerpicture"/>
                    </div>
                    </section>
                    </div>
                    <div  style={{ marginLeft: '95px', marginTop: '-50%' }} >
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
                    <Button onClick={this.newPadrefamilia} 
                    startIcon={<Clear />} 
                    size="large" 
                    variant="contained" 
                    color="warning"
                    >
                    Clear All
                    </Button>
                    <Button 
                    onClick={this.savePadrefamilia} 
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
