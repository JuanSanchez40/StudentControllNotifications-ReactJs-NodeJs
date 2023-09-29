import React, { Component } from "react";
import PropTypes from 'prop-types';
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import './board-admin.component.css';
import { TextField, Dialog } from '@material-ui/core';
import Button from "@mui/material/Button";
// import Button from '@material-ui/core/Button';
import Select from "@material-ui/core/Select";
import PersonIcon from '@material-ui/icons/Person';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ListadoAdmin from './listado.admin.component';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import ListadoPadresfamilia from './listadoPadrefamilia.admin.component';
import { Edit, Send } from "@material-ui/icons";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import NotificationService from "../services/notificacionAlumnos.service";

import Clear from '@material-ui/icons/Clear';




export class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      singleFlag: false,
      topicFlag: false,
      topicTutoresFlag: false,
      content: "",
      name: "age",
      margenBoton: '',
      age: "",
      modalBuscarFlag: false,
      modalBuscarFlagTutor: false,
      dialogoTitulo: '',
      dialogoMensaje: '',
      radioSelect: 'alumno',
      alumnoCount: '',
      message:'',
      addAlumnoFlag: false,
      addTutorFlag: false,
      disabledEnviarButton: true,
      turno: '',
      textAreaValue: '',
      textAreaValueTitle: '',
      titleFlag: false,
      textMessage: false,
      dialogOn: false,
      addsomething: false,
      

    };
    
  }

  componentDidMount = async () =>  {
    await UserService.getAdminBoard().then(
      response => {
        this.setState({
          content: response.data
        });
        
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
        
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  handleChangeSelect = async (value) => {
    await this.setState({ selectTypeMessage: value })

    if( value === '10' ){
      this.setState({ singleFlag: true, topicFlag: false, topicTutoresFlag: false, turno: '' });
    }
    else if( value === '20' ){
      this.setState({ topicFlag: true, topicTutoresFlag: false, singleFlag: false });
      this.setState({ addAlumnoFlag: false});
      this.setState({ addTutorFlag: false});
    }else{
      this.setState({selectTypeMessage: '',topicFlag: false,singleFlag: false});
    }
  };

  handleChangesTitle(e) {
    this.setState({ textAreaValueTitle: e.target.value });
    console.log(this.state.message.length);
      
    if(e.target.value.length > 3 && this.state.textAreaValue.length > 3  && this.state.message.length > 1){
      this.setState({ disabledEnviarButton: false});
    } else {
      this.setState({ disabledEnviarButton: true });
    }
     if(e.target.value.length < 3 && this.state.textAreaValue.length > 0 ) {
      this.setState({ disabledEnviarButton: true });
    }
  
      console.log(this.state.textAreaValueTitle);
  }

  handleChange(e) {
    this.setState({ textAreaValue: e.target.value });
    console.log(this.state.message.length);
    if((e.target.value.length > 3 && this.state.textAreaValue.length > 3 && this.state.message.length > 1) && (this.state.addAlumnoFlag === true || this.state.addTutorFlag === true) ){
      this.setState({ disabledEnviarButton: false});
    } 
    else {
      this.setState({ disabledEnviarButton: true });
    }

    if(e.target.value.length < 3 && this.state.textAreaValueTitle.length > 0 ) {
      this.setState({ disabledEnviarButton: true });
    }
  
  }

  handleChanges = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleOpenModalBuscar = () => {
    if(this.state.radioSelect === 'alumno'){
      this.setState({ modalBuscarFlag: true });
      this.setState({ addTutorFlag: false});
    }else{
      this.setState({ modalBuscarFlagTutor: true });
      this.setState({ addAlumnoFlag: false});
    }
  }

  handlCloseModalBuscar = () => {
    this.setState({ modalBuscarFlag: false})
  }

  
  handlCloseModalBuscarTutor = () => {
    this.setState({ modalBuscarFlagTutor: false})
  }

  tituloModal = () => {
    return (
      <div >
          <div>

          </div>
      </div>
    )
  }

  callbackFunctionAlumno = (childData) => {
    this.setState({ message: childData });
    this.setState({ modalBuscarFlag: false});
    this.setState({ addAlumnoFlag: true});
    
  }

  callbackFunctionTutor = (childData) => {
    this.setState({ message: childData });
    this.setState({ modalBuscarFlagTutor: false});
    this.setState({ addTutorFlag: true});
   
  }

  textoModal = () => {
    return (
     
       <div id="background" style={{  height: '600px', backgroundImage: `url(${process.env.PUBLIC_URL + '/img/primary.png'})`, width: '100%' }}>
       <ListadoAdmin parentCallback = {this.callbackFunctionAlumno} />  
       </div>     
    )
  }

  textoModalTutor = () => {
    return (
     
       <div id="background" style={{  height: '600px', backgroundImage: `url(${process.env.PUBLIC_URL + '/img/primary.png'})`, width: '100%' }}>
       <ListadoPadresfamilia parentCallbackPadrefamilia = {this.callbackFunctionTutor} />      
       </div>      
    )
  }

  handleRadioChange = e => {
    const { value } = e.target;

    this.setState({ radioSelect: value });
  
    if(this.state.radioSelect === 'alumno'){
      this.setState({ addAlumnoFlag: false});
      
    }else{
      this.setState({ addTutorFlag: false});
      
    }
  };

  handleChangeSelectTurno = async (value) => {
    await this.setState({ turno: value })
   
  };

  onChange = (event) => {
  
    this.setState({ selectedValue: event.target.value });
  };

  handleClear = () => {
    this.setState({ addAlumnoFlag: false, addTutorFlag: false});
    this.setState({ message: []});
    this.setState({ disabledEnviarButton: true});
  };

  handleOnSubmit(){

    if(this.state.singleFlag == true && this.state.topicFlag == false){ 

      const alumno = this.state.message.slice(1,2);
      const cuentaAlumno = this.state.message.slice(2,3);
      const cuentaAlumnoInt = parseInt(this.state.message.slice(2,3));
     // const titulo = this.state.textAreaValueTitle;
      const values = this.state.textAreaValue;
     
      var data = {   
        chatId: cuentaAlumnoInt,
        title: alumno[0],
        value: values,
      //  imageUrl: 
        type: "CHAT",
        email: cuentaAlumno[0],
        
      };
      console.log(data);
      NotificationService.create(data)
         .then(response => {
           this.setState({          
            chatId: response.data.chatId,
            title: response.data.title,
            value: response.data.value,
          //  imageUrl: response.data.value,
            type: response.data.type,
            email: response.data.email,
            
           });
           console.log(response.data);
         })
         .catch(e => {
           console.log(e);
         });
      this.setState({ dialogOn: false });
    } else if (this.state.topicFlag == true && this.state.singleFlag == false) {

      const titulo = this.state.textAreaValueTitle
      const values = this.state.textAreaValue;
      var datas = {         
        title: titulo,
        body: values,
        imageUrl: ''
      };
      console.log(datas);
      NotificationService.create(datas)
         .then(response => {
           this.setState({          
            title: response.datas.title,
            body: response.datas.body,
            imageUrl: response.datas.body,
            
           });
           console.log(response.datas);
         })
         .catch(e => {
           console.log(e);
         });
         this.setState({ dialogOn: false });
    }
  } 

  abrirDialog = () => {
    this.setState({ dialogOn: true });
  }
  cerrarDialog = () => {
    this.setState({ dialogOn: false });
  }
 
  textoModalEnvio = () => {
    return (
     
       <div id="background" style={{  height: '200px', backgroundImage: `url(${process.env.PUBLIC_URL + '/img/primary.png'})`, width: '100%' }}>
    
       <div style={{ marginLeft: '20px', marginTop: 30,  margin: 20 }}>
       <div className="logoContainer" href="/">
          <img src="/logo_UAS.png" className="img-responsiveModal"  alt=""/>
        </div>
            <div className="enviarMensaje"  >
              Estas por enviar un mensaje: <span className="padrefamiliaName">{this.state.lastClicked} </span>     
            </div>              
            </div> 
            <div style={{   marginTop: '90px', marginLeft: '49%' }}>
                    <Button onClick={this.cerrarDialog} 
                    startIcon={<Clear />} 
                    size="large" 
                    variant="contained" 
                    color="error"
                    >
                    Cerrar
                    </Button>
                    <Button 
                    onClick={()=>this.handleOnSubmit()} 
                    startIcon={<Send />} 
                    size="large" 
                    variant="contained" 
                    color="success" 
                    style={{ marginLeft: '20px'}}
                    >
                    Enviar
                    </Button>
                    </div>
       </div>      
    )
  }

  activarBoton = async() =>{
  await this.setState({dispatchEvent: false});
  }

  render() {
    const contenido = this.state.content;

    const modalBuscar = this.state.modalBuscarFlag;
    const modalBuscarTutor = this.state.modalBuscarFlagTutor;
    const addAlumno = this.state.addAlumnoFlag;
    const addTutor = this.state.addTutorFlag;
    const alumno = this.state.message.slice(1,2);
    const tutor = this.state.message.slice(3,4);
    const grupo = this.state.message.slice(6,7);
    const promedio = this.state.message.slice(8,9);
    const imagen = this.state.message.slice(11,12)
    const imagenTutor = this.state.message.slice(4,5);
    
    const { singleFlag, topicFlag } = this.state;

    return (
      <div className="container">
        { contenido === 'No token provided!' ?
          <header className="jumbotron">
         <h3>{this.state.content}</h3>
         </header> 
        :
        <div>
        <Paper style={{height: 450, border: '2px solid blue', borderRadius: '8px' }}
        sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 1000,
        flexGrow: 1,
        backgroundColor: (theme) =>
        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        }}
        >
        <Grid container xs={12} spacing={2} >
            <Grid item xs={13} sm container >
                <Grid item xs={12} container direction="column" spacing={2}>
                  <Grid item xs>
                  <div className="form-group w-30" style={{ width: '50%', marginTop: '-10px', }}>
                  <Typography gutterBottom variant="subtitle1" component="div">Elegir tipo de mensaje:</Typography>
            <FormControl variant="outlined" style={{ marginTop: 10 }}>
            <InputLabel id="demo-simple-select-outlined-label" style={{  marginTop: '-10px',  width: '50%' }}>Mensaje:</InputLabel>
                    <Select
                      native
                      style={{ height: '40px', width: '100%' }}
                      labelId="demo-simple-select-outlined-label"
                      value={this.state.selectTypeMessage}
                      onChange={(e) => {this.handleChangeSelect(e.target.value);}}
                      inputProps={{
                      name: "age",
                      id: "demo-simple-select-outlined"
                      }}
                    >
                    <option aria-label="None" value="" />
                    <option value={'10'}>Alumno o Tutor</option>
                    <option value={'20'}>General</option>
                    {/* <option value={'20'}>Grupal Alumnos</option>
                    <option value={'30'}>Grupal Tutores</option> */}
                    </Select>      
                    </FormControl> 
            </div>
            {topicFlag ?
            <div>
                    <div style={{  marginTop: 30 }}>
                    <Typography gutterBottom variant="subtitle1" component="div">
                    Título del mensaje:
                    </Typography>
                  </div>
                  <div className="titleText"  >
                        <TextField
                          className="titleArea"
                          color="primary"
                          variant="outlined" 
                          label="Título" 
                          rowsMax={1} 
                          rows={1}
                          maxLength={3}
                          value={this.state.textAreaValueTitle}
                          onChange={(e) =>  this.handleChangesTitle(e)}
                        />
                  </div>
            </div>:null} 

            {singleFlag || topicFlag ?
            <div>
                  <div style={{ marginTop: 30 }}>
                    <Typography gutterBottom variant="subtitle1" component="div">
                    Escribir mensaje:
                    </Typography>
                  </div>
                  <div className="text2"  >
                        <TextField
                          className="textArea2"
                          color="primary"
                          variant="outlined" 
                          label="Mensaje" 
                          multiline
                          rowsMax={5} 
                          rows={5}
                          maxLength={3}
                          value={this.state.textAreaValue}
                          onChange={(e) => this.handleChange(e)}
                        />
                  </div>
           
             </div> :null}
                  </Grid>                      
                </Grid>                
            </Grid>            
        </Grid>
        {singleFlag || topicFlag ?
                  <div className="buttonSend">
                        <Button
                        startIcon={<Send />}
                          variant="contained"
                          color="primary"
                          onClick={()=>this.abrirDialog()}
                          size="large"
                          disabled={this.state.disabledEnviarButton}>
                          Enviar
                        </Button>
                  </div>
        :null}          
        </Paper>
        {singleFlag ?
        
                  <div style={{ marginTop: 25, marginBottom: '30px' }}>
                      <Paper style={{height: 300, border: '2px solid blue', borderRadius: '8px', marginTop: 25 }}
                      sx={{
                      p: 2,
                      margin: 'auto',
                      maxWidth: 1000,
                      flexGrow: 1,
                      backgroundColor: (theme) =>
                      theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                      }}
                      >
                      <Grid container xs={12} spacing={2} style={{height: 250 }}>
                      <Grid item xs={12} sm container>
                      <Grid item xs={12} container direction="column" spacing={2}>
                      <Grid item xs >
                       
                      <Typography gutterBottom variant="subtitle1" component="div" style={{ marginTop: 10 }}>
                            Agregar:
                      </Typography>
                      <RadioGroup aria-label="quiz" name="quiz" value={this.state.radioSelect} onChange={this.handleRadioChange}>
                        <FormControlLabel value="alumno" control={<Radio />} label="Alumno" />
                        <FormControlLabel value="tutor" control={<Radio />} label="Tutor" style={{ marginLeft: '10%', marginTop: '-50px' }}/>
                      </RadioGroup>
                      <div className="buttonBuscar">
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
                   
                      <div className="col-md-6" style={{  marginLeft: '10%', marginTop: '-40px'}}>
          {addAlumno ? (
          <div className="vl">
            <div style={{ marginLeft: '10%' }}>
              <h4>Alumno</h4>
              <div style={{ width: '160%' }}>
                <label style={{ marginBottom: '01px'}}>
                  <strong>Nombre:</strong>
                </label>{" "}
                {alumno}
              </div>
              <div style={{ width: '160%' }}>
                <label style={{ marginBottom: '01px' }}>
                  <strong>Tutor:</strong>
                </label>{" "}
                {tutor}
              </div>
              <div >
                <label style={{ marginBottom: '01px' }}>
                  <strong>Grupo:</strong>
                </label>{" "}
                {grupo}
              </div>
              <div >
                <label style={{ marginBottom: '01px' }}>
                  <strong>Promedio:</strong>
                </label>{" "}
                {promedio}
              </div>
            <div className="vlImage">
              <div  >
              <section>
                    <div className="containerImage sizeImageA" >
                    <img src={`http://localhost:8080/${imagen}`} alt="meme" className="containerpicture" />
                    </div>
              </section>
              </div>
             
              <div style={{  width:'70%', marginTop: '30%', marginLeft: '115%'}}>
                      <Button
                          startIcon={<Edit />}
                          variant="contained"
                          color="secondary"
                          onClick={this.handleOpenModalBuscar}
                          size="large"
                          >                  
                          Editar
                       </Button>
                      </div>             
                      <div className="buttonClear">
                      <Button
                          startIcon={<Clear />}
                          variant="contained"
                          color="error"
                          onClick={this.handleClear}
                          size="large"
                          >                  
                          Clear
                       </Button>
                      </div>   
            </div>                  
            </div>
          </div>
          ) : (
            null
          )}
          {addTutor ? (
            <div class="vlTutor" >
            <div style={{ marginLeft: '10%' }} >
              <h4>Tutor</h4>
              <div style={{ width: '150%' }}>
                <label style={{ marginBottom: '05px' }}>
                  <strong>Nombre tutor:</strong>
                </label>{" "}
                {alumno}
              </div>
              <div style={{ width: '150%' }}>
                <label style={{ marginBottom: '05px' }}>
                  <strong>Alumno:</strong>
                </label>{" "}
                {tutor}
              </div>
              <div className="vlImageTutor">
              <div  >
              <section>
                    <div className="containerImageTutor sizeImageT">
                    <img src={`http://localhost:8080/${imagenTutor}`} alt="meme" class="containerpictureTutor" />
                    </div>
              </section>
              </div>
             
              <div style={{  width:'70%', marginTop: '30%', marginLeft: '115%'}}>
                      <Button
                          startIcon={<Edit />}
                          variant="contained"
                          color="secondary"
                          onClick={this.handleOpenModalBuscar}
                          size="large"
                          >                  
                          Editar
                       </Button>
                      </div>
                      <div className="buttonClear">
                      <Button
                          startIcon={<Clear />}
                          variant="contained"
                          color="error"
                          onClick={this.handleClear}
                          size="large"
                          >                  
                          Clear
                       </Button>
                      </div>
            </div> 
              </div>
            </div>  
          ) : (
            null
          )}
        </div>
        
                      </Grid>                      
                      </Grid>               
                      </Grid>            
                      </Grid>                      
                      </Paper>                  
                  </div>                    
        :null}        
        </div>        
      }
      {modalBuscar ?
        <div>
         <Dialog style={{ marginTop: 50, height: '300px' }}
          open={modalBuscar}
          onClose={this.handlCloseModalBuscar}
          fullWidth
          maxWidth="xl"
          scroll="disabled"
        >  
            {<this.textoModal/>}
        </Dialog>
        </div>
      :null}     
      {modalBuscarTutor ?
        <div>
         <Dialog style={{ marginTop: 50, height: '300px' }}
          open={modalBuscarTutor}
          onClose={this.handlCloseModalBuscarTutor} 
          fullWidth
          maxWidth="xl"
          scroll="disabled"
        >  
            {<this.textoModalTutor/>}
        </Dialog>
        </div>
      :null}     

{this.state.dialogOn ?
        <div>
         <Dialog style={{ marginLeft:'27%',  marginTop: -30, height: '100px' }}
          open={this.state.dialogOn}
          onClose={this.cerrarDialog}
          fullWidth
          maxWidth="sm"
          scroll="disabled"
        >  
            {<this.textoModalEnvio/>}
        </Dialog>
        </div>
      :null}     

    </div>
    );
  }
}

BoardAdmin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (BoardAdmin);