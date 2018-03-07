import { Injectable }             from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Injectable()
export class ProfessorService {

    constructor() {}

    public getLoginControls(): any {
        return new FormGroup({
            user:  new FormControl(),
            senha: new FormControl(),
        });
    }

    public getLoginFields(): any {
        return [
            { placeholder: 'Usuário', controlName: 'user',  type: 'text',     icon: 'people' },
            { placeholder: 'Senha',   controlName: 'senha', type: 'password', icon: 'lock' },
        ];
    }
}