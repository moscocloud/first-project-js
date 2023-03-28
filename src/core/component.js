export class Component {
  constructor(id) {
    this.$el = document.getElementById(id);
    this.init();
  }

  init() {}

  onSnow(){

  }

  onHide() {

  }

  hide(){
    this.$el.classList.add('hide');
    this.onHide();
  }

  show(){
    this.$el.classList.remove('hide');
    this.onSnow();
  }
}