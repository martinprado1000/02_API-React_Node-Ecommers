// Repository: requerimos el factory para seleccionar el tipo de persistencia

const errorlogFactory = require("../factories/errorLogFactory");
const ErrorLogDTO = require("../DTOs/errorLogDTO");

class ErrorLogRepository {
  constructor() {
    this.dao = errorlogFactory(process.env.PERSISTENCE);
  }

  async get() {
    const result = await this.dao.get();
    if (result == null) {
    return result;
    }
    return result.map((user) => new ErrorLogDTO(user));
  }

  async getPaginate(query, options) {
    console.log({query,options})
    const result = await this.dao.getPaginate(query, options);
    console.log(result)
    if (result == null) {
      return result;
    }
    const payload = await result.docs.map((d) => d.toObject());
    result.docs = payload;
    result.docs = result.docs.map((errorlog) => new ErrorLogDTO(errorlog));
    return result;
  }

  async getById(id) {
    let result = await this.dao.getById(id);
    if (result == null) {
      return result;
    }
    return new ErrorLogDTOwithoutPass(result);
  }

  async getByUsername(username) {
    const result = await this.dao.getByUsername(username);
    return result;
  }

  async getByEmail(email) {
    let result = await this.dao.getByEmail(email);
    if (result == null) {
      return result;
    }
    result = new ErrorLogDTO(result);
    result = {
      ...result,
      id: result.id.toString()
    };
    return result;
  }

  async getByEmailNotDto(email) {
    const result = await this.dao.getByEmail(email);
    //if (result == null) {
    //  return result;
    //}
    return result;
    //return new ErrorLogDTO(result);
  }

  async post(body) {
    const result = await this.dao.post(body);
    if (result == null) {
      return result;
    }
    return new ErrorLogDTO(result);
  }

  async put(id, body) {
    const result = await this.dao.put(id, body);
    if (result == null) {
      return result;
    }
    return new ErrorLogDTO(result);
  }

  async delete(id) {
    const result = await this.dao.delete(id);
    return result;
  }

  async save(ob) {
    const result = await this.dao.save(ob);
    return result;
  }
}

module.exports = ErrorLogRepository;
