import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';
import './board-admin.component.css';
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import PadrefamiliaService from "../services/padrefamilia.service";


export default class ListadoPadresfamilia extends Component {
  constructor(props) {
    super(props);
  
    this.retrievePadresfamilia = this.retrievePadresfamilia.bind(this);
   

    this.state = {
      lastClicked: "",
      padresfamilia: [],
      addTutor: [],
    };
  }

  componentDidMount() {
    this.retrievePadresfamilia();
  }

  retrievePadresfamilia() {
    PadrefamiliaService.getAll()
      .then(response => {
        this.setState({
          padresfamilia: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  sendData = () => {
    console.log(this.state.lastClicked);
    this.props.parentCallbackPadrefamilia(this.state.addTutor);
    console.log(this.state.addTutor);
  }

  render() {
  const { padresfamilia }= this.state
  const columns = [
    "id",
    {  name: "nombre", label:"Nombre", options: { filterOptions: { fullWidth: true } } },
    {  name: "tokenmovilpadrefamilia", label: "Token móvil" },
    {  name: "alumno", label: "Alumno"},
    {  name: "imagen"}
  ];

  const muiCache = createCache({
    key: "mui-datatables",
    prepend: true
  });

  const options = {
      filter: true,
      filterType: "dropdown",
      responsive: "scroll",
      // onCellClick: (_, { rowIndex }) => {
        
      //   this.setState({ lastClicked: data[rowIndex][1] });
      // },
      selectableRowsOnClick: true,
      selectableRows: 'single',
      onRowClick: () => {  
        console.log("click!");
     },
     setRowProps: (rowData, rowState) => ({
  
      onMouseUp: () => {
       
         //console.log(rowData, rowState);
         console.log("mouse up!");
  
        const dataName = rowData.map((item, index) => {
          return item;
        });
      
        const mySelectedName = dataName;
  
        
        console.log(mySelectedName);
        console.log(mySelectedName.slice(1,2));

        const nombre = mySelectedName.slice(1,2);
        const tutorData = mySelectedName;
        this.setState({ lastClicked: nombre });
        this.setState({ addTutor: tutorData });
      }
     })
  };

  return (
    
    
  <CacheProvider   value={muiCache} > 
      <ThemeProvider   theme={createTheme()}>
            <div style={{ marginLeft: '20px', marginTop: 30,  margin: 20 }}>
            <div className="padrefamilia"  >
              Padre de familia: <span className="padrefamiliaName">{this.state.lastClicked} </span>     
            </div> 
            <div  style={{ justifyContent: "flex-end",  marginTop: '-30px', marginLeft: '89%' }}>
              <Button             
              startIcon={<PersonIcon />}
              variant="contained" 
              onClick={this.sendData}
              size="large"
              disabled={false}
              color="primary"
              >                  
              Agregar
              </Button>
              </div>             
            </div> 
          
        <MUIDataTable 
          title={"Listado Padres de familia"}
          data={padresfamilia}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
  </CacheProvider>
  );
  }
}


