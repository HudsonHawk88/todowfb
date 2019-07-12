import React, { Component, Fragment } from "react";
import Error from './autherror';
import firebase, {auth} from './config/Fire';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      formLeiras: "",
      formHatarido: "",
      formFeladat: "",
      formFontos: "Nem",
      todos: [],
      modal: false,
      user: '',
      
      
      
    };
    this.logout = this.logout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  addTodo = (todo) => {
    
     
    const refTodos = firebase.database().ref("todos").child(todo.feladat);
    refTodos.push(todo);
    this.componentDidMount();
    this.toggle();
  };

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });
    
    firebase.database().ref('todos').on('value', snapshot => {
      let todos1 = [];
      let todos = snapshot.val();
      snapshot.forEach(snapshot => {
        todos = snapshot.val();
      for (let item in todos) {
        
        todos1.push({
          id: todos[item].id,
          user: todos[item].user,
          feladat: todos[item].feladat,
          hatarido: todos[item].hatarido,
          leiras: todos[item].leiras,
          fontos: todos[item].fontos
       });
     
     
      }
      this.setState({todos: todos1})
      }
      
      );
    
    }
      
      )
      
  }

  componentWillUnmount(){

    firebase.database().ref('todos').off();
  } 
    
  
  renderTodoButtons = () => {
 

    return this.state.todos.map((item) => {
      if (item.user === auth.currentUser.displayName){
      return (
        
        <Button
          key={item.id}
          id={item.id}
          block
          color={item.fontos === "Igen" ? "danger" : "primary"}
          onClick={() => {
            this.setState({
                key: item.key,
                id: item.id,
                feladat: item.feladat,
                hatarido: item.hatarido,
                leiras: item.leiras,
                fontos: item.fontos
              
            });
          }
          }
        >
          {item.feladat}
        </Button>
        
      );}
   
    });
    
  }

 

  removeTodo = () => {
    
     firebase.database().ref('todos').child(this.state.feladat).remove();
     let newItems = [];
     this.setState({
       newItems: {
        id: null,
        feladat: null,
        hatarido: null,
        leiras: null,
        fontos: null
       }
     })
     this.setState({
      todos: [this.state.todos, newItems], 
      id: null,
      feladat: null,
      hatarido: null,
      leiras: null,
      fontos: null

    });
    
    
     
  }
  
  

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }

  uuidv4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  renderTodoDetails = () => {
    return (
      <Fragment>
        {this.state.id && (
          <Fragment>
            <font size="5">
            <br />
            <p><u><b>{"Feladat: "}</b></u></p>
            {this.state.feladat} <br /><br />
            <p><u><b>{"Határidő: "}</b></u></p>
            {this.state.hatarido} <br /><br />
            <p><u><b>{"Leírás: "}</b></u></p>
            {this.state.leiras} <br /><br />
            <p><u><b>{"Fontos-e? : "}</b></u></p>
            {this.state.fontos} <br /><br />
            <Button
              size="lg"
              outline
              block
              color="danger"
              onClick={() => {
                this.removeTodo();
                
            }}
            >
              Törlés
            </Button><br /><br />
            </font>
          </Fragment>
        )}
      </Fragment>
    );
    
}

showUser = () => {
  var user = auth.currentUser;
  var name;
if (user != null) {
  name = user.displayName;
  
  
 
}
return (document.getElementById.innerHTML =  name + " teendői:")
}

  render() {
    
    const { formFeladat, formHatarido, formLeiras, formFontos } = this.state;
    return (
      <Fragment>
        <div name="teendok">
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggle}>Feladat létrehozása</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="formFeladat">Feladat rövid leírása:</Label>
                  <Input
                    type="text"
                    name="formFeladat"
                    id="formFeladat"
                    value={formFeladat}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="formHatarido">Feladat határideje:</Label>
                  <Input
                    type="date"
                    name="formHatarido"
                    id="formHatarido"
                    value={formHatarido}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="formLeiras">Feladat rövid leírása:</Label>
                  <Input
                    type="textarea"
                    name="formLeiras"
                    id="formLeiras"
                    value={formLeiras}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="formFontos">Fontos-e?</Label>
                  <Input
                    type="select"
                    name="formFontos"
                    id="formFontos"
                    value={formFontos}
                    onChange={this.handleChange}
                  >
                    <option value="Nem">Nem</option>
                    <option value="Igen">Igen</option>
                  </Input>
                </FormGroup>
                <Button
                  color="primary"
                  onClick={() => {
                    this.addTodo({
                      id: this.uuidv4(),
                      user: auth.currentUser.displayName,
                      feladat: formFeladat,
                      hatarido: formHatarido,
                      leiras: formLeiras,
                      fontos: formFontos
                      }
                    );
                  }}
                >
                  Mentés
                </Button>{" "}
                <Button color="secondary" onClick={this.toggle}>
                  Mégse
                </Button>
              </Form>
            </ModalBody>
            <ModalFooter />
          </Modal>
        </div>

        <div className="container">
          <div className="row">
            <div className="col" name="teendok" id="teendok">
              <h1>Teendők</h1>
              <Button color= "info" onClick={this.logout}>Kijelentkezés</Button>
              <h4>
                {new Date().toLocaleDateString("hu-HU", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </h4>
              <h5>{this.showUser()}</h5>
              <hr />
              <div id="hozzaad" className="col-12" style={{ margin: 0 }} />
              <br />
              <div id="gomblista" className="col-12">
                <Button block outline color="primary" onClick={this.toggle}>
                  + Teendő hozzáadása
                </Button>
                <br />
                {this.state.user === null  ? <Error /> : this.renderTodoButtons()}
              </div>

              <hr />
            </div>
            <div className="col-8">
              <h1>Teendők részletesen</h1>
              <br />
              {this.renderTodoDetails()}
              <hr />
              <div className="col-14" id="tartalom">
                
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default Home;
