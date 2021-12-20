import axios from "axios";
import moment from "moment";
import { autorun, configure, makeAutoObservable, toJS } from "mobx";

configure({
  enforceActions: "never",
});

class CreatePlanStore {
  userLoadStatus = "";
  taskLoadStatus = "";
  taskPostStatus = "";
  tasks = [];
  events = [];
  routines = [];
  notes = [];
  user = [];
  selectedDate = moment().format();
  
  constructor() {
    makeAutoObservable(this);
  }

  // setUser(i) {
  //   this.user = i;
  //   // console.log(this.user)

  *ssetUser() {
    try {
      this.userLoadStatus = "pending";
      const response = yield axios.get(
        "http://localhost:5000/auth/login/success",
        { withCredentials: true }
      );
      this.user = response.data;
      this.userLoadStatus = "success"
      // .then((response) => response.json())
      // .then((data) => this.setUser("HELLO"))
      // .catch((err) => {
      //   console.log(err)
      //   this.user = null
      // })
    } catch (err) {
      this.userLoadStatus = "error";
    }
  }
  addTask(text) {
    console.log(text, this.tasks);
    this.tasks.push({
      text,
      id: "x",
    });
  }
  removeTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
  updateDate(newDate) {
    this.selectedDate = newDate;
    console.log(newDate);
  }
  *getTasks() {
    try {
      this.taskLoadStatus = "pending";
      const response = yield axios
      .get("http://localhost:5000/task", {
        params: {
          userId: this.user.userId,
          date: moment(this.selectedDate).startOf("day").toDate(),
        },
      })
      this.tasks = response.data
      this.taskLoadStatus = "success"
    } catch (err) {
      this.taskLoadStatus = "error"
    }
  }
  *newTask(taskValues) {
    try{
      this.taskPostStatus = "pending"
      const reponse = yield axios
        .post("http://localhost:5000/task/post", taskValues)
        // .then((response) => console.log(response));
      this.getTasks();
    } catch (err){
      this.taskPostStatus = "error"
    }
  }
  checkTask(id) {
    let t = this.tasks.filter((i) => i.id === id);
  }
  uncheckTask(id) {}
}

const newPlanStore = new CreatePlanStore();

autorun(() => {
  console.log(toJS(newPlanStore.userLoadStatus));
  console.log(toJS(newPlanStore.taskLoadStatus));
});

export default newPlanStore;