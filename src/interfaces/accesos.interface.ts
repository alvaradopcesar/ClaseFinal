
export interface IAccesoAll {
    accesos: IAcceso[];
    perfiles: IPerfil[];
}

export interface IAcceso {
    module_name?: string;
    label_option?: string;
}

export interface IPerfil{
    profile_label?: string;
}