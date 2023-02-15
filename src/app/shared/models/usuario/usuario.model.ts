import { Perfil } from "./perfil.type"

export class Usuario {
  constructor (
    public id?: number,
    public nome?: string,
    public login?: string,
    public senha?: string,
    public perfil?: Perfil
  ) {}
}
