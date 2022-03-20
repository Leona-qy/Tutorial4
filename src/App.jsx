const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}


class ReservedTicket extends React.Component{ 
  componentDidMount() {
    const containers = document.querySelectorAll(".seatEmpty");
    const travellers=this.props.travellers;
    const occupiedSeatNum=travellers.length
    const freeSeatNum=25-occupiedSeatNum
    for(var i=0;i<occupiedSeatNum;i++){
      containers[i].classList.toggle("seatOccupied");
    }
  }
  render(){
    const travellers=this.props.travellers;
    const occupiedSeatNum=travellers.length
    const freeSeatNum=25-occupiedSeatNum
    return (
      <div>
        <div style={{alignItems: 'center', justifyContent: 'space-between',
        flexDirection: 'row'}}>The number of free seats are {freeSeatNum}.
        </div>
        <ul className="showstyle"> 
          <li>
            <div className="seatEmptyori"></div>
            <small>Empty Seat</small>
          </li>
          <li>
            <div className="seatOccupiedori"></div>
            <small>Occupied Seat</small>
          </li>
        </ul>
        <div className="container">

          <div className="row">
              <div className="seatEmpty"></div>
              <div className="seatEmpty"></div>
              <div className="seatEmpty"></div>
              <div className="seatEmpty"></div>
              <div className="seatEmpty"></div>
          </div>
          <div className="row">
              <div className="seatEmpty"></div>
              <div className="seatEmpty"></div>
              <div className="seatEmpty"></div>
              <div className="seatEmpty"></div>
              <div className="seatEmpty"></div>
          </div>
          <div className="row">
              <div className="seatEmpty"></div>
              <div className="seatEmpty"></div>
              <div className="seatEmpty"></div>
              <div className="seatEmpty"></div>
              <div className="seatEmpty"></div>
          </div>
          <div className="row">
              <div className="seatEmpty"></div>
              <div className="seatEmpty"></div>
              <div className="seatEmpty"></div>
              <div className="seatEmpty"></div>
              <div className="seatEmpty"></div>
          </div>
          <div className="row">
              <div className="seatEmpty"></div>
              <div className="seatEmpty"></div>
              <div className="seatEmpty"></div>
              <div className="seatEmpty"></div>
              <div className="seatEmpty"></div>
          </div>
        </div>

      </div>

    );
  }
}

class TravellerRow extends React.Component{
  render() {
    const style = {border: "1px solid silver", padding: 4};
    const traveller=this.props.traveller;
    return (
      <tr>
        <td style = {style}>{traveller.id}</td>
        <td style = {style}>{traveller.name}</td>
        <td style = {style}>{traveller.phonenum}</td>
        <td style = {style}>{traveller.time.toDateString()}</td>
      </tr>
    );
  }
}

class ReservationList extends React.Component{

  render() {
    const rowStyle = {border: "1px solid silver", padding: 4};
    const travellerRows = this.props.travellers.map(traveller => 
      <TravellerRow key={traveller.id} traveller={traveller} />
      );
    
    
    return (
      <table className="showlist" id="display" style={{borderCollapse:"collapse", display:"block"}} id="del">
        <thead>
          <tr>
            <th style={rowStyle}>Serial No.</th>
            <th style={rowStyle}>Name</th>
            <th style={rowStyle}>Phone number</th>
            <th style={rowStyle}>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {travellerRows}
        </tbody>
      </table>

    );
  }
}

class TravellerDel extends React.Component{
  constructor(){
    super();
    this.deleteSubmit=this.deleteSubmit.bind(this);
  }
  deleteSubmit(e) {
    e.preventDefault();
    var tbl=document.getElementById("del");
    const travellers=this.props.travellers;
    const form=document.forms.travellerDel; 
    if (form.name.value==''){
      alert('Please input Name')
    }
    const name = {
      name: form.name.value
    }
    this.props.deleteTraveller(name);

    form.name.value="";

    }
  
  render() {
    return (
      <form name="travellerDel" onSubmit={this.deleteSubmit}>
        <input type="index" name="name" placeholder="Name" />
        <button>Delete</button>
      </form>
    )
  }
}

class TravellerAdd extends React.Component{
  constructor() {
    super();
    this.handleSubmit=this.handleSubmit.bind(this);
    };

  
  handleSubmit(e) {
    e.preventDefault();
    const form=document.forms.travellerAdd;
    const travellers=this.props.travellers;
    const traveller = {
      name: form.name.value, phonenum: form.phonenumber.value,
      time: new Date(),
    }
    if (form.name.value=="") {
      alert("Please input Name")
    };
    if (form.phonenumber.value=="") {
      alert("Please input Phone number")
    };

    if(travellers.length < 25){
      this.props.creatTraveller(traveller);
    } else {
        alert("Error: No Free Seats!")
      }
    form.name.value="";
    form.phonenumber.value="";
  }
  render() {
    return (
      <form name="travellerAdd" onSubmit={this.handleSubmit}>
        <input type="text" name="name" placeholder="Name"/>
        <input type="text" name="phonenumber" placeholder="Phone number"/>
        <button>Add</button>
      </form>
    );
  }
}

