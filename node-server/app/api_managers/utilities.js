class UtilitiesManager {
  static transformStateId(stateId){
    var result = ''
    switch(stateId){
      case 'A':
        result = 'Fallo'
        break;
      case 'D':
        result = 'Abajo'
        break;
      case 'R':
        result = 'Revisión'
        break;
      case 'S':
        result = 'Servicio'
        break;
      case 'U':
        result = 'Arriba'
        break;
      case 'O':
        result = 'Operando'
        break;
      case 'N':
        result = 'Desconocido'
        break;
      case 'X':
        result = 'Fuera de servicio'
        break;
      case 'P':
        result = 'Prioridad'
        break;
      case 'M':
        result = 'Moviendose'
        break;
      case 'V':
        result = 'Modo VIP'
        break;
      case 'G':
        result = 'Fuera de grupo'
        break;
      default:
        result = 'Código inválido'
        break;
      }
      return result;
  }
}
module.exports = UtilitiesManager
