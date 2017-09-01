export interface IFichaClienteContact {
    idx: number;
    idx_padre: number;
    sts_rec?: number;
    idx_tipo_contacto?: number;
    responsable?: string;
    email?: string;
    telefono?: string;
    skype?: string;
    usuario?: string;
    perfil?: string;
    comercial?: number;
    consulta?: number;
    area?: string;
    nivel?: string;
    ficha_comision?: number;
    ventana_manteni?: number;
    dcreate?: Date;
    dmodify?: Date;
    ddelete?: Date;
}
