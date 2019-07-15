// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';
import Photon from '@generated/photon';
import {
  post,
  del,
  param,
  requestBody,
  get,
  RequestBodyObject,
} from '@loopback/rest';

const todoDto: RequestBodyObject = {
  required: true,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          title: {type: 'string'},
          desc: {type: 'string'},
          isComplete: {type: 'boolean'},
        },
      },
    },
  },
};

interface CreateTodoDto {
  title: string;
  desc?: string;
  isComplete: boolean;
}

interface UpdateTodoDto {
  title?: string;
  desc?: string;
  isComplete?: boolean;
}

export class TodoController {
  private readonly photon: Photon;
  constructor() {
    this.photon = new Photon();
  }

  @get('/todos')
  async findAllTodos() {
    const allTodos = await this.photon.todos.findMany();
    return allTodos;
  }

  @post('/todos/new')
  async createTodo(@requestBody() todo: CreateTodoDto) {
    const result = await this.photon.todos.create({
      data: {
        ...todo,
      },
    });
    return result;
  }

  @del('/todos/{id}')
  async deleteTodoById(@param.path.string('id') id: string) {
    const result = await this.photon.todos.delete({
      where: {id: id},
    });
    return result;
  }

  @post('/todos/{id}')
  async updateTodoById(
    @param.path.string('id') id: string,
    @requestBody() todo: UpdateTodoDto,
  ) {
    const result = await this.photon.todos.update({
      where: {id: id},
      data: {...todo},
    });
    return result;
  }

  @get('todos/{id}')
  async findTodoById(@param.path.string('id') id: string) {
    const todo = this.photon.todos.findOne({
      where: {id: id},
    });
    return todo;
  }
}
