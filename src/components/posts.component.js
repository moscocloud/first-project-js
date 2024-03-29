import { Component } from "../core/component";
import { apiService } from "../services/api.service";
import { TransformService } from "../services/transform.service";
import { renderPost } from "../templates/post.template";

export class PostsComponent extends Component {
  constructor(id, options){
    super(id);
    this.loader = options.loader;
  }

  init(){
    this.$el.addEventListener('click', buttonHandler.bind(this));
  }

  async onSnow() {
    this.loader.$el.classList.remove('hide');
    const fbData = await apiService.fetchPosts();
    const posts = TransformService.fbObjectToArray(fbData);
    const html = posts.map(post => renderPost(post, {withButton: true}));
    this.loader.$el.classList.add('hide');
    this.$el.insertAdjacentHTML('afterbegin',html.join(' '));
  }

  onHide() {
    this.$el.innerHTML = '';
  }
}

function buttonHandler(event) {
  const $el = event.target;
  const id = $el.dataset.id;
  const title = $el.dataset.title;

  if (id) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const candidate = favorites.find(p => p.id === id);
    
    if (candidate) {
      $el.textContent = 'Сохранить';
      $el.classList.add('button-primary');
      $el.classList.remove('button-danger');
      favorites = favorites.filter(p => p.id !== id);
    } else {
      $el.textContent = 'Удалить';
      $el.classList.add('button-danger');
      $el.classList.remove('button-primary');
      favorites.push({id, title});
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}