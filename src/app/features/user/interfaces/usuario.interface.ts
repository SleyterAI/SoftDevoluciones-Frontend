
export interface UsuarioRequest{
  username:string;
  email:string;
  password:string;
}

export interface UsuarioResponse{
  id:number;
  username:string;
  email:string;
  role:string;
}

export interface RegistroResponseDto{
  message:string;
}