class TravellerBlackList extends React.Component{
  constructor() {
    super();
    this.handleSubmit=this.handleSubmit.bind(this);
    };

  
  handleSubmit(e) {
    e.preventDefault();
    const form=document.forms.travellerBlk;
    const travellers=this.props.travellers;
    const traveller = {
      name: form.name.value
    }
    if (form.name.value=="") {
      alert("Please input Name")
    }
    this.props.blackListTraveller(traveller);
    form.name.value="";
  }
  render() {
    return (
      <form name="travellerBlk" onSubmit={this.handleSubmit}>
        <input type="text" name="name" placeholder="Name"/>
        <button>Add to Blacklist</button>
      </form>
    );
  }
}

class Homepage extends React.Component{
  constructor() {
    super();
    this.state={ travellers: [], visible: false , getElem: false, 
      addElem: false, delElem: false, blkElem: false};
    this.creatTraveller = this.creatTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
    this.clickSubmit=this.clickSubmit.bind(this);
    this.getSubmit=this.getSubmit.bind(this);
    this.addSubmit=this.addSubmit.bind(this);
    this.delSubmit=this.delSubmit.bind(this);
    this.blackSubmit=this.blackSubmit.bind(this);

  }

  clickSubmit(e){
    e.preventDefault();
    if(this.state.visible==true) {
      this.setState({ visible: false , getElem:false, addElem:false, delElem:false, blkElem: false}) 
    }
    else{
      this.setState({ visible: true , getElem:false, addElem:false, delElem:false, blkElem: false}) 
    }
  }

  getSubmit(e){
    e.preventDefault();
    if(this.state.getElem==true) {
      this.setState({ getElem: false, visible: false , addElem:false, delElem:false, blkElem: false}) 
    }
    else{
      this.setState({ getElem: true, visible: false , addElem:false, delElem:false, blkElem: false}) 
    }
  }

  addSubmit(e){
    e.preventDefault();
    if(this.state.addElem==true) {
      this.setState({ addElem: false, getElem: false, visible: false , delElem:false, blkElem: false}) 
    }
    else{
      this.setState({ addElem: true, getElem: false, visible: false , delElem:false, blkElem: false}) 
    }
  }

  delSubmit(e){
    e.preventDefault();
    if(this.state.delElem==true) {
      this.setState({ delElem: false ,getElem: false, visible: false , addElem:false, blkElem: false}) 
    }
    else{
      this.setState({ delElem: true ,getElem: false, visible: false , addElem:false, blkElem: false}) 
    }
  }

  blackSubmit(e){
    e.preventDefault();
    if(this.state.blkElem==true) {
      this.setState({ blkElem: false, delElem: false ,getElem: false, visible: false , addElem:false}) 
    }
    else{
      this.setState({ blkElem:true , delElem: false ,getElem: false, visible: false , addElem:false}) 
    }
  }
 

  componentDidMount() {
    this.loadData();
  }

  async loadData() {

    const query = `query {
      reservationList {
        id name phonenum time
      }
    }`;
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify( {query} )
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);
    this.setState({ travellers: result.data.reservationList });
  }

  async creatTraveller(traveller) {
    const query = `mutation travellerAdd ($traveller:  TravellerInputs!){
      travellerAdd(traveller: $traveller) {
        id
      }
    }`;
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ query, variables: { traveller } })
    });
    this.loadData();
  }


  async deleteTraveller(name) {

    const query = `mutation travellerDelete ($name:  TravellerDeleteInputs!){
      travellerDelete(name: $name) {
        id
      }
    }`;
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify( {query, variables: { name }} )
    });
    this.loadData();
  }

  async blackListTraveller(traveller) {
    const query = `mutation travellerBlacklist ($traveller:  TravellerBlkInputs!){
      travellerBlacklist(traveller: $traveller){
        name
      }
    }`;
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ query, variables: { traveller } })
    });
  }
  render(){
    return (
      <React.Fragment>
        <h1>Homepage</h1>
        <nav>
          <button onClick={this.clickSubmit}>FreeSeats</button>
          <button onClick={this.getSubmit}>Reservation List</button>
          <button onClick={this.addSubmit}>Add Traveller</button>
          <button onClick={this.delSubmit}>Delete Traveller</button>
          <button onClick={this.blackSubmit}>Black List</button>
        </nav>
        <hr />
        {this.state.visible ? (
          <ReservedTicket travellers={this.state.travellers}/>
        ) : null}
        <hr />
        {this.state.getElem ? (
          <ReservationList travellers={this.state.travellers} />
        ) : null}
        <hr />
        {this.state.addElem ? (
          <TravellerAdd travellers={this.state.travellers} creatTraveller={this.creatTraveller} />
        ) : null}
        <hr />
        {this.state.delElem ? (
          <TravellerDel travellers={this.state.travellers} deleteTraveller={this.deleteTraveller}/>
        ) : null}
        <hr />
        {this.state.blkElem ? (
          <TravellerBlackList travellers={this.state.travellers} blackListTraveller={this.blackListTraveller}/>
        ) : null}

        </React.Fragment>
    );
  }
}

const element = <Homepage />;

ReactDOM.render(element, document.getElementById('contents'));
