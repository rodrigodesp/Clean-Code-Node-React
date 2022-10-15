export class EmailInUseError extends Error {
  constructor () {
    super('Ocorreu um erro ao criar o usuário, dados inválidos')
    this.name = 'EmailInUseError'
  }
}
