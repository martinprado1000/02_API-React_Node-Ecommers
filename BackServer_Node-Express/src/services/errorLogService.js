const ErrorLogRepository = require("../repositories/errorLogRepository");
const mongoose = require("mongoose");

// Funcion para validar si los id son validos para mongo
const isValid = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

class ErrorLogService {
  constructor() {
    this.ErrorLogRepository = new ErrorLogRepository();
  }

  async get() {
    try {
      const result = await this.ErrorLogRepository.get();
      if (!result || result == "") {
        return { status: 404, data: "No existen errorlog" };
      }
      return { status: 200, data: result };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async getPaginate() {
    try {
      const result = await this.ErrorLogRepository.getPaginate();
      if (!result || result == "") {
        return { status: 404, data: "No existen errorlog" };
      }
      return { status: 200, data: result };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async getById(id) {
    if (!isValid(id)) {
      return { status: 404, data: "ID de errorlog inválido" };
    }
    try {
      const result = await this.ErrorLogRepository.getById(id);
      if (!result) {
        return { status: 404, data: "ErrorLog no encontrado" };
      }
      //console.log(result)
      return { status: 200, data: result };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async post(body) {
    try {
      const result = await this.ErrorLogRepository.post(body);
      //console.log(result)
      return { status: 201, data: "ErrorLog ingresado correctamente" };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async put(id, body) {
    if (!isValid(id)) {
      return { status: 404, data: "ID de errorlog inválido" };
    }
    try {
      const result = await this.ErrorLogRepository.put(id, body);
      //console.log(result)
      if (!result) {
        return { status: 404, data: "ErrorLog no encontrado" };
      }
      return { status: 201, data: "ErrorLog editado correctamente" };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async delete(id) {
    if (!isValid(id)) {
      return { status: 404, data: "ID de errorlog inválido" };
    }
    try {
      let carts = await this.CartsRepository.get2();
      console.log(carts)
      // Elimino el errorlog de todos los carritos
      carts.map((cart) => {
        cart.errorlog = cart.errorlog.filter((prod) => prod?.product != id);
        this.CartsRepository.save(cart);
        return cart;
      });

      const result = await this.ErrorLogRepository.delete(id);

      return { status: 204, data: "ErrorLog eliminado correctamente" };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }
}

module.exports = ErrorLogService;
