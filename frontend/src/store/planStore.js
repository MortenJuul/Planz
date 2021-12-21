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
  checkStatus = "";
  tasks = [];
  events = [];
  routines = [];
  notes = [];
  user = [];
  selectedDate = moment().format();

  constructor() {
    makeAutoObservable(this);
    this.getTasks();
  }

  // setUser(i) {
  //   this.user = i;
  //   // console.log(this.user)

  *ssetUser() {
    try {
      this.userLoadStatus = "user pending";
      const response = yield axios.get(
        "http://localhost:5000/auth/login/success",
        { withCredentials: true }
      );
      this.user = response.data;
      this.userLoadStatus = "user success";
      // .then((response) => response.json())
      // .then((data) => this.setUser("HELLO"))
      // .catch((err) => {
      //   console.log(err)
      //   this.user = null
      // })
    } catch (err) {
      this.userLoadStatus = "user error";
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
    this.getTasks()
  }
  *getTasks() {
    try {
      this.taskLoadStatus = "get pending";
      const response = yield axios.get("http://localhost:5000/task", {
        params: {
          userId: this.user.userId,
          date: moment(this.selectedDate).startOf("day").toDate(),
        },
      });
      this.tasks = response.data;
      this.taskLoadStatus = "get success";
    } catch (err) {
      this.taskLoadStatus = "get error";
    }
  }
  *newTask(taskValues) {
    try {
      this.taskPostStatus = "create pending";
      const reponse = yield axios.post(
        "http://localhost:5000/task/post",
        taskValues
      );
      this.taskPostStatus = "create success"
      // .then((response) => console.log(response));
      this.getTasks();
    } catch (err) {
      this.taskPostStatus = "create error";
    }
  }
  *updateTask(task) {
    try {
      // let id = this.tasks.filter((i) => i._id === task._id);
      console.log(task);
      this.taskPostStatus = "update pending";
      const reponse = yield axios.put(
        "http://localhost:5000/task/post/:" + task._id,
        task
      );
      // .then((response) => console.log(response));
      this.taskPostStatus = "update success";
      this.getTasks();
    } catch (err) {
      this.taskPostStatus = "update error";
    }
  }
  
  *deleteTask(task) {
    try {
      // let id = this.tasks.filter((i) => i._id === task._id);
      this.taskPostStatus = "delete pending";
      const reponse = yield axios.delete(
        "http://localhost:5000/task/post/" + task._id
      );
      // .then((response) => console.log(response));
      this.taskPostStatus = "delete success";
    } catch (err) {
      this.taskPostStatus = "delete error";
    }
    this.getTasks();
  }
  uncheckTask(id) {}
}

const newPlanStore = new CreatePlanStore();

autorun(() => {
  console.log(toJS(newPlanStore.userLoadStatus));
  console.log(toJS(newPlanStore.taskLoadStatus));
  console.log(toJS(newPlanStore.taskPostStatus));
});

export default newPlanStore;
